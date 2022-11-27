import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { VolumeContextProvider } from './Context/VolumeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VolumeContextProvider>
      <App />
    </VolumeContextProvider>
  </React.StrictMode>,
);
