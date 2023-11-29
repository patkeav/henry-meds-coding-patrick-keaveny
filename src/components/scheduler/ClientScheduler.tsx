import { useState } from 'react';
import {
  Box,
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
  provider: string;
  slot: any;
}

function ClientScheduler({ providerData }: { providerData: Provider[] }) {
  const [providers, setProviders] = useState(providerData);
  const [pendingReservations, setPendingReservations] = useState<Reservation[]>([]);

  const handleClick = (p: Provider, dateIndex: number, slotIndex: number) => {
    const newProviders = providers;
    const index = newProviders.findIndex((provider) => provider.id === p.id);
    newProviders[index].schedule[dateIndex].slots[slotIndex].reserved = true;
    setProviders([...newProviders]);
    setPendingReservations([
      ...pendingReservations,
      { provider: p.name, slot: newProviders[index].schedule[dateIndex].slots[slotIndex] },
    ]);
  };

  return (
    <div className="clients">
      {pendingReservations.length ? (
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Unconfirmed Reservations
          </Typography>

          <Grid container spacing={3}>
            {pendingReservations.map((p, index) => (
              <Grid item xs={6} key={index}>
                Provider appointment on {p.slot.date.toLocaleTimeString()} with {p.provider}
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : null}
      <Grid container spacing={2} className="available-slots">
        {providers.map((p) => (
          <Grid item xs={12} key={p.id}>
            <Typography variant="h6">{p.name}</Typography>
            {p.schedule.length
              ? p.schedule.map((s, index) => (
                  <List dense={true} key={index}>
                    <ListSubheader>{s.date}</ListSubheader>

                    {s.slots.map((s, i) => (
                      <ListItemButton
                        key={i}
                        alignItems="flex-start"
                        onClick={() => handleClick(p, index, i)}>
                        <ListItemText
                          primary={s.date.toLocaleTimeString()}
                          secondary={s.reserved ? 'Unavailable' : 'Available'}
                        />
                        {!s.reserved ? (
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
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ClientScheduler;
