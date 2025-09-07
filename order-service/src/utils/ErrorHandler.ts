import type { FastifyReply } from "fastify"

type ErrorHandlerType = {
    error: unknown
    origin: string
    reply?: FastifyReply
}

export class ErrorHandler {
    static handle({ error, origin, reply }: ErrorHandlerType) {
        if (error instanceof Error) {
            console.error(`Error origin: ${origin}`)
            console.error(error.message)

            if (!reply) return

            reply.status(500).send({
                error: "Internal Server Error",
                message: error.message
            })
        } else {
            console.error(`Error origin: ${origin}`)
            console.error("Unknown error", error)

            if (!reply) return

            reply.status(500).send({
                error: "Internal Server Error",
                message: "Unexpected error"
            })
        }
    }
}