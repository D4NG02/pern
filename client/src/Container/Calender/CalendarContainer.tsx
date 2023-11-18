import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Chip, Modal, Typography } from '@mui/material';
import { EventClickArg, EventContentArg, EventHoveringArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react';
import dayGridPligin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';

export default function CalendarContainer() {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
  };
  // eslint-disable-next-line
  const { data, isLoading } = useQuery({
    queryFn: async () => await fetch("/event/gets", options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      }).catch((err) => {
        return err
      }),
    queryKey: "getsEvent"
  })




  const [{ popupEventAdd, popupEventEdit, popupEventHover }, dispatch] = useStateProvider()
  // add event
  const handleDateClick = (info: any) => {
    dispatch({ type: reducerCases.SET_EVENT_DATE, eventDate: info.dateStr })
    dispatch({ type: reducerCases.SET_IS_EVENT_ADD, popupEventAdd: true })
  }
  // click on event
  const handleEventClick = (clickInfo: EventClickArg) => {
    const { event_id, note, priority } = clickInfo.event.extendedProps
    const date = clickInfo.event.startStr
    const title = clickInfo.event.title

    // clickInfo.event.remove()

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
  // render all event
  const renderEventContent = (eventContent: EventContentArg) => {
    // eslint-disable-next-line
    const { event_id, note, priority } = eventContent.event.extendedProps

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
      <FullCalendar plugins={[dayGridPligin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: 'prev,today,next',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={data}

              businessHours={true}

              firstDay={1}
              // aspectRatio={1}

              fixedWeekCount={false}
              // showNonCurrentDates={false}

              eventOrder={'priority'}

              dayMaxEvents={2}

              selectable={true}
              dateClick={handleDateClick}

              eventClick={handleEventClick}
              eventMouseEnter={handleEventHoverIn}
              eventMouseLeave={handleEventHoverOut}
              eventContent={renderEventContent} />



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
