import { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { client } from './MQTTHook';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';

export default function ChatList() {
  const [{ user_id, chats }, dispatch] = useStateProvider()

  client.on("message", (topic, message) => {
    const timestamp = (new Date().toTimeString()).split(' GMT')[0]
    const topicString = String(user_id)
    if (topic === topicString) {
      dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, topicString +'-'+ timestamp +'-'+ message.toString()] })
      console.log(chats);
    }
  });

  return (
    <Box padding={2} className="chart-container">
      { 
        chats?.map((chat: any, index: number, chats: string[]) => {
          const textAlign = chat.includes(user_id) ? 'right' : 'left'
          const justifyContent = chat.includes(user_id) ? 'flex-end' : 'flex-start'
          const bgcolor = chat.includes(user_id) ? constantStyle.color_primary : constantStyle.color_base_300

          const chatWOid = chat.split(user_id + '-')[1]
          const primary = chatWOid.split('-')[1]
          const secondary = chatWOid.split('-')[0]
          return (
            <Box key={index} sx={{ display: 'flex', justifyContent: justifyContent, marginBottom: 1 }}>
              <Box sx={{ bgcolor: bgcolor, color: 'white', padding: '4px 8px', borderRadius: 2, textAlign: textAlign }}>
                <Typography variant='caption' fontSize='0.5rem'>{secondary}</Typography>
                <Typography>{primary}</Typography>
              </Box>
            </Box>
          )
        })
      }
    </Box>
  );
}
