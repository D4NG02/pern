import React, { useState, MouseEventHandler } from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { useMutation, useQueryClient } from 'react-query';
import { constantStyle } from '../../Utility/CustomStyle';
import { reducerCases } from '../../Utility/Reducer/Constant';

interface CurrencySchemaType {
    id: number,
    country: string,
    value: number,
}

export default function CurrencyDelete() {
    const [{ token, row, country }, dispatch] = useStateProvider()
    const handlePopUp: MouseEventHandler = () => {
        setIsPopup(true)
    }

    const queryClient = useQueryClient();
    const deleteCurrency = async () => {
        const { data: response } = await fetch('/table/delete/' +row, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        return response;
    };
    // eslint-disable-next-line
    const { mutate, isLoading } = useMutation(
        deleteCurrency,
        {
            onSuccess: (data: any, variables: CurrencySchemaType, context: unknown) => {
                alert("Deleted Currency")
            },
            onError: (error: any, variables: CurrencySchemaType, context: unknown) => {
                if (error.status === 403 && error.statusText === "Forbidden") {
                    sessionStorage.removeItem("token");
                    dispatch({ type: reducerCases.SET_TOKEN, token: null })
                    dispatch({ type: reducerCases.SET_CARD, cardType: null })
                } else {
                    console.log(error)
                }
            },
            onSettled: () => { }
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
                        <Button color='warning' variant='contained' onClick={handleCancel}>Cancel</Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
