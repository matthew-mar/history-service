import dotenv from "dotenv";
import { Kafka } from "kafkajs";
import { Events } from "./event-types.js";

dotenv.config();

const kafka = new Kafka({
    brokers: [process.env.KAFKA_CONNECTION],
});

const consumer = kafka.consumer({
    groupId: "test-group",
});

Object.values(Events).forEach(async (element) => {
    await consumer.subscribe({
        topic: element,
        fromBeginning: true,
    });
});

export default consumer;
