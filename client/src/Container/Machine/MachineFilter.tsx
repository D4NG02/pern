import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useMutation, useQueryClient } from 'react-query';
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
import { FetchGetOptions } from './MachineConstant';


const inputSchema = z.object({
  id: z.number(),
});
type inputSchemaType = z.infer<typeof inputSchema>;

export default function MachineFilter() {
  const [{ machineFilterPlant, machineFilterDepartment, machineFilterWorkcenter, machineFilterWorkstation, machineFilterDate }, dispatch] = useStateProvider()
  const [selectDate, setSelectDate] = useState<Dayjs | null>(dayjs(machineFilterDate));
  const { options } = FetchGetOptions()

  const getTransaction = async (data: inputSchemaType) => {
    const { data: response } = await fetch("/machine/assets/" + data.id, options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 403 && response.statusText === "Forbidden") {
          sessionStorage.removeItem("token");
          dispatch({ type: reducerCases.SET_TOKEN, token: null })
          dispatch({ type: reducerCases.SET_CARD, cardType: null })
        } else {
          console.log(response)
        }
      })
    return response;
  };
  // eslint-disable-next-line
  const { mutate, isLoading } = useMutation(
    getTransaction,
    {
      onSuccess: (data: any, variables: inputSchemaType, context: unknown) => {
        console.log(data)
      },
      onError: (error: any, variables: inputSchemaType, context: unknown) => {
        if (error.status === 403 && error.statusText === "Forbidden") {
          sessionStorage.removeItem("token");
          dispatch({ type: reducerCases.SET_TOKEN, token: null })
          dispatch({ type: reducerCases.SET_CARD, cardType: null })
        } else {
          console.log(error)
        }
      },
      onSettled: () => { }
    }
  );
  const handleSearch = () => {
    // use date to get transaction
    const data = { id: machineFilterWorkstation };
  }

  const filterDate = (selectedDate: any) => {
    setSelectDate(selectedDate)
    let day = selectedDate?.date()
    let month = selectedDate?.month() ? selectedDate?.month() + 1 : 0
    let year = selectedDate?.year()
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_DATE, machineFilterDate: year + '-' + month + '-' + day })
    dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: [] })
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

