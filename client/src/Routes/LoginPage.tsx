import { Fragment, useState } from 'react';
import { Box, IconButton, Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from 'react-query';
import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';
import RegisterPage from './RegisterPage';

export const loginSchema = z.object({
    user_id: z.string().min(4, { message: 'User ID must 4 or more characters' }),
    password: z.string().min(4, { message: 'Password must 4 or more characters' }),
});
export type loginSchemaType = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [userID, setUserID] = useState('')
    const [ErrorUserID, setErrorUserID] = useState('User ID')
    const [ErrorPassword, setErrorPassword] = useState('Password')

    const [{ wrong_user_id, token }, dispatch] = useStateProvider()

    const queryClient = useQueryClient();
    const userLogin = async (data: loginSchemaType) => {
        const { data: response } = await axios.post('/auth/login', data);
        return response;
    };
    // eslint-disable-next-line
    const { data, mutate, error, isLoading, isSuccess } = useMutation(
        userLogin,
        {
            onSuccess: (data: any, variables: loginSchemaType, context: unknown) => {
                dispatch({ type: reducerCases.SET_TOKEN, token: data.token })
                dispatch({ type: reducerCases.SET_USER_ID, user_id: data.user.rows[0].user_id })
                dispatch({ type: reducerCases.SET_USER_NAME, user_name: data.user.rows[0].username })
                
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user_id", data.user.rows[0].user_id);
                sessionStorage.setItem("user_name", data.user.rows[0].username);
                setErrorUserID("User ID")
                setErrorPassword("Password")
            },
            onError: (error: any, variables: loginSchemaType, context: unknown) => {
                console.log(error, variables)
                setErrorUserID("User ID")
                setErrorPassword("Password")
                if(error.response.data.message === "Wrong user id") {
                    dispatch({ type: reducerCases.SET_IS_USER_ID, wrong_user_id: true })
                } else if(error.response.data.message === "Wrong password") {
                    setErrorPassword(error.response.data.message)
                }
            },
        }
    );

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) })
    const onSubmit: SubmitHandler<loginSchemaType> = (input) => {
        const userLogin = { ...input };
        setUserID(userLogin.user_id)

        mutate(userLogin);
        reset();
    }

    const handleCancel = () => {
    }
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Fragment>
            {!token && !wrong_user_id &&
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Box sx={{ width: '50vw', border: '1px solid ' +constantStyle.color_primary, borderRadius: 2 }}>
                        <Typography variant='h5' sx={{ padding: 2, borderTopLeftRadius: '8px', borderTopRightRadius: '8px', bgcolor: constantStyle.color_primary }}>Login</Typography>
                        <Box p={3}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl sx={{ paddingBottom: 3 }} size='small' variant="outlined" fullWidth>
                                    <TextField size="small"
                                        label={errors.user_id?.message? errors.user_id?.message : ErrorUserID}
                                        color={errors.user_id ? "error" : 'primary'}
                                        {...register('user_id')} />
                                </FormControl>

                                <FormControl sx={{ paddingBottom: 3 }} size='small' variant="outlined" fullWidth>
                                    <InputLabel color={errors.password ? "error" : 'primary'}
                                                htmlFor="outlined-adornment-password">
                                        {errors.password?.message? errors.password?.message : ErrorPassword}
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
                                        label={errors.password?.message? errors.password?.message : ErrorPassword}
                                        color={errors.password ? "error" : 'primary'}
                                        />
                                </FormControl>


                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100' }}>
                                    <Button color="primary" variant='contained' type="submit" startIcon={<LoginIcon />}>Login</Button>
                                    <Button color="info" variant='contained' type="button" onClick={handleCancel} startIcon={<CloseIcon />}>Cancel</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            }

            {wrong_user_id && <RegisterPage user_id={userID} />}
        </Fragment>
    );
}
