import {
  TransactionDetailsSummaryItemTestQueryRawResponse,
  TransactionDetailsSummaryItemTestQueryResponse,
} from "v2/__generated__/TransactionDetailsSummaryItemTestQuery.graphql"
import {
  BuyOrderWithSelectedShippingQuote,
  OfferOrderWithOffers,
  OfferWithTotals,
  UntouchedBuyOrder,
} from "v2/Apps/__tests__/Fixtures/Order"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { TransactionDetailsSummaryItemFragmentContainer } from "../TransactionDetailsSummaryItem"
import { Text } from "@artsy/palette"

jest.unmock("react-relay")

type TestOfferOrder = Extract<
  TransactionDetailsSummaryItemTestQueryRawResponse["order"],
  { __typename: "CommerceOfferOrder" }
>
type TestBuyOrder = Exclude<
  TransactionDetailsSummaryItemTestQueryRawResponse["order"],
  { __typename: "CommerceBuyOrder" }
>

const transactionSummaryBuyOrder: TestBuyOrder = {
  ...UntouchedBuyOrder,
  shippingTotal: "$12.00",
  shippingTotalCents: 1200,
  taxTotal: "$3.25",
  taxTotalCents: 325,
  itemsTotal: "$200.00",
  buyerTotal: "$215.25",
}

const transactionSummaryBuyOrderWithSelectedShippingQuote: TestBuyOrder = {
  ...BuyOrderWithSelectedShippingQuote,
  shippingTotal: "$12.00",
  shippingTotalCents: 1200,
  taxTotal: "$3.25",
  taxTotalCents: 325,
  itemsTotal: "$200.00",
  buyerTotal: "$215.25",
}

const transactionSummaryOfferOrder: TestOfferOrder = {
  ...OfferOrderWithOffers,
  shippingTotal: "$12.00",
  shippingTotalCents: 1200,
  taxTotal: "$3.25",
  taxTotalCents: 325,
  itemsTotal: "$200.00",
  buyerTotal: "$215.25",
}

const transactionSummaryOfferOrderPounds: TestOfferOrder = {
  ...OfferOrderWithOffers,
  shippingTotal: "£12.00",
  shippingTotalCents: 1200,
  taxTotal: "£3.25",
  taxTotalCents: 325,
  itemsTotal: "£200.00",
  buyerTotal: "£215.25",
  currencyCode: "GBP",
}

const render = (
  order: TransactionDetailsSummaryItemTestQueryRawResponse["order"],
  extraProps?: Partial<
    ExtractProps<typeof TransactionDetailsSummaryItemFragmentContainer>
  >
) =>
  renderRelayTree({
    Component: (props: TransactionDetailsSummaryItemTestQueryResponse) => (
      <TransactionDetailsSummaryItemFragmentContainer
        {...props}
        {...extraProps}
      />
    ),
    mockData: { order },
    query: graphql`
      query TransactionDetailsSummaryItemTestQuery
        @raw_response_type
        @relay_test_operation {
        order: commerceOrder(id: "whatevs") {
          ...TransactionDetailsSummaryItem_order
        }
      }
    `,
  })

