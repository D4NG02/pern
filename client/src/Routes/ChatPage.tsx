import React from 'react';
import { Box } from '@mui/material';

import { constantStyle } from '../Utility/CustomStyle';
import ChatUser from '../Container/MQTTChat/ChatUser';
import ChatList from '../Container/MQTTChat/ChatList';
import ChatForm from '../Container/MQTTChat/ChatForm';
import { subscribeTopic } from '../Container/MQTTChat/MQTTHook';
import { useStateProvider } from '../Utility/Reducer/StateProvider';


export default function ChatPage() {
    const [{ user_id, selected_user_id }, dispatch] = useStateProvider()
    subscribeTopic(String(user_id))
    
    return (
        <Box sx={{ height: '80vh', display: 'grid', gridTemplateColumns: '14% auto', gap: 3, padding: '16px 0' }}>
            <ChatUser />
            <Box sx={{ border: '1px solid ' +constantStyle.color_primary, borderRadius: 2,
                        display: 'grid', gridTemplateRows: '74.4vh max-content' }}>
                {selected_user_id !== null && <ChatList />}
                {selected_user_id !== null && <ChatForm />}
            </Box>
        </Box>
    );
}
