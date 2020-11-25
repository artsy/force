import { Button, Collapse } from "@artsy/palette"
import {
  OfferHistoryItemTestQueryRawResponse,
  OfferHistoryItemTestQueryResponse,
} from "v2/__generated__/OfferHistoryItemTestQuery.graphql"
import {
  OfferWithTotals,
  Offers,
  UntouchedOfferOrder,
} from "v2/Apps/__tests__/Fixtures/Order"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { OfferHistoryItemFragmentContainer as OfferHistoryItem } from "../OfferHistoryItem"

jest.unmock("react-relay")

const order: OfferHistoryItemTestQueryRawResponse["order"] = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
}

const render = (
  extraOrderProps?: Partial<typeof order>,
  extraComponentProps?: Partial<ExtractProps<typeof OfferHistoryItem>>
) =>
  renderRelayTree({
    Component: (props: OfferHistoryItemTestQueryResponse) => (
      <OfferHistoryItem {...extraComponentProps} {...props} />
    ),
    mockData: {
      order: {
        ...order,
        ...extraOrderProps,
      },
    },
    query: graphql`
      query OfferHistoryItemTestQuery @raw_response_type {
        order: commerceOrder(id: "foo") {
          ...OfferHistoryItem_order
        }
      }
    `,
  })

describe("OfferHistoryItem", () => {
  it("shows the current offer", async () => {
    const offerHistory = await render()

    const text = offerHistory.text()

    expect(text).toMatch("Seller's offer$14,000")
    expect(text).toMatch("List price: $16,000")
  })

  it("doesn't show the 'show offer history' button if no other offers", async () => {
    const offerHistory = await render()

    expect(offerHistory.find(Button)).toHaveLength(0)
  })

  it("does show the 'show offer history' button if there are other offers", async () => {
    const offerHistory = await render({ offers: { edges: Offers } })

    expect(offerHistory.find(Button)).toHaveLength(1)
  })

  it("shows the other offers if you click the button", async () => {
    const offerHistory = await render({ offers: { edges: Offers } })

    const button = offerHistory.find(Button)
    expect(button).toHaveLength(1)

    const collapse = offerHistory.find(Collapse)

    expect(collapse.props().open).toBeFalsy()

    button.simulate("click")

    expect(offerHistory.find(Collapse).props().open).toBeTruthy()

    const text = offerHistory.text()
    expect(text).toMatch("You (May 21)$1,200.00")
    expect(text).toMatch("Seller (Apr 30)$1,500.00")
    expect(text).toMatch("You (Apr 5)$1,100.00")
  })

  it("shows right copy if the last submitted offer was from the buyer", async () => {
    const offerHistory = await render({
      lastOffer: {
        ...OfferWithTotals,
        fromParticipant: "BUYER",
        id: "buyer-last-offer",
      } as any,
    })

    const text = offerHistory.text()

    expect(text).toMatch("Your offer$14,000")
  })
})
