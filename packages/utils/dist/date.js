"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUnixTime = toUnixTime;
exports.fromUnixTime = fromUnixTime;
exports.fromISOToDate = fromISOToDate;
exports.formatDate = formatDate;
exports.isDate = isDate;
exports.formatJapaneseDate = formatJapaneseDate;
exports.formatResponseBodyRecursive = formatResponseBodyRecursive;
exports.formatTime = formatTime;
const request_1 = require("./request");
/**
 * Get unix time format number from a date.
 * @param date Date to be converted into unix time.
 * @returns Unix time format number.
 */
function toUnixTime(date) {
    return Math.floor(date.getTime() / 1000);
}
/**
 * Get the date from a unix time format number.
 * @param epoch Unix time format number.
 * @returns Date instance represented by epoch number.
 */
function fromUnixTime(epoch) {
    return new Date(epoch * 1000);
}
/**
 * Get a string into ISO format and convert it to a Date.
 * @param isoDate ISO date string format.
 * @returns Date instance represented by the Date.
 */
function fromISOToDate(isoDate) {
    return new Date(isoDate);
}
/**
 * Format the date with dashes in the pattern: dd-Mon-yyyy.
 * @param date Date to be formatted.
 * @returns Formatted date string.
 */
function formatDate(date) {
    const monthsAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${day}-${monthsAbbr[monthIndex]}-${year}`;
    return formattedDate;
}
/**
 * Returns is a string is a date
 * @param dateToTest
 * @returns
 */
function isDate(dateToTest) {
    if (!dateToTest)
        return false;
    if (!dateToTest.trim())
        return false;
    if (!/\d+-\d+-\d+/.test(dateToTest))
        return false;
    return !isNaN(Date.parse(dateToTest));
}
/**
 * Format the date as yyyy年MM月dd日
 * @param date Date to be formatted.
 * @returns Formatted date string like 2024年06月23日
 */
function formatJapaneseDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // 月は0始まり
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}年${mm}月${dd}日`;
}
/**
 * Recursively traverses an object and converts specified properties to Date instances.
 * @param obj The object to process (can be nested).
 * @param dateProps Array of property names to convert to Date.
 */
function convertDates(obj, dateProps) {
    if (obj === null || typeof obj !== 'object')
        return;
    if (Array.isArray(obj)) {
        for (const item of obj) {
            convertDates(item, dateProps);
        }
        return;
    }
    for (const key in obj) {
        const value = obj[key];
        if (dateProps.includes(key)) {
            if (typeof value === 'string' ||
                typeof value === 'number' ||
                value instanceof Date) {
                obj[key] = new Date(value);
            }
        }
        else if (typeof value === 'object') {
            convertDates(value, dateProps);
        }
    }
}
/**
 * Parses a JSON string and recursively converts specified date properties to Date objects.
 * @param body The JSON string to parse.
 * @param dataProps Optional array of additional property names to convert to Date.
 * @returns The parsed object with specified properties converted to Date instances.
 */
function formatResponseBodyRecursive(body, dataProps) {
    const result = JSON.parse(body);
    const allDateProps = [...request_1.generalDateProperties, ...(dataProps || [])];
    convertDates(result, allDateProps);
    return result;
}
/**
 * Format a date object to time string like "13:30".
 * @param date Date to format.
 * @returns Time string in HH:mm format.
 */
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
