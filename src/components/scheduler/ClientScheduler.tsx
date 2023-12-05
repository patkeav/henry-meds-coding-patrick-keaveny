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
import { Reservation } from '../../models/Reservation.model';
import { Slot } from '../../models/Slot.model';

function ClientScheduler({ providerData }: { providerData: Provider[] }) {
  const [providers, setProviders] = useState(providerData);
  const [pendingReservations, setPendingReservations] = useState<Reservation[]>([]);

  /**
   * Handles when a user clicks the + Reserve button
   *
   * Updates the Providers and Pending Reservations states with the relevant data
   * Starts a 30 minute timer for the reservation
   *
   * @param p
   * @param dateIndex
   * @param slotIndex
   */
  const handleClick = async (p: Provider, dateIndex: number, slotIndex: number) => {
    const newProviders = providers;
    const index = newProviders.findIndex((provider) => provider.id === p.id);
    newProviders[index].schedule[dateIndex].slots[slotIndex].reserved = true;
    setProviders([...newProviders]);
    setPendingReservations([
      ...pendingReservations,
      {
        provider: p.name,
        slot: newProviders[index].schedule[dateIndex].slots[slotIndex],
        started: new Date().toLocaleString(),
        remaining: 30 * 60 * 1000, // 30 minute interval
      },
    ]);
  };

  /**
   * Helper method to determine if the given date is within one day of now, in which case it can not be reserved
   * @param d
   * @returns
   */
  const isWithinOneDay = (d: Date) => {
    const today = new Date().getTime() + 24 * 60 * 60 * 1000;
    const slotDay = d.getTime();
    return today < slotDay;
  };

  /**
   * Helper method to determine if a slot is unavailable
   * @param slot
   * @returns
   */
  const isUnavailable = (slot: Slot) => {
    const { date, reserved, confirmed } = slot;
    return !isWithinOneDay(date) && !reserved && !confirmed;
  };

  /**
   * Helper method to confirm a reservation in the state array
   * @param index
   */
  const setIsConfirmed = (index: number) => {
    const newReservations = pendingReservations;
    newReservations[index].slot.confirmed = true;
    setPendingReservations([...newReservations]);
  };

  /**
   * Helper method to format the slot appointment so it's readable
   * @param slot
   */
  const formatSlotAppointment = (slot: Slot) => ` ${slot.date.toLocaleDateString()} at ${slot.date.toLocaleTimeString()} `

  /**
   * React hook to set the timer interval
   *
   * For each second, remove 1 second from the reservation's time remaining
   * If the time remaining from the reservation is below 0, remove it from the state array
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setPendingReservations((previous) =>
        previous
          .filter((r) => r.remaining > 0)
          .map((r) => {
            if (r.slot.confirmed) {
              return r;
            } else {
              return { ...r, remaining: r.remaining - 1000 };
            }
          }),
      );
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {}, [pendingReservations])

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
                    <ListSubheader disableSticky>
                      {!p.slot.confirmed ? (
                        <>
                          Pending reservation with {p.provider} on
                          {formatSlotAppointment(p.slot)}
                        </>
                      ) : (
                        <strong>
                          Reservation with {p.provider} on {formatSlotAppointment(p.slot)} 
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
                          disabled={isUnavailable(s) || s.reserved}>
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
