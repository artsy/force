import { logoutEventHandler } from "desktop/lib/global_client_setup"
const bootstrap = require("../bootstrap.coffee")
const mediator = require("../../../../desktop/lib/mediator.coffee")

jest.mock("jquery.transition", () => ({}))
jest.mock("desktop/lib/global_client_setup", () => ({
  logoutEventHandler: jest.fn(),
}))

describe("bootstrap", () => {
  beforeAll(() => {
    mediator.on = jest.fn((_e, cb) => cb())
  })

  it("sets up mediator to call #logoutEventHandler", () => {
    bootstrap()
    mediator.trigger("auth:logout")
    expect(logoutEventHandler).toBeCalled()
  })
})
