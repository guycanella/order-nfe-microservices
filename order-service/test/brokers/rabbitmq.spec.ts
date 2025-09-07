import { expect } from "chai"
import * as rabbitmq from "../../src/brokers/rabbitmq.ts"

describe("RabbitMQ Broker", () => {
  it("should throw if publishEvent is called before init", async () => {
    let err: Error | null = null
    try {
      await rabbitmq.publishEvent("test-queue", "hello")
    } catch (e) {
      err = e as Error
    }

    expect(err).to.not.be.null
    expect(err?.message).to.equal("RabbitMQ not initialized")
  })
})