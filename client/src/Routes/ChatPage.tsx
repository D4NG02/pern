import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';

import { constantStyle } from '../Utility/CustomStyle';
import ChatUser from '../Container/MQTTChat/ChatUser';
import ChatList from '../Container/MQTTChat/ChatList';
import ChatForm from '../Container/MQTTChat/ChatForm';
import { client } from '../Container/MQTTChat/MQTTHook';
import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';


export default function ChatPage() {
    const [{ token, user_id, chats, chatListTopic, chatTopicNotRead }, dispatch] = useStateProvider()

    client.on("message", (topic, message) => {
        chatListTopic.map((topicLoop: string, index: number, topics: string[]) => {
            if (topic == topicLoop) {
                let messageString: string = message.toString()

                for (const [key, value] of Object.entries(chatTopicNotRead)) {
                    if (topic === key && String(user_id) !== key) {
                        chatTopicNotRead[key] = chatTopicNotRead[key] + 1
                    }
                }
                
                dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, messageString] })
                dispatch({ type: reducerCases.SET_CHAT_TOPIC_NOT_READ, chatTopicNotRead: { ...chatTopicNotRead } })
            }
        })
    });

    return (
        <Box sx={{ height: '80vh', display: 'grid', gridTemplateColumns: '14% auto', gap: 3, padding: '16px 0' }}>
            <ChatUser />
            <Box sx={{
                border: '1px solid ' + constantStyle.color_primary, borderRadius: 2,
                display: 'grid', gridTemplateRows: '74.4vh max-content'
            }}>
                <ChatList />
                <ChatForm />
            </Box>
        </Box>
    );
}
