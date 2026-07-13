import { fireEvent, screen } from "@testing-library/react"
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
const withOffers = {
  Order: () => ({
    submittedOffers: [
      {
        internalID: "offer-1",
        createdAt: "January 1, 2026",
        fromParticipant: "SELLER",
        amount: { display: "$1,000" },
        buyerTotal: { display: "$1,100" },
      },
      {
        internalID: "offer-2",
        createdAt: "January 2, 2026",
        fromParticipant: "BUYER",
        amount: { display: "$900" },
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
    expect(screen.getByText("$1,000")).toBeInTheDocument()
    expect(screen.getByText("$1,100")).toBeInTheDocument()

    // Buyer ("You") offer
    expect(screen.getByText("January 2, 2026")).toBeInTheDocument()
    expect(screen.getByText("You")).toBeInTheDocument()
    expect(screen.getByText("$900")).toBeInTheDocument()
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
        expanded: true,
      })

      fireEvent.click(screen.getByText("Offer history"))

      expect(mockTrackEvent).toHaveBeenLastCalledWith({
        action: "toggledOfferHistory",
        context_module: "ordersCounter",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
        expanded: false,
      })
    })
  })
})
