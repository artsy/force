import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { DetailsSidebarFragmentContainer } from "../Components/DetailsSidebar"
import { DetailsSidebar_Test_Query } from "v2/__generated__/DetailsSidebar_Test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<DetailsSidebar_Test_Query>({
  Component: props => {
    if (!props.node) return null

    return (
      <DetailsSidebarFragmentContainer
        conversation={props.node}
        setShowDetails={jest.fn()}
        showDetails
      />
    )
  },
  query: graphql`
    query DetailsSidebar_Test_Query {
      node(id: "example") {
        ...DetailsSidebar_conversation
      }
    }
  `,
})

describe("Conversation", () => {
  describe("when there is an active order", () => {
    describe("status message", () => {
      const defineCommerceOrderConnection = order => ({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                mode: "OFFER",
                stateExpiresAt: "Dec 19",
                buyerAction: "mocked",
                ...order,
              },
            },
          ],
        }),
      })

      it("shows the offer expiration message on an offer", () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "SUBMITTED",
            buyerAction: null,
          })
        )

        const message =
          "The seller will respond to your offer by Dec 19. Keep in mind making an offer doesn’t guarantee you the work."
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("doesn't show the offer expiration message on a counter offer", () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "SUBMITTED",
            buyerAction: "OFFER_RECEIVED",
          })
        )

        const message =
          "The seller will respond to your offer by Dec 19. Keep in mind making an offer doesn’t guarantee you the work."
        expect(screen.queryByText(message)).not.toBeInTheDocument()
      })

      it("shows a message on an approved offer", () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "APPROVED",
            buyerAction: "OFFER_ACCEPTED",
          })
        )

        const message = /Thank you for your purchase. You will be notified when the work has shipped, typically within 5–7 business days./
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message on a processing offer", () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "PROCESSING",
          })
        )

        const message = /Thank you for your purchase. More delivery information will be available once your order ships./
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message on an in-transit offer", () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "IN_TRANSIT",
          })
        )

        const message = /Your work is on its way./
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message on a shipped order", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "FULFILLED",
            requestedFulfillment: { __typename: "CommerceShip" },
          })
        )

        const message = /Your work is on its way./
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message on a shipped order (arta)", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "FULFILLED",
            requestedFulfillment: { __typename: "CommerceShipArta" },
          })
        )

        const message = /Your order has been delivered./
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("doesn't show a fulfilled message on a picked up order", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "FULFILLED",
            requestedFulfillment: { __typename: "CommercePickup" },
          })
        )

        expect(
          screen.queryByText(/Your work is on its way./)
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText(/Your order has been delivered./)
        ).not.toBeInTheDocument()
      })

      it("shows a message when buyer declined an offer", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "CANCELED",
            stateReason: "buyer_rejected",
          })
        )

        const message = /Thank you for your response. The seller will be informed of your decision to end the negotiation process./
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message when seller declined an offer", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "CANCELED",
            stateReason: "seller_rejected",
          })
        )

        const message =
          "Sorry, the seller declined your offer and has ended the negotiation process."
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message when buyer lapsed", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "CANCELED",
            stateReason: "buyer_lapsed",
          })
        )

        const message =
          "The seller’s offer expired because you didn’t respond in time."
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message when seller lapsed", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "CANCELED",
            stateReason: "seller_lapsed",
          })
        )

        const message =
          "Your offer expired because the seller didn’t respond to your offer in time."
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message on an order that was canceled after accepted", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "CANCELED",
            stateReason: null,
          })
        )

        const message = /Please allow 5–7 business days for the refund to appear on your bank statement./
        expect(screen.getByText(message)).toBeInTheDocument()
      })

      it("shows a message on a refunded offer", async () => {
        renderWithRelay(
          defineCommerceOrderConnection({
            displayState: "REFUNDED",
            stateReason: null,
          })
        )

        const message = /Please allow 5–7 business days for the refund to appear on your bank statement./
        expect(screen.getByText(message)).toBeInTheDocument()
      })
    })

    it("shows the offer breakdown", async () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                myLastOffer: {
                  fromParticipant: "SELLER",
                },
                displayState: "SUBMITTED",
                mode: "OFFER",
              },
            },
          ],
        }),
      })

      expect(screen.getByText("Seller's offer")).toBeInTheDocument()
      expect(screen.getByText("Tax*")).toBeInTheDocument()
    })

    it("shows the payment method", async () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                myLastOffer: {
                  fromParticipant: "SELLER",
                },
                mode: "OFFER",
                displayState: "SUBMITTED",
                creditCard: {
                  lastDigits: "4242",
                  expirationYear: "2024",
                  expirationMonth: "04",
                },
              },
            },
          ],
        }),
      })

      expect(screen.getByText("Payment Method")).toBeInTheDocument()
    })

    it("shows the ship to section", async () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                myLastOffer: {
                  fromParticipant: "SELLER",
                },
                mode: "OFFER",
                displayState: "SUBMITTED",
                requestedFulfillment: {
                  city: "Seattle",
                  postalCode: "98112",
                  region: "WA",
                },
              },
            },
          ],
        }),
      })
      expect(screen.getByText("Ship to")).toBeInTheDocument()
      expect(screen.getByText("Seattle, WA 98112")).toBeInTheDocument()
    })
  })

  describe("when there is no active order", () => {
    it("doesn't show any shipping info", () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [],
        }),
      })

      expect(screen.queryByText("Ship to")).not.toBeInTheDocument()
    })

    it("doesn't show any credit card info", () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [],
        }),
      })

      expect(screen.queryByText("Payment Method")).not.toBeInTheDocument()
    })

    it("doesn't show any pricing info", () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [],
        }),
      })

      expect(screen.queryByText("List Price")).not.toBeInTheDocument()
    })
  })
})
