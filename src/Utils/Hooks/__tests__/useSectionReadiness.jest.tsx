import { act, renderHook } from "@testing-library/react-hooks"
import { useSectionReady } from "../useSectionReadiness"

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
