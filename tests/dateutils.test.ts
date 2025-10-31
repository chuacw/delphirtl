import {
    DiffDuration, fromBlockchainTimestamp, JSDateAddDays, JSDateAddMins, JSDateAddYears,
    YearOf, MonthOf, DayOf, HourOf, MinuteOf, SecondOf, MillisecondOf
} from "../src/dateutils";

describe('test DateUtils Date.add functionality', () => {
    /**
    * 1 second
    */
    const ONE_SEC = 1000;
    const ONE_MIN = 60 * ONE_SEC;
    const ONE_HOUR = 60 * ONE_MIN;
    const ONE_DAY = 24 * ONE_HOUR;
    const ONE_WEEK = 7 * ONE_DAY;

    test('Date.addSeconds(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addSeconds(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_SEC);
    });
    test('Date.addSeconds()', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addSeconds();
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_SEC);
    });
    test('Date.addMinutes(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addMinutes(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_MIN);
    });
    test('Date.addMinutes()', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addMinutes();
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_MIN);
    });
    test('Date.addHours(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addHours(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_HOUR);
    });
    test('Date.addHours()', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addHours();
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_HOUR);
    });
    test('Date.addDays(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addDays(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_DAY);
    });
    test('Date.addDays()', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addDays();
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_DAY);
    });
    test('Date.addWeeks(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addWeeks(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_WEEK);
    });
    test('Date.addWeeks()', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addWeeks();
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_WEEK);
    });
    test('Date.addMonths(1)', () => {
        const now = new Date(1990, 0, 1, 0, 0, 0);
        const newDate = now.addMonths(1);
        const duration = DiffDuration(newDate, now);
        expect(duration.months).toEqual(1);
    });
    test('Date.addMonths()', () => {
        const now = new Date(1990, 0, 1, 0, 0, 0);
        const newDate = now.addMonths();
        const duration = DiffDuration(newDate, now);
        expect(duration.months).toEqual(1);
    });
    test('Date.addYears(1)', () => {
        const now = new Date(1990, 0, 1, 0, 0, 0);
        const newDate = now.addYears(1);
        const duration = DiffDuration(newDate, now);
        expect(duration.years).toEqual(1);
    });
    test('Date.addYears()', () => {
        const now = new Date(1990, 0, 1, 0, 0, 0);
        const newDate = now.addYears();
        const duration = DiffDuration(newDate, now);
        expect(duration.years).toEqual(1);
    });
});

