import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';

import { constantStyle } from '../Utility/CustomStyle';
import ChatUser from '../Container/MQTTChat/ChatUser';
import ChatList from '../Container/MQTTChat/ChatList';
import ChatForm from '../Container/MQTTChat/ChatForm';
import { client, listTopic } from '../Container/MQTTChat/MQTTHook';
import { toSubscribeTopic } from '../Container/MQTTChat/MQTTHook';
import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';


export default function ChatPage() {
    const [{ token, user_id, chats, chatTopicNotRead }, dispatch] = useStateProvider()
    toSubscribeTopic(String(user_id))

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    };
    const { status, fetchStatus, data } = useQuery({
        queryFn: async () => await fetch("/auth/users/" + user_id, options)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else if (response.status === 403 && response.statusText === "Forbidden") {
                    sessionStorage.removeItem("token");
                    dispatch({ type: reducerCases.SET_TOKEN, token: null })
                    dispatch({ type: reducerCases.SET_CARD, cardType: null })
                } else {
                    console.log(response)
                }
            }),
        queryKey: ["Users"]
    })
    if (status == 'success') {
        data?.map((user: any, index: number, users: string[]) => {
            let topic = String(user.user_id)
            toSubscribeTopic(topic)
            if (!Object.hasOwn(chatTopicNotRead, topic)) {
                Object.defineProperty(chatTopicNotRead, topic, {
                    value: 0,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
        })
    }

    client.on("message", (topic, message) => {
        listTopic.map((topicLoop: string, index: number, topics: string[]) => {
            if (topic == topicLoop) {
                let messageString: string = message.toString()
                dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, messageString] })

                for (const [key, value] of Object.entries(chatTopicNotRead)) {
                    if (topic === key && String(user_id) !== key) {
                        chatTopicNotRead[key] = chatTopicNotRead[key] + 1
                    }
                }
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
