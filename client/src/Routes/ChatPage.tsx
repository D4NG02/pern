import React from 'react';
import { Box } from '@mui/material';
import ChatUser from '../Container/MQTTChat/ChatUser';
import ChatList from '../Container/MQTTChat/ChatList';
import ChatForm from '../Container/MQTTChat/ChatForm';


export default function ChatPage() {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '20% auto', gap: 3 }}>
            <ChatUser />
            <Box>
                <ChatList />
                <ChatForm />
            </Box>
        </Box>
    );
}
