import { expect } from "chai"
import Fastify from "fastify"

import { ErrorHandler } from "../../src/utils/ErrorHandler.ts"

describe("ErrorHandler", () => {
  it("should send a 500 response for generic errors", async () => {
    const app = Fastify()

    app.get("/fail", async (_req, reply) => {
      try {
        throw new Error("Unexpected error")
      } catch (error) {
        ErrorHandler.handle({ error, origin: "test", reply })
      }
    })

    const res = await app.inject().get("/fail")

    expect(res.statusCode).to.equal(500)
    expect(JSON.parse(res.body).error).to.equal("Internal Server Error")
  })
})