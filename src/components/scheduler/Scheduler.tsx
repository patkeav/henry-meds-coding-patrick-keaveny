
import { useCallback, useMemo, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import './Scheduler.css'


const events = [{ title: "Meeting", start: new Date() }];


function Scheduler() {
    // const [ events, setEvents ] = useState<any[]>([])

    return (
        <div className="scheduler">
            <FullCalendar
                plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  initialView='dayGridMonth'
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                events={events}
                eventContent={renderEventContent}
                select={(data) => console.info(data) }
            />
        </div>
    );
}

// a custom render function
function renderEventContent(eventInfo: any) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}

export default Scheduler;
