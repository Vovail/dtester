// Constants for table.component
export const headersGroup = [
    {name: "№", className: "col-xs-12 col-sm-1"},
    {name: "Назва групи", className: "col-xs-12 col-sm-2"},
    {name: "Факультет", className: "col-xs-12 col-sm-3"},
    {name: "Спеціальність", className: "col-xs-12 col-sm-3"},
    {name: "", className: "col-xs-12 col-sm-3"}
];

export const actionsGroup = [
    {
        title: "Результати тустування групи",
        action: "",
        glyphicon: "glyphicon glyphicon-list-alt",
        btnClassName: "btn btn-default btn-sm"
    },
    {
        title: "Переглянути студентів групи",
        action: "",
        glyphicon: "glyphicon glyphicon-user",
        btnClassName: "btn btn-default btn-sm"
    },
    {
        title: "Розклад тестування групи",
        action: "",
        glyphicon: "glyphicon glyphicon-calendar",
        btnClassName: "btn btn-default btn-sm"
    },
    {
        title: "Редагувати групу",
        action: "edit",
        glyphicon: "glyphicon glyphicon-edit",
        btnClassName: "btn btn-default btn-sm"
    },
    {
        title: "Видалити групу",
        action: "delete",
        glyphicon: "glyphicon glyphicon-trash",
        btnClassName: "btn btn-danger btn-sm"
    }
];

// Constants for add-edit-modal component
export const configAddGroup = {
    title: "Додати групу",
    list: [
        {name: "Назва групи", value: "", title: "name", type: "text"}
    ],
    action: "create",
    labelBtn: "Додати",
    select: [
        {selectName: "Факультет", selectItem: [], selected: ""},
        {selectName: "Спеціальність", selectItem: [], selected: ""}
    ]
};

export const configEditGroup = {
    title: "Редагувати групу",
    list: [
        {name: "Назва групи", value: "", title: "name", type: "text"}
    ],
    action: "edit",
    labelBtn: "Редагувати",
    id: "",
    select: [
        {selectName: "Факультет", selectItem: [], selected: ""},
        {selectName: "Спеціальність", selectItem: [], selected: ""}
    ]
};