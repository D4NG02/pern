import { useEffect, useRef, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { client } from './MQTTHook';
import { reducerCases } from '../../Utility/Reducer/Constant';
import { constantStyle } from '../../Utility/CustomStyle';
import { topicSubscribe } from "./MQTTHook";

export default function ChatList() {
  const [{ user_id, selected_user_id, topicNotRead, chats }, dispatch] = useStateProvider()

  client.on("message", (topic, message) => {
    topicSubscribe.map((topicLoop: string, index: number, topics: string[]) => {
      if (topic == topicLoop) {
        let messageString: string = message.toString()
        dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, messageString] })

        if (!Object.hasOwn(topicNotRead, topic)) {
          Object.defineProperty(topicNotRead, topic, {
            value: 1,
            writable: true,
            enumerable: true,
            configurable: true
          });
        } else {
          for (const [key, value] of Object.entries(topicNotRead)) {
            if (topic === key && String(user_id) !== key) {
              topicNotRead[key] = topicNotRead[key] + 1
              console.log(`${key}: ${value}`);
            }
          }
        }
        dispatch({ type: reducerCases.SET_CHAT_TOPIC_NOT_READ, topicNotRead: { ...topicNotRead } })
      }
    })
  });

  const bottomRef = useRef<HTMLDivElement>()
  setTimeout(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, 200);

  return (
    <Box className="chart-container" sx={{ overflowY: 'auto', margin: '16px 8px', padding: '0 8px' }}>
      {
        chats?.filter((chat: any, index: number, chats: string[]) => {
          const chunk = chat.split('_')
          const topic = Number(chunk[0].split('-')[1])
            if (topic==user_id || topic==selected_user_id) {
              return chat
            }
          }).map((chat: any, index: number, chats: string[]) => {
          const textAlign = chat.includes(user_id) ? 'right' : 'left'
          const justifyContent = chat.includes(user_id) ? 'flex-end' : 'flex-start'
          const bgcolor = chat.includes(user_id) ? constantStyle.color_primary : constantStyle.color_base_600

          const chunk = chat.split('_')
          const topic = chunk[0].split('-')[1]
          const time = chunk[1].split('-')[1]
          const data = chunk[2].split('-')[1]
          return (
            <Box key={index} sx={{ display: 'flex', justifyContent: justifyContent, marginBottom: 1 }}>
              <Box sx={{ bgcolor: bgcolor, color: 'white', padding: '4px 8px', borderRadius: 2, textAlign: textAlign }}>
                <Typography variant='caption' fontSize='0.6rem'>{time}</Typography>
                <Typography>{data}</Typography>
              </Box>
            </Box>
          )
        })
      }
      <Box ref={bottomRef}></Box>
    </Box>
  );
}
