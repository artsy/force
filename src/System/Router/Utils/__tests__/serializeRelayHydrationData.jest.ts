import { serializeRelayHydrationData } from "System/Router/Utils/serializeRelayHydrationData"
import type { SSRCache } from "react-relay-network-modern-ssr/lib/server"
import mockSerialize from "serialize-javascript"

jest.mock("serialize-javascript", () => jest.fn())

describe("serializeRelayHydrationData", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should serialize the relay data correctly", () => {
    const mockData = [
      [
        {
          id: 1,
          _res: "some-network-response",
          data: "value1",
        },
        {
          id: 2,
          _res: "another-response",
          data: "value2",
        },
      ],
    ] as unknown as SSRCache

    mockSerialize.mockImplementation((data, _options) => JSON.stringify(data))

    const result = serializeRelayHydrationData(mockData)

    expect(mockSerialize).toHaveBeenCalledTimes(2)
    expect(mockSerialize).toHaveBeenCalledWith(mockData, { isJSON: true })
    expect(mockSerialize).toHaveBeenCalledWith(JSON.stringify(mockData), {
      isJSON: true,
    })

    expect(result).toBe(JSON.stringify(JSON.stringify(mockData)))
    expect(mockData[0][0]).not.toHaveProperty("_res")
    expect(mockData[0][1]).not.toHaveProperty("_res")
  })

  it("should handle empty data gracefully", () => {
    mockSerialize.mockImplementation((data, _options) => JSON.stringify(data))

    const result = serializeRelayHydrationData([])

    expect(mockSerialize).toHaveBeenCalledTimes(2)
    expect(mockSerialize).toHaveBeenCalledWith([], { isJSON: true })
    expect(mockSerialize).toHaveBeenCalledWith(JSON.stringify([]), {
      isJSON: true,
    })

    expect(result).toBe(JSON.stringify(JSON.stringify([])))
  })

  it("should return an empty serialized array when an error occurs", () => {
    const mockData = [
      [
        {
          id: 1,
          _res: "some-network-response",
          data: "value1",
        },
      ],
    ] as unknown as SSRCache

    mockSerialize.mockImplementation(() => {
      throw new Error("Serialization Error")
    })

    expect(() => {
      const result = serializeRelayHydrationData(mockData)
      expect(mockSerialize).toHaveBeenCalledTimes(1)
      expect(result).toBe(mockSerialize("[]", { isJSON: true }))
    }).toThrowError("Serialization Error")
  })
})
