import { fetchDestinationForWriteKey } from "../fetchDestinationForWriteKey"
import { validateSegmentResponse } from "../validateSegmentResponse"

jest.mock("../validateSegmentResponse")

describe("fetchDestinationForWriteKey", () => {
  const validateSegmentResponseMock = validateSegmentResponse as jest.Mock

  beforeEach(() => {
    validateSegmentResponseMock.mockImplementation(() => {
      return true
    })
  })

  afterEach(() => {
    validateSegmentResponseMock.mockRestore()
  })

  it("returns destinations if segment api returns them", async () => {
    const res = {
      ok: true,
      json: () => Promise.resolve([{ creationName: "foo" }]),
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
  it("returns empty array if segment api returns such", async () => {
    const res = {
      ok: true,
      json: () => Promise.resolve([]),
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
  it("returns empty array if network error", async () => {
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.reject("foo"))
    const result = await fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
  it("returns empty array if http error", async () => {
    const res = {
      ok: false,
      status: "404",
      statusText: "not found",
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
  it("returns empty array if validation error", async () => {
    validateSegmentResponseMock.mockImplementation(() => {
      return false
    })
    const res = {
      ok: true,
      json: () => Promise.resolve([{ creationName: "foo" }]),
    }
    // @ts-ignore
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(result).toEqual([])
  })
})
