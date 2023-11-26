import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button, Stack } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { constantStyle } from '../../Utility/CustomStyle';

import Asset1 from "../../Asset/Asset1.jpg";
import Asset2 from "../../Asset/Asset2.jpg";
import Asset3 from "../../Asset/Asset3.jpg";
import Asset4 from "../../Asset/Asset4.jpg";
import Asset5 from "../../Asset/Asset5.jpg";
import Asset6 from "../../Asset/Asset6.jpg";
import Asset7 from "../../Asset/Asset7.jpg";
import Asset8 from "../../Asset/Asset8.jpg";
import Asset9 from "../../Asset/Asset9.jpg";
import Asset10 from "../../Asset/Asset10.jpg";
import { reducerCases } from '../../Utility/Reducer/Constant';
import MachineSites from './MachineSites';
import MachinePlant from './MachinePlants';
import MachineDepartments from './MachineDepartments';
import MachineWorkcenters from './MachineWorkcenters';
import MachineWorkstation from './MachineWorkstation';

export default function MachineFilter() {
  const [{ token, machineFilterWorkstation, machineFilterDate }, dispatch] = useStateProvider()
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
      <Stack spacing={1} direction='row' useFlexGap flexWrap="wrap">
        <Box><FilterAltIcon sx={{ fontSize: '2em' }} /></Box>
        <MachineSites />
        <MachinePlant />
        <MachineDepartments />
        <MachineWorkcenters />
        <MachineWorkstation />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']} sx={{ paddingTop: 'unset' }}>
            <DatePicker sx={{
              minWidth: '160px', '.MuiInputBase': { '&-root': { color: 'white', bgcolor: constantStyle.color_primary } },
              'input': { padding: '6px 8px', fontSize: '14px' },
              'button': { color: 'white' },
              'svg': { fontSize: '16px' },
              '&.MuiTextField-root': { minWidth: '140px', width: '140px' }
            }} views={['year', 'month', 'day']} disableFuture={true}
              value={selectDate} onChange={filterDate} />
          </DemoContainer>
        </LocalizationProvider>

        <Button size='small' sx={{ height: '32px', padding: '0 12px' }} onClick={handleSearch} startIcon={<SearchIcon />}>Search</Button>
      </Stack>
    </>
  );
}

