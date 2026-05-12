import { fireEvent, screen } from "@testing-library/react"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2CollapsibleOrderSummaryTestQuery } from "__generated__/Order2CollapsibleOrderSummaryTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2CollapsibleOrderSummary } from "../Order2CollapsibleOrderSummary"

jest.unmock("react-relay")
jest.mock("react-tracking")

let mockIsEigen = false

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => {
    const checkoutTracking = useCheckoutTracking({
      source: "artwork page",
      mode: "BUY",
    })
    return {
      checkoutTracking,
      artworkPath: "/artwork/test-artwork",
    }
  },
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({
    isEigen: mockIsEigen,
  }),
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
  mockIsEigen = false
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
        internalID: "artwork-id",
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
      const checkoutTracking = useCheckoutTracking({
        source: "artwork page",
        mode: "BUY",
      })
      return (
        <Order2CollapsibleOrderSummary
          order={props.me.order!}
          checkoutTracking={checkoutTracking}
          artworkPath="/artwork/test"
        />
      )
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

  it("uses artworkVersion thumbnail image when available", async () => {
    await renderWithRelay({
      Order: () => ({
        ...mockOrder,
        lineItems: [
          {
            artwork: {
              slug: "test-artwork",
              figures: [
                {
                  __typename: "Image",
                  resizedSquare: {
                    url: "https://example.com/fallback-image.jpg",
                  },
                },
              ],
            },
            artworkVersion: {
              title: "Test Artwork",
              date: "2023",
              artistNames: "Test Artist",
              thumbnail: {
                url: "https://example.com/thumbnail.jpg",
                resizedSquare: {
                  url: "https://example.com/thumbnail-resized.jpg",
                },
              },
            },
          },
        ],
      }),
    })

    const image = screen.getByAltText("Test Artwork")
    expect(image).toHaveAttribute(
      "src",
      "https://example.com/thumbnail-resized.jpg",
    )
  })

  it("falls back to artwork figures when artworkVersion thumbnail is not available", async () => {
    await renderWithRelay({
      Order: () => ({
        ...mockOrder,
        lineItems: [
          {
            artwork: {
              slug: "test-artwork",
              figures: [
                {
                  __typename: "Image",
                  resizedSquare: {
                    url: "https://example.com/fallback-image.jpg",
                  },
                },
              ],
            },
            artworkVersion: {
              title: "Test Artwork",
              date: "2023",
              artistNames: "Test Artist",
              thumbnail: null,
            },
          },
        ],
      }),
    })

    const image = screen.getByAltText("Test Artwork")
    expect(image).toHaveAttribute(
      "src",
      "https://example.com/fallback-image.jpg",
    )
  })

  it("falls back to artwork figures when artworkVersion thumbnail url is missing", async () => {
    await renderWithRelay({
      Order: () => ({
        ...mockOrder,
        lineItems: [
          {
            artwork: {
              slug: "test-artwork",
              figures: [
                {
                  __typename: "Image",
                  resizedSquare: {
                    url: "https://example.com/fallback-image.jpg",
                  },
                },
              ],
            },
            artworkVersion: {
              title: "Test Artwork",
              date: "2023",
              artistNames: "Test Artist",
              thumbnail: {
                url: null,
                resizedSquare: {
                  url: "https://example.com/thumbnail-resized.jpg",
                },
              },
            },
          },
        ],
      }),
    })

    const image = screen.getByAltText("Test Artwork")
    expect(image).toHaveAttribute(
      "src",
      "https://example.com/fallback-image.jpg",
    )
  })

  it("opens artwork link in a new tab for non-Eigen", async () => {
    await renderWithRelay({
      Order: () => ({
        ...mockOrder,
        lineItems: [
          {
            artwork: {
              slug: "test-artwork",
              internalID: "artwork-id",
              figures: [
                {
                  __typename: "Image",
                  resizedSquare: {
                    url: "https://example.com/fallback-image.jpg",
                  },
                },
              ],
            },
            artworkVersion: {
              title: "Test Artwork",
              date: "2023",
              artistNames: "Test Artist",
              thumbnail: {
                url: "https://example.com/thumbnail.jpg",
                resizedSquare: {
                  url: "https://example.com/thumbnail-resized.jpg",
                },
              },
            },
          },
        ],
      }),
    })

    const artworkLink = screen.getByRole("link", { name: "Test Artwork" })

    expect(artworkLink).toHaveAttribute("target", "_blank")
    expect(artworkLink).toHaveAttribute("rel", "noopener noreferrer")

    mockTrackEvent.mockClear()
    fireEvent.click(artworkLink)

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedOrderArtworkImage",
        context_module: "ordersCheckout",
        destination_page_owner_id: "artwork-id",
        destination_page_owner_type: "artwork",
      }),
    )
  })

  it("prevents tap navigation for Eigen", async () => {
    mockIsEigen = true

    await renderWithRelay({
      Order: () => ({
        ...mockOrder,
        lineItems: [
          {
            artwork: {
              slug: "test-artwork",
              internalID: "artwork-id",
              figures: [
                {
                  __typename: "Image",
                  resizedSquare: {
                    url: "https://example.com/fallback-image.jpg",
                  },
                },
              ],
            },
            artworkVersion: {
              title: "Test Artwork",
              date: "2023",
              artistNames: "Test Artist",
              thumbnail: {
                url: "https://example.com/thumbnail.jpg",
                resizedSquare: {
                  url: "https://example.com/thumbnail-resized.jpg",
                },
              },
            },
          },
        ],
      }),
    })

    const artworkLink = screen.getByRole("link", { name: "Test Artwork" })
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })

    mockTrackEvent.mockClear()
    const shouldContinueDefaultBehavior = artworkLink.dispatchEvent(clickEvent)

    expect(shouldContinueDefaultBehavior).toBe(false)
    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action: "clickedOrderArtworkImage" }),
    )
  })
})
