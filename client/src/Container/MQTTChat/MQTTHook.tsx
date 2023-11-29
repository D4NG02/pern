import mqtt from "mqtt";

const mqttOption = {
    host: 'localhost',
    port: 9001,
    username: 'badrul',
    password: 'badrul',
}

export const client = mqtt.connect(mqttOption);
