import { expect } from "chai"
import supertest from "supertest"
import { faker } from "@faker-js/faker"

import { buildApp } from "../../src/app.ts"

describe("Order Routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>>

  before(async () => {
    app = await buildApp()
  })

  it("POST /orders should create an order", async () => {
    const productName = faker.commerce.productName()

    const res = await supertest(app.server)
      .post("/orders")
      .send({ product: productName, quantity: 2 })
      .expect(201)

    expect(res.body).to.have.property("id")
    expect(res.body.product).to.equal(productName)
    expect(res.body.quantity).to.equal(2)
  })

  it("POST /orders with invalid data should fail", async () => {
    const res = await supertest(app.server)
      .post("/orders")
      .send({ product: "", quantity: -1 })
      .expect(400)

    expect(res.body.error).to.equal("Validation failed")
  })
})