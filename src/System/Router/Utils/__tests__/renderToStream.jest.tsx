import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { renderToPipeableStream } from "react-dom/server"
import { ArtsyResponse } from "Server/middleware/artsyExpress"
import { renderToStream } from "System/Router/Utils/renderToStream"

jest.mock("react-dom/server", () => ({
  renderToPipeableStream: jest.fn(),
}))

describe("renderToStream", () => {
  const mockRenderToPipeableStream = renderToPipeableStream as jest.Mock

  const mockRes = ({
    statusCode: 0,
    setHeader: jest.fn(),
  } as unknown) as ArtsyResponse

  const mockSheet = {
    _emitSheetCSS: jest.fn(() => "mock-css"),
    instance: {
      clearTag: jest.fn(),
    },
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should set the response status and content type on shell ready", async () => {
    const mockPipe = jest.fn()
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      setTimeout(() => {
        options.onShellReady()
      })

      return { pipe: mockPipe, abort: mockAbort }
    })

    const jsx = <div>Hello World</div>
    renderToStream(jsx, mockSheet, mockRes)

    await flushPromiseQueue()

    expect(mockRes.statusCode).toBe(200)
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "text/html; charset=utf-8"
    )
    expect(mockPipe).toHaveBeenCalled()
  })

  it("should handle onError and set didError to true", async () => {
    const mockPipe = jest.fn()
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      options.onError(new Error("Test error"))

      setTimeout(() => {
        options.onShellReady()
      })

      return { pipe: mockPipe, abort: mockAbort }
    })

    const jsx = <div>Hello Error</div>
    renderToStream(jsx, mockSheet, mockRes)

    await flushPromiseQueue()

    expect(mockRes.statusCode).toBe(500)
    expect(mockPipe).toHaveBeenCalled()
  })

  it("should call abort if STREAM_TIMEOUT is reached", () => {
    jest.useFakeTimers()
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      return { pipe: jest.fn(), abort: mockAbort }
    })

    const jsx = <div>Timeout Test</div>
    renderToStream(jsx, mockSheet, mockRes)

    jest.advanceTimersByTime(5000)

    expect(mockAbort).toHaveBeenCalled()
    jest.useRealTimers()
  })

  // eslint-disable-next-line jest/no-done-callback
  it("should transform the stream and inject CSS into the HTML", done => {
    const mockPipe = jest.fn()
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      setTimeout(() => {
        options.onShellReady()
      })
      return { pipe: mockPipe, abort: mockAbort }
    })

    const jsx = <div>Stream Test</div>
    const stream = renderToStream(jsx, mockSheet, mockRes)

    stream.write("<html><head></head><body></body></html>")

    const chunks: string[] = []
    stream.on("data", chunk => {
      chunks.push(chunk)
    })

    stream.on("end", () => {
      const result = chunks.join("")
      expect(result).toContain(
        "<html><head>mock-css</head><body></body></html>"
      )
      done()
    })

    stream.end()
  })
})
