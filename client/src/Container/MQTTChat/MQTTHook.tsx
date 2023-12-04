import mqtt from "mqtt";
import { useStateProvider } from "../../Utility/Reducer/StateProvider";
import { reducerCases } from "../../Utility/Reducer/Constant";

const mqttOption = {
    host: 'localhost',
    port: 9001,
    username: 'badrul',
    password: 'badrul',
}

export const client = mqtt.connect(mqttOption);

export const useMessageTopic = () => {
    const [{ user_id, chatSelectedUserId, chats, chatListTopic, chatTopicNotRead }, dispatch] = useStateProvider()

    let topicTo = user_id +"to"+ chatSelectedUserId
    let topicFrom = chatSelectedUserId +"to"+ user_id
    client.on("message", (topic, message) => {
        chatListTopic.filter((topicLoop: string, index: number, topics: string[]) => {
            if (topic == topicLoop) {
                let messageString: string = message.toString()

                for (const [key, value] of Object.entries(chatTopicNotRead)) {
                    if (topic === key && String(user_id) !== key) {
                        chatTopicNotRead[key] = (chatTopicNotRead[key] + 1)
                    }
                }

                dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, messageString] })
                dispatch({ type: reducerCases.SET_CHAT_TOPIC_NOT_READ, chatTopicNotRead: { ...chatTopicNotRead } })
            }
        })
    });
};