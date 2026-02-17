import { renderHook } from "@testing-library/react"
import { subscribeToInAppMessagesByPath } from "Server/analytics/brazeMessagingIntegration"
import { useBrazeSubscription } from "../useBrazeSubscription"
import { useSystemContext } from "../useSystemContext"

jest.mock("../useSystemContext")
jest.mock("Server/analytics/brazeMessagingIntegration")

const mockUseSystemContext = useSystemContext as jest.Mock
const mockSubscribeToInAppMessagesByPath =
  subscribeToInAppMessagesByPath as jest.Mock

describe("useBrazeSubscription", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    // Reset window.analytics and window.braze
    ;(window as any).analytics = {}
    ;(window as any).braze = { subscribeToInAppMessage: jest.fn() }
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    delete (window as any).analytics
    delete (window as any).braze
  })

  it("does not call subscribeToInAppMessagesByPath when user is logged out", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: false })

    renderHook(() => useBrazeSubscription())

    // Advance timers to ensure no subscription happens
    jest.advanceTimersByTime(100)

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
  })

  it("calls subscribeToInAppMessagesByPath when user is logged in and analytics/braze are ready", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })

    renderHook(() => useBrazeSubscription())

    // The hook polls asynchronously, so we need to advance timers
    jest.advanceTimersByTime(0)

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)
  })

  it("does not call subscribeToInAppMessagesByPath if window.braze is not available", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
    delete (window as any).braze

    renderHook(() => useBrazeSubscription())

    // Advance timers through a few polling attempts
    jest.advanceTimersByTime(500)

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
  })

  it("does not call subscribeToInAppMessagesByPath if window.analytics is not available", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
    delete (window as any).analytics

    renderHook(() => useBrazeSubscription())

    // Advance timers through a few polling attempts
    jest.advanceTimersByTime(500)

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
  })

  it("only subscribes once (prevents duplicate subscriptions)", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })

    const { rerender } = renderHook(() => useBrazeSubscription())

    // Advance timers to trigger subscription
    jest.advanceTimersByTime(0)

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)

    // Rerender the hook - should not call again
    rerender()

    // Advance timers again
    jest.advanceTimersByTime(100)

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)
  })

  it("handles user logging in mid-session (isLoggedIn changes from false to true)", () => {
    // Start logged out
    mockUseSystemContext.mockReturnValue({ isLoggedIn: false })

    const { rerender } = renderHook(() => useBrazeSubscription())

    jest.advanceTimersByTime(100)

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()

    // User logs in
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
    rerender()

    // Advance timers to trigger subscription
    jest.advanceTimersByTime(0)

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)
  })

  describe("polling behavior", () => {
    it("retries and subscribes when SDK loads after a delay", () => {
      mockUseSystemContext.mockReturnValue({ isLoggedIn: true })

      // Start with SDKs not available
      delete (window as any).analytics
      delete (window as any).braze

      renderHook(() => useBrazeSubscription())

      // Should not subscribe immediately
      expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()

      // Advance by 500ms (5 attempts) - still no SDKs
      jest.advanceTimersByTime(500)
      expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()

      // Now make SDKs available
      ;(window as any).analytics = {}
      ;(window as any).braze = { subscribeToInAppMessage: jest.fn() }

      // Advance by one more interval
      jest.advanceTimersByTime(100)

      // Should have subscribed now
      expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)
    })

    it("gives up after max attempts if SDK never loads", () => {
      mockUseSystemContext.mockReturnValue({ isLoggedIn: true })

      // SDKs never available
      delete (window as any).analytics
      delete (window as any).braze

      renderHook(() => useBrazeSubscription())

      // Should not subscribe immediately
      expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()

      // Advance past max attempts (20 * 100ms = 2000ms)
      jest.advanceTimersByTime(2100)

      // Should still not have subscribed and should not throw
      expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
    })

    it("stops polling when component unmounts", () => {
      mockUseSystemContext.mockReturnValue({ isLoggedIn: true })

      // Start with SDKs not available
      delete (window as any).analytics
      delete (window as any).braze

      const { unmount } = renderHook(() => useBrazeSubscription())

      // Should not subscribe immediately
      expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()

      // Advance by a few intervals
      jest.advanceTimersByTime(300)

      // Unmount before SDKs become available
      unmount()

      // Now make SDKs available
      ;(window as any).analytics = {}
      ;(window as any).braze = { subscribeToInAppMessage: jest.fn() }

      // Advance timers - should not subscribe because component unmounted
      jest.advanceTimersByTime(500)

      expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
    })

    it("resets and retries when user logs out then back in", () => {
      // Start logged in with SDKs available
      mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
      ;(window as any).analytics = {}
      ;(window as any).braze = { subscribeToInAppMessage: jest.fn() }

      const { rerender } = renderHook(() => useBrazeSubscription())

      // Should subscribe immediately
      expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)

      // User logs out
      mockUseSystemContext.mockReturnValue({ isLoggedIn: false })
      rerender()

      // SDKs become unavailable (simulating fresh page state)
      delete (window as any).analytics
      delete (window as any).braze

      // User logs back in
      mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
      rerender()

      // Should attempt to subscribe again (polling starts)
      jest.advanceTimersByTime(100)

      // SDKs available again
      ;(window as any).analytics = {}
      ;(window as any).braze = { subscribeToInAppMessage: jest.fn() }

      jest.advanceTimersByTime(100)

      // Should have subscribed again
      expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(2)
    })
  })
})
