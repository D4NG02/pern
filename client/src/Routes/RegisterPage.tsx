import { Box, IconButton, Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import { Fragment, useState } from 'react';
import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';

export const registerSchema = z.object({
    user_name: z.string().min(4, { message: 'User ID must 4 or more characters' }),
    password: z.string().min(4, { message: 'Password must 4 or more characters' }),
    position: z.string(),
    country: z.string(),
});
export type registerSchemaType = z.infer<typeof registerSchema>;

export default function RegisterPage(props: { user_id: string }) {
    const [userID, setUserID] = useState(props.user_id)
    const [labelUserName, setLabelUserName] = useState('Name')
    const [labelPassword, setLabelPassword] = useState('Password')
    const [labelPosition, setLabelPosition] = useState('Position')
    const [labelCountry, setLabelCountry] = useState('Country')

    const [{ user_name, user_id, token }, dispatch] = useStateProvider()

    const queryClient = useQueryClient();
    const userRegister = async (data: registerSchemaType) => {
        const { data: response } = await axios.post('/auth/register', data);
        return response;
    };
    // eslint-disable-next-line
    const { data, mutate, isLoading, isSuccess } = useMutation(
        userRegister,
        {
            onSuccess: (data: any, variables: registerSchemaType, context: unknown) => {
                console.log(data)
                dispatch({ type: reducerCases.SET_TOKEN, token: data.token })
                dispatch({ type: reducerCases.SET_USER_ID, user_id: data.user_id })
                dispatch({ type: reducerCases.SET_USER_NAME, user_name: data.user_name })
                
                sessionStorage.setItem("token", data.token);
                reset();
            },
            onError: (error: any, variables: registerSchemaType, context: unknown) => {
            },
            onSettled: () => {
                queryClient.invalidateQueries('create')
            }
        }
    );

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<registerSchemaType>({ resolver: zodResolver(registerSchema) })
    const onSubmit: SubmitHandler<registerSchemaType> = (input) => {
        let user_id = Number(userID)
        const userRegister = { ...input, user_id };

        mutate(userRegister);
    }

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Fragment>
            {!token &&
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Box sx={{ width: '50vw', border: '1px solid ' +constantStyle.color_primary, borderRadius: 2 }}>
                        <Typography variant='h5' sx={{ padding: 2, borderTopLeftRadius: '8px', borderTopRightRadius: '8px', bgcolor: constantStyle.color_primary }}>Register</Typography>
                        <Box p={3}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl sx={{ paddingBottom: 3 }} size='small' variant="outlined" fullWidth>
                                    <TextField size="small" value={userID} onChange={(e)=>{ setUserID(e.target.value) }} />
                                </FormControl>
                                <FormControl sx={{ paddingBottom: 3 }} size='small' variant="outlined" fullWidth>
                                    <TextField size="small"
                                        label={errors.user_name?.message? errors.user_name?.message : labelUserName}
                                        color={errors.user_name ? "error" : 'primary'}
                                        {...register('user_name')} />
                                </FormControl>

                                <FormControl sx={{ paddingBottom: 3 }} size='small' variant="outlined" fullWidth>
                                    <InputLabel color={errors.password ? "error" : 'primary'}
                                                htmlFor="outlined-adornment-password">
                                        {errors.password?.message? errors.password?.message : labelPassword}
                                    </InputLabel>
                                    <OutlinedInput {...register('password')}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => { setShowPassword(true) }}
                                                    onMouseDown={() => { setShowPassword(false) }}
                                                    edge="end"
                                                    >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label={errors.password?.message? errors.password?.message : labelPassword}
                                        color={errors.password ? "error" : 'primary'}
                                        />
                                </FormControl>

                                <FormControl sx={{ paddingBottom: 3 }} size='small' variant="outlined" fullWidth>
                                    <TextField size="small"
                                        label={errors.position?.message? errors.position?.message : labelPosition}
                                        color={errors.position ? "error" : 'primary'}
                                        {...register('position')} />
                                </FormControl>

                                <FormControl sx={{ paddingBottom: 3 }} size='small' variant="outlined" fullWidth>
                                    <TextField size="small"
                                        label={errors.country?.message? errors.country?.message : labelCountry}
                                        color={errors.country ? "error" : 'primary'}
                                        {...register('country')} />
                                </FormControl>

                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100' }}>
                                    <Button color="primary" variant='contained' type="submit" startIcon={<HowToRegIcon />}>Register</Button>
                                    {/* <Button color="info" variant='outlined' type="button" onClick={handleCancel} startIcon={<CloseIcon />}>Cancel</Button> */}
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            }
        </Fragment>
    );
}
