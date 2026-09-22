import { serializeRelayHydrationData } from "System/Router/Utils/serializeRelayHydrationData"
import type { SSRCache } from "react-relay-network-modern-ssr/lib/server"

// Evaluate the serialized output the same way the browser does when the
// inline `<script>` runs.
const evaluate = (serialized: string) => {
  return new Function(`return ${serialized}`)()
}

describe("serializeRelayHydrationData", () => {
  it("serializes the relay data in a single pass", () => {
    const mockData = [
      [
        '{"queryID":"HomeQuery","variables":{}}',
        { json: { data: { me: { name: "Damon" } } } },
      ],
    ] as unknown as SSRCache

    const result = serializeRelayHydrationData(mockData)

    // A JavaScript array literal, not a double-encoded JSON string. The
    // payload's own keys should appear unescaped.
    expect(result.startsWith("[")).toBe(true)
    expect(result).toContain('{"json":{"data":')

    expect(evaluate(result)).toEqual(mockData)
  })

  it("strips the raw network response from each entry", () => {
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

    const result = serializeRelayHydrationData(mockData)

    expect(mockData[0][0]).not.toHaveProperty("_res")
    expect(mockData[0][1]).not.toHaveProperty("_res")
    expect(result).not.toContain("_res")
  })

  it("escapes markup so the output is safe inside a <script> tag", () => {
    const mockData = [
      ['{"queryID":"Q","variables":{}}', { html: "</script><img src=x>" }],
    ] as unknown as SSRCache

    const result = serializeRelayHydrationData(mockData)

    expect(result).not.toContain("</script>")
    expect(evaluate(result)).toEqual(mockData)
  })

  it("handles empty data gracefully", () => {
    expect(serializeRelayHydrationData([])).toBe("[]")
    expect(serializeRelayHydrationData()).toBe("[]")
  })

  it("returns an empty array literal when serialization fails", () => {
    const circular: any = []
    circular.push([circular])

    jest.spyOn(console, "error").mockImplementation(() => {})

    expect(serializeRelayHydrationData(circular)).toBe("[]")
    expect(console.error).toHaveBeenCalled()
  })
})
