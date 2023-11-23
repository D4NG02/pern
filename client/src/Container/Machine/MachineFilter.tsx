import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import readXlsxFile from 'read-excel-file'
import { Box, Button, FormControl, FormLabel, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Excel from "../../Asset/DataTask3.xlsx";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { constantStyle } from '../../Utility/CustomStyle';
import MachineTimeline from './MachineTimeline';

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

export default function MachineFilter() {
  const [{ machineAsset, machineFilterDate }, dispatch] = useStateProvider()
  const [value, setValue] = useState<Dayjs | null>(dayjs(machineFilterDate));

  const DropDown = (props: {
    label: string,
    choice: any[],
    selected: number,
    fx: (e: any) => void
  }) => {

    return (
      <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pr: 2 }}>
        <FormLabel sx={{ pr: 1 }}>{props.label}</FormLabel>
        <Select sx={{
          'div': { padding: '0 14px', paddingRight: '14px' },
          'svg': {
            position: 'relative', right: 'unset', top: 'unset', color: 'white',
            bgcolor: constantStyle.color_primary, borderRadius: 1
          }
        }}
          value={props.selected} onChange={props.fx}>

          <MenuItem disabled value={0}>
            <em>{props.label}</em>
          </MenuItem>
          {props.choice.map((value: any, index: number, array: string[]) => {
            return (<MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>)
          })}
        </Select>
      </FormControl>
    )
  }

  const [sheet, setSheet] = useState(1);
  const [sheetSite, setSheetSite] = useState<any[]>([]);
  const [sheetPlant, setSheetPlant] = useState<any[]>([]);
  const [sheetDepartment, setSheetDepartment] = useState<any[]>([]);
  const [sheetWorkCenter, setSheetWorkCenter] = useState<any[]>([]);
  const [sheetWorkStation, setSheetWorkStation] = useState<any[]>([]);
  const [sheetAsset, setSheetAsset] = useState<any[]>([]);
  const readExcel = () => {
    let data: any[] = []

    fetch(Excel).then(response => response.blob())
      .then(blob => readXlsxFile(blob, { sheet: sheet }))
      .then((rows) => {
        if (sheet == 1) {
          // Site
          rows.forEach((value: any, index: number, array: any[]) => {
            if (index !== 0) {
              let obj: Object = {
                'id': value[0],
                'name': value[1]
              }
              data.push(obj)
            }
          })
          setSheetSite(data)
        } else if (sheet == 2) {
          // Plant
          rows.forEach((value: any, index: number, array: any[]) => {
            if (index !== 0 && value[2] == selectedSite) {
              let obj: Object = {
                'id': value[0],
                'name': value[1],
                'site_id': value[2]
              }
              data.push(obj)
            }
          })
          setSheetPlant(data)
        } else if (sheet == 3) {
          // Department
          rows.forEach((value: any, index: number, array: any[]) => {
            if (index !== 0 && value[2] == selectedPlant) {
              let obj: Object = {
                'id': value[0],
                'name': value[1],
                'plant_id': value[2]
              }
              data.push(obj)
            }
          })
          setSheetDepartment(data)
        } else if (sheet == 4) {
          // Work center
          rows.forEach((value: any, index: number, array: any[]) => {
            if (index !== 0 && value[2] == selectedDepartment) {
              let obj: Object = {
                'id': value[0],
                'name': value[1],
                'department_id': value[2]
              }
              data.push(obj)
            }
          })
          setSheetWorkCenter(data)
        } else if (sheet == 5) {
          // Work station
          rows.forEach((value: any, index: number, array: any[]) => {
            if (index !== 0 && value[2] == selectedWorkCenter) {
              let obj: Object = {
                'id': value[0],
                'name': value[1],
                'center_id': value[2]
              }
              data.push(obj)
            }
          })
          setSheetWorkStation(data)
        } else if (sheet == 6) {
          // Assets
          rows.forEach((value: any, index: number, array: any[]) => {
            if (index !== 0 && value[4] == selectedWorkStation) {
              let obj: Object = {
                'id': value[0],
                'name': value[2],
                'workstation_id': value[4]
              }
              data.push(obj)
            }
          })
          setSheetAsset(data)
          dispatch({ type: reducerCases.SET_ASSET_DATA, machineAsset: data })
          // console.log(data)
        } else if (sheet == 7) {
          // Transaction
          rows.forEach((value: any, index: number, array: any[]) => {
            if (index !== 0) {
              sheetAsset.forEach((asset: any, index: number, array: any[]) => {
                let day = value[1].getDate()
                let month = value[1].getMonth() + 1
                let year = value[1].getFullYear()
                let date = new Date(value[1])
                if ((asset.id == value[0]) && (machineFilterDate == year + '-' + month + '-' + day)) {
                  let obj: Object = {
                    'asset_id': value[0],
                    'timestamp': value[1],
                    'value': value[2],
                  }

                  data.push(obj)
                }
              })
            }
          })
          dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: data })
        }
      })
  }

  const [selectedSite, setSelectedSite] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectedWorkCenter, setSelectedWorkCenter] = useState(0);
  const [selectedWorkStation, setSelectedWorkStation] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState(0);
  // 1. set sheet to read excel
  // 2. set current filter state
  // 3. get sheet
  // 4. set next sheet to read excel for next filter
  // 5. reset next filter state
  // 6. get sheet
  // 7. reset asset & transaction state
  const filterSite = (e: any) => {
    setSheet(1)
    setSelectedSite(e.target.value)
    readExcel()

    setSheet(2)
    setSelectedPlant(0)
    readExcel()
    dispatch({ type: reducerCases.SET_ASSET_DATA, machineAsset: [] })
    dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: [] })
  }
  const filterPlant = (e: any) => {
    setSheet(2)
    setSelectedPlant(e.target.value)
    readExcel()

    setSheet(3)
    setSelectedDepartment(0)
    readExcel()
    dispatch({ type: reducerCases.SET_ASSET_DATA, machineAsset: [] })
    dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: [] })
  }
  const filterDepartment = (e: any) => {
    setSheet(3)
    setSelectedDepartment(e.target.value)
    readExcel()

    setSheet(4)
    setSelectedWorkCenter(0)
    readExcel()
    dispatch({ type: reducerCases.SET_ASSET_DATA, machineAsset: [] })
    dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: [] })
  }
  const filterCenter = (e: any) => {
    setSheet(4)
    setSelectedWorkCenter(e.target.value)
    readExcel()

    setSheet(5)
    setSelectedWorkStation(0)
    readExcel()
    dispatch({ type: reducerCases.SET_ASSET_DATA, machineAsset: [] })
    dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: [] })
  }
  const filterStation = async (e: any) => {
    setSheet(5)
    setSelectedWorkStation(e.target.value)
    let wait = await readExcel()

    setSheet(6)
    setSelectedAsset(selectedWorkStation)
    wait = await readExcel()
    dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: [] })
  }
  const filterDate = (selectedDate: any) => {
    setValue(selectedDate)
    let day = selectedDate?.date()
    let month = selectedDate?.month() ? selectedDate?.month() + 1 : 0
    let year = selectedDate?.year()
    dispatch({ type: reducerCases.SET_TIMELINE_DATE, machineFilterDate: year + '-' + month + '-' + day })
    dispatch({ type: reducerCases.SET_TIMELINE_DATA, machineTimeline: [] })
  }
  const handleSearch = (selectedDate: any) => {
    setSheet(7)
    setSelectedAsset(selectedWorkStation)
    readExcel()
  }

  useEffect(() => {
    readExcel()
  }, [
    sheet,
    selectedSite,
    selectedPlant,
    selectedDepartment,
    selectedWorkCenter,
    selectedWorkStation,
    selectedAsset
  ])

  return (
    <>
      <Stack spacing={1} direction='row' useFlexGap flexWrap="wrap">
        <Box><FilterAltIcon sx={{ fontSize: '2em' }} /></Box>
        <DropDown label='Site' choice={sheetSite} selected={selectedSite} fx={filterSite} />
        <DropDown label='Plant' choice={sheetPlant} selected={selectedPlant} fx={filterPlant} />
        <DropDown label='Department' choice={sheetDepartment} selected={selectedDepartment} fx={filterDepartment} />
        <DropDown label='Work Center' choice={sheetWorkCenter} selected={selectedWorkCenter} fx={filterCenter} />
        <DropDown label='Workstation' choice={sheetWorkStation} selected={selectedWorkStation} fx={filterStation} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']} sx={{ paddingTop: 'unset' }}>
            <DatePicker sx={{
              minWidth: '160px', '.MuiInputBase': { '&-root': { color: 'white', bgcolor: constantStyle.color_primary } },
              'input': { padding: '6px 8px', fontSize: '14px' },
              'button': { color: 'white' },
              'svg': { fontSize: '16px' },
              '&.MuiTextField-root': { minWidth: '140px',  width: '140px' }
            }} views={['year', 'month', 'day']}
              value={value} onChange={filterDate} />
          </DemoContainer>
        </LocalizationProvider>

        <Button size='small' sx={{ height: '32px', padding: '0 12px' }} onClick={handleSearch} startIcon={<SearchIcon />}>Search</Button>
      </Stack>
    </>
  );
}

