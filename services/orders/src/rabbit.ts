import amqp, { connect } from 'amqplib'
import type { ChannelModel, ConfirmChannel } from 'amqplib'
import type { OrderCreatedEvent } from './schemas'

export const ORDERS_EXCHANGE = 'orders.events'

let connection: ChannelModel | null = null
let pubChannel: ConfirmChannel | null = null

export async function connectRabbit(): Promise<void> {
    if (connection) return

    connection = await connect(process.env.RABBITMQ_URL || 'amqp://localhost')
    pubChannel = await connection.createConfirmChannel()

    await pubChannel.assertExchange(ORDERS_EXCHANGE, 'topic', { durable: true })

    connection.on('close', () => {
        console.error('[orders] RabbitMQ connection closed');
        connection = null;
    });
}

export async function publishOrderCreated(evt: OrderCreatedEvent): Promise<void> {
    if (!pubChannel) throw new Error('RabbitMQ not initialized')

    const payload = Buffer.from(JSON.stringify(evt))
        pubChannel.publish(ORDERS_EXCHANGE, 'order.created', payload, {
        contentType: 'application/json',
        deliveryMode: 2,
        messageId: evt.id,
        timestamp: Date.now(),
    })

    await new Promise<void>((resolve, reject) =>
        pubChannel!.waitForConfirms().then(() => resolve()).catch(reject));
}