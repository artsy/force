import { TransactionDetailsSummaryItemTestQuery$rawResponse } from "__generated__/TransactionDetailsSummaryItemTestQuery.graphql"
import {
  BuyOrderWithSelectedShippingQuote,
  OfferOrderWithOffers,
  OfferWithTotals,
  UntouchedBuyOrder,
  UntouchedMakeOfferWithArtsyShippingDomesticFromUS,
} from "Apps/__tests__/Fixtures/Order"
import { graphql } from "react-relay"
import { TransactionDetailsSummaryItemFragmentContainer } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Text } from "@artsy/palette"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

type TestOfferOrder = Extract<
  TransactionDetailsSummaryItemTestQuery$rawResponse["order"],
  { __typename: "CommerceOfferOrder" }
>
type TestBuyOrder = Exclude<
  TransactionDetailsSummaryItemTestQuery$rawResponse["order"],
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

const transactionSummaryBuyOrderWithPartnerOffer: TestBuyOrder = {
  ...UntouchedBuyOrder,
  source: "partner_offer",
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

describe("TransactionDetailsSummaryItem", () => {
  let transactionStep
  let showCongratulationMessage
  let useLastSubmittedOffer
  let offerOverride
  let offerContextPrice

  const { getWrapper } = setupTestWrapper({
    Component: props => (
      <TransactionDetailsSummaryItemFragmentContainer
        {...props}
        transactionStep={transactionStep}
        showCongratulationMessage={showCongratulationMessage}
        useLastSubmittedOffer={useLastSubmittedOffer}
        offerOverride={offerOverride}
        offerContextPrice={offerContextPrice}
      />
    ),
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

  beforeEach(() => {
    transactionStep = undefined
    showCongratulationMessage = undefined
    useLastSubmittedOffer = undefined
    offerOverride = undefined
    offerContextPrice = undefined
  })

  describe("Order breakdown messaging", () => {
    it("shows the shipping and tax price as 'Calculated in next steps' when null before shipping address was added", async () => {
      transactionStep = "shipping"
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
        }),
      })

      const text = wrapper.text()

      expect(text).toMatch("ShippingCalculated in next steps")
      expect(text).toMatch("Tax*Calculated in next steps")
    })

    it("shows the shipping and tax price as 'Waiting for final costs' when null after shipping address was added", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
        }),
      })

      const text = wrapper.text()

      expect(text).toMatch("Shipping*Waiting for final costs")
      expect(text).toMatch("Tax†Waiting for final costs")
    })

    it("shows tax import reminder", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      const text = wrapper.text()

      expect(text).toMatch("Tax*")
      expect(text).toMatch("*Additional duties and taxes may apply at import")
    })

    it("shows shipping confirmation note when shipping cannot be calculated after shipping address was added", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          shippingTotal: null,
          shippingTotalCents: null,
        }),
      })

      const text = wrapper.text()

      expect(text).toMatch(
        "*Shipping costs to be confirmed by gallery. You will be able to review the total price before payment."
      )
    })

    it("does not show list price in the transaction summary", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => transactionSummaryOfferOrder,
      })

      const text = wrapper.text()

      expect(text).not.toMatch("List price")
    })

    it("shows 'Waiting for final costs' when buyer total has not been calucuated yet", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          buyerTotal: null,
        }),
      })

      const text = wrapper.text()

      expect(text).toMatch("TotalWaiting for final costs")
    })
  })

  describe("CommerceBuyOrder", () => {
    it("shows a US prefix on the price when currency is USD", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      const entry = wrapper.find("Entry")

      expect(entry.at(0).text()).toMatch("PriceUS$200.00")
      expect(entry.at(1).text()).toMatch("ShippingUS$12.00")
      expect(entry.at(2).text()).toMatch("Tax*US$3.25")
      expect(entry.at(3).text()).toMatch("TotalUS$215.25")
    })

    it("shows the shipping and tax price if it's greater than 0", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      const text = wrapper.text()

      expect(text).toMatch("PriceUS$200.00")
      expect(text).toMatch("ShippingUS$12.00")
      expect(text).toMatch("Tax*US$3.25")
      expect(text).toMatch("TotalUS$215.25")
    })

    describe("partner offer", () => {
      it("shows the label", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => transactionSummaryBuyOrderWithPartnerOffer,
        })

        const text = wrapper.text()

        expect(text).toMatch("Gallery offer")
      })
    })

    describe("artsy shipping specific", () => {
      it("shows the shipping quote name if shipping by Arta", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () =>
            transactionSummaryBuyOrderWithSelectedShippingQuote,
        })

        const text = wrapper.text()

        expect(text).toMatch("Premium delivery")
      })

      it("shows the correct footnotes for offers when user has not made selection yet", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () =>
            UntouchedMakeOfferWithArtsyShippingDomesticFromUS,
        })

        const text = wrapper.text()

        expect(text).toMatch("ShippingWaiting for final costs")
        expect(text).toMatch("Tax*Waiting for final costs")
        expect(text).toMatch(
          "*Additional duties and taxes may apply at import."
        )
      })

      it("shows the correct footnotes for offers when user selects a shipping quote", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...transactionSummaryOfferOrder,
            requestedFulfillment: {
              __typename: "CommerceShipArta",
            },
            lineItems: {
              edges: [
                {
                  node: {
                    editionSetId: null,
                    id: "line-item-node-id",
                    selectedShippingQuote: {
                      id: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                      tier: "premium",
                      name: "",
                      isSelected: true,
                      priceCents: 400,
                      priceCurrency: "USD",
                      price: "$4.00",
                      typeName: "select",
                    },
                  },
                },
              ],
            },
          }),
        })

        const text = wrapper.text()

        expect(text).toMatch("Premium delivery*")
        expect(text).toMatch("Tax†US$120")
        expect(text).toMatch(
          "*Estimate only. Price may vary once offer is finalized."
        )
        expect(text).toMatch(
          "†Additional duties and taxes may apply at import."
        )
      })
    })

    it("shows the congratulations message when order gets submmited", async () => {
      showCongratulationMessage = true
      const { wrapper } = getWrapper({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      const textWrappers = wrapper.find(Text)

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
      const { wrapper } = getWrapper({
        CommerceOrder: () => transactionSummaryOfferOrder,
      })

      const text = wrapper.text()

      expect(text).toMatch("Your offerUS$14,000")
      expect(text).toMatch("ShippingUS$200")
      expect(text).toMatch("Tax*US$120")
      expect(text).toMatch("TotalUS$14,320")
    })

    it("shows the last submitted offer if requested", async () => {
      useLastSubmittedOffer = true
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
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
        }),
      })

      const text = wrapper.text()

      expect(text).toMatch("Seller's offer£poundz")
    })

    it("says 'seller's offer' when the last submitted offer is from the seller", async () => {
      useLastSubmittedOffer = true
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...transactionSummaryOfferOrderPounds,
          lastOffer: {
            ...OfferWithTotals,
            id: "seller-offer-id",
            amount: "£405.00",
            fromParticipant: "SELLER",
          },
        }),
      })

      const text = wrapper.text()

      expect(text).toMatch("Seller's offer£405.00")
    })

    it("takes an offer override parameter", async () => {
      useLastSubmittedOffer = true
      offerOverride = "$1billion"
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...transactionSummaryOfferOrder,
          lastOffer: {
            ...OfferWithTotals,
            id: "seller-offer-id",
            amount: "£405.00",
            fromParticipant: "SELLER",
          },
        }),
      })

      const text = wrapper.text()

      expect(text).toMatch("Your offerUS$1billion")
    })

    it("lets you specify whether to use list price or last offer as context price", async () => {
      offerContextPrice = "LAST_OFFER"
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
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
        }),
      })

      const text = wrapper.text()

      expect(text).toContain("Your offer£400.00Seller's offer£405.00")
    })
  })
})
