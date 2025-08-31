import z from "zod"

const EnvSchema = z.object({
    PORT: z.coerce.number().default(3000),
    SERVICE_NAME: z.string().default("orders-service"),
    RABBITMQ_URL: z.string().min(1),
})

export const env = EnvSchema.parse(process.env)