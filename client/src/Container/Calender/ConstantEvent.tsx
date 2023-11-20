import { z } from "zod";
import { WeekCalculation, WeekGrouping, LastDayOfWeek, LastMonthOfYear, RetailCalendarFactory } from 'retail-calendar'

export const inputSchema = z.object({
    title: z.string().min(4, { message: 'Must 4 or more characters' }),
    note: z.string().min(4, { message: 'Must 4 or more characters' }),
    // date: z.string().min(4, { message: 'Must 4 or more characters' }),
    // priority: z.string().min(4, { message: 'Must 4 or more characters' }),
});
export type inputSchemaType = z.infer<typeof inputSchema>;

export const inputDateFilterSchema = z.object({
    month: z.string(),
    year: z.string(),
});
export type inputDateFilterSchemaType = z.infer<typeof inputDateFilterSchema>;







export const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const monthList = [
    { "name": 'January', "value": 0 },
    { "name": 'Febuary', "value": 1 },
    { "name": 'March', "value": 2 },
    { "name": 'April', "value": 3 },
    { "name": 'May', "value": 4 },
    { "name": 'June', "value": 5 },
    { "name": 'July', "value": 6 },
    { "name": 'August', "value": 7 },
    { "name": 'September', "value": 8 },
    { "name": 'October', "value": 9 },
    { "name": 'November', "value": 10 },
    { "name": 'December, "value": 11' }
];
export type monthListType = typeof monthList;
export const yearList = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

export const createCalendarConst = (year: number, month: number) => {
    const calendar = new RetailCalendarFactory(
        {
            weekCalculation: WeekCalculation.LastDayNearestEOM,
            weekGrouping: WeekGrouping.Group454,
            lastDayOfWeek: LastDayOfWeek.Saturday,
            lastMonthOfYear: LastMonthOfYear.January,
        },
        year,
    )

    const numberOfWeeks = calendar.months[month - 1].numberOfWeeks
    let lastDay = Number((new Date(year-1, month, 0)).toString().split(" ")[2])

    let dayArray: number[]=[]
    while (lastDay!==0) {
        dayArray.push(lastDay)
        lastDay=lastDay-1
    }


    let startDayAtColumn = 0
    const startStr = (new Date(year, month-1, 1)).toString().split(" ")[0]
    switch (startStr) {
        case 'Mon':
            startDayAtColumn = 1
            break;
        case 'Tue':
            startDayAtColumn = 2
            break;
        case 'Wed':
            startDayAtColumn = 3
            break;
        case 'Thur':
            startDayAtColumn = 4
            break;
        case 'Fri':
            startDayAtColumn = 5
            break;
        case 'Sat':
            startDayAtColumn = 6
            break;
        case 'Sun':
            startDayAtColumn = 7
            break;
        default:
            break;
    }

    lastDay = Number((new Date(year, month, 0)).toUTCString().split(" ")[1]) +1
    return { numberOfWeeks, startDayAtColumn, lastDay, dayArray }
}