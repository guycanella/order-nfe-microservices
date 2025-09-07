import { FastifyInstance } from "fastify";
import z from "zod";

import { createOrder } from "../services/order-service";

export async function orderRoutes(app: FastifyInstance) {
    app.post('/orders', async (req, reply) => {
        try {
            const bodySchema = z.object({
                product: z.string().min(1),
                quantity: z.number().min(1).positive()
            })

            const validation = bodySchema.safeParse(req.body)

            if (!validation.success) {
                reply.status(400).send({
                    error: "Invalid request body",
                    message: validation.error.message
                });

                return
            }

            const order = await createOrder(validation.data)

            reply.code(201).send(order)
        } catch (err) {
            req.log.error({ err }, "Order creation failed");
            reply.status(500).send({
                error: "Failed to create order",
                message: err instanceof Error ? err.message : "Unknown error"
            });
        }
    })
}