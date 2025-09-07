import { pgTable, integer, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    product: text("product").notNull(),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})