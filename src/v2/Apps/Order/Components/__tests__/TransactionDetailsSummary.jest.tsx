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

const render = (
  order: TransactionDetailsSummaryItemTestQueryRawResponse["order"],
  extraProps?: Partial<
    ExtractProps<typeof TransactionDetailsSummaryItemFragmentContainer>
  >
) =>
  renderRelayTree({
    Component: (props: TransactionDetailsSummaryItemTestQueryResponse) => (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      <TransactionDetailsSummaryItemFragmentContainer
        {...props}
        {...extraProps}
      />
    ),
    mockData: { order },
    query: graphql`
      query TransactionDetailsSummaryItemTestQuery @raw_response_type {
        order: commerceOrder(id: "whatevs") {
          ...TransactionDetailsSummaryItem_order
        }
      }
    `,
  })

describe("TransactionDetailsSummaryItem", () => {
  describe("CommerceBuyOrder", () => {
    it("shows the shipping and tax price if it's greater than 0", async () => {
      const transactionSummary = await render(transactionSummaryBuyOrder)

      const text = transactionSummary.text()

      expect(text).toMatch("Price$200.00")
      expect(text).toMatch("Shipping$12.00")
      expect(text).toMatch("Tax$3.25")
      expect(text).toMatch("Total$215.25")
    })

    it("shows the shipping and tax price as dashes if null", async () => {
      const transactionSummary = await render({
        ...transactionSummaryBuyOrder,
        taxTotal: null,
        taxTotalCents: null,
        shippingTotal: null,
        shippingTotalCents: null,
      })

      const text = transactionSummary.text()

      expect(text).toMatch("Price$200.00")
      expect(text).toMatch("Shipping—")
      expect(text).toMatch("Tax—")
      expect(text).toMatch("Total$215.25")
    })

    it("shows the shipping quote name if shipping by Arta", async () => {
      const transactionSummary = await render(
        transactionSummaryBuyOrderWithSelectedShippingQuote
      )

      const text = transactionSummary.text()

      expect(text).toMatch("Premium delivery")
    })
  })

  describe("CommerceOfferOrder", () => {
    it("shows the shipping and tax price if it's greater than 0", async () => {
      const transactionSummary = await render(transactionSummaryOfferOrder)

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer$14,000")
      expect(text).toMatch("Shipping$200")
      expect(text).toMatch("Tax$120")
      expect(text).toMatch("Total$14,320")
    })

    it("shows the shipping and tax price as dashes if null", async () => {
      const transactionSummary = await render({
        ...transactionSummaryOfferOrder,
        __typename: "CommerceOfferOrder",
        myLastOffer: {
          ...OfferWithTotals,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
          buyerTotal: null,
          buyerTotalCents: null,
          fromParticipant: "BUYER",
        },
      })

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer$14,000")
      expect(text).toMatch("Shipping—")
      expect(text).toMatch("Tax—")
      expect(text).toMatch("Total")
    })

    it("shows empty fields when there are no myLastOffer yet", async () => {
      const transactionSummary = await render({
        ...transactionSummaryOfferOrder,
        myLastOffer: null,
      } as any)

      const text = transactionSummary.text()

      expect(text).toMatch("Your offer—")
      expect(text).toMatch("Shipping—")
      expect(text).toMatch("Tax—")
      expect(text).toMatch("Total")
    })

    it("shows the last submitted offer if requested", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrder,
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
          ...transactionSummaryOfferOrder,
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

      expect(text).toMatch("Your offer$1billion")
    })

    it("lets you specify whether to use list price or last offer as context price", async () => {
      const transactionSummary = await render(
        {
          ...transactionSummaryOfferOrder,
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
