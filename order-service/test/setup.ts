import { beforeEach, after } from "mocha"
import { closeConnection, db } from "../src/db/index.ts"
import { orders } from "../src/db/schema.ts"

beforeEach(async () => {
    await db.delete(orders)
})

after(async () => {
    await closeConnection();
})