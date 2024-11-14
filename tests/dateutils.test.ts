import { DiffDuration, fromBlockchainTimestamp, JSDateAddDays, JSDateAddMins, JSDateAddYears } from "../src/dateutils";


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
    test('Date.addMinutes(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addMinutes(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_MIN);
    });
    test('Date.addHours(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addHours(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_HOUR);
    });
    test('Date.addDays(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addDays(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_DAY);
    });
    test('Date.addWeeks(1)', () => {
        const now = new Date(1990, 1, 1, 0, 0, 0);
        const newDate = now.addWeeks(1);
        expect(newDate.getTime()).toEqual(now.getTime() + ONE_WEEK);
    });
    test('Date.addMonths(1)', () => {
        const now = new Date(1990, 0, 1, 0, 0, 0);
        const newDate = now.addMonths(1);
        const duration = DiffDuration(newDate, now);
        expect(duration.months).toEqual(1);
    });
    test('Date.addYears(1)', () => {
        const now = new Date(1990, 0, 1, 0, 0, 0);
        const newDate = now.addYears(1);
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

    test('toFormat for Date 1', () => {
        const d = new Date(2020, 0, 1, 1, 1, 1, 1);
        const result = d.toFormat('YYYY-MM-DD HH:nn:ss');
        expect(result).toBe('2020-01-01 01:01:01');
    });

    test('toFormat for Date 2', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD HH:nn:ss');
        expect(result).toBe('2020-12-01 23:59:59');
    });

    test('toFormat for Date 3', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss AM');
        expect(result).toBe('2020-12-01 11:59:59 PM');
    });

    test('toFormat for Date 3', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss pm');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

    test('toFormat for Date 4', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss am');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

    test('toFormat for Date 5', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss pm');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

    test('toFormat for Date 6', () => {
        const d = new Date(2020, 11, 1, 23, 59, 59);
        const result = d.toFormat('YYYY-MM-DD hh:nn:ss am');
        expect(result).toBe('2020-12-01 11:59:59 pm');
    });

});

// function getEstimatedBlockNumberForDuration(Block1: ethers.providers.Block, Block2: ethers.providers.Block, timestampInMS: number): number {
//     const diffBlockNumber = Math.abs(Block1.number - Block2.number);
//     const diffTimestamp = Math.abs(Block1.timestamp - Block2.timestamp) * 1000;
//     const result = timestampInMS / (diffTimestamp / diffBlockNumber);
//     return result;
// }
