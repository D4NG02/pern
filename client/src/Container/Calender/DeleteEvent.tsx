import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { Box, Button, Modal, Typography } from "@mui/material";

import { useMutation, useQueryClient } from 'react-query';

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';

const inputSchema = z.object({
    eventID: z.number(),
});
type inputSchemaType = z.infer<typeof inputSchema>;

export default function DeleteEvent() {
    const [modal, setModal] = useState(false)
    const [{ token, eventID }, dispatch] = useStateProvider()
    const queryClient = useQueryClient();
    const deleteEvent = async (data: inputSchemaType) => {
        console.log(data)
        const { data: response } = await fetch("/event/delete",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).catch((err) => {
                return err
            })
        return response.data;
    };
    const { mutate, isLoading } = useMutation(
        deleteEvent,
        {
            onSuccess: (data: any, variables: inputSchemaType, context: unknown) => {
                alert("Delete")
            },
            onError: (error: any, variables: inputSchemaType, context: unknown) => {
                console.log(variables)
                // console.log(error)
                // alert("Has error")
            },
            onSettled: () => {
                queryClient.invalidateQueries('create')
            }
        }
    );
    const handleModal = () => {
        setModal(true)
    }
    const handleDelete = () => {
        const deleteEvent: inputSchemaType = { eventID }
        mutate(deleteEvent)
        dispatch({ type: reducerCases.SET_IS_EVENT_EDIT, popupEventEdit: false })
        setModal(false)
    }

    return (
        <>
            <Button color="warning" variant='contained' onClick={handleModal} startIcon={<DeleteIcon />}>Delete</Button>

            <Modal open={modal}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Box sx={{ padding: '1rem', bgcolor: constantStyle.color_base_200, boxShadow: 12 }}>
                        <Typography textAlign='center' fontSize='1.5rem' pb={2}>Delete note?</Typography>

                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Button color="warning" variant='contained' onClick={handleDelete} startIcon={<DeleteIcon />}>Delete</Button>
                            <Button color="info" variant='contained' onClick={()=>{setModal(false)}} startIcon={<CloseIcon />}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
