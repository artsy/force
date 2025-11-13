import {
  Offers,
  OfferWithTotals,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { OfferHistoryItemFragmentContainer } from "Apps/Order/Components/OfferHistoryItem"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { OfferHistoryItemTestQuery$rawResponse } from "__generated__/OfferHistoryItemTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const order: OfferHistoryItemTestQuery$rawResponse["order"] = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
}

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => <OfferHistoryItemFragmentContainer {...props} />,
  query: graphql`
    query OfferHistoryItemTestQuery @raw_response_type @relay_test_operation {
      order: commerceOrder(id: "foo") {
        ...OfferHistoryItem_order
      }
    }
  `,
})

describe("OfferHistoryItem", () => {
  it("shows the current offer", async () => {
    renderWithRelay({
      CommerceOrder: () => order,
    })

    expect(screen.getByText("Seller's offer")).toBeInTheDocument()
    expect(screen.getByText("US$14,000")).toBeInTheDocument()
    expect(screen.getByText("List price: US$16,000")).toBeInTheDocument()
  })

  it("doesn't show the 'show offer history' button if no other offers", async () => {
    renderWithRelay({
      CommerceOrder: () => order,
    })

    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("does show the 'show offer history' button if there are other offers", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        ...order,
        offers: { edges: Offers },
      }),
    })

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("shows the other offers if you click the button", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        ...order,
        offers: { edges: Offers },
      }),
    })

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(screen.getByText("You (May 21)")).toBeInTheDocument()
    expect(screen.getByText("US$1,200.00")).toBeInTheDocument()
    expect(screen.getByText("Seller (Apr 30)")).toBeInTheDocument()
    expect(screen.getByText("US$1,500.00")).toBeInTheDocument()
    expect(screen.getByText("You (Apr 5)")).toBeInTheDocument()
    expect(screen.getByText("US$1,100.00")).toBeInTheDocument()
  })

  it("shows right copy if the last submitted offer was from the buyer", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        ...order,
        lastOffer: {
          ...OfferWithTotals,
          fromParticipant: "BUYER",
          id: "buyer-last-offer",
        },
      }),
    })

    expect(screen.getByText("Your offer")).toBeInTheDocument()
    expect(screen.getByText("US$14,000")).toBeInTheDocument()
  })
})
