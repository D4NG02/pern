import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider, Typography } from '@mui/material';
import { CustomComponent, constantStyle } from './Utility/CustomStyle';

import { StateProvider } from './Utility/Reducer/StateProvider';
import reducer, { initialState } from './Utility/Reducer/reducer';

import CurrencyTable from './Container/Currency/CurrencyTable';
import CurrencyForm from './Container/Currency/CurrencyForm';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={CustomComponent}>
        <QueryClientProvider client={queryClient}>
          <Typography component='div' variant='body1' sx={{ display: "flex",
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '1rem',
                    border: '2px solid '+constantStyle.color_primary }}>

            <CurrencyTable />
            <CurrencyForm />

          </Typography>
        </QueryClientProvider>
      </ThemeProvider>
    </StateProvider>
  );
}
