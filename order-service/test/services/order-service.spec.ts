import { expect } from "chai"
import { faker } from "@faker-js/faker"

import { createOrder } from "../../src/services/order-service.ts"
import { db } from "../../src/db/index.ts"
import { orders } from "../../src/db/schema.ts"

describe("Order Service", () => {
  it("should create a new order in DB", async () => {
    const productName = faker.commerce.productName()
    const newOrder = { product: "Keyboard", quantity: 1 }
    const order = await createOrder(newOrder)

    expect(order).to.have.property("id")
    expect(order.product).to.equal(productName)
    expect(order.quantity).to.equal(1)

    const dbOrders = await db.select().from(orders)
    expect(dbOrders).to.have.lengthOf(1)
    expect(dbOrders[0].product).to.equal(productName)
  })
})