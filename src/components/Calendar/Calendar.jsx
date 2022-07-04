import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import s from '../Calendar/Calendar.module.css'
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from 'react-redux'
import {ModalCalendarVisible} from "../../redux/actions"




export default function Calendar() {

    const events = []
    const dispatch = useDispatch()
    const {AllEvents} = useSelector(state => state)
    // console.log('eventos:',AllEvents)

  // console.log('eventos:',AllEvents)

  function handleDateClick(arg) {
    dispatch(ModalCalendarVisible(true,arg.dateStr));
    }

  return (
    <div className={s.calendar}>
{
        AllEvents?.map((e) => {
          events.push({ title: e.name, date: e.schedule.split('T')[0], })
        })
      }

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        selectable={true}
        selectHelper={true}
        events={events}
      />
    </div>
  )
}

