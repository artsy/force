import { act, renderHook } from "@testing-library/react-hooks"
import { useTracking } from "react-tracking"
import { useCheckoutTracking } from "../useCheckoutTracking"
jest.mock("react-tracking")
const mockTrackEvent = jest.fn()

jest.mock("System/Hooks/useAnalyticsContext", () => {
  const { OwnerType } = jest.requireActual("@artsy/cohesion")
  // This value is set in src/System/Contexts/AnalyticsContext
  const contextPageOwnerType = OwnerType.ordersCheckout
  return {
    useAnalyticsContext: () => ({
      contextPageOwnerType,
      contextPageOwnerId: "order-id",
    }),
  }
})

/**
 *  Assert that the given events were tracked in order.
 *  Then clear the mock for the next assertion.
 */
const assertTracked = (...expectedEvents) => {
  const standardValues = {
    context_page_owner_type: "orders-checkout",
    order_id: "order-id",
  }
  expect(mockTrackEvent).toHaveBeenCalledTimes(expectedEvents.length)
  expectedEvents.forEach((event, index) => {
    expect(mockTrackEvent.mock.calls[index][0]).toEqual({
      ...standardValues,
      ...event,
    })
  })
  mockTrackEvent.mockClear()
}

beforeEach(() => {
  mockTrackEvent.mockClear()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: mockTrackEvent,
  }))
})

describe("useCheckoutTracking", () => {
  describe("submittedOrder", () => {
    it("tracks submitted order event with optional wallet type", () => {
      const { result } = renderHook(() => useCheckoutTracking())

      act(() => {
        result.current.submittedOrder({
          source: "artwork",
          mode: "BUY",
          walletType: "applePay",
        })
      })

      assertTracked({
        action: "submittedOrder",
        flow: "Buy now",
        credit_card_wallet_type: "applePay",
      })

      act(() => {
        result.current.submittedOrder({
          source: "artwork",
          mode: "BUY",
        })
      })

      assertTracked({
        action: "submittedOrder",
        flow: "Buy now",
      })
    })

    it("tracks submitted offer event", () => {
      const { result } = renderHook(() => useCheckoutTracking())

      act(() => {
        result.current.submittedOrder({ source: "artwork", mode: "OFFER" })
      })

      assertTracked({
        action: "submittedOffer",
        flow: "Make offer",
      })
    })

    it("tracks submitted order event with partner offer", () => {
      const { result } = renderHook(() => useCheckoutTracking())

      act(() => {
        result.current.submittedOrder({ source: "PARTNER_OFFER", mode: "BUY" })
      })

      assertTracked({
        action: "submittedOrder",
        flow: "Partner offer",
      })
    })
  })
})
