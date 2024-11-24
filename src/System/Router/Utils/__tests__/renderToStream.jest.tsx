import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { renderToPipeableStream, renderToStaticMarkup } from "react-dom/server"
import { ArtsyResponse } from "Server/middleware/artsyExpress"
import { ServerStyleSheet } from "styled-components"
import { renderToStream } from "System/Router/Utils/renderToStream"

jest.mock("react-dom/server", () => ({
  ...jest.requireActual("react-dom/server"),
  renderToPipeableStream: jest.fn(),
}))

describe("renderToStream", () => {
  const mockRenderToPipeableStream = renderToPipeableStream as jest.Mock

  const res = ({
    statusCode: 0,
    setHeader: jest.fn(),
    res: { write: jest.fn(), end: jest.fn() },
  } as unknown) as ArtsyResponse

  const sheet = ({
    _emitSheetCSS: jest.fn(() => "mock-css"),
    instance: {
      clearTag: jest.fn(),
    },
  } as unknown) as ServerStyleSheet

  const jsx = <div className="content">Hello World</div>

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

    renderToStream({ jsx, sheet, res })

    await flushPromiseQueue()

    expect(res.statusCode).toBe(200)
    expect(res.setHeader).toHaveBeenCalledWith(
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

    renderToStream({ jsx, sheet, res })

    await flushPromiseQueue()

    expect(res.statusCode).toBe(500)
    expect(mockPipe).toHaveBeenCalled()
  })

  it("should handle onShellError and set didError to true", async () => {
    const mockPipe = jest.fn()
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      options.onShellError(new Error("Test error"))

      setTimeout(() => {
        options.onShellReady()
      })

      return { pipe: mockPipe, abort: mockAbort }
    })

    renderToStream({ jsx, sheet, res })

    await flushPromiseQueue()

    expect(res.statusCode).toBe(500)
    expect(mockPipe).toHaveBeenCalled()
  })

  it("should call abort if STREAM_TIMEOUT is reached", () => {
    jest.useFakeTimers()
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      return { pipe: jest.fn(), abort: mockAbort }
    })

    const jsx = <div>Timeout Test</div>
    renderToStream({ jsx, sheet, res })

    jest.advanceTimersByTime(10000) // stream timeout

    expect(mockAbort).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it("should transform the stream and inject CSS into the HTML", async () => {
    const mockPipe = jest.fn()
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      setTimeout(() => {
        options.onShellReady()
      })
      return { pipe: mockPipe, abort: mockAbort }
    })

    const stream = renderToStream({ jsx, sheet, res })

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
    })

    await flushPromiseQueue()

    stream.end()
  })

  it("should insert the rendered JSX markup into the HTML body", async () => {
    const mockPipe = jest.fn(stream => {
      stream.write(renderToStaticMarkup(jsx))
      stream.end()
    })
    const mockAbort = jest.fn()

    mockRenderToPipeableStream.mockImplementation((_, options) => {
      setTimeout(() => {
        options.onShellReady()
      })
      return { pipe: mockPipe, abort: mockAbort }
    })

    const stream = renderToStream({ jsx, sheet, res })

    stream.write("<html><head></head><body>")

    const chunks: string[] = []
    stream.on("data", chunk => {
      chunks.push(chunk)
    })

    stream.on("end", () => {
      const result = chunks.join("")
      expect(result).toContain(
        '<html><head>mock-css</head><body><div class="content">Hello World</div>'
      )
    })

    await flushPromiseQueue()

    stream.end()
  })
})
