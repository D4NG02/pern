
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
    const [{ user_id, chatSelectedUserId }, dispatch] = useStateProvider()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<chatSchemaType>({ resolver: zodResolver(chatSchema) })
    const onSubmit: SubmitHandler<chatSchemaType> = (input) => {
        const topic = String(user_id) +"to"+ String(chatSelectedUserId)
        const sentChat = { ...input };
        const timestamp = new Date().toTimeString().split(' GMT')[0]
        const fullData = topic +'_'+ timestamp +'_'+ sentChat.chat

        client.publish(topic, fullData);
        reset()
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: 'auto max-content' }}>
                <TextField size="small" placeholder='Type...' variant="outlined"
                    sx={{ 'div': { borderRadius: 0, borderBottomLeftRadius: '8px' } }}
                    label={errors.chat?.message} disabled={chatSelectedUserId==null? true:false}
                    color={errors.chat ? "error" : 'primary'}
                    {...register("chat")} />

                <Button variant='contained' type="submit" disabled={chatSelectedUserId==null? true:false}
                    sx={{ height: '40px', borderRadius: 0, borderBottomRightRadius: '8px' }}>Sent</Button>
            </form>
        </Box>
    );
}
