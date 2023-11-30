import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge, Box, List, ListItemButton, ListItemText } from '@mui/material';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { initialState } from '../../Utility/Reducer/reducer';
import { constantStyle } from '../../Utility/CustomStyle';

export default function ChatUser() {
    const [{ token, user_id, chatSelectedUserId, chats, chatTopicNotRead }, dispatch] = useStateProvider()

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

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        id: number,
    ) => {
        setSelectedIndex(index)
        dispatch({ type: reducerCases.SET_CHAT_SELECTION_USER_ID, chatSelectedUserId: initialState.chatSelectedUserId })

        setTimeout(() => {
            dispatch({ type: reducerCases.SET_CHAT_SELECTION_USER_ID, chatSelectedUserId: id })
        }, 200);
    }

    return (
        <Box sx={{ border: '1px solid ' + constantStyle.color_primary, borderRadius: 2 }}>
            <List sx={{ padding: 0 }}>
                {
                    data?.map((user: any, index: number, users: string[]) => {
                        let newChat=0
                        for (const [key, value] of Object.entries(chatTopicNotRead)) {
                            if (String(user.user_id) == key && String(user.user_id) == chatSelectedUserId) {
                                chatTopicNotRead[key] = newChat = 0
                            } else if (String(user.user_id) == key) {
                                newChat = chatTopicNotRead[key]
                            }
                        }

                        const currentChatArray = chats?.filter((chat: any, index: number, chats: string[]) => {
                            const chunk = chat.split('_')
                            const topic = chunk[0].split('-')[1]
                            if (String(user.user_id) == topic) {
                                return chat
                            }
                        })
                        const currentChat = currentChatArray[currentChatArray.length-1]?.split('data-')[1]
                        
                        return (
                            <ListItemButton key={index}
                                sx={{
                                    borderBottom: '1px solid ' + constantStyle.color_primary,
                                    borderTopLeftRadius: index == 0 ? '8px' : 'unset',
                                    borderTopRightRadius: index == 0 ? '8px' : 'unset',
                                    padding: '4px 8px'
                                }}
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index, user.user_id)}>
                                <ListItemText primary={user.username} secondary={currentChat? currentChat:"No Message"} sx={{ margin: 'unset' }} />
                                {newChat!=0 && <Badge badgeContent={newChat}
                                    sx={{ '& span': { color: 'white', bgcolor: constantStyle.color_primary, right: '8px' } }} />}
                            </ListItemButton>
                        )
                    })
                }
            </List>
        </Box>
    );
}
