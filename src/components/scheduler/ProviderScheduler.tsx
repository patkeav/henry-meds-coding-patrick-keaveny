import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import './Scheduler.css';
import { DateSelectArg } from '@fullcalendar/core';
import PROVIDERS from '../../api/providers.const';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Provider } from '../../models/Provider.model';

interface Event extends DateSelectArg {
  name: Provider;
  backgroundColor: string;
  title: string;
}

function ProviderScheduler({ providerData }: { providerData: Provider[] }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [providers] = useState(providerData);
  const [currentProvider, setCurrentProvider] = useState<Provider>(providerData[0]);

  /**
   * Helper method to take the calendar event, split it into 15 minute slots, then add that to the PROVIDERS array
   * @param p
   * @param data
   */
  const updateProviderSchedule = (provider: Provider, data: DateSelectArg) => {
    let interval = 0;
    const slots = (data.end.getTime() - data.start.getTime()) / 1000 / 60 / 15; // get all 15 minute intervals for this event
    for (let i = 0; i < slots; i++) {
      PROVIDERS.set(provider.id, {
        // add 15 minute slots for this provider for this date
        date: data.start.toDateString(),
        slotTime: new Date(data.start.getTime() + interval * 60000),
      });
      interval += 15;
    }
  };

  /**
   * Handles the click from when a user adds an event to the calendar
   *
   * Updates Provider schedule with the calendar event
   * @param data
   */
  const handleEventClick = (data: DateSelectArg) => {
    setEvents([
      ...events,
      {
        name: currentProvider,
        backgroundColor: getEventColor(currentProvider),
        title: `${currentProvider.name} Available`,
        ...data,
      },
    ]);
    updateProviderSchedule(currentProvider, data);
  };

  /**
   * Helper method to determine if the current selected provider is the given provider
   * @param p
   * @returns
   */
  const isCurrentProvider = (provider: Provider) => {
    return currentProvider.name === provider.name;
  };

  /**
   *  Helper method to map providers to colors for use on the calendar
   * @param p
   * @returns
   */
  const getEventColor = (provider: Provider) => {
    switch (provider.id) {
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
    </div>
  );
}

const renderEventContent = (eventInfo: any) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <br />
      <i>{eventInfo.event.title}</i>
    </>
  );
};

export default ProviderScheduler;
