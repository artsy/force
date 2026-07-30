import { fireEvent, screen, within } from "@testing-library/react"
import { Order2OfferHistory } from "Apps/Order2/Routes/Respond/Components/Order2OfferHistory"
import { Order2RespondContextProvider } from "Apps/Order2/Routes/Respond/RespondContext/Order2RespondContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2OfferHistoryTestQuery } from "__generated__/Order2OfferHistoryTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "order-id",
    contextPageOwnerSlug: "page-owner-slug",
    contextPageOwnerType: "orders-respond",
  })),
}))

const { renderWithRelay } = setupTestWrapperTL<Order2OfferHistoryTestQuery>({
  Component: (props: any) => {
    return (
      <Order2RespondContextProvider order={props.me.order}>
        <Order2OfferHistory order={props.me.order} />
      </Order2RespondContextProvider>
    )
  },
  query: graphql`
    query Order2OfferHistoryTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2RespondContext_order
          ...Order2OfferHistory_order
        }
      }
    }
  `,
})

// A gallery offer (complete) + a buyer offer with no buyerTotal (incomplete).
// `lastSubmittedOffer` is the gallery offer being responded to (offer-1).
const withOffers = {
  Order: () => ({
    lastSubmittedOffer: { internalID: "offer-1" },
    submittedOffers: [
      {
        internalID: "offer-1",
        createdAt: "January 1, 2026",
        fromParticipant: "SELLER",
        amount: { amount: "1,000.00", currencySymbol: "$" },
        buyerTotal: { amount: "1,100.00", currencySymbol: "$" },
      },
      {
        internalID: "offer-2",
        createdAt: "January 2, 2026",
        fromParticipant: "BUYER",
        amount: { amount: "900.00", currencySymbol: "$" },
        buyerTotal: null,
      },
    ],
  }),
}

describe("Order2OfferHistory", () => {
  it("renders the 'Offer history' expandable", () => {
    renderWithRelay(withOffers)

    expect(screen.getByText("Offer history")).toBeInTheDocument()
  })

  it("renders a row per submitted offer with date, source, offer and total", () => {
    renderWithRelay(withOffers)
    fireEvent.click(screen.getByText("Offer history"))

    // Gallery (seller) offer
    expect(screen.getByText("January 1, 2026")).toBeInTheDocument()
    expect(screen.getByText("Gallery")).toBeInTheDocument()
    expect(screen.getByText("$1,000.00")).toBeInTheDocument()
    expect(screen.getByText("$1,100.00")).toBeInTheDocument()

    // Buyer ("You") offer
    expect(screen.getByText("January 2, 2026")).toBeInTheDocument()
    expect(screen.getByText("You")).toBeInTheDocument()
    expect(screen.getByText("$900.00")).toBeInTheDocument()
  })

  it("marks the gallery offer being responded to with a single indicator", () => {
    renderWithRelay(withOffers)
    fireEvent.click(screen.getByText("Offer history"))

    const indicators = screen.getAllByTestId("responded-to-offer-indicator")
    expect(indicators).toHaveLength(1)

    // The indicator sits in the gallery (offer-1) row: walk up to the nearest
    // ancestor holding the "Gallery" label — it must not also hold the buyer
    // row's "You" label.
    let row: HTMLElement | null = indicators[0].parentElement
    while (row && !within(row).queryByText("Gallery")) {
      row = row.parentElement
    }
    expect(row).not.toBeNull()
    expect(
      within(row as HTMLElement).queryByText("You"),
    ).not.toBeInTheDocument()
  })

  it("shows no indicator when no offer matches lastSubmittedOffer", () => {
    renderWithRelay({
      Order: () => ({
        lastSubmittedOffer: { internalID: "not-in-history" },
        submittedOffers: [
          {
            internalID: "offer-1",
            createdAt: "January 1, 2026",
            fromParticipant: "SELLER",
            amount: { amount: "1,000.00", currencySymbol: "$" },
            buyerTotal: { amount: "1,100.00", currencySymbol: "$" },
          },
        ],
      }),
    })
    fireEvent.click(screen.getByText("Offer history"))

    expect(
      screen.queryByTestId("responded-to-offer-indicator"),
    ).not.toBeInTheDocument()
  })

  it("shows N/A when an offer has no buyerTotal", () => {
    renderWithRelay(withOffers)
    fireEvent.click(screen.getByText("Offer history"))

    expect(screen.getByText("N/A")).toBeInTheDocument()
  })

  it("renders nothing when there are no submitted offers", () => {
    renderWithRelay({ Order: () => ({ submittedOffers: [] }) })

    expect(screen.queryByText("Offer history")).not.toBeInTheDocument()
  })

  describe("analytics", () => {
    const mockTrackEvent = jest.fn()

    beforeAll(() => {
      ;(useTracking as jest.Mock).mockImplementation(() => ({
        trackEvent: mockTrackEvent,
      }))
    })

    afterEach(() => {
      mockTrackEvent.mockReset()
    })

    it("tracks toggledOfferHistory when expanding and collapsing", () => {
      renderWithRelay(withOffers)

      fireEvent.click(screen.getByText("Offer history"))

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "toggledOfferHistory",
        context_module: "ordersCounter",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
        expanded: false,
      })

      fireEvent.click(screen.getByText("Offer history"))

      expect(mockTrackEvent).toHaveBeenLastCalledWith({
        action: "toggledOfferHistory",
        context_module: "ordersCounter",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
        expanded: true,
      })
    })
  })
})
