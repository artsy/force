import { fireEvent, screen } from "@testing-library/react"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2CollapsibleOrderSummaryTestQuery } from "__generated__/Order2CollapsibleOrderSummaryTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2CollapsibleOrderSummary } from "../Order2CollapsibleOrderSummary"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => {
    const checkoutTracking = useCheckoutTracking({
      source: "artwork page",
      mode: "BUY",
    })
    return {
      checkoutTracking,
    }
  },
}))

jest.mock("System/Hooks/useAnalyticsContext", () => {
  return {
    useAnalyticsContext: jest.fn(() => ({
      contextPageOwnerId: "123",
      contextPageOwnerType: "order",
    })),
  }
})

const mockTrackEvent = jest.fn()
beforeEach(() => {
  mockTrackEvent.mockClear()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: mockTrackEvent,
  }))
})

const mockOrder = {
  itemsTotal: {
    display: "$42,000",
  },
  buyerTotal: null,
  taxTotal: null,
  shippingTotal: null,
  lineItems: [
    {
      artwork: {
        slug: "test-artwork",
      },
      artworkVersion: {
        title: "Test Artwork",
        date: "2023",
        artistNames: "Test Artist",
        image: {
          resized: {
            url: "https://example.com/image.jpg",
          },
        },
      },
    },
  ],
}

const { renderWithRelay } =
  setupTestWrapperTL<Order2CollapsibleOrderSummaryTestQuery>({
    Component: (props: any) => {
      return <Order2CollapsibleOrderSummary order={props.me.order!} />
    },
    query: graphql`
      query Order2CollapsibleOrderSummaryTestQuery @relay_test_operation {
        me {
          order(id: "123") {
            ...Order2CollapsibleOrderSummary_order
          }
        }
      }
    `,
  })

describe("Order2CollapsibleOrderSummary", () => {
  it("renders order summary details", async () => {
    await renderWithRelay({
      Order: () => mockOrder,
    })
    expect(
      screen.getByText("Test Artwork", { exact: false }),
    ).toBeInTheDocument()
    expect(screen.getByText("Test Artist")).toBeInTheDocument()
  })

  it("tracks a click to expand and unexpand the summary", async () => {
    await renderWithRelay({
      Order: () => mockOrder,
    })
    // expect(screen.getByText(/\*Additional duties and taxes/)).not.toBeVisible()
    const toggleButton = screen.getByText("$42,000")
    fireEvent.click(toggleButton)

    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: "toggledCollapsibleOrderSummary",
      context_page_owner_id: "123",
      context_page_owner_type: "order",
      flow: "Buy now",
      expanded: true,
    })

    mockTrackEvent.mockClear()

    // You may need to adjust the assertion depending on how collapse works
    fireEvent.click(toggleButton)

    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: "toggledCollapsibleOrderSummary",
      context_page_owner_id: "123",
      context_page_owner_type: "order",
      flow: "Buy now",
      expanded: false,
    })
  })
})
