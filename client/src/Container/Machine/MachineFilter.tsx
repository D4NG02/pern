import $ from "jquery"
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import {
  DatePickerToolbar,
  DatePickerToolbarProps,
} from '@mui/x-date-pickers/DatePicker';

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { constantStyle } from '../../Utility/CustomStyle';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { initialState } from '../../Utility/Reducer/reducer';
import MachineSites from './MachineSites';
import MachinePlant from './MachinePlants';
import { FetchGetOptions } from './MachineConstant';
import MachineDepartments from './MachineDepartments';
import MachineWorkcenters from './MachineWorkcenters';
import MachineWorkstation from './MachineWorkstation';
import { PickersModalDialog } from '@mui/x-date-pickers/internals';

declare global {
  interface Window { handleSearch: any; }
}

export default function MachineFilter() {
  const [{ machineFilterWorkstation, machineFilterDate, machineFilterAsset, machineFilterSearch }, dispatch] = useStateProvider()
  const [selectDate, setSelectDate] = useState<Dayjs | null>(dayjs(machineFilterDate.from));
  const { options } = FetchGetOptions()


  const { status, fetchStatus, data: assets } = useQuery({
    queryFn: async () => await fetch("/machine/assets/" + machineFilterWorkstation, options)
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
      }),
    queryKey: ["machine_assets"],
    enabled: machineFilterSearch,
  })

  window.handleSearch = async () => {
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_ASSETS, machineFilterAsset: assets })
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_PAGE, machineFilterPage: initialState.machineFilterPage })
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_SEARCH, machineFilterSearch: false })
  }

  const handleSearch = async () => {
    let workStationTag = machineFilterWorkstation
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKSTATIONS, machineFilterWorkstation: 0 })
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_ASSETS, machineFilterAsset: assets })
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_PAGE, machineFilterPage: initialState.machineFilterPage })
    
    setTimeout(() => {
      dispatch({ type: reducerCases.SET_MACHINE_FILTER_WORKSTATIONS, machineFilterWorkstation: workStationTag })
    }, 200);
  }

  const filterDate = (selectedDate: any) => {
    setSelectDate(selectedDate)
    let day = selectedDate?.date()
    let month = selectedDate?.month() ? selectedDate?.month() + 1 : 0
    let year = selectedDate?.year()
    dispatch({ type: reducerCases.SET_MACHINE_FILTER_DATE, machineFilterDate: { "from": year + '-' + month + '-' + day, "to": year + '-' + (month) + '-' + (day + 1) } })
  }


  const CustomActionBar = (props: PickersActionBarProps) => {
    const { onAccept, onClear, onCancel, onSetToday, actions, className } = props;
    return (<></>)
  }
  const CustomToolbar = (props: DatePickerToolbarProps<Dayjs>) => {
    return (<></>)
  }

  return (
    <>
      <Stack spacing="18px" direction='row' useFlexGap flexWrap="wrap" paddingBottom={1}>
        <FilterAltIcon sx={{ fontSize: '2em' }} />
        <MachineSites />
        <MachinePlant />
        <MachineDepartments />
        <MachineWorkcenters />
        <MachineWorkstation />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']} sx={{ paddingTop: 'unset' }}>
            <MobileDatePicker sx={{
              '.MuiInputBase': { '&-root': { color: 'white', bgcolor: constantStyle.color_primary } },
              'input': { padding: '6px 8px', fontSize: '14px' },
              'svg': { fontSize: '16px' },
              '&.MuiTextField-root': { minWidth: '120px', width: '120px', textAlign: 'center' },
            }}
              views={['year', 'month', 'day']} disableFuture={true} closeOnSelect={true}
              value={selectDate} onChange={filterDate} format='DD-MMM-YYYY'
              slots={{
                actionBar: CustomActionBar,
                toolbar: CustomToolbar,
              }}
              />
          </DemoContainer>
        </LocalizationProvider>

        <Button variant="outlined" size='small' onClick={handleSearch}
            sx={{ fontWeight: 'bold', height: '32px', padding: '0 16px', border: '3px solid '+constantStyle.color_primary, color: constantStyle.color_primary,
                  '&:hover': { border: '3px solid '+constantStyle.color_primary, color: constantStyle.color_primary } }}>
          Search</Button>
      </Stack>
    </>
  );
}

