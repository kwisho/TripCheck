/**
 * Get unix time format number from a date.
 * @param date Date to be converted into unix time.
 * @returns Unix time format number.
 */
export declare function toUnixTime(date: Date): number;
/**
 * Get the date from a unix time format number.
 * @param epoch Unix time format number.
 * @returns Date instance represented by epoch number.
 */
export declare function fromUnixTime(epoch: number): Date;
/**
 * Get a string into ISO format and convert it to a Date.
 * @param isoDate ISO date string format.
 * @returns Date instance represented by the Date.
 */
export declare function fromISOToDate(isoDate: string): Date;
/**
 * Format the date with dashes in the pattern: dd-Mon-yyyy.
 * @param date Date to be formatted.
 * @returns Formatted date string.
 */
export declare function formatDate(date: Date): string;
/**
 * Returns is a string is a date
 * @param dateToTest
 * @returns
 */
export declare function isDate(dateToTest: string): boolean;
/**
 * Format the date as yyyy年MM月dd日
 * @param date Date to be formatted.
 * @returns Formatted date string like 2024年06月23日
 */
export declare function formatJapaneseDate(date: Date): string;
/**
 * Parses a JSON string and recursively converts specified date properties to Date objects.
 * @param body The JSON string to parse.
 * @param dataProps Optional array of additional property names to convert to Date.
 * @returns The parsed object with specified properties converted to Date instances.
 */
export declare function formatResponseBodyRecursive<T>(body: string, dataProps?: string[]): T;
