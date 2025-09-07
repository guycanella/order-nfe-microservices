import { buildApp } from "./app";
import { env } from "./config/env";

async function start() {
    try {
        const app = await buildApp()

        await app.listen({ port: env.PORT, host: '0.0.0.0'})

        console.log(`🚀 Order-service listening on port ${env.PORT}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()