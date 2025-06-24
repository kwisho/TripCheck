"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBody = exports.generalDateProperties = void 0;
exports.generalDateProperties = ['date', 'createdAt', 'updatedAt'];
const formatBody = (body, dateProps) => {
    const result = JSON.parse(body);
    const allDateProps = [...exports.generalDateProperties, ...(dateProps || [])];
    for (const dateProp of allDateProps) {
        const value = result[dateProp];
        // valueがstring, number, Dateのいずれかかチェックしてから変換
        if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
            result[dateProp] = new Date(value);
        }
    }
    return result;
};
exports.formatBody = formatBody;
