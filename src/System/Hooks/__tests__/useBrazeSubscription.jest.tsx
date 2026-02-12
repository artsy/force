import { renderHook } from "@testing-library/react"
import { useBrazeSubscription } from "../useBrazeSubscription"
import { useSystemContext } from "../useSystemContext"
import { subscribeToInAppMessagesByPath } from "Server/analytics/brazeMessagingIntegration"

// Mock dependencies
jest.mock("../useSystemContext")
jest.mock("Server/analytics/brazeMessagingIntegration")

const mockUseSystemContext = useSystemContext as jest.Mock
const mockSubscribeToInAppMessagesByPath =
  subscribeToInAppMessagesByPath as jest.Mock

describe("useBrazeSubscription", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset window.analytics and window.braze
    ;(window as any).analytics = {}
    ;(window as any).braze = {}
  })

  afterEach(() => {
    delete (window as any).analytics
    delete (window as any).braze
  })

  it("does not call subscribeToInAppMessagesByPath when user is logged out", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: false })

    renderHook(() => useBrazeSubscription())

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
  })

  it("calls subscribeToInAppMessagesByPath when user is logged in and analytics/braze are ready", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })

    renderHook(() => useBrazeSubscription())

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)
  })

  it("does not call subscribeToInAppMessagesByPath if window.braze is not available", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
    delete (window as any).braze

    renderHook(() => useBrazeSubscription())

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
  })

  it("does not call subscribeToInAppMessagesByPath if window.analytics is not available", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
    delete (window as any).analytics

    renderHook(() => useBrazeSubscription())

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()
  })

  it("only subscribes once (prevents duplicate subscriptions)", () => {
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })

    const { rerender } = renderHook(() => useBrazeSubscription())

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)

    // Rerender the hook - should not call again
    rerender()

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)
  })

  it("handles user logging in mid-session (isLoggedIn changes from false to true)", () => {
    // Start logged out
    mockUseSystemContext.mockReturnValue({ isLoggedIn: false })

    const { rerender } = renderHook(() => useBrazeSubscription())

    expect(mockSubscribeToInAppMessagesByPath).not.toHaveBeenCalled()

    // User logs in
    mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
    rerender()

    expect(mockSubscribeToInAppMessagesByPath).toHaveBeenCalledTimes(1)
  })
})
