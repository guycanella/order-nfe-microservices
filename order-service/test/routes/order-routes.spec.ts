import { expect } from "chai"
import { faker } from '@faker-js/faker'
import supertest from "supertest"

import { buildAppForTests } from "../../src/app.ts"

describe("Order Routes", () => {
  let app: Awaited<ReturnType<typeof buildAppForTests>>

  before(async () => {
    app = await buildAppForTests()
    await app.ready()
  })

  it("should respond to POST /orders", async () => {
    const productName = faker.commerce.productName()

    const res = await supertest(app.server)
      .post("/orders")
      .set("Content-Type", "application/json")
      .send({ product: productName, quantity: 1 })

    expect(res.status).to.be.a("number")
  })

  it("should create an order when data is valid", async () => {
    const productName = faker.commerce.productName()

    const res = await supertest(app.server)
      .post("/orders")
      .set("Content-Type", "application/json")
      .send({ product: productName, quantity: 2 })

    expect(res.status).to.equal(201)
    expect(res.body).to.have.property("id")
    expect(res.body.product).to.equal(productName)
    expect(res.body.quantity).to.equal(2)
  })

  it("should fail with 400 when data is invalid", async () => {
    const res = await supertest(app.server)
      .post("/orders")
      .set("Content-Type", "application/json")
      .send({ product: "", quantity: -1 })

    expect(res.status).to.equal(400)
    expect(res.body.error).to.equal("Validation failed")
  })
})