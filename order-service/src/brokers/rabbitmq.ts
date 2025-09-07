import amqplib from 'amqplib'
import { env } from '../config/env.ts'

let channel: amqplib.Channel | null = null

export async function initRabbitMQ() {
    const conn = await amqplib.connect(env.RABBITMQ_URL)
    channel = await conn.createChannel()

    console.log("🐇 Connected to RabbitMQ")
}

export async function publishEvent(queue: string, message: string) {
    if (!channel) throw new Error("RabbitMQ not initialized")

    await channel.assertQueue(queue, { durable: true })

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true })

    console.log(`📤 Event published -> ${queue}`, message)
}