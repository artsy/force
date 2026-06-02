import { act, renderHook } from "@testing-library/react-hooks"
import { useSectionReadiness, useSectionReady } from "../useSectionReadiness"

describe("useSectionReadiness", () => {
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it("waitFor resolves when the section becomes ready", async () => {
    const { result } = renderHook(() =>
      useSectionReadiness(["a", "b"] as const),
    )

    let resolved = false
    const promise = result.current.waitFor(["a"]).then(() => {
      resolved = true
    })

    expect(resolved).toBe(false)

    act(() => {
      result.current.markReady("a")
    })

    await promise

    expect(resolved).toBe(true)
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it("waitFor resolves after the timeout when a section never reports ready, and warns", async () => {
    const { result } = renderHook(() =>
      useSectionReadiness(["a", "b"] as const),
    )

    await result.current.waitFor(["a"], { timeoutMs: 50 })

    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy.mock.calls[0][0]).toMatch(/did not become ready/)
    expect(result.current.mode.a).toBe("Ready")
  })

  it("waitUntil resolves via timeout if a prior section never reports ready", async () => {
    const { result } = renderHook(() =>
      useSectionReadiness(["a", "b", "c"] as const),
    )

    await result.current.waitUntil("c", { timeoutMs: 50 })

    expect(result.current.navigating.c).toBe(false)
    expect(result.current.mode.a).toBe("Ready")
    expect(result.current.mode.b).toBe("Ready")
  })

  it("a subsequent waitFor on a timed-out section resolves immediately", async () => {
    const { result } = renderHook(() => useSectionReadiness(["a"] as const))

    await result.current.waitFor(["a"], { timeoutMs: 25 })

    expect(result.current.mode.a).toBe("Ready")

    let secondResolved = false
    await result.current.waitFor(["a"], { timeoutMs: 25 })
    secondResolved = true

    expect(secondResolved).toBe(true)
  })

  it("disables the timeout when timeoutMs <= 0", async () => {
    const { result } = renderHook(() => useSectionReadiness(["a"] as const))

    let resolved = false
    const promise = result.current.waitFor(["a"], { timeoutMs: 0 }).then(() => {
      resolved = true
    })

    await new Promise(r => setTimeout(r, 50))
    expect(resolved).toBe(false)

    act(() => {
      result.current.markReady("a")
    })
    await promise
    expect(resolved).toBe(true)
  })
})

describe("useSectionReady", () => {
  it("does not call onReady synchronously when handleReady is invoked", () => {
    const onReady = jest.fn()
    const { result } = renderHook(() => useSectionReady({ onReady }))

    result.current.handleReady()

    expect(onReady).not.toHaveBeenCalled()
  })

  it("calls onReady after the next render following handleReady", () => {
    const onReady = jest.fn()
    const { result, rerender } = renderHook(() => useSectionReady({ onReady }))

    result.current.handleReady()
    expect(onReady).not.toHaveBeenCalled()

    // Simulates the re-render that happens in production when the Relay query
    // resolves and SystemQueryRenderer re-renders with data
    act(() => {
      rerender()
    })

    expect(onReady).toHaveBeenCalledTimes(1)
  })

  it("calls onReady only once even if handleReady is called multiple times", () => {
    const onReady = jest.fn()
    const { result, rerender } = renderHook(() => useSectionReady({ onReady }))

    // handleReady may be called on every render pass of the render prop
    result.current.handleReady()
    result.current.handleReady()
    result.current.handleReady()

    act(() => {
      rerender()
    })

    expect(onReady).toHaveBeenCalledTimes(1)
  })
})
