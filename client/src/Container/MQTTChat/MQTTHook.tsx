import mqtt from "mqtt";

const mqttOption = {
    host: 'localhost',
    port: 9001,
    username: 'badrul',
    password: 'badrul',
}

export const client = mqtt.connect(mqttOption);
export const listTopic: string[] = []
export const toSubscribeTopic = (topic: string) => {
    if (!listTopic.includes(topic)) {
        listTopic.push(topic)
        client.subscribe(topic)
    }
};