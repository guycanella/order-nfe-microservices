import { expect } from "chai"
import { createOrder } from "../../src/services/order-service.ts"
import { faker } from '@faker-js/faker'

describe("Order Service", () => {
  it("should create an order in the database", async () => {
    const productName = faker.commerce.productName()

    const order = await createOrder({ product: productName, quantity: 1 })

    expect(order).to.have.property("id")
    expect(order.product).to.equal(productName)
    expect(order.quantity).to.equal(1)
  })
})