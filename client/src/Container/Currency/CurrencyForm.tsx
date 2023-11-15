import axios from "axios";
import { Button, FormLabel, TextField } from "@mui/material"

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"

import { useMutation, useQueryClient } from 'react-query';

import { useStateProvider } from "../../Utility/Reducer/StateProvider";
import { reducerCases } from "../../Utility/Reducer/Constant";
import CurrencyDelete from "./CurrencyDelete";

const inputSchema = z.object({
    country: z.string({
        required_error: "Country is required",
        invalid_type_error: "Country must be a string",
      }).min(4, { message: 'Must 4 or more characters' }),

      
    // input for value is string
    value: z.string({
        required_error: "Value is required",
        invalid_type_error: "Value must be a number",
      }).min(4, { message: 'Must 4 or more digits' }),
});
type inputSchemaType = z.infer<typeof inputSchema>;

export default function CurrencyForm() {

    // Add Api
    const queryClient = useQueryClient();
    const addCurrency = async (data: inputSchemaType) => {
        const { data: response } = await axios.post('/table/add', data);
        return response.data;
    };
    // eslint-disable-next-line
    const { mutate, isLoading } = useMutation(
        addCurrency,
        {
            onSuccess: (data: any, variables: inputSchemaType, context: unknown) => {
                alert("Added New Currency")
            },
            onError: () => {
                alert("Has error")
            },
            onSettled: () => {
                queryClient.invalidateQueries('create')
            }
        }
    );


    // Submit ux
    // eslint-disable-next-line
    const [{ row, country }, dispatch] = useStateProvider()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<inputSchemaType>({ resolver: zodResolver(inputSchema) })
    const onSubmit: SubmitHandler<inputSchemaType> = (input) => {
        const addCurrency = { ...input };
        mutate(addCurrency);
        reset()

        dispatch({ type: reducerCases.SET_ROW, row: null })
        dispatch({ type: reducerCases.SET_COUNTRY, country: '' })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FormLabel sx={{ marginTop: '14px' }}>Country:</FormLabel>
                <TextField  size="small"
                            variant="standard"
                            label={errors.country?.message}
                            color={errors.country? "error": 'primary'}
                            {...register("country")} />

                <FormLabel sx={{ marginTop: '14px' }}>Value:</FormLabel>
                <TextField  size="small"
                            inputProps={{ type: 'number' }}
                            variant="standard"
                            label={errors.value?.message}
                            color={errors.value? "error": 'primary'}
                            {...register("value")} />

                <Button variant='contained' type="submit">Add</Button>
                <CurrencyDelete />
            </form>
        </>
    )
}