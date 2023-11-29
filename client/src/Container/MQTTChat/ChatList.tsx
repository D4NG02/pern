import { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { client } from './MQTTHook';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import { topicSubscribe } from "./MQTTHook";

export default function ChatList() {
  const [{ user_id, selected_user_id, chats }, dispatch] = useStateProvider()

  client.on("message", (topic, message) => {
    topicSubscribe.map((value: string, index: number, topics: string[]) => {
      if (topic == value) {
        let messageString: string = message.toString()
        dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, messageString] })
      }
    })
  });

  return (
    <Box className="chart-container" sx={{ overflowY: 'scroll', margin: '16px 8px', padding: '0 8px' }}>
      {selected_user_id !== null &&
        chats?.map((chat: any, index: number, chats: string[]) => {
          const textAlign = chat.includes(user_id) ? 'right' : 'left'
          const justifyContent = chat.includes(user_id) ? 'flex-end' : 'flex-start'
          const bgcolor = chat.includes(user_id) ? constantStyle.color_primary : constantStyle.color_base_600

          const chunk = chat.split('_')
          const topic = chunk[0]
          const time = chunk[1]
          const data = chunk[2]
          return (
            <Box key={index} sx={{ display: 'flex', justifyContent: justifyContent, marginBottom: 1 }}>
              <Box sx={{ bgcolor: bgcolor, color: 'white', padding: '4px 8px', borderRadius: 2, textAlign: textAlign }}>
                <Typography variant='caption' fontSize='0.6rem'>{time.split('-')[1]}</Typography>
                <Typography>{data.split('-')[1]}</Typography>
              </Box>
            </Box>
          )
        })
      }
    </Box>
  );
}
