import axios from "axios";
import { useState } from "react";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"

import { useMutation, useQueryClient } from 'react-query';

import { Box, Button, FormLabel, MenuItem, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useStateProvider } from "../../Utility/Reducer/StateProvider";
import { reducerCases } from "../../Utility/Reducer/Constant";
import { inputSchema, inputSchemaType } from "./ConstantEvent";

export default function AddEvent() {
  const queryClient = useQueryClient();
  const addEvent = async (data: inputSchemaType) => {
    const { data: response } = await axios.post('/event/add', data);
    return response.data;
  };
  // eslint-disable-next-line
  const { mutate, isLoading } = useMutation(
    addEvent,
    {
      onSuccess: (data: any, variables: inputSchemaType, context: unknown) => {
        alert("Added New Event")
      },
      onError: () => {
        alert("Has error")
      },
      onSettled: () => {
        queryClient.invalidateQueries('create')
      }
    }
  );

  const [{ eventDate, eventPrio }, dispatch] = useStateProvider()
  const { register, handleSubmit, reset, formState: { errors }, } = useForm<inputSchemaType>({ resolver: zodResolver(inputSchema) })
  const onSubmit: SubmitHandler<inputSchemaType> = (input) => {
    const newEvent = { ...input, eventDate, eventPrio };
    mutate(newEvent);
    reset()

    dispatch({ type: reducerCases.SET_EVENT_TITLE, eventTitle: newEvent.title })
    dispatch({ type: reducerCases.SET_EVENT_NOTE, eventNote: newEvent.note })

    setTimeout(()=>{
      handleCancel()
    }, 1000)
  }
  const handleCancel = () => {
    dispatch({ type: reducerCases.SET_IS_EVENT_ADD, popupEventAdd: false })
    dispatch({ type: reducerCases.SET_EVENT_DATE, eventDate: null })
    dispatch({ type: reducerCases.SET_EVENT_ID, eventID: null })
    dispatch({ type: reducerCases.SET_EVENT_TITLE, eventTitle: null })
    dispatch({ type: reducerCases.SET_EVENT_NOTE, eventNote: null })
    dispatch({ type: reducerCases.SET_EVENT_PRIO, eventPrio: null })
  }

  const [prio, setprio] = useState('');
  const handlePriority = (event: SelectChangeEvent) => {
    setprio(event.target.value as string);
    dispatch({ type: reducerCases.SET_EVENT_PRIO, eventPrio: event.target.value })
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ pb: 2, display: 'flex', alignItems: 'baseline' }}>
        <FormLabel sx={{ pr: 1, color: 'white' }} disabled>Date</FormLabel>
        <TextField size="small" sx={{ width: '100px', textAlign: 'center' }} variant="standard"
                  value={eventDate} disabled hiddenLabel />
      </Box>

      <Box pb={2}>
        <FormLabel sx={{ color: 'white' }}>Title</FormLabel>
        <TextField sx={{ '& .MuiInputBase-root': {bgcolor: 'white'} }} size="small"  fullWidth 
                  label={errors.title?.message}
                  color={errors.title? "error": 'primary'}
                  {...register('title')} />
      </Box>

      <Box pb={2}>
        <FormLabel sx={{ color: 'white' }}>Note</FormLabel>
        <TextField sx={{ '& .MuiInputBase-root': {bgcolor: 'white'} }} size="small" multiline minRows={4} maxRows={4} fullWidth 
                  label={errors.note?.message}
                  color={errors.note? "error": 'primary'}
                  {...register('note')} />
      </Box>

      <Box sx={{ pb: 2, display: 'flex', alignItems: 'baseline' }}>
        <FormLabel sx={{ pr: 2, color: 'white' }}>Priority:</FormLabel>
        <Select size="small" sx={{ width: 1/3, bgcolor: 'white' }} value={prio} onChange={handlePriority}>
          <MenuItem value={1}>High</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Low</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100' }}>
        <Button color="secondary" variant='contained' type="submit" startIcon={<AddIcon />}>Add</Button>
        <Button color="info" variant='contained' type="button" onClick={handleCancel} startIcon={<CloseIcon />}>Cancel</Button>
      </Box>
    </form>
  );
}
