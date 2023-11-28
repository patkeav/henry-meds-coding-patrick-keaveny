
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import dayjs from 'dayjs'
import { useCallback, useMemo, useState } from 'react';

import moment from 'moment'

const localizer = momentLocalizer(moment)

function Scheduler() {
    // const [ events, setEvents ] = useState<any[]>([])

    const [myEvents, setEvents] = useState([{}])

    const handleSelectSlot = useCallback(
      ({ start, end }: {start: any, end: any}) => {
        const title = window.prompt('New Event name')
        if (title) {
          setEvents((prev) => [...prev, { start, end, title }])
        }
      },
      [setEvents]
    )
  
    const handleSelectEvent = useCallback(
      (event: any) => window.alert(event.title),
      []
    )
  
    const { defaultDate, scrollToTime } = useMemo(
      () => ({
        defaultDate: new Date(2015, 3, 12),
        scrollToTime: new Date(1970, 1, 1, 6),
      }),
      []
    )
    return (
      <div className="scheduler">
        <Calendar
            defaultDate={defaultDate}
            defaultView={Views.WEEK}
            events={myEvents}
            localizer={localizer}
            longPressThreshold={10}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            scrollToTime={scrollToTime}
            />
      </div>
    );
  }
  
  export default Scheduler;