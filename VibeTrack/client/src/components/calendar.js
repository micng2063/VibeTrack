import { useState } from 'react';
import Calendar from 'react-calendar';
import '../css/calendar.css';
import 'react-calendar/dist/Calendar.css';

function getSunday(date) {
  const day = date.getDay();
  const diff = 7 - day; // adjust for the next Sunday
  const nextSunday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
  return nextSunday;
}

function EventCalendar() {
  const today = new Date();
  const sunday = getSunday(today);

  const [date, setDate] = useState([today, sunday]);

  return (
    <div className="calendar-component">
      <div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
        />
      </div>
    </div>
  );
}

export default EventCalendar;
