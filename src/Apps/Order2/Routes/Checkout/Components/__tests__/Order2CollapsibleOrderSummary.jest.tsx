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

  it("tracks a click on the import fees link", async () => {
    await renderWithRelay({
      Order: () => mockOrder,
    })

    const importFeesLink = screen.getByText("may apply at import")
    fireEvent.click(importFeesLink)

    expect(mockTrackEvent).toHaveBeenCalledTimes(1)
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: "clickedImportFees",
      context_page_owner_id: "123",
      context_page_owner_type: "order",
      flow: "Buy now",
      context_module: "ordersCheckout",
      destination_page_owner_slug: "How-are-taxes-and-customs-fees-calculated",
      destination_page_owner_type: "articles",
    })
  })

  it("tracks a click to expand and unexpand the summary", async () => {
    await renderWithRelay({
      Order: () => mockOrder,
    })
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
