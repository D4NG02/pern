import { Box, FormControl, FormLabel, MenuItem, Select } from '@mui/material';

import { Calendar } from '@fullcalendar/core'
import { createCalendarConst, inputDateFilterSchema, inputDateFilterSchemaType, monthList, monthListType, yearList } from './ConstantEvent';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';

export default function FilterEvent() {
    const [{ eventFilterMonth, eventFilterYear }, dispatch] = useStateProvider()
    const { numberOfWeeks, startDayAtColumn, lastDay, dayArray } = createCalendarConst(eventFilterYear, eventFilterMonth)

    // var fullcalendar = new Calendar(calendarEl, {
    //     timeZone: 'local',
    //     initialDate: new Date(2018, 8, 1)
    // })
    const handleMonth = (e: any) => {
        console.log({ numberOfWeeks, startDayAtColumn, lastDay, dayArray })
        dispatch({ type: reducerCases.SET_EVENT_FILTER_MONTH, eventFilterMonth: e.target.value })
    }

    const handleYear = (e: any) => {
        dispatch({ type: reducerCases.SET_EVENT_FILTER_YEAR, eventFilterYear: e.target.value })
    }

    return (
        <Box sx={{ display: 'flex', pb: 2 }}>
            <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pr: 2 }}>
                <FormLabel sx={{ pr: 1 }}>Month</FormLabel>
                <Select sx={{   'div': { padding: '0 14px', paddingRight: '14px' },
                                'svg': { position: 'relative', right: 'unset', top: 'unset', color: 'white',
                                        bgcolor: constantStyle.color_primary, borderRadius: 1 } }}
                        value={eventFilterMonth} onChange={handleMonth}>
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>February</MenuItem>
                    <MenuItem value={3}>March</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>July</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormLabel sx={{ pr: 1 }}>Year</FormLabel>
                <Select sx={{   'div': { padding: '0 14px', paddingRight: '14px' },
                                'svg': { position: 'relative', right: 'unset', top: 'unset', color: 'white',
                                        bgcolor: constantStyle.color_primary, borderRadius: 1 } }}
                        value={eventFilterYear} onChange={handleYear}>
                    {yearList.map((value: number, index: number, array: number[]) => {
                        return (
                            <MenuItem key={index} value={array[index]}>{array[index]}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
