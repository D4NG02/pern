import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from '@mui/material';
import { CustomComponent } from './Utility/CustomStyle';

import { StateProvider } from './Utility/Reducer/StateProvider';
import reducer, { initialState } from './Utility/Reducer/reducer';

import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement );
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={CustomComponent}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>
);

