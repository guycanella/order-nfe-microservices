import { publishEvent } from "../brokers/rabbitmq.ts"
import { db } from "../db/index.ts"
import { orders } from "../db/schema.ts"

type OrderInput = {
    product: string
    quantity: number
}

export async function createOrder(data: OrderInput) {
    return db.transaction(async (tx) => {
        const result = await tx.insert(orders).values(data).returning()

        if (!result || result.length === 0) {
            throw new Error("Failed to create order: no data returned from database")
        }

        const [order] = result

        if (!order.id) {
            throw new Error("Failed to create order: invalid data")
        }

        if (process.env.NODE_ENV !== "test") {
            await publishEvent("order_created", "Order created successfully ✅")
        }

        return order
    })
}