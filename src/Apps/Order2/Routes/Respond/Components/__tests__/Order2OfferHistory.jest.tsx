import { fireEvent, screen } from "@testing-library/react"
import { Order2OfferHistory } from "Apps/Order2/Routes/Respond/Components/Order2OfferHistory"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2OfferHistoryTestQuery } from "__generated__/Order2OfferHistoryTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<Order2OfferHistoryTestQuery>({
  Component: (props: any) => {
    return <Order2OfferHistory order={props.me.order} />
  },
  query: graphql`
    query Order2OfferHistoryTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
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

  it("shows INCOMPLETE ORDER when an offer has no buyerTotal", () => {
    renderWithRelay(withOffers)
    fireEvent.click(screen.getByText("Offer history"))

    expect(screen.getByText("INCOMPLETE ORDER")).toBeInTheDocument()
  })

  it("renders nothing when there are no submitted offers", () => {
    renderWithRelay({ Order: () => ({ submittedOffers: [] }) })

    expect(screen.queryByText("Offer history")).not.toBeInTheDocument()
  })
})
