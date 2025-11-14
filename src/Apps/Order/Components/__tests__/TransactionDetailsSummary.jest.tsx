import {
  BuyOrderWithSelectedShippingQuote,
  OfferOrderWithOffers,
  OfferWithTotals,
  UntouchedBuyOrder,
  UntouchedMakeOfferWithArtsyShippingDomesticFromUS,
} from "Apps/__tests__/Fixtures/Order"
import { TransactionDetailsSummaryItemFragmentContainer } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { TransactionDetailsSummaryItemTestQuery$rawResponse } from "__generated__/TransactionDetailsSummaryItemTestQuery.graphql"
import { graphql } from "react-relay"

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

  const { renderWithRelay } = setupTestWrapperTL({
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
      renderWithRelay({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
        }),
      })

      expect(screen.getAllByText("Calculated in next steps")).toHaveLength(2)
      expect(screen.getByText(/Tax/)).toBeInTheDocument()
    })

    it("shows the shipping and tax price as 'Waiting for final costs' when null after shipping address was added", async () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          taxTotal: null,
          taxTotalCents: null,
          shippingTotal: null,
          shippingTotalCents: null,
        }),
      })

      expect(
        screen.getAllByText("Waiting for final costs").length,
      ).toBeGreaterThan(0)
      expect(screen.getAllByText(/Shipping/)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/Tax/)[0]).toBeInTheDocument()
    })

    it("shows tax import reminder", async () => {
      renderWithRelay({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      expect(screen.getByText(/Tax/)).toBeInTheDocument()
      expect(screen.getByText(/may apply at import/)).toBeInTheDocument()
    })

    it("shows shipping confirmation note when shipping cannot be calculated after shipping address was added", async () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          shippingTotal: null,
          shippingTotalCents: null,
        }),
      })

      expect(
        screen.getByText(
          "*Shipping costs to be confirmed by gallery. You will be able to review the total price before payment.",
        ),
      ).toBeInTheDocument()
    })

    it("does not show list price in the transaction summary", async () => {
      renderWithRelay({
        CommerceOrder: () => transactionSummaryOfferOrder,
      })

      expect(screen.queryByText("List price")).not.toBeInTheDocument()
    })

    it("shows 'Waiting for final costs' when buyer total has not been calucuated yet", async () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...transactionSummaryBuyOrder,
          buyerTotal: null,
        }),
      })

      expect(screen.getByText("Total")).toBeInTheDocument()
      expect(screen.getByText("Waiting for final costs")).toBeInTheDocument()
    })
  })

  describe("CommerceBuyOrder", () => {
    it("shows a US prefix on the price when currency is USD", async () => {
      renderWithRelay({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      expect(screen.getByText("Price")).toBeInTheDocument()
      expect(screen.getByText("US$200.00")).toBeInTheDocument()
      expect(screen.getByText("Shipping")).toBeInTheDocument()
      expect(screen.getByText("US$12.00")).toBeInTheDocument()
      expect(screen.getByText(/Tax/)).toBeInTheDocument()
      expect(screen.getByText("US$3.25")).toBeInTheDocument()
      expect(screen.getByText("Total")).toBeInTheDocument()
      expect(screen.getByText("US$215.25")).toBeInTheDocument()
    })

    it("shows the shipping and tax price if it's greater than 0", async () => {
      renderWithRelay({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      expect(screen.getByText("Price")).toBeInTheDocument()
      expect(screen.getByText("US$200.00")).toBeInTheDocument()
      expect(screen.getByText("Shipping")).toBeInTheDocument()
      expect(screen.getByText("US$12.00")).toBeInTheDocument()
      expect(screen.getByText(/Tax/)).toBeInTheDocument()
      expect(screen.getByText("US$3.25")).toBeInTheDocument()
      expect(screen.getByText("Total")).toBeInTheDocument()
      expect(screen.getByText("US$215.25")).toBeInTheDocument()
    })

    describe("partner offer", () => {
      it("shows the label", async () => {
        renderWithRelay({
          CommerceOrder: () => transactionSummaryBuyOrderWithPartnerOffer,
        })

        expect(screen.getByText("Gallery offer")).toBeInTheDocument()
      })
    })

    describe("artsy shipping specific", () => {
      it("shows the shipping quote name if shipping by Arta", async () => {
        renderWithRelay({
          CommerceOrder: () =>
            transactionSummaryBuyOrderWithSelectedShippingQuote,
        })

        expect(screen.getByText("Premium delivery")).toBeInTheDocument()
      })

      it("shows the correct footnotes for offers when user has not made selection yet", async () => {
        renderWithRelay({
          CommerceOrder: () =>
            UntouchedMakeOfferWithArtsyShippingDomesticFromUS,
        })

        expect(screen.getByText("Shipping")).toBeInTheDocument()
        expect(
          screen.getAllByText("Waiting for final costs").length,
        ).toBeGreaterThan(0)
        expect(screen.getByText(/Tax/)).toBeInTheDocument()
        expect(screen.getByText(/may apply at import/)).toBeInTheDocument()
      })

      it("shows the correct footnotes for offers when user selects a shipping quote", async () => {
        renderWithRelay({
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

        expect(screen.getByText("Premium delivery*")).toBeInTheDocument()
        expect(screen.getByText(/Tax/)).toBeInTheDocument()
        expect(screen.getByText("US$120")).toBeInTheDocument()
        expect(
          screen.getByText(
            "*Estimate only. Price may vary once offer is finalized.",
          ),
        ).toBeInTheDocument()
        expect(screen.getByText(/may apply at import/)).toBeInTheDocument()
      })
    })

    it("shows the congratulations message when order gets submmited", async () => {
      showCongratulationMessage = true
      renderWithRelay({
        CommerceOrder: () => transactionSummaryBuyOrder,
      })

      expect(
        screen.getByText(
          "Congratulations! This artwork will be added to your Collection once the gallery confirms the order.",
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "View and manage all artworks in your Collection on the Artsy app.",
        ),
      ).toBeInTheDocument()
    })
  })

  describe("CommerceOfferOrder", () => {
    it("shows the shipping and tax price if it's greater than 0", async () => {
      renderWithRelay({
        CommerceOrder: () => transactionSummaryOfferOrder,
      })

      expect(screen.getByText("Your offer")).toBeInTheDocument()
      expect(screen.getByText("US$14,000")).toBeInTheDocument()
      expect(screen.getByText("Shipping")).toBeInTheDocument()
      expect(screen.getByText("US$200")).toBeInTheDocument()
      expect(screen.getByText(/Tax/)).toBeInTheDocument()
      expect(screen.getByText("US$120")).toBeInTheDocument()
      expect(screen.getByText("Total")).toBeInTheDocument()
      expect(screen.getByText("US$14,320")).toBeInTheDocument()
    })

    it("shows the last submitted offer if requested", async () => {
      useLastSubmittedOffer = true
      renderWithRelay({
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

      expect(screen.getByText("Seller's offer")).toBeInTheDocument()
      expect(screen.getByText("£poundz")).toBeInTheDocument()
    })

    it("says 'seller's offer' when the last submitted offer is from the seller", async () => {
      useLastSubmittedOffer = true
      renderWithRelay({
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

      expect(screen.getByText("Seller's offer")).toBeInTheDocument()
      expect(screen.getByText("£405.00")).toBeInTheDocument()
    })

    it("takes an offer override parameter", async () => {
      useLastSubmittedOffer = true
      offerOverride = "$1billion"
      renderWithRelay({
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

      expect(screen.getByText("Your offer")).toBeInTheDocument()
      expect(screen.getByText("US$1billion")).toBeInTheDocument()
    })

    it("lets you specify whether to use list price or last offer as context price", async () => {
      offerContextPrice = "LAST_OFFER"
      renderWithRelay({
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

      expect(screen.getByText("Your offer")).toBeInTheDocument()
      expect(screen.getByText("£400.00")).toBeInTheDocument()
      expect(screen.getByText("Seller's offer")).toBeInTheDocument()
      expect(screen.getByText("£405.00")).toBeInTheDocument()
    })
  })
})