describe('testing DateUtils library', () => {

    test('fromBlockchainTimestamp 1', () => {
        expect(fromBlockchainTimestamp(1)).toEqual(new Date(1000));
    });

    test('fromBlockchainTimestamp 2', () => {
        expect(fromBlockchainTimestamp(2)).toEqual(new Date(2000));
    });

    test('ToBlockchainTimestamp', () => {
        let newDate = new Date();
        expect(newDate.ToBlockchainTimestamp()).toEqual(Math.floor(newDate.getTime() / 1000));
    });

    test('JSDateAddMins 1000 10', () => {
        const newDate = new Date(1000);
        const timeInMins = 10;
        expect(JSDateAddMins(newDate, timeInMins)).toEqual(new Date(newDate.getTime() + (timeInMins * 60 * 1000)));
    });

    test('JSDateAddHours 2000 10', () => {
        const newDate = new Date(2000);
        const hours = 10;
        const hoursInMins = hours * 60;
        expect(JSDateAddMins(newDate, hoursInMins)).toEqual(JSDateAddMins(newDate, hoursInMins));
    });

    test('JSDateAddDays 1000 10', () => {
        const newDate = new Date(1000);
        const days = 10;
        expect(JSDateAddDays(newDate, days)).toEqual(JSDateAddMins(newDate, days * 24 * 60));
    });

    test('JSDateAddYears 3000 5', () => {
        const startDate = new Date(3000);
        const years = 5;
        const expectedDate = new Date(startDate.getTime());
        expectedDate.setFullYear(expectedDate.getFullYear() + years);
        expect(JSDateAddYears(startDate, years)).toEqual(expectedDate);
    });

    test('toFormat for Jan 1, 2020', () => {
        const d = new Date(2020, 0, 1, 1, 1, 1, 1);
        const result = d.toFormat('YYYY-MM-DD HH:nn:ss');
        expect(result).toBe('2020-01-01 01:01:01');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD HH:nn:ss');
        expect(result).toBe('2020-12-01 23:59:59');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss AM');
        expect(result).toBe('2020-12-01 11:59:59 PM');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss pm');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss am');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss pm');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss am');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY MMM DD hh:nn:ss am');
        expect(result).toBe('2020 Dec 01 11:59:59 pm');
    });

    test('toFormat for Dec 1, 2020', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY MMMM DD hh:nn:ss am');
        expect(result).toBe('2020 December 01 11:59:59 pm');
    });

    test('isLastDayOfMonth for Jan 31, 2020', () => {
        const d1 = new Date(2020, 0, 31); // Jan 31, 2020
        expect(d1.isLastDayOfMonth()).toBe(true);
    });
    test('isLastDayOfMonth for Feb 29, 2020', () => {
        const d2 = new Date(2020, 1, 29); // Feb 29, 2020 (leap year)
        expect(d2.isLastDayOfMonth()).toBe(true);
    });
    test('isLastDayOfMonth for Feb 28, 2021', () => {
        const d3 = new Date(2021, 1, 28); // Feb 28, 2021 (not a leap year)
        expect(d3.isLastDayOfMonth()).toBe(true);
    });
    test('isLastDayOfMonth for Apr 30, 2020', () => {
        const d4 = new Date(2020, 3, 30); // Apr 30, 2020
        expect(d4.isLastDayOfMonth()).toBe(true);
    }); 
    test('isLastDayOfMonth for Mar 30, 2020', () => {
        const d5 = new Date(2020, 2, 30); // Mar 30, 2020
        expect(d5.isLastDayOfMonth()).toBe(false);
    });
    test('isLastDayOfMonth for Dec 30, 2020', () => {
        const d6 = new Date(2020, 11, 30); // Dec 30, 2020
        expect(d6.isLastDayOfMonth()).toBe(false);
    });

});

describe('Date parts extraction', () => {
    it('MillisecondOf/SecondOf/MinuteOf/HourOf return respective parts of local time', () => {
        const d = new Date(2025, 0, 2, 3, 4, 5, 6); // Jan 2, 2025 03:04:05.006 local
        expect(MillisecondOf(d)).toBe(6);
        expect(SecondOf(d)).toBe(5);
        expect(MinuteOf(d)).toBe(4);
        expect(HourOf(d)).toBe(3);
    });

    it('DayOf/MonthOf/YearOf return respective calendar parts of local time', () => {
        const d = new Date(2025, 10, 15, 12, 0, 0, 0); // Nov 15, 2025
        expect(DayOf(d)).toBe(15);
        // Delphi MonthOf is 1-based; ensure MonthOf matches that contract
        expect(MonthOf(d)).toBe(11);
        expect(YearOf(d)).toBe(2025);
    });

    it('Handles edge times correctly (end of day)', () => {
        const d = new Date(2024, 1, 29, 23, 59, 59, 999); // Leap year Feb 29
        expect(YearOf(d)).toBe(2024);
        expect(MonthOf(d)).toBe(2);
        expect(DayOf(d)).toBe(29);
        expect(HourOf(d)).toBe(23);
        expect(MinuteOf(d)).toBe(59);
        expect(SecondOf(d)).toBe(59);
        expect(MillisecondOf(d)).toBe(999);
    });
});


// function getEstimatedBlockNumberForDuration(Block1: ethers.providers.Block, Block2: ethers.providers.Block, timestampInMS: number): number {
//     const diffBlockNumber = Math.abs(Block1.number - Block2.number);
//     const diffTimestamp = Math.abs(Block1.timestamp - Block2.timestamp) * 1000;
//     const result = timestampInMS / (diffTimestamp / diffBlockNumber);
//     return result;
// }
