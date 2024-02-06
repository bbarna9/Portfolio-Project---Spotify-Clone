import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PlayerContextProvider } from './context/Player.jsx';
import { MusicContextProvider } from './context/MusicContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerContextProvider>
      <MusicContextProvider>
        <App />
      </MusicContextProvider>
    </PlayerContextProvider>
  </React.StrictMode>
);
