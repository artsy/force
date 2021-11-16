import { logoutEventHandler } from "desktop/lib/deprecated_global_client_setup"
import { mediator } from "lib/mediator"
const bootstrap = require("../bootstrap.coffee")

jest.mock("jquery.transition", () => ({}))
jest.mock("desktop/lib/deprecated_global_client_setup", () => ({
  logoutEventHandler: jest.fn(),
}))

describe("bootstrap", () => {
  beforeAll(() => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    mediator.on = jest.fn((_e, cb) => cb())
  })

  it("sets up mediator to call #logoutEventHandler", () => {
    bootstrap()
    mediator.trigger("auth:logout")
    expect(logoutEventHandler).toBeCalled()
  })
})
