import { IpDeniedError } from "express-ipfilter"
import { errorHandlerMiddleware } from "../../../lib/middleware/errorHandler"
jest.mock("../../../config", () => {
  return {
    NODE_ENV: "unknown",
  }
})
const config = require("../../../config")

describe("errorHandler", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.renderStub = { render: jest.fn() }
    testContext.next = jest.fn()
    testContext.res = {
      status: jest.fn().mockImplementation(() => testContext.renderStub),
    }
    testContext.err = {
      status: 420,
      message: "When they go low, we go high",
      stack: "mad fat stacks",
    }
  })

  it("invokes the error handler template with the right parameters (and the right status code for the page)", () => {
    config["NODE_ENV"] = "development"
    errorHandlerMiddleware(
      testContext.err,
      {} as any,
      testContext.res,
      testContext.next
    )
    expect(testContext.res.status).toBeCalledWith(420)
    const renderArgs = testContext.renderStub.render.mock.calls[0]
    expect(renderArgs[0]).toContain(
      "desktop/components/error_handler/index.jade"
    )
    expect(renderArgs[1].message).toEqual("When they go low, we go high")
    expect(renderArgs[1].code).toBe(420)
    expect(renderArgs[1].detail).toBe("mad fat stacks")
  })

  it("passes undefined in production", () => {
    config["NODE_ENV"] = "production"

    errorHandlerMiddleware(
      testContext.err,
      {} as any,
      testContext.res,
      testContext.next
    )
    expect(testContext.res.status).toBeCalledWith(420)
    const renderArgs = testContext.renderStub.render.mock.calls[0]
    expect(renderArgs[0]).toContain(
      "desktop/components/error_handler/index.jade"
    )
    expect(renderArgs[1].message).toBeUndefined()
    expect(renderArgs[1].code).toEqual(420)
    expect(renderArgs[1].detail).toBeUndefined()
  })

  it("returns a 401 when an IP is denied", () => {
    const err = new IpDeniedError("You've been blocked")
    errorHandlerMiddleware(err, {} as any, testContext.res, testContext.next)
    expect(testContext.res.status).toBeCalledWith(401)
    const renderArgs = testContext.renderStub.render.mock.calls[0]
    expect(renderArgs[1].code).toEqual(401)
  })
})
