import { renderHook } from "@testing-library/react-hooks"
import { useImagePerformanceObserver } from "Utils/Hooks/useImagePerformanceObserver"
import { sendToVolley } from "Server/volley"

jest.mock("Server/volley", () => {
  return {
    sendToVolley: jest.fn(),
  }
})

describe("useImagePerformanceObserver", () => {
  const mockSendToVolley = sendToVolley as jest.Mock

  class MockPerformanceObserver {
    observe = jest.fn()
    disconnect = jest.fn()
  }

  beforeEach(() => {
    jest.useFakeTimers()

    // @ts-ignore
    global.PerformanceObserver = MockPerformanceObserver
  })

  afterEach(() => {
    jest.useRealTimers()

    // @ts-ignore
    delete global.PerformanceObserver

    mockSendToVolley.mockReset()
  })

  it("returns the queue", () => {
    const { result } = renderHook(useImagePerformanceObserver)
    expect(result.current).toEqual({ current: [] })
  })

  it("sends and clears the queue", () => {
    const spy = jest.fn()
    mockSendToVolley.mockImplementation(spy)

    const { result } = renderHook(useImagePerformanceObserver)

    result.current.current = [
      {
        initiatorType: "img",
        transferSize: 10000,
        name:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=100&quality=80",
        duration: 100,
      },
      {
        initiatorType: "img",
        transferSize: 3333333,
        name:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=100&quality=80",
        duration: 333,
      },
      {
        initiatorType: "img",
        transferSize: 100000,
        name:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=100&quality=80",
        duration: 150,
      },
    ]

    jest.advanceTimersByTime(5000)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith([
      {
        name: "image.load-time",
        tags: ["transfer-size:sm", "device-type:desktop"],
        timing: 100,
        type: "timing",
      },
      {
        name: "image.load-time",
        tags: ["transfer-size:xl", "device-type:desktop"],
        timing: 333,
        type: "timing",
      },
      {
        name: "image.load-time",
        tags: ["transfer-size:md", "device-type:desktop"],
        timing: 150,
        type: "timing",
      },
    ])

    jest.advanceTimersByTime(5000)

    expect(spy).toBeCalledTimes(1)
    expect(result.current.current).toEqual([])
  })

  it('does not error if "PerformanceObserver" is not available', () => {
    // @ts-ignore
    delete global.PerformanceObserver

    const { result } = renderHook(useImagePerformanceObserver)
    expect(result.current).toEqual({ current: [] })
  })
})
