import React, { Fragment, useEffect, useState } from 'react';
import { Box, Fab, AppBar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import CardCustom from '../Container/CardCustom';
import CurrencyPage from "../Routes/CurrencyPage";
import CalendarPage from "../Routes/CalendarPage";


export default function DashboardPage() {
    const [{ token, cardType }, dispatch] = useStateProvider()
  
    const handleBack = () => {
        dispatch({ type: reducerCases.SET_CARD, cardType: null })
    }

    return (
        <Fragment>
            <AppBar></AppBar>
            
            {token &&
                <Box className="dashboard">
                    { cardType==null && <CardCustom /> }
                    { cardType &&  <Fab sx={{ position: 'absolute', left: '1rem', bottom: '1rem' }}
                                        size='small' color="primary"
                                        onClick={handleBack}
                                        aria-label="Back"><HomeIcon /></Fab> }

                    {/* TASK 1 */}
                    { cardType==='Currency' && <CurrencyPage />}

                    {/* TASK 2 */}
                    { cardType==='Calendar' && <CalendarPage /> }
                </Box>
            }
        </Fragment>
    );
}
