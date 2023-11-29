import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { OrderStateTestQuery } from "__generated__/OrderStateTestQuery.graphql"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { ConversationOrderState } from "Apps/Conversations/components/Details/OrderState/ConversationOrderState"

jest.unmock("react-relay")

describe("OrderState", () => {
  const { renderWithRelay } = setupTestWrapperTL<OrderStateTestQuery>({
    Component: ({ commerceOrder }) => (
      <ConversationOrderState order={commerceOrder!} />
    ),
    query: graphql`
      query OrderStateTestQuery @relay_test_operation {
        commerceOrder {
          ...ConversationOrderState_state
        }
      }
    `,
  })

  describe("Purchase Order mode / states", () => {
    it("Buyer has submitted an order.", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "BUY",
          state: "SUBMITTED",
        }),
      })

      expect(screen.getByText("Confirm order")).toBeInTheDocument()
    })

    it("Seller has accepted the order and shipping has been arranged.", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "BUY",
          state: "FULFILLED",
        }),
      })

      expect(screen.getByText("Order accepted")).toBeInTheDocument()
    })

    it("Seller has accepted the order.", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "BUY",
          state: "APPROVED",
        }),
      })

      expect(screen.getByText("Order accepted")).toBeInTheDocument()
    })

    it("Order has been canceled.", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "BUY",
          state: "CANCELED",
        }),
      })

      expect(screen.getByText("Order canceled")).toBeInTheDocument()
    })

    it("Order expired", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "BUY",
          state: "CANCELED",
          stateReason: "seller_lapsed",
        }),
      })

      expect(screen.getByText("Order expired")).toBeInTheDocument()
    })
  })

  describe("Offer mode / states", () => {
    it("Offer has been canceled", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "CANCELED",
        }),
      })

      expect(screen.getByText("Offer canceled")).toBeInTheDocument()
    })

    it("Offer has been ABANDONED", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "ABANDONED",
        }),
      })

      expect(screen.getByText("Offer canceled")).toBeInTheDocument()
    })

    it("Offer has been APPROVED", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "APPROVED",
        }),
      })

      expect(screen.getByText("Offer accepted")).toBeInTheDocument()
    })

    it("Offer has been FULFILLED", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "FULFILLED",
        }),
      })

      expect(screen.getByText("Offer accepted")).toBeInTheDocument()
    })

    it("Offer expired", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "CANCELED",
          stateReason: "buyer_lapsed",
        }),
      })

      expect(screen.getByText("Offer expired")).toBeInTheDocument()
    })

    it("Offer declined", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "CANCELED",
          stateReason: "seller_rejected_offer_too_low",
        }),
      })

      expect(screen.getByText("Offer declined")).toBeInTheDocument()
    })
  })

  describe("Counteroffer mode / states", () => {
    it("CommercePartner sent a Counteroffer", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "SUBMITTED",
          lastOffer: {
            offerAmountChanged: true,
            from: { __typename: "CommercePartner" },
          },
          formattedStateExpiresAt: "MMMM DD, HH:mm",
        }),
      })

      expect(screen.getByText("Received counteroffer")).toBeInTheDocument()
      expect(
        screen.getByText("Awaiting response by MMMM DD, HH:mm")
      ).toBeInTheDocument()
    })

    it("CommerceUser sent a Counteroffer", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "SUBMITTED",
          lastOffer: {
            offerAmountChanged: true,
            from: { __typename: "CommerceUser" },
          },
          formattedStateExpiresAt: "MMM D, h:mm A zz",
        }),
      })

      expect(screen.getByText("Review counteroffer")).toBeInTheDocument()
      expect(
        screen.getByText("Seller will respond by MMM D, h:mm A zz")
      ).toBeInTheDocument()
    })

    it("CommerceUser sent an offer", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          mode: "OFFER",
          state: "SUBMITTED",
          lastOffer: {
            offerAmountChanged: false,
            from: { __typename: "CommerceUser" },
          },
          formattedStateExpiresAt: "MMM D, h:mm A zz",
        }),
      })

      expect(screen.getByText("Seller reviewing offer")).toBeInTheDocument()
    })
  })
})
