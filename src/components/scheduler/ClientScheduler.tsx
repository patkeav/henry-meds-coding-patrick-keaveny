import { useState } from 'react';
import {
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

function ClientScheduler({ providerData }: { providerData: Provider[] }) {
  const [providers] = useState(providerData);

  const handleClick = (p: Provider, dateIndex: number, slotIndex: number) => {
    console.log(p, dateIndex, slotIndex);
    console.log(p.schedule[dateIndex].slots[slotIndex]);
  };

  return (
    <div className="clients">
      <Grid container spacing={2}>
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
                        <ListItemText primary={s.toLocaleTimeString()} secondary={'Available'} />
                        <ListItemIcon>
                          <AddCircleOutlineIcon />
                          Reserve
                        </ListItemIcon>
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
