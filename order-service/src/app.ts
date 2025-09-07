import Fastify from 'fastify'
import { orderRoutes } from './routes/order-routes.ts'
import { initRabbitMQ } from './brokers/rabbitmq.ts'

export async function buildApp() {
    const app = Fastify({ logger: true })

    app.register(orderRoutes)

    await initRabbitMQ()

    return app
}

export async function buildAppForTests() {
    const app = Fastify({ logger: false })

    app.register(orderRoutes)

    await app.ready()

    return app
}