export class TimeTable {
    timetable_id?: number;
    group_id: number;
    subject_id?: number;
    event_date: any;

    constructor(group_id: number, event_date: any, subject_id?: number) {
        this.event_date = event_date;
        this.group_id = group_id;
        this.subject_id = subject_id;
    }
}

