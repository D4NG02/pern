import $ from "jquery"
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Chip, Modal, Typography } from '@mui/material';
import { EventClickArg, EventContentArg, EventHoveringArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react';
import dayGridPligin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';
import AddEvent from '../Container/Calender/AddEvent';
import EditEvent from '../Container/Calender/EditEvent';

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




  // add event
  const handleDateClick = (info: any) => {
    dispatch({ type: reducerCases.SET_EVENT_DATE, eventDate: info.dateStr })
    // dispatch({ type: reducerCases.SET_IS_EVENT_ADD, popupEventAdd: true })
  }
  // click on event
  const handleEventClick = (clickInfo: EventClickArg) => {
    const { event_id, note, priority } = clickInfo.event.extendedProps
    console.log(clickInfo.event.extendedProps)
    const date = clickInfo.event.startStr
    const title = clickInfo.event.title

    dispatch({ type: reducerCases.SET_EVENT_ID, eventID: event_id })
    dispatch({ type: reducerCases.SET_EVENT_DATE, eventDate: date })
    dispatch({ type: reducerCases.SET_EVENT_TITLE, eventTitle: title })
    dispatch({ type: reducerCases.SET_EVENT_NOTE, eventNote: note })
    dispatch({ type: reducerCases.SET_EVENT_PRIO, eventPrio: priority })
    dispatch({ type: reducerCases.SET_IS_EVENT_EDIT, popupEventEdit: true })
  }
  // click on event
  const [hoverTitle, setHoverTitle] = useState('')
  const [hoverDate, setHoverDate] = useState('')
  const [hoverNote, setHoverNote] = useState('')
  const [hoverPriority, setHoverPriority] = useState('')
  const handleEventHoverIn = (mouseEnterInfo: EventHoveringArg) => {
    setHoverTitle(mouseEnterInfo.event.title)
    setHoverDate(mouseEnterInfo.event.startStr)
    setHoverNote(mouseEnterInfo.event.extendedProps.note)

    let prio = mouseEnterInfo.event.extendedProps.priority
    if (prio===1) {
      setHoverPriority('red')
    } else if (prio===2) {
      setHoverPriority('orange')
    } else {
      setHoverPriority('#2e7d32')
    }
    
    dispatch({ type: reducerCases.SET_IS_EVENT_HOVER, popupEventHover: true })
  }
  const handleEventHoverOut = (mouseEnterInfo: EventHoveringArg) => {
    setHoverTitle('')
    setHoverDate('')
    setHoverNote('')
    setHoverPriority('')
    dispatch({ type: reducerCases.SET_IS_EVENT_HOVER, popupEventHover: false })
  }


  const viewDidMount = (arg: object) => {
    const button = document.createElement("button");
    button.innerHTML = '+'
    button.addEventListener("click", function (event) {
      button.style.backgroundColor = "blue";
      console.log('click')
      dispatch({ type: reducerCases.SET_IS_EVENT_ADD, popupEventAdd: true })
    })
    $(".fc-day:not(.fc-day-disabled) .fc-daygrid-day-top").append(button)
  }

  // render all event
  const renderEventContent = (eventContent: EventContentArg) => {
    // eslint-disable-next-line
    const { event_id, note, priority } = eventContent.event.extendedProps
    let calendar = eventContent.view.calendar

    // calendar.changeView("dayGridMonth", eventFilterYear +"-"+ eventFilterMonth +"-1" )
    // console.log(calendar)

    return (
      <>
        { priority===1 && <Chip sx={{ cursor: 'pointer' }} color='error' label={eventContent.event.title} /> }
        { priority===2 && <Chip sx={{ cursor: 'pointer' }} color='warning' label={eventContent.event.title} /> }
        { priority===3 && <Chip sx={{ cursor: 'pointer' }} color='success' label={eventContent.event.title} /> }
      </>
    )
  }

  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Box sx={{ width: '50vw' }}>
        <FullCalendar plugins={[dayGridPligin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                events={data}

                unselectAuto={true}

                viewDidMount={viewDidMount}

                // businessHours={true}

                firstDay={1}
                // aspectRatio={1}

                fixedWeekCount={false}
                showNonCurrentDates={false}

                eventOrder={'priority'}

                dayMaxEvents={2}

                selectable={true}
                dateClick={handleDateClick}

                eventClick={handleEventClick}
                eventMouseEnter={handleEventHoverIn}
                eventMouseLeave={handleEventHoverOut}
                eventContent={renderEventContent} />
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

      {/* Popup for Mouse Hover */}
      <Box sx={{ width: '20vw' }}>
        {popupEventHover && <Box sx={{ padding: '1rem', bgcolor: hoverPriority?hoverPriority:'white', borderRadius: 2, boxShadow: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <Typography color='white' variant='h6'>{hoverTitle}</Typography>
            <Chip label={hoverDate} />
          </Box>
          <Typography color='white' variant='overline'>{hoverNote}</Typography>
        </Box>}
      </Box>
    </Box>
  );
}