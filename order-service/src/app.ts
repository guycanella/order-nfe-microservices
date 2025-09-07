import Fastify from 'fastify';
import { orderRoutes } from './routes/order-routes';
import { initRabbitMQ } from './brokers/rabbitmq';

export async function buildApp() {
    const app = Fastify({ logger: true })

    app.register(orderRoutes)

    await initRabbitMQ()

    return app
}