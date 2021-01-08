import { backboneErrorHandlerMiddleware } from "../../../lib/middleware/backboneErrorHandler"

describe("Backbone error", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.req = {}
    testContext.res = { status: jest.fn() }
    testContext.next = jest.fn()
    backboneErrorHandlerMiddleware(
      testContext.req,
      testContext.res,
      testContext.next
    )
  })

  it("adds a backbone error handler helper", () => {
    testContext.res.backboneError({}, { text: '{"error":"Foo Err"}' })
    expect(testContext.next.mock.calls[1][0].toString()).toContain("Foo Err")
  })

  it("handles generic stringy errors", () => {
    testContext.res.backboneError({}, { text: "Foo Err" })
    expect(testContext.next.mock.calls[1][0].toString()).toContain("Foo Err")
  })

  it("turns 403 errors into 404s", () => {
    testContext.res.backboneError({}, { status: 403 })
    expect(testContext.next.mock.calls[1][0].toString()).toContain("Not Found")
  })

  it("attaches API status to the errors", () => {
    testContext.res.backboneError({}, { status: 404 })
    expect(testContext.next.mock.calls[1][0].status).toEqual(404)
  })

  it("tries stack if its not an HTTP error", () => {
    testContext.res.backboneError({}, { stack: "foo" })
    expect(testContext.next.mock.calls[1][0].message).toEqual("foo")
    expect(testContext.next.mock.calls[1][0].status).toEqual(500)
  })

  it("tries message if its not an HTTP error", () => {
    testContext.res.backboneError({}, { message: "foo" })
    expect(testContext.next.mock.calls[1][0].message).toEqual("foo")
    expect(testContext.next.mock.calls[1][0].status).toEqual(500)
  })

  it("will even try stringifying before unknown", () => {
    testContext.res.backboneError({}, { foo: "bar" })
    expect(testContext.next.mock.calls[1][0].message).toEqual('{"foo":"bar"}')
    expect(testContext.next.mock.calls[1][0].status).toEqual(500)
  })
})
