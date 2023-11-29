import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { Provider } from '../../models/Provider.model';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Reservation {
  uid: number;
  provider: string;
  slot: any;
  remaining: number;
  started: string;
}

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

function ClientScheduler({ providerData }: { providerData: Provider[] }) {
  const [providers, setProviders] = useState(providerData);
  const [pendingReservations, setPendingReservations] = useState<Reservation[]>([]);

  const handleClick = async (p: Provider, dateIndex: number, slotIndex: number) => {
    const newProviders = providers;
    const index = newProviders.findIndex((provider) => provider.id === p.id);
    newProviders[index].schedule[dateIndex].slots[slotIndex].reserved = true;
    const uid = Math.floor(1000 + Math.random() * 9000);
    setProviders([...newProviders]);
    setPendingReservations([
      ...pendingReservations,
      {
        uid,
        provider: p.name,
        slot: newProviders[index].schedule[dateIndex].slots[slotIndex],
        started: new Date().toLocaleString(),
        remaining: 30 * 60 * 1000, // 30 minute interval
      },
    ]);
  };

  const isWithinOneDay = (d: Date) => {
    const today = new Date().getTime() + 24 * 60 * 60 * 1000;
    const slotDay = d.getTime();
    return today < slotDay;
  };

  const isUnavailable = (slot: { date: Date; reserved: boolean; confirmed: boolean }) => {
    const { date, reserved, confirmed } = slot;
    return !isWithinOneDay(date) && !reserved && !confirmed;
  };

  const setIsConfirmed = (index: number) => {
    const newReservations = pendingReservations;
    newReservations[index].slot.confirmed = true;
    setPendingReservations([...newReservations]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.table(pendingReservations);
      setPendingReservations((previous) =>
        previous
          .filter((r) => r.remaining > 0)
          .map((r) => {
            if (r.slot.confirmed) {
              return r;
            } else {
              return { ...r, remaining: r.remaining - 5000 };
            }
          }),
      );
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="client">
      {pendingReservations.length ? (
        <div className="client-reservations">
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Pending Reservations
            </Typography>

            <Grid container spacing={2}>
              {pendingReservations.map((p, index) => (
                <Grid item xs={6} key={index}>
                  <List className="client-reservation">
                    <ListSubheader>
                      {!p.slot.confirmed ? (
                        <>
                          Pending reservation with {p.provider} on
                          {p.slot.date.toLocaleTimeString()}
                        </>
                      ) : (
                        <strong>
                          Reservation with {p.provider} on {p.slot.date.toLocaleTimeString()}
                          Confirmed
                        </strong>
                      )}
                    </ListSubheader>
                    {!p.slot.confirmed ? (
                      <ListItemText>
                        We'll hold this slot for 30 minutes from {p.started}, after that it will be
                        released.
                        <Button onClick={() => setIsConfirmed(index)}>Confirm</Button>
                      </ListItemText>
                    ) : (
                      <ListItemText>
                        <strong>This appointment is confirmed</strong>
                      </ListItemText>
                    )}
                  </List>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      ) : null}
      <Grid container spacing={2} className="available-slots">
        {providers.map((p) => (
          <Grid item xs={6} key={p.id}>
            <Box className="provider-slots">
              <Typography variant="h6">{p.name}</Typography>
              {p.schedule.length
                ? p.schedule.map((s, index) => (
                    <List dense={true} key={index}>
                      <ListSubheader>{s.date}</ListSubheader>

                      {s.slots.map((s, i) => (
                        <ListItemButton
                          key={i}
                          alignItems="flex-start"
                          onClick={() => handleClick(p, index, i)}
                          disabled={isUnavailable(s)}>
                          <ListItemText
                            primary={s.date.toLocaleTimeString()}
                            secondary={isUnavailable(s) ? 'Unavailable' : 'Available'}
                          />
                          {!isUnavailable(s) ? (
                            <ListItemIcon>
                              <AddCircleOutlineIcon />
                              Reserve
                            </ListItemIcon>
                          ) : null}
                        </ListItemButton>
                      ))}
                    </List>
                  ))
                : 'No availability for this provider'}
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ClientScheduler;
