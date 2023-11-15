import React, { useState, MouseEventHandler } from 'react';
import axios from "axios";
import { Box, Button, Dialog, Typography } from '@mui/material';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { useMutation, useQueryClient } from 'react-query';
import { constantStyle } from '../../Utility/CustomStyle';
import { reducerCases } from '../../Utility/Reducer/Constant';

interface Currency {
    id: number,
    country: string,
    value: number,
}

export default function CurrencyDelete() {
    const [{ row, country }, dispatch] = useStateProvider()
    const handlePopUp: MouseEventHandler = () => {
        setIsPopup(true)
    }

    const queryClient = useQueryClient();
    const deleteCurrency = async () => {
        const { data: response } = await axios.delete('/table/delete/' + row);
        return response.data;
    };
    // eslint-disable-next-line
    const { mutate, isLoading } = useMutation(
        deleteCurrency,
        {
            onSuccess: (data: any, variables: Currency, context: unknown) => {
                alert("Deleted Currency")
            },
            onError: () => {
                alert("there was an error")
            },
            onSettled: () => {
                queryClient.invalidateQueries('create')
            }
        }
    );

    // Pop up UX
    const [isPopup, setIsPopup] = useState(false)
    const handleDelete = () => {
        setIsPopup(false);

        dispatch({ type: reducerCases.SET_ROW, row: null })
        dispatch({ type: reducerCases.SET_COUNTRY, country: '' })
        mutate({ id: row, country: country, value: 0 });
    }
    const handleCancel = () => {
        setIsPopup(false)

        dispatch({ type: reducerCases.SET_ROW, row: null })
        dispatch({ type: reducerCases.SET_COUNTRY, country: '' })
    }

    return (
        <>
            <Button variant='contained' color='warning' type="button" onClick={handlePopUp}>Delete</Button>
            
            <Dialog open={isPopup} disableEscapeKeyDown={true}>
                <Box sx={{ textAlign: 'center', padding: '1rem', bgcolor: constantStyle.color_primary, color: constantStyle.color_on_primary }}>
                    <Typography component='h5' variant='h5' sx={{ paddingBottom: '1rem'}}>Are you sure?</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <Button variant='outlined' onClick={handleDelete}>Confirm</Button>
                        <Button variant='outlined' onClick={handleCancel}>Cancel</Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
