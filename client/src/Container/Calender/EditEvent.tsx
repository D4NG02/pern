import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Box, Button, FormLabel, IconButton, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import UpdateIcon from '@mui/icons-material/Update';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { inputSchema, inputSchemaType } from './ConstantEvent';
import DeleteEvent from "./DeleteEvent";

export default function EditEvent() {
  const [{ token, eventID, eventDate, eventTitle, eventNote, eventPrio }, dispatch] = useStateProvider()
  const queryClient = useQueryClient();
  const updateEvent = async (data: inputSchemaType) => {
    const { data: response } = await fetch('/event/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    return response;
  };
  // eslint-disable-next-line
  const { mutate, isLoading } = useMutation(
    updateEvent,
    {
      onSuccess: (data: any, variables: inputSchemaType, context: unknown) => {
        alert("Updated")
      },
      onError: (error: any, variables: inputSchemaType, context: unknown) => {
        alert("Has error")
      },
      onSettled: () => {
        queryClient.invalidateQueries('create')
      }
    }
  );
  


  const { register, handleSubmit, reset, formState: { errors }, } = useForm<inputSchemaType>({ resolver: zodResolver(inputSchema) })
  const handleUpdate: SubmitHandler<inputSchemaType> = (input) => {
    const newEvent = { ...input, eventTitle, eventNote, eventID, eventDate, eventPrio };
    mutate(newEvent);
    reset()
    
    clearReducer()
    handleClose()
  }
  const handleClose = () => {
    dispatch({ type: reducerCases.SET_IS_EVENT_EDIT, popupEventEdit: false })
  }
  const clearReducer = () =>  {
    dispatch({ type: reducerCases.SET_IS_EVENT_ADD, popupEventAdd: false })
    dispatch({ type: reducerCases.SET_EVENT_DATE, eventDate: null })
    dispatch({ type: reducerCases.SET_EVENT_ID, eventID: null })
    dispatch({ type: reducerCases.SET_EVENT_TITLE, eventTitle: null })
    dispatch({ type: reducerCases.SET_EVENT_NOTE, eventNote: null })
    dispatch({ type: reducerCases.SET_EVENT_PRIO, eventPrio: null })
  }
  const handlePriority = (event: SelectChangeEvent) => {
    dispatch({ type: reducerCases.SET_EVENT_PRIO, eventPrio: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>

      <Box sx={{ position: 'relative', pb: 2, display: 'flex', alignItems: 'baseline' }}>
        <FormLabel sx={{ pr: 1, color: 'white' }} disabled>Date</FormLabel>
        <TextField size="small" sx={{ width: '100px', textAlign: 'center' }} variant="standard"
                  value={eventDate} disabled hiddenLabel />

        <IconButton sx={{ position: 'absolute', right: 0 }} onClick={handleClose}><CloseIcon /></IconButton>
      </Box>

      <Box pb={2}>
        <FormLabel sx={{ color: 'white' }}>Title</FormLabel>
        <TextField sx={{ '& .MuiInputBase-root': {bgcolor: 'white'} }} value={eventTitle} size="small" fullWidth
                  label={errors.title?.message} color={errors.title? "error": 'primary'}
                  {...register('title', {
                    setValueAs: (value) => {
                      dispatch({ type: reducerCases.SET_EVENT_TITLE, eventTitle: value })
                      return eventTitle
                    },
                  })} />
      </Box>

      <Box pb={2}>
        <FormLabel sx={{ color: 'white' }}>Note</FormLabel>
        <TextField sx={{ '& .MuiInputBase-root': {bgcolor: 'white'} }} multiline minRows={4} maxRows={4}
                  value={eventNote} size="small"
                  fullWidth label={errors.note?.message} color={errors.note? "error": 'primary'}
                  {...register('note', {
                    setValueAs: (value) => {
                      dispatch({ type: reducerCases.SET_EVENT_NOTE, eventNote: value })
                      return eventNote
                    },
                  })} />
      </Box>

      <Box sx={{ pb: 2, display: 'flex', alignItems: 'baseline' }}>
        <FormLabel sx={{ pr: 2, color: 'white' }}>Priority:</FormLabel>
        <Select size="small" sx={{ width: 1/3, bgcolor: 'white' }} value={eventPrio} onChange={handlePriority}>
          <MenuItem value={1}>High</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Low</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100' }}>
        <Button color="info" variant='contained' type="submit" startIcon={<UpdateIcon />}>Update</Button>
        <DeleteEvent />
      </Box>
    </form>
  );
}
