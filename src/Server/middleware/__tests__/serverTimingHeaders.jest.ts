import {
  serverTimingHeaders,
  setTimingHeader,
} from "Server/middleware/serverTimingHeaders"

const runRequest = ({ serverTiming }: { serverTiming?: string }) => {
  const headers: Record<string, string> = {}
  const res: any = {
    writeHead: jest.fn(),
    set: (name: string, value: string) => {
      headers[name] = value
    },
  }
  const req: any = { query: serverTiming ? { serverTiming } : {} }

  serverTimingHeaders(req, res, jest.fn())
  setTimingHeader({ res, name: "render", start: performance.now() })
  res.writeHead(200)

  return headers
}

describe("serverTimingHeaders", () => {
  it("adds a named render metric next to total", () => {
    const headers = runRequest({ serverTiming: "true" })

    expect(headers["Server-Timing"]).toMatch(/render;dur=\d+(\.\d+)?/)
    expect(headers["Server-Timing"]).toMatch(/total;dur=\d+(\.\d+)?/)
  })

  it("adds no metrics without the serverTiming query", () => {
    const headers = runRequest({})

    expect(headers["Server-Timing"]).toBeUndefined()
  })
})
