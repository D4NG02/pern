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
    const [{ user_id, chats, chatListTopic, chatTopicNotRead }, dispatch] = useStateProvider()

    console.log('useMessageTopic')
    client.on("message", (topic, message) => {
        console.log("on messa")
        chatListTopic.filter((topicLoop: string, index: number, topics: string[]) => {
            if (topic == topicLoop) {
                let messageString: string = message.toString()

                for (const [key, value] of Object.entries(chatTopicNotRead)) {
                    if (topic === key && String(user_id) !== key) {
                        chatTopicNotRead[key] = (chatTopicNotRead[key] + 1)
                        console.log(chatTopicNotRead[key])
                    }
                }

                dispatch({ type: reducerCases.SET_CHATS, chats: [...chats, messageString] })
                dispatch({ type: reducerCases.SET_CHAT_TOPIC_NOT_READ, chatTopicNotRead: { ...chatTopicNotRead } })
            }
        })
    });
};