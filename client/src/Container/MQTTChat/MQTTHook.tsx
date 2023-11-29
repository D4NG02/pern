import mqtt from "mqtt";
import { useStateProvider } from '../../Utility/Reducer/StateProvider';
import { reducerCases } from "../../Utility/Reducer/Constant";

const mqttOption = {
    host: 'localhost',
    port: 9001,
    username: 'badrul',
    password: 'badrul',
}

export const client = mqtt.connect(mqttOption);
export const subscribeTopic = (topic: string) => {
    if (!topicSubscribe.includes(topic)) {
        topicSubscribe.push(topic)
        client.subscribe(topic)
    }
};
export const topicSubscribe: string[] = []