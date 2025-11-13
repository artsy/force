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
  expect(mockTrackEvent).toHaveBeenCalledTimes(expectedEvents.length)
  expectedEvents.forEach((event, index) => {
    expect(mockTrackEvent.mock.calls[index][0]).toMatchObject({
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
  describe("mode and source hook props", () => {
    it("tracks correct flow for buy, offer and partner offer", () => {
      const { result, rerender } = renderHook(
        props => useCheckoutTracking(props),
        {
          initialProps: { source: "artwork", mode: "BUY" },
        }
      )

      act(() => {
        result.current.submittedOrder({ walletType: "applePay" })
        rerender({
          source: "artwork",
          mode: "OFFER",
        })
      })

      act(() => {
        result.current.submittedOrder({ walletType: "applePay" })

        rerender({
          source: "PARTNER_OFFER",
          mode: "BUY",
        })
      })

      act(() => {
        result.current.submittedOrder({ walletType: "applePay" })
      })

      assertTracked(
        {
          flow: "Buy now",
          context_page_owner_type: "orders-checkout",
          order_id: "order-id",
        },
        {
          flow: "Make offer",
          context_page_owner_type: "orders-checkout",
          order_id: "order-id",
        },
        {
          flow: "Partner offer",
          context_page_owner_type: "orders-checkout",
          order_id: "order-id",
        }
      )
    })
  })

  describe("clickedBuyerProtection", () => {
    /*
     *    action: "clickedBuyerProtection",
     *    context_module: "OrdersCheckout",
     *    context_page_owner_type: "orders-checkout",
     *    context_page_owner_id: "57e60c68-a198-431e-8a02-6ecb01e3a99b",
     *    destination_page_owner_type: "articles",
     *    destination_page_owner_slug: "360048946973-How-does-Artsy-protect-me"
     */
    it("tracks click", () => {
      const { result } = renderHook(() =>
        useCheckoutTracking({
          source: "artwork",
          mode: "BUY",
        })
      )

      act(() => {
        result.current.clickedBuyerProtection()
      })

      assertTracked({
        action: "clickedBuyerProtection",
        context_module: "ordersCheckout",
      })
    })
  })

  describe("clickedPaymentMethod", () => {
    it("tracks clicked payment method passing amountMinor and currency values through", () => {
      const { result } = renderHook(() =>
        useCheckoutTracking({
          source: "artwork",
          mode: "BUY",
        })
      )

      act(() => {
        result.current.clickedPaymentMethod({
          paymentMethod: "CREDIT_CARD",
          amountMinor: 12345,
          currency: "USD",
        })
      })

      assertTracked({
        action: "clickedPaymentMethod",
        flow: "Buy now",
        subject: "click payment method",
        payment_method: "CREDIT_CARD",
        amount: 12345,
        currency: "USD",
        context_page_owner_type: "orders-checkout",
        order_id: "order-id",
      })
    })
  })
  describe("submittedOrder", () => {
    it("tracks submitted order event with optional wallet type", () => {
      const { result } = renderHook(() =>
        useCheckoutTracking({
          source: "artwork",
          mode: "BUY",
        })
      )

      act(() => {
        result.current.submittedOrder({
          walletType: "applePay",
        })
      })

      assertTracked({
        action: "submittedOrder",
        flow: "Buy now",
        credit_card_wallet_type: "applePay",
      })

      act(() => {
        result.current.submittedOrder()
      })

      assertTracked({
        action: "submittedOrder",
        flow: "Buy now",
      })
    })

    it("tracks submitted offer event", () => {
      const { result } = renderHook(() =>
        useCheckoutTracking({
          source: "artwork",
          mode: "OFFER",
        })
      )

      act(() => {
        result.current.submittedOrder()
      })

      assertTracked({
        action: "submittedOffer",
        flow: "Make offer",
      })
    })

    it("tracks submitted order event with partner offer", () => {
      const { result } = renderHook(() =>
        useCheckoutTracking({
          source: "PARTNER_OFFER",
          mode: "BUY",
        })
      )

      act(() => {
        result.current.submittedOrder()
      })

      assertTracked({
        action: "submittedOrder",
        flow: "Partner offer",
        context_page_owner_type: "orders-checkout",
        order_id: "order-id",
      })
    })
  })
})
