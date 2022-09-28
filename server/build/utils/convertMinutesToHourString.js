"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMinutesToHourString = void 0;
function convertMinutesToHourString(minutesAmount) {
    const hours = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
}
exports.convertMinutesToHourString = convertMinutesToHourString;
