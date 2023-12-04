import { Fragment } from 'react';
import { Box, IconButton, AppBar, Container, Toolbar, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query'

import CADIT from "../Asset/CADIT.png";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

import { useStateProvider } from '../Utility/Reducer/StateProvider';
import { reducerCases } from '../Utility/Reducer/Constant';
import { constantStyle } from '../Utility/CustomStyle';
import { initialState } from '../Utility/Reducer/reducer'
import CardCustom from '../Container/CardCustom';
import { client } from '../Container/MQTTChat/MQTTHook';
import CurrencyPage from "../Routes/CurrencyPage";
import CalendarPage from "../Routes/CalendarPage";
import MachinePage from './MachinePage';
import ChatPage from './ChatPage';


export default function DashboardPage() {
    const [{ token, user_id, user_name, cardType, chatTopicNotRead, chatListTopic }, dispatch] = useStateProvider()


    // Subscribe the all user id as topic
    let users_id: string[]=[]
    if (!users_id.includes(String(user_id))) {
        users_id.push(String(user_id))
    }
    const insertUserID = (topic: string) => {
        if (!users_id.includes(topic)) {
            users_id.push(topic)
        }
    }
    const setTopicNotRead = (topic: string) => {
        if (!Object.hasOwn(chatTopicNotRead, topic)) {
            Object.defineProperty(chatTopicNotRead, topic, {
                value: 0,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    };
    const { status, fetchStatus, data: data } = useQuery({
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
            insertUserID(topic)
        })

        // set topic
        users_id?.map((user: any, index: number, users: string[]) => {
            if (index !== users.length-1) {
                let topic1 = user +"to"+ users[index +1]
                let topic2 = users[index +1] +"to"+ user
                if (!chatListTopic.includes(topic1) && !chatListTopic.includes(topic2)) {
                    chatListTopic.push(topic1, topic2)
                    setTopicNotRead(topic1)
                    setTopicNotRead(topic2)
                }
            } else {
                let topic1 = user +"to"+ users[0]
                let topic2 = users[0] +"to"+ user
                if (!chatListTopic.includes(topic1) && !chatListTopic.includes(topic2)) {
                    chatListTopic.push(topic1, topic2)
                    setTopicNotRead(topic1)
                    setTopicNotRead(topic2)
                }
            }
        })
        // subscript topic
        chatListTopic?.map((topic: any, index: number, topics: string[]) => {
            client.subscribe(topic)
        })
    }


    const handleBack = () => {
        dispatch({ type: reducerCases.SET_CARD, cardType: initialState.cardType })
        dispatch({ type: reducerCases.SET_CHATS, chats: initialState.chats })
        dispatch({ type: reducerCases.SET_CHAT_SELECTION_USER_ID, chatSelectedUserId: initialState.chatSelectedUserId })
        dispatch({ type: reducerCases.SET_CHAT_TOPIC_NOT_READ, chatTopicNotRead: new Object })
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user_name");
        sessionStorage.removeItem("user_id");
        dispatch({ type: reducerCases.SET_TOKEN, token: null })
        dispatch({ type: reducerCases.SET_USER_ID, user_id: null })
        dispatch({ type: reducerCases.SET_USER_NAME, user_name: null })
        dispatch({ type: reducerCases.SET_CARD, cardType: initialState.cardType })
        dispatch({ type: reducerCases.SET_CHATS, chats: initialState.chats })
        dispatch({ type: reducerCases.SET_CHAT_SELECTION_USER_ID, chatSelectedUserId: initialState.chatSelectedUserId })
        dispatch({ type: reducerCases.SET_CHAT_TOPIC_NOT_READ, chatTopicNotRead: new Object })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{  display: 'flex', justifyContent: 'space-between',
                bgcolor: 'white', boxShadow: 'unset', padding: '4px 24px',
                '& img': { height: '2.6em' }
            }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <img src={CADIT} alt="CADI-IT Logo" />
                    {cardType &&
                        <IconButton sx={{ color: 'gray', 'svg': { width: '1.2em', height: '1.2em' } }}
                            size='large' onClick={handleBack} aria-label="Back">
                            <HomeIcon />
                        </IconButton>
                    }
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ fontSize: '1rem', padding: '0 8px', color: constantStyle.color_primary }}>{user_name}</Typography>
                    <IconButton sx={{ color: 'gray', 'svg': { width: '1.2em', height: '1.2em' } }}
                        size='large' onClick={handleLogout} aria-label="Logout">
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Box>

            {cardType &&
                <Box sx={{ bgcolor: constantStyle.color_primary, paddingY: '4px' }}>
                    <Typography textAlign='center' variant="h6" color='white'>{cardType}</Typography>
                </Box>
            }
            
            <Box sx={{ padding: '16px 24px' }}>
                {cardType == null && <CardCustom />}

                {/* TASK 1 */}
                {cardType === 'Currency' && <CurrencyPage />}

                {/* TASK 2 */}
                {cardType === 'Calendar' && <CalendarPage />}

                {/* TASK 3 */}
                {cardType === 'Machine Utilization' && <MachinePage />}

                {/* TASK 4 */}
                {cardType === 'Chat' && <ChatPage />}
            </Box>
        </Box>
    );
}
