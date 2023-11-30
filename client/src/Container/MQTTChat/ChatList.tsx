import { useRef } from 'react';
import { Box, Typography } from '@mui/material';

import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { constantStyle } from '../../Utility/CustomStyle';

export default function ChatList() {
  const [{ user_id, chatSelectedUserId, chatTopicNotRead, chats }, dispatch] = useStateProvider()

  const bottomRef = useRef<HTMLDivElement>()
  setTimeout(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, 200);

  return (
    <Box className="chart-container" sx={{ overflowY: 'auto', margin: '16px 8px', padding: '0 8px' }}>
      { chatSelectedUserId &&
        chats?.filter((chat: any, index: number, chats: string[]) => {
          const chunk = chat.split('_')
          const topic = Number(chunk[0].split('-')[1])
            if (topic==user_id || topic==chatSelectedUserId) {
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
