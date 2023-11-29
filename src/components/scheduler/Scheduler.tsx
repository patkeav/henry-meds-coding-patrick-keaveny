import { useCallback, useEffect, useMemo, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import './Scheduler.css';
import { DateSelectArg } from '@fullcalendar/core';
import PROVIDERS from '../../api/providers.const';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Provider } from '../../models/Provider.model';

function Scheduler() {
  const [events, setEvents] = useState<any[]>([]);
  const [providers] = useState(PROVIDERS.get());
  const [currentProvider, setCurrentProvider] = useState<Provider>(providers[0]);

  const handleEventClick = (data: DateSelectArg) => {
    console.log(data);
    setEvents([
      ...events,
      {
        name: currentProvider,
        backgroundColor: getEventColor(currentProvider),
        title: `${currentProvider.name} Available`,
        ...data,
      },
    ]);
    console.table(events);
  };

  const isCurrentProvider = (p: Provider) => {
    return currentProvider.name === p.name;
  };

  const getEventColor = (p: Provider) => {
    switch (p.id) {
      case 1:
        return '#1565c0';
      case 2:
        return '#7b1fa2';
      case 3:
        return '#01589c';
      case 4:
        return '#1b5e20';
      default:
        return '#3788d8';
    }
  };

  return (
    <div className="scheduler">
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        eventContent={renderEventContent}
        select={handleEventClick}
      />
      <Box className="providers">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" className="providers-heading">
            Submit schedule for:
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {providers.map((p) => (
            <Grid key={p.id} item xs={12} md={6}>
              <Button
                variant={isCurrentProvider(p) ? 'contained' : 'text'}
                color={p.variant}
                onClick={() => setCurrentProvider(p)}>
                {p.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo: any) {
  console.log(eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <br />
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Scheduler;
