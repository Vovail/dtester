export const patterns = {
    email: "^[^@]+@[^@]+\.[^@]+$",
    time: "^(([0|1][0-9])|([2][0-3])):([0-5][0-9])$",
    entityName: "^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ'’,. -]+$",
    groupName: "^[А-ЯЁЇІіЄҐ]{2,3}[-][0-9]{2}[-][0-9]{1}$",
    numberUpTo255: "^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$",
    code: "^[0-9. ]*$",
    number: "^[0-9]*$",
    answerCount: "[0-9]?"
};