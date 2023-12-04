import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { constantStyle } from '../../Utility/CustomStyle';
import { reducerCases } from '../../Utility/Reducer/Constant';
import MachineSites from './MachineSites';
import MachinePlant from './MachinePlants';
import MachineDepartments from './MachineDepartments';
import MachineWorkcenters from './MachineWorkcenters';
import MachineWorkstation from './MachineWorkstation';

export default function MachineFilter() {
  const [{ machineFilterWorkstation, machineFilterDate }, dispatch] = useStateProvider()
  const [selectDate, setSelectDate] = useState<Dayjs | null>(dayjs(machineFilterDate.from));

  const handleSearch = async() => {
    let workStationTag = machineFilterWorkstation
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKSTATIONS, machineFilterWorkstation: 0 })
    
    setTimeout(() => {
      dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKSTATIONS, machineFilterWorkstation: workStationTag })
    }, 2);
  }

  const filterDate = (selectedDate: any) => {
    setSelectDate(selectedDate)
    let day = selectedDate?.date()
    let month = selectedDate?.month() ? selectedDate?.month() + 1 : 0
    let year = selectedDate?.year()
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_DATE, machineFilterDate: {"from": year + '-' + month + '-' + day, "to": year + '-' + (month) + '-' + (day+1)} })
  }

  return (
    <>
      <Stack spacing='4px' direction='row' useFlexGap flexWrap="wrap" paddingBottom={1}>
        <FilterAltIcon sx={{ fontSize: '2em' }} />
        <MachineSites />
        <MachinePlant />
        <MachineDepartments />
        <MachineWorkcenters />
        <MachineWorkstation />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']} sx={{ paddingTop: 'unset' }}>
            <DatePicker sx={{ minWidth: '160px', '.MuiInputBase': { '&-root': { color: 'white', bgcolor: constantStyle.color_primary } },
                              'input': { padding: '6px 8px', fontSize: '14px' },
                              'button': { color: 'white' },
                              'svg': { fontSize: '16px' },
                              '&.MuiTextField-root': { minWidth: '140px', width: '140px' }
                        }}
                        views={['year', 'month', 'day']} disableFuture={true}
                        value={selectDate} onChange={filterDate} format='YYYY-MM-DD' />
          </DemoContainer>
        </LocalizationProvider>

        <Button size='small' sx={{ height: '32px', padding: '0 12px' }} onClick={handleSearch} startIcon={<SearchIcon />}>Search</Button>
      </Stack>
    </>
  );
}

