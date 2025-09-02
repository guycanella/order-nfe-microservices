import z from "zod"

export const OrderItemSchema = z.object({
    sku: z.string().min(1),
    quantity: z.number().min(1),
    price: z.number().min(0),
    name: z.string(),
})

export const CreateOrderSchema = z.object({
    userId: z.string().min(1),
    items: z.array(OrderItemSchema).nonempty,
})

export type OrderItemType = z.infer<typeof OrderItemSchema>

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>

export type OrderCreatedEvent = {
    id: string
    customerId: string
    items: OrderItemType[]
    total: number
    createdAt: string
}