import { RedirectException } from "found"
import { order2Routes } from "../order2Routes"

// Mock the required dependencies
jest.mock("Apps/Order/redirects", () => ({
  newCheckoutEnabled: jest.fn(() => true),
  newDetailsEnabled: jest.fn(() => true),
}))

jest.mock("Utils/logger", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    warn: jest.fn(),
  })),
}))

describe("order2Routes redirect logic", () => {
  const mockMatch = {
    context: {
      featureFlags: {},
    },
    location: {
      pathname: "/orders2/test-order-id/checkout",
    },
  }

  const mockViewer = {
    me: {
      order: {
        internalID: "test-order-id",
        mode: "BUY",
        buyerState: "INCOMPLETE",
      },
    },
  }

  describe("checkout route redirects", () => {
    it("redirects to details page when buyerState is not INCOMPLETE", () => {
      const checkoutRoute = order2Routes[0].children?.[0] // checkout route
      const renderFn = checkoutRoute?.render

      const propsWithSubmittedOrder = {
        viewer: {
          ...mockViewer,
          me: {
            ...mockViewer.me,
            order: {
              ...mockViewer.me.order,
              buyerState: "SUBMITTED",
            },
          },
        },
        match: mockMatch,
      }

      expect(() => {
        renderFn?.({
          props: propsWithSubmittedOrder,
          Component: jest.fn(),
        })
      }).toThrow(RedirectException)
    })

    it("does not redirect when buyerState is INCOMPLETE", () => {
      const checkoutRoute = order2Routes[0].children?.[0] // checkout route
      const renderFn = checkoutRoute?.render

      const propsWithIncompleteOrder = {
        viewer: mockViewer,
        match: mockMatch,
      }

      expect(() => {
        renderFn?.({
          props: propsWithIncompleteOrder,
          Component: jest.fn(),
        })
      }).not.toThrow()
    })
  })
})
