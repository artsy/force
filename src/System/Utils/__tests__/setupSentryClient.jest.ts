import * as Sentry from "@sentry/browser"
import { traceFetch } from "System/Utils/setupSentryClient"

jest.mock("@sentry/browser", () => ({
  startSpan: jest.fn((_options, callback) => callback()),
}))

const startSpanMock = Sentry.startSpan as jest.Mock

describe("traceFetch", () => {
  beforeEach(() => {
    startSpanMock.mockClear()
    startSpanMock.mockImplementation((_options, callback) => callback())
  })

  it("wraps the callback in startSpan with the expected span context", async () => {
    await traceFetch(
      { name: "smarty.autocomplete.us", url: "https://example.com/lookup" },
      async () => "ok",
    )

    expect(startSpanMock).toHaveBeenCalledTimes(1)
    expect(startSpanMock).toHaveBeenCalledWith(
      {
        name: "smarty.autocomplete.us",
        op: "http.client",
        forceTransaction: true,
        attributes: {
          "http.method": "GET",
          "http.url": "https://example.com/lookup",
        },
      },
      expect.any(Function),
    )
  })

  it("defaults the http.method attribute to GET", async () => {
    await traceFetch(
      { name: "foo", url: "https://example.com" },
      async () => null,
    )

    const [spanContext] = startSpanMock.mock.calls[0]
    expect(spanContext.attributes["http.method"]).toBe("GET")
  })

  it("respects a custom http method", async () => {
    await traceFetch(
      { name: "foo", url: "https://example.com", method: "POST" },
      async () => null,
    )

    const [spanContext] = startSpanMock.mock.calls[0]
    expect(spanContext.attributes["http.method"]).toBe("POST")
  })

  it("returns the value resolved by the callback", async () => {
    const result = await traceFetch(
      { name: "foo", url: "https://example.com" },
      async () => ({ data: 42 }),
    )

    expect(result).toEqual({ data: 42 })
  })

  it("propagates errors thrown by the callback", async () => {
    await expect(
      traceFetch({ name: "foo", url: "https://example.com" }, async () => {
        throw new Error("boom")
      }),
    ).rejects.toThrow("boom")
  })
})
