import { IpDeniedError } from "express-ipfilter"
import { renderServerApp } from "System/Router/renderServerApp"
import { errorHandlerMiddleware } from "Server/middleware/errorHandler"

jest.mock("System/Router/renderServerApp")
jest.mock("Server/config", () => {
  return {
    NODE_ENV: "unknown",
  }
})

const config = require("Server/config")

describe("errorHandler", () => {
  let testContext
  const renderServerAppMock = renderServerApp as jest.Mock

  beforeEach(() => {
    renderServerAppMock.mockImplementation(({ res, code, html }) => {
      res.status(code).send(html)
    })

    testContext = {
      renderStub: { send: jest.fn() },
      next: jest.fn(),
      res: {
        status: jest.fn().mockImplementation(() => testContext.renderStub),
        locals: { sharify: { data: {} } },
      },
      err: {
        status: 500,
        message: "Example message",
        stack: "Example stack",
      },
      req: {
        protocol: "https",
        get: jest.fn().mockImplementation(() => "artsy.net"),
        originalUrl: "/some-path",
      },
    }
  })

  afterEach(() => {
    renderServerAppMock.mockReset()
  })

  it("invokes the error handler template with the right parameters (and the right status code for the page)", () => {
    config["NODE_ENV"] = "development"

    errorHandlerMiddleware(
      testContext.err,
      testContext.req,
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
      testContext.req,
      testContext.res,
      testContext.next
    )

    expect(testContext.res.status).toBeCalledWith(500)
    const renderArgs = testContext.renderStub.send.mock.calls[0]
    expect(renderArgs[0]).toContain("500")
    expect(renderArgs[0]).toContain("Example message")
    expect(renderArgs[0]).not.toContain("Example stack")
  })

  it("returns a 401 when an IP is denied", () => {
    const err = new IpDeniedError("You've been blocked")

    errorHandlerMiddleware(
      err,
      testContext.req,
      testContext.res,
      testContext.next
    )

    expect(testContext.res.status).toBeCalledWith(401)
    const renderArgs = testContext.renderStub.send.mock.calls[0]
    expect(renderArgs[0]).toContain("401")
    expect(renderArgs[0]).toContain("Unauthorized")
  })
})
