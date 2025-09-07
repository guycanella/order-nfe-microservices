import { expect } from "chai"

import * as rabbit from "../../src/brokers/rabbitmq.ts"
import { ErrorHandler } from "../../src/utils/ErrorHandler.ts"

describe("RabbitMQ Broker", () => {
  it("should throw if publishEvent is called before init", async () => {
    let err: Error | null = null

    try {
      await rabbit.publishEvent("order_created", "Test message")
    } catch (error) {
      ErrorHandler.handle({
        error,
        origin: "RabbitMQ Broker Test",
      })
    }

    expect(err).to.not.be.null
  })
})