import {Component, Input, OnChanges} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {CRUDService} from "../../shared/services/crud.service";
import {SubjectService} from "../../shared/services/subject.service";
import {StudentPageService} from "../../shared/services/student-page.service";
import {InfoModalComponent} from "../../shared/components/info-modal/info-modal.component";
import {
    headersStudentTestList,
    actionsStudentTestList,
    activeTests,
    activeTimeTable
} from "../../shared/constant/student-test-list";
import {modalInfoConfig} from "../../shared/constant";


@Component({
    selector: "test-list",
    templateUrl: "./test-list.component.html",
    providers: [StudentPageService]
})

export class TestListComponent implements OnChanges {

    @Input() groupId;
    @Input() userId;

    public modalInfoConfig:any = modalInfoConfig;
    public activeTests:any = activeTests;
    public activeTimeTable:any = activeTimeTable;
    public dateNow = {date: "", time: ""};
    public headers:any = headersStudentTestList;
    public actions:any = actionsStudentTestList;
    public entityData = [];
    public userRole = sessionStorage.getItem("userRole");

    constructor(private _commonService:CRUDService,
                private _router:Router,
                private _subjectService:SubjectService,
                private _studentService:StudentPageService,
                private modalService:NgbModal) {
    }

    ngOnChanges() {
        if (this.groupId) {
            this.getTimeTable();
        }
    }

    activate(data) {
        this.runTest(data);
    }

    getTimeTable() {
        this.entityData.length = 0;
        this._commonService.getTime()
            .subscribe(date=> {
                let today = date;
                this.dateNow = this._studentService.getTimeStamp(+today.curtime - today.offset);
                this._commonService.getTimeTableForGroup(this.groupId)
                    .subscribe(data => {
                        this.activeTimeTable = data;
                        for (let i = 0; i < this.activeTimeTable.length; i++) {
                            const eventDateTime = {
                                startDate: this.activeTimeTable[i].start_date,
                                startTime: this.activeTimeTable[i].start_time,
                                endDate: this.activeTimeTable[i].end_date,
                                endTime: this.activeTimeTable[i].end_time
                            };
                            if (
                                ((this.dateNow.date === eventDateTime.startDate) &&
                                (this.dateNow.date === eventDateTime.endDate) &&
                                (this.dateNow.time >= eventDateTime.startTime) &&
                                (this.dateNow.time <= eventDateTime.endTime))
                                || ((this.dateNow.date === eventDateTime.startDate) &&
                                (this.dateNow.date < eventDateTime.endDate) &&
                                (this.dateNow.time >= eventDateTime.startTime))
                                || ((this.dateNow.date > eventDateTime.startDate) &&
                                (this.dateNow.date === eventDateTime.endDate) &&
                                (this.dateNow.time <= eventDateTime.endTime))
                                || ((this.dateNow.date > eventDateTime.startDate) &&
                                (this.dateNow.date < eventDateTime.endDate))
                            ) {
                                this._commonService.getRecordById("subject", this.activeTimeTable[i].subject_id)
                                    .subscribe(subject => {
                                        let newSubjectName = subject[0].subject_name;
                                        this.getTestsForNow(
                                            this.activeTimeTable[i].subject_id,
                                            eventDateTime,
                                            newSubjectName
                                        );
                                    });
                            }
                        }
                    });
            });
    }

    getTestsForNow(subId, eventDateTime, SubjectName) {
        this._subjectService.getTestsBySubjectId("subject", +subId)
            .subscribe(dataTests => {
                this.activeTests = dataTests;
                for (let j = 0; j < this.activeTests.length; j++) {
                    if (this.activeTests[j].enabled === "1") {
                        let userAttepts:number = 0;
                        this._studentService.getStudentTestPassedCount(this.userId, this.activeTests[j].test_id)
                            .subscribe(dataTestPassed => {
                                userAttepts = dataTestPassed.numberOfRecords;
                                if (this.activeTests[j].attempts > userAttepts) {
                                    this.entityData.push({
                                        entityColumns: [
                                            SubjectName + ": " +
                                            this.activeTests[j].test_name,
                                            eventDateTime.startDate.replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1') + " / " +
                                            eventDateTime.startTime.substr(0, eventDateTime.startTime.length - 3),
                                            eventDateTime.endDate.replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1') + " / " +
                                            eventDateTime.endTime.substr(0, eventDateTime.endTime.length - 3),
                                            this.activeTests[j].tasks,
                                            this.activeTests[j].time_for_test
                                        ],
                                        entity_id: this.activeTests[j].test_id
                                    });
                                }
                            });
                    }
                }
            });
    }

    runTest(data:any) {
        this.modalInfoConfig.infoString = "Ви дійсно хочете пройти тест:\n" + data.entityColumns[0] + "?";
        this.modalInfoConfig.action = "confirm";
        this.modalInfoConfig.title = "Початок тестування";
        const modalRefDel = this.modalService.open(InfoModalComponent, {size: "sm"});
        modalRefDel.componentInstance.config = this.modalInfoConfig;
        modalRefDel.result
            .then(() => {
                this._router.navigate(["/student/test-player"],
                    {queryParams: {testId: data.entity_id}}
                );
            }, () => {
                return;
            });
    }
}