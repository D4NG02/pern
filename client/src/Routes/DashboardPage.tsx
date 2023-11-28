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
import LogoutIcon from '@mui/icons-material/Logout';

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';
import CardCustom from '../Container/CardCustom';
import CurrencyPage from "../Routes/CurrencyPage";
import CalendarPage from "../Routes/CalendarPage";
import MachinePage from './MachinePage';
import ChatPage from './ChatPage';
import { initialState } from '../Utility/Reducer/reducer'


export default function DashboardPage() {
    const queryClient = new QueryClient()
    const [{ user_name, cardType }, dispatch] = useStateProvider()
  
    const handleBack = () => {
        dispatch({ type: reducerCases.SET_CARD, cardType: initialState.cardType })
    }
  
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        dispatch({ type: reducerCases.SET_TOKEN, token: initialState.token })
        dispatch({ type: reducerCases.SET_USER_ID, user_id: initialState.user_id })
        dispatch({ type: reducerCases.SET_USER_NAME, user_name: initialState.user_name })
        dispatch({ type: reducerCases.SET_CARD, cardType: initialState.cardType })
    }

    return (
        <Fragment>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{ bgcolor: 'white', boxShadow: 'unset', justifyContent: 'space-between',
                            'img': { height: '2.6em'} }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <img src={CADIT} alt="CADI-IT Logo" />
                        { cardType &&  
                            <IconButton sx={{ color: 'gray', 'svg': { width: '1.2em', height: '1.2em' } }}
                                    size='large' onClick={handleBack} aria-label="Back">
                                <HomeIcon />
                            </IconButton>
                        }
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ fontSize: '1rem', padding: '0 8px', color: constantStyle.color_primary }}>{user_name}</Typography>
                        <IconButton sx={{ color: 'gray', 'svg': { width: '1.2em', height: '1.2em' } }}
                                size='large' onClick={handleLogout} aria-label="Logout">
                            <LogoutIcon />
                        </IconButton>
                    </Box>
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

                    {/* TASK 4 */}
                    { cardType==='Chat' && 
                        <ChatPage />
                    }
                </Box>
            </Box>
        </Fragment>
    );
}
