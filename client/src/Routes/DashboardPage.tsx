import { Fragment } from 'react';
import { Box, IconButton, AppBar, Container, Toolbar, Typography } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

import CADIT from "../Asset/CADIT.png";
import HomeIcon from '@mui/icons-material/Home';

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';
import CardCustom from '../Container/CardCustom';
import CurrencyPage from "../Routes/CurrencyPage";
import CalendarPage from "../Routes/CalendarPage";
import MachinePage from './MachinePage';


export default function DashboardPage() {
    const queryClient = new QueryClient()
    const [{ token, cardType }, dispatch] = useStateProvider()
  
    const handleBack = () => {
        // dispatch({ type: reducerCases.SET_CARD, cardType: null })
        window.location.reload()
    }

    return (
        <Fragment>
            <AppBar sx={{ bgcolor: 'white', boxShadow: 'unset', position: 'relative',
                            'img': { height: '2.6em'} }}>
                <Toolbar>
                    <img src={CADIT} alt="CADI-IT Logo" />
                    { cardType &&  
                        <IconButton sx={{ color: 'gray', 'svg': { width: '1.2em', height: '1.2em' } }}
                                size='large'
                                onClick={handleBack} aria-label="Back">
                            <HomeIcon />
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>

            <Box height='100%'>
                {cardType && <Box sx={{ bgcolor: constantStyle.color_primary, paddingY: '4px' }}>
                    <Typography textAlign='center' variant="h6" color='white'>{cardType}</Typography>
                </Box>}
                
                <Box className="container" sx={{ padding: '10px 24px' }}>
                    { cardType==null && <CardCustom /> }

                    {/* TASK 1 */}
                    { cardType==='Currency' && <CurrencyPage />}

                    {/* TASK 2 */}
                    { cardType==='Calendar' && <CalendarPage /> }

                    {/* TASK 3 */}
                    { cardType==='Machine Utilization' && 
                        <QueryClientProvider client={queryClient}>
                            <MachinePage />
                        </QueryClientProvider>
                    }
                </Box>
            </Box>
        </Fragment>
    );
}