describe("TransactionDetailsSummaryItem", () => {
  describe("Order breakdown messaging", () => {
    it("shows the shipping and tax price as 'Calculated in next steps' when null before shipping address was added", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryBuyOrder,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
        },
        { transactionStep: "shipping" }
      )

      const text = transactionSummary.text()

      expect(text).toMatch("ShippingCalculated in next steps")
      expect(text).toMatch("Tax*Calculated in next steps")
    })

    it("shows the shipping and tax price as 'Waiting for final costs' when null after shipping address was added", async () => {
      const transactionSummary = await render({
        ...transactionSummaryBuyOrder,
        taxTotal: null,
        taxTotalCents: null,
        shippingTotal: null,
        shippingTotalCents: null,
      })

      const text = transactionSummary.text()

      expect(text).toMatch("Shipping**Waiting for final costs")
      expect(text).toMatch("Tax*Waiting for final costs")
    })

    it("shows tax import reminder", async () => {
      const transactionSummary = await render({ ...transactionSummaryBuyOrder })

      const text = transactionSummary.text()

      expect(text).toMatch("Tax*")
      expect(text).toMatch("*Additional duties and taxes may apply at import")
    })

    it("shows shipping confirmation note when shipping cannot be calculated after shipping address was added", async () => {
      const transactionSummary = await render({
        ...transactionSummaryBuyOrder,
        shippingTotal: null,
        shippingTotalCents: null,
      })

      const text = transactionSummary.text()

      expect(text).toMatch(
        "**Shipping costs to be confirmed by gallery. You will be able to review the total price before payment."
      )
    })

    it("does not show list price in the transaction summary", async () => {
      const transactionSummary = await render({
        ...transactionSummaryOfferOrder,
      })

      const text = transactionSummary.text()

      expect(text).not.toMatch("List price")
    })

    it("shows 'Waiting for final costs' when buyer total has not been calucuated yet", async () => {
      const transactionSummary = await render({
        ...transactionSummaryBuyOrder,
        buyerTotal: null,
      })

      const text = transactionSummary.text()

      expect(text).toMatch("TotalWaiting for final costs")
    })
  })

  describe("CommerceBuyOrder", () => {
    it("shows a US prefix on the price when currency is USD", async () => {
      const transactionSummary = await render(transactionSummaryBuyOrder)

      const entry = transactionSummary.find("Entry")

      expect(entry.at(0).text()).toMatch("PriceUS$200.00")
      expect(entry.at(1).text()).toMatch("ShippingUS$12.00")
      expect(entry.at(2).text()).toMatch("Tax*US$3.25")
      expect(entry.at(3).text()).toMatch("TotalUS$215.25")
    })

    it("shows the shipping and tax price if it's greater than 0", async () => {
      const transactionSummary = await render(transactionSummaryBuyOrder)

      const text = transactionSummary.text()

      expect(text).toMatch("PriceUS$200.00")
      expect(text).toMatch("ShippingUS$12.00")
      expect(text).toMatch("Tax*US$3.25")
      expect(text).toMatch("TotalUS$215.25")
    })

    it("shows the shipping quote name if shipping by Arta", async () => {
      const transactionSummary = await render(
        transactionSummaryBuyOrderWithSelectedShippingQuote
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Premium delivery")
    })

    it("shows the congratulations message when order gets submmited", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryBuyOrder,
        },
        {
          showCongratulationMessage: true,
        }
      )

      const textWrappers = transactionSummary.find(Text)

      expect(textWrappers.map(text => text.text())).toContain(
        "Congratulations! This artwork will be added to your Collection once the gallery confirms the order."
      )
      expect(textWrappers.map(text => text.text())).toContain(
        "View and manage all artworks in your Collection on the Artsy app."
      )
    })
  })

  describe("CommerceOfferOrder", () => {
    it("shows the shipping and tax price if it's greater than 0", async () => {
      const transactionSummary = await render(transactionSummaryOfferOrder)

      const text = transactionSummary.text()

      expect(text).toMatch("Your offerUS$14,000")
      expect(text).toMatch("ShippingUS$200")
      expect(text).toMatch("Tax*US$120")
      expect(text).toMatch("TotalUS$14,320")
    })

    it("shows the last submitted offer if requested", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrderPounds,
          __typename: "CommerceOfferOrder",
          lastOffer: {
            ...OfferWithTotals,
            id: "last-offer",
            amount: "£poundz",
            fromParticipant: "SELLER",
          },
          myLastOffer: {
            ...OfferWithTotals,
            id: "my-last-offer",
            amount: "$dollaz",
            fromParticipant: "BUYER",
          },
        },
        { useLastSubmittedOffer: true }
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Seller's offer£poundz")
    })

    it("says 'seller's offer' when the last submitted offer is from the seller", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrderPounds,
          lastOffer: {
            ...OfferWithTotals,
            id: "seller-offer-id",
            amount: "£405.00",
            fromParticipant: "SELLER",
          },
        },
        { useLastSubmittedOffer: true }
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Seller's offer£405.00")
    })

    it("takes an offer override parameter", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrder,
          lastOffer: {
            ...OfferWithTotals,
            id: "seller-offer-id",
            amount: "£405.00",
            fromParticipant: "SELLER",
          },
        },
        { useLastSubmittedOffer: true, offerOverride: "$1billion" }
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Your offerUS$1billion")
    })

    it("lets you specify whether to use list price or last offer as context price", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrderPounds,
          lastOffer: {
            ...OfferWithTotals,
            amount: "£405.00",
            id: "last-offer",
            fromParticipant: "SELLER",
          },
          myLastOffer: {
            ...OfferWithTotals,
            id: "my-last-offer",
            amount: "£400.00",
            fromParticipant: "BUYER",
          },
        },
        { offerContextPrice: "LAST_OFFER" }
      )

      const text = transactionSummary.text()

      expect(text).toContain("Your offer£400.00Seller's offer£405.00")
    })
  })
})
