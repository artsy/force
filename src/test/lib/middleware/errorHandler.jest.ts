import { IpDeniedError } from "express-ipfilter"
import { renderServerApp } from "v2/System/Router/renderServerApp"
import { errorHandlerMiddleware } from "../../../lib/middleware/errorHandler"

jest.mock("v2/System/Router/renderServerApp")
jest.mock("../../../config", () => {
  return {
    NODE_ENV: "unknown",
  }
})

const config = require("../../../config")

describe("errorHandler", () => {
  let testContext
  const renderServerAppMock = renderServerApp as jest.Mock

  beforeEach(() => {
    renderServerAppMock.mockImplementation(({ res, code, bodyHTML }) => {
      res.status(code).send(bodyHTML)
    })

    testContext = {}

    testContext.renderStub = { send: jest.fn() }

    testContext.next = jest.fn()

    testContext.res = {
      status: jest.fn().mockImplementation(() => testContext.renderStub),
      locals: { sharify: { data: {} } },
    }

    testContext.err = {
      status: 500,
      message: "Example message",
      stack: "Example stack",
    }
  })

  afterEach(() => {
    renderServerAppMock.mockReset()
  })

  it("invokes the error handler template with the right parameters (and the right status code for the page)", () => {
    config["NODE_ENV"] = "development"

    errorHandlerMiddleware(
      testContext.err,
      {} as any,
      testContext.res,
      testContext.next
    )

    expect(testContext.res.status).toBeCalledWith(500)
    const renderArgs = testContext.renderStub.send.mock.calls[0]
    expect(renderArgs[0]).toContain("500")
    expect(renderArgs[0]).toContain("Example message")
    expect(renderArgs[0]).toContain("Example stack")
  })

  it("passes undefined in production", () => {
    config["NODE_ENV"] = "production"

    errorHandlerMiddleware(
      testContext.err,
      {} as any,
      testContext.res,
      testContext.next
    )

    expect(testContext.res.status).toBeCalledWith(500)
    const renderArgs = testContext.renderStub.send.mock.calls[0]
    expect(renderArgs[0]).toContain("500")
    expect(renderArgs[0]).not.toContain("Example message")
    expect(renderArgs[0]).not.toContain("Example stack")
  })

  it("returns a 401 when an IP is denied", () => {
    const err = new IpDeniedError("You've been blocked")

    errorHandlerMiddleware(err, {} as any, testContext.res, testContext.next)

    expect(testContext.res.status).toBeCalledWith(401)
    const renderArgs = testContext.renderStub.send.mock.calls[0]
    expect(renderArgs[0]).toContain("401")
    expect(renderArgs[0]).toContain("Unauthorized")
  })
})
