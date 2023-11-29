import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';

export default function ChatUser() {
    const [{ user_id, token }, dispatch] = useStateProvider()

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
    ) => {
        setSelectedIndex(index)
    }

    return (
        <Box sx={{ border: '1px solid ' + constantStyle.color_primary, borderRadius: 2 }}>
            <List sx={{ padding: 0 }}>
                {
                    data?.map((user: any, index: number, users: string[]) => {
                        return (
                            <ListItemButton key={index}
                                sx={{ borderBottom: '1px solid ' + constantStyle.color_primary,
                                    borderTopLeftRadius: index==0? '8px': 'unset',
                                    borderTopRightRadius: index==0? '8px': 'unset' }}
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}>
                                <ListItemText primary={user.username} secondary="chat-ss" />
                            </ListItemButton>
                        )
                    })
                }
            </List>
        </Box>
    );
}
