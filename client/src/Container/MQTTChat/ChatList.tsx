import { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { client } from './MQTTHook';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';

export default function ChatList() {
  const [{ user_id, selected_user_id, chats }, dispatch] = useStateProvider()

  client.on("message", (topic, message) => {
    if (topic == String(user_id)) {
      dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, message.toString()] })
    }
    if (topic == String(selected_user_id)) {
      dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, message.toString()] })
    }
  });
  client.subscribe(String(user_id))
  client.subscribe(String(selected_user_id))

  return (
    <Box padding={2} className="chart-container">
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
                <Typography variant='caption' fontSize='0.7rem'>{time.split('-')[1]}</Typography>
                <Typography>{data.split('-')[1]}</Typography>
              </Box>
            </Box>
          )
        })
      }
    </Box>
  );
}
