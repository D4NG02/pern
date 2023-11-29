
import { Box, TextField, Button } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { client } from './MQTTHook';

const chatSchema = z.object({
    chat: z.string().min(1, { message: 'Minimum 1 characters' }),
});
type chatSchemaType = z.infer<typeof chatSchema>;

export default function ChatForm() {
    const [{ user_id }, dispatch] = useStateProvider()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<chatSchemaType>({ resolver: zodResolver(chatSchema) })
    const onSubmit: SubmitHandler<chatSchemaType> = (input) => {
        const sentChat = { ...input };

        client.subscribe(String(user_id), (err) => {
            if (!err) {
                client.publish(String(user_id), sentChat.chat);
                reset()
            }
        })
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: 'auto max-content' }}>
                <TextField size="small" placeholder='Type...' variant="outlined"
                    sx={{ 'div': { borderRadius: 0, borderBottomLeftRadius: '8px' } }}
                    label={errors.chat?.message}
                    color={errors.chat ? "error" : 'primary'}
                    {...register("chat")} />

                <Button variant='contained' type="submit"
                    sx={{ height: '40px', borderRadius: 0, borderBottomRightRadius: '8px' }}>Sent</Button>
            </form>
        </Box>
    );
}
