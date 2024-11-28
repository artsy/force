import { Button } from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { OfferHistoryItemTestQuery$rawResponse } from "__generated__/OfferHistoryItemTestQuery.graphql"
import {
  OfferWithTotals,
  Offers,
  UntouchedOfferOrder,
} from "Apps/__tests__/Fixtures/Order"
import { graphql } from "react-relay"
import { OfferHistoryItemFragmentContainer } from "Apps/Order/Components/OfferHistoryItem"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const order: OfferHistoryItemTestQuery$rawResponse["order"] = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
}

const { getWrapper } = setupTestWrapper({
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
    const { wrapper } = getWrapper({
      CommerceOrder: () => order,
    })

    const text = wrapper.text()

    expect(text).toMatch("Seller's offerUS$14,000")
    expect(text).toMatch("List price: US$16,000")
  })

  it("doesn't show the 'show offer history' button if no other offers", async () => {
    const { wrapper } = getWrapper({
      CommerceOrder: () => order,
    })

    expect(wrapper.find(Button)).toHaveLength(0)
  })

  it("does show the 'show offer history' button if there are other offers", async () => {
    const { wrapper } = getWrapper({
      CommerceOrder: () => ({
        ...order,
        offers: { edges: Offers },
      }),
    })

    expect(wrapper.find(Button)).toHaveLength(1)
  })

  it("shows the other offers if you click the button", async () => {
    const { wrapper } = getWrapper({
      CommerceOrder: () => ({
        ...order,
        offers: { edges: Offers },
      }),
    })

    const button = wrapper.find(Button)
    expect(button).toHaveLength(1)

    const collapse = wrapper.find(Collapse)

    expect(collapse.props().open).toBeFalsy()

    button.simulate("click")

    expect(wrapper.find(Collapse).props().open).toBeTruthy()

    const text = wrapper.text()
    expect(text).toMatch("You (May 21)US$1,200.00")
    expect(text).toMatch("Seller (Apr 30)US$1,500.00")
    expect(text).toMatch("You (Apr 5)US$1,100.00")
  })

  it("shows right copy if the last submitted offer was from the buyer", async () => {
    const { wrapper } = getWrapper({
      CommerceOrder: () => ({
        ...order,
        lastOffer: {
          ...OfferWithTotals,
          fromParticipant: "BUYER",
          id: "buyer-last-offer",
        },
      }),
    })

    const text = wrapper.text()

    expect(text).toMatch("Your offerUS$14,000")
  })
})
