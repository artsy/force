import { fetchDestinationForWriteKey } from "../fetchDestinationForWriteKey"
import { validateSegmentResponse } from "../validateSegmentResponse"

jest.mock("../validateSegmentResponse")

declare const window: any

describe("fetchDestinationForWriteKey", () => {
  const validateSegmentResponseMock = validateSegmentResponse as jest.Mock
  const segmentURL = "https://cdn.segment.com/v1/projects/abc/integrations"

  beforeEach(() => {
    validateSegmentResponseMock.mockImplementation(() => {
      return true
    })
  })

  afterEach(() => {
    validateSegmentResponseMock.mockRestore()
    window.fetch.mockRestore()
  })

  it("returns destinations if segment api returns them", async () => {
    const res = {
      ok: true,
      json: () => Promise.resolve([{ creationName: "foo" }]),
    }
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(window.fetch).toHaveBeenCalledWith(segmentURL)
    expect(validateSegmentResponseMock).toHaveBeenCalledWith([{ id: "foo" }])
    expect(result).toEqual([{ id: "foo" }])
  })
  it("returns empty array if segment api returns such", async () => {
    const res = {
      ok: true,
      json: () => Promise.resolve([]),
    }
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(window.fetch).toHaveBeenCalledWith(segmentURL)
    expect(validateSegmentResponseMock).toHaveBeenCalledWith([])
    expect(result).toEqual([])
  })
  it("returns empty array if network error", async () => {
    window.fetch = jest.fn(() => Promise.reject("foo"))
    const result = await fetchDestinationForWriteKey("abc")
    expect(window.fetch).toHaveBeenCalledWith(segmentURL)
    expect(validateSegmentResponseMock).not.toHaveBeenCalledWith()
    expect(result).toEqual([])
  })
  it("returns empty array if http error", async () => {
    const res = {
      ok: false,
      status: "404",
      statusText: "not found",
    }
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(window.fetch).toHaveBeenCalledWith(segmentURL)
    expect(validateSegmentResponseMock).not.toHaveBeenCalledWith()
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
    window.fetch = jest.fn(() => Promise.resolve(res))
    const result = await fetchDestinationForWriteKey("abc")
    expect(window.fetch).toHaveBeenCalledWith(segmentURL)
    expect(validateSegmentResponseMock).toHaveBeenCalledWith([
      { creationName: "foo" },
    ])
    expect(result).toEqual([])
  })
})
