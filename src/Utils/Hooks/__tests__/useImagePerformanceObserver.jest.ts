import { renderHook } from "@testing-library/react-hooks"
import {
  pixelRatio,
  transferSize,
  useImagePerformanceObserver,
} from "Utils/Hooks/useImagePerformanceObserver"
import { sendToVolley } from "Server/volley"

jest.mock("Server/volley", () => {
  return {
    sendToVolley: jest.fn(),
  }
})

const kb = (size: number) => size * 1000

describe("transferSize", () => {
  it("buckets into 100kb bands", () => {
    expect(transferSize(kb(1))).toEqual("0-100kb")
    expect(transferSize(kb(50))).toEqual("0-100kb")
    expect(transferSize(kb(99.9))).toEqual("0-100kb")
    expect(transferSize(kb(100))).toEqual("100-200kb")
    expect(transferSize(kb(199.999))).toEqual("100-200kb")
    expect(transferSize(kb(201))).toEqual("200-300kb")
    expect(transferSize(kb(1000))).toEqual("1000-1100kb")
  })
})

describe("pixelRatio", () => {
  it("rounds to either 1x or 2x", () => {
    expect(pixelRatio(0)).toEqual(1)
    expect(pixelRatio(0.25)).toEqual(1)
    expect(pixelRatio(1)).toEqual(1)
    expect(pixelRatio(1.1)).toEqual(1)
    expect(pixelRatio(1.5)).toEqual(2)
    expect(pixelRatio(1.9)).toEqual(2)
    expect(pixelRatio(2)).toEqual(2)
    expect(pixelRatio(2.1)).toEqual(2)
    expect(pixelRatio(3)).toEqual(2)
  })
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
        rootPath: "article",
        entry: {
          initiatorType: "img",
          transferSize: 10000,
          name:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=100&quality=80",
          duration: 100,
        },
      },
      {
        rootPath: "article",
        entry: {
          initiatorType: "img",
          transferSize: 3333333,
          name:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=100&quality=80",
          duration: 333,
        },
      },
      {
        rootPath: "article",
        entry: {
          initiatorType: "img",
          transferSize: 100000,
          name:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=100&quality=80",
          duration: 150,
        },
      },
    ]

    jest.advanceTimersByTime(5000)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith([
      {
        name: "image.load-time",
        tags: [
          "transfer-size:0-100kb",
          "device-type:desktop",
          "pixel-ratio:1",
          "root-path:article",
          "image-service:gemini",
        ],
        timing: 100,
        type: "timing",
      },
      {
        name: "image.load-time",
        tags: [
          "transfer-size:3300-3400kb",
          "device-type:desktop",
          "pixel-ratio:1",
          "root-path:article",
          "image-service:gemini",
        ],
        timing: 333,
        type: "timing",
      },
      {
        name: "image.load-time",
        tags: [
          "transfer-size:100-200kb",
          "device-type:desktop",
          "pixel-ratio:1",
          "root-path:article",
          "image-service:gemini",
        ],
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
