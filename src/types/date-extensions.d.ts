/* Augment the global Date interface so prototype methods are included in generated docs */
export {};

declare global {
    interface Date {
        /**
         * Convert this Date to a blockchain timestamp (seconds since epoch)
         * @returns {number}
         * @memberof Date
         */
        ToBlockchainTimestamp(): number;

        /** Add seconds to this date and return a new Date */
        addSeconds(seconds: number): Date;

        /** Add minutes to this date and return a new Date */
        addMinutes(minutes: number): Date;

        /** Add hours to this date and return a new Date */
        addHours(hours: number): Date;

        /** Add days to this date and return a new Date */
        addDays(days: number): Date;

        /** Add weeks to this date and return a new Date */
        addWeeks(weeks: number): Date;

        /** Add months (30 days) to this date and return a new Date */
        addMonths(months: number): Date;

        /** Add years (365 days) to this date and return a new Date */
        addYears(years: number): Date;

        /** Returns true when this date is the last day of its month */
        isLastDayOfMonth(): boolean;

        /** Returns true if this Date instance is valid */
        isValidDate(): boolean;

        /** Format this date using the provided format string */
        toFormat(format: string): string;
    }
}
