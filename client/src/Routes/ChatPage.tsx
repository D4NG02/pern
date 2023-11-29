import React from 'react';
import { Box } from '@mui/material';

import { constantStyle } from '../Utility/CustomStyle';
import ChatUser from '../Container/MQTTChat/ChatUser';
import ChatList from '../Container/MQTTChat/ChatList';
import ChatForm from '../Container/MQTTChat/ChatForm';


export default function ChatPage() {
    return (
        <Box sx={{ height: '80vh', display: 'grid', gridTemplateColumns: '14% auto', gap: 3, padding: '16px 0' }}>
            <ChatUser />
            <Box sx={{ border: '1px solid ' +constantStyle.color_primary, borderRadius: 2,
                        display: 'grid', gridTemplateRows: 'auto max-content' }}>
                <ChatList />
                <ChatForm />
            </Box>
        </Box>
    );
}
