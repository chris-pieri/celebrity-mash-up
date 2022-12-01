import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from './Context/ThemeContext';
import { VolumeContextProvider } from './Context/VolumeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <VolumeContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </VolumeContextProvider>,
);
