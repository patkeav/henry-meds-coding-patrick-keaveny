import { useState } from 'react';
import './App.css';
import PROVIDERS from './api/providers.const';
import ProviderScheduler from './components/scheduler/ProviderScheduler';
import ClientScheduler from './components/scheduler/ClientScheduler';
import { Box, Button } from '@mui/material';

function App() {
  const [currentView, setCurrentView] = useState('providers');
  const [providers] = useState(PROVIDERS.get());

  return (
    <div className="App">
      <Box sx={{ my: 4 }}>
        <Button
          variant={currentView === 'providers' ? 'contained' : 'text'}
          onClick={() => setCurrentView('providers')}>
          Provider View
        </Button>
        <Button
          variant={currentView === 'clients' ? 'contained' : 'text'}
          onClick={() => setCurrentView('clients')}>
          Client View
        </Button>
      </Box>
      <Box sx={{ mt: 6 }}>
        {currentView === 'providers' && <ProviderScheduler providerData={providers} />}
        {currentView === 'clients' && <ClientScheduler providerData={providers} />}
      </Box>
    </div>
  );
}

export default App;
