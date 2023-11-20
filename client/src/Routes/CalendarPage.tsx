import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Chip, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { WeekCalculation, WeekGrouping, LastDayOfWeek, LastMonthOfYear, RetailCalendarFactory } from 'retail-calendar'

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';
import FilterEvent from '../Container/Calender/FilterEvent';
import AddEvent from '../Container/Calender/AddEvent';
import EditEvent from '../Container/Calender/EditEvent';
import { createCalendarConst, dayList } from '../Container/Calender/ConstantEvent';

export default function CalendarPage() {
  const [{ token, popupEventAdd, popupEventEdit, popupEventHover, eventFilterMonth, eventFilterYear }, dispatch] = useStateProvider()
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
  };
  // eslint-disable-next-line
  const { data, isLoading } = useQuery({
    queryFn: async () => await fetch("/event/gets", options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 403 && response.statusText === "Forbidden") {
          sessionStorage.removeItem("token");
          dispatch({ type: reducerCases.SET_TOKEN, token: null })
          dispatch({ type: reducerCases.SET_CARD, cardType: null })
        }
      }),
    queryKey: "getsEvent",
  })


  // render all event
  // const renderEventContent = (eventContent) => {
  //   return (
  //     <>
  //       { priority===1 && <Chip sx={{ cursor: 'pointer' }} color='error' label={eventContent.event.title} /> }
  //       { priority===2 && <Chip sx={{ cursor: 'pointer' }} color='warning' label={eventContent.event.title} /> }
  //       { priority===3 && <Chip sx={{ cursor: 'pointer' }} color='success' label={eventContent.event.title} /> }
  //     </>
  //   )
  // }


  const { numberOfWeeks, startDayAtColumn, lastDay, dayArray } = createCalendarConst(eventFilterYear, eventFilterMonth)
  console.log({ numberOfWeeks, startDayAtColumn, lastDay, dayArray })

  const CustomCalendar = () => {

    return (
      <Fragment>
        {numberOfWeeks == 5 &&
          [1, 2, 3, 4, 5].map((value: number, index: number, array: number[]) => {
            return (
              <TableRow key={index}>
                <Week week={value} />
              </TableRow>
            )
          })
        }
        {numberOfWeeks == 4 &&
          [1, 2, 3, 4].map((value: number, index: number, array: number[]) => {
            return (
              <TableRow key={index}>
                {/* <Week week={value} /> */}
              </TableRow>
            )
          })
        }
      </Fragment>
    )
  }

  const Week = (props: { week: number }) => {

    return (
      <>
        {props.week==1 &&
          [1, 2, 3, 4, 5, 6, 7].map((value: number, index: number, array: number[]) => {
            if(value>=startDayAtColumn){
              return (<TableCell key={index}>{dayArray.pop()}</TableCell>)
            } else {
              return (<TableCell key={index}></TableCell>)
            }
          })
        }
        {props.week!==1 &&
          [1, 2, 3, 4, 5, 6, 7].map((value: number, index: number, array: number[]) => {
            return (<TableCell key={index}>{dayArray.pop()}</TableCell>)
          })
        }
      </>
    )
  }


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Box sx={{ width: '50vw' }}>
        <FilterEvent />

        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              {dayList.map((value: string, index: number, array: string[]) => {
                return (
                  <TableCell key={index}>{array[index]}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomCalendar />
          </TableBody>
        </Table>
      </Box>



      {/* Popup for Adding new */}
      <Modal open={popupEventAdd}>
        <Box sx={{ margin: '20vh 20vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ height: '60vh', width: '60vw', padding: '2rem', bgcolor: constantStyle.color_primary, borderRadius: 2, boxShadow: 4 }}>
            <AddEvent />
          </Box>
        </Box>
      </Modal>

      {/* Popup for Update/Delete */}
      <Modal open={popupEventEdit}>
        <Box sx={{ margin: '20vh 20vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ height: '60vh', width: '60vw', padding: '2rem', bgcolor: constantStyle.color_primary, borderRadius: 2, boxShadow: 4 }}>
            <EditEvent />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
