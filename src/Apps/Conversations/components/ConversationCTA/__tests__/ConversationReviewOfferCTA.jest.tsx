import { screen } from "@testing-library/react"
import { ConversationReviewOfferCTA } from "Apps/Conversations/components/ConversationCTA/ConversationReviewOfferCTA"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Conversations/ConversationsContext", () => ({
  useConversationsContext: jest.fn().mockReturnValue({
    isConfirmModalVisible: false,
    showSelectEditionSetModal: jest.fn(),
  }),
}))

describe("ConversationReviewOfferCTA", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return <ConversationReviewOfferCTA conversation={props.conversation} />
    },
    query: graphql`
      query ConversationReviewOfferCTA_Test_Query @relay_test_operation {
        conversation(id: "123") {
          ...ConversationReviewOfferCTA_conversation
        }
      }
    `,
  })

  it("PAYMENT_FAILED", async () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [
            { node: { buyerAction: "PAYMENT_FAILED", internalID: "orderID" } },
          ],
        },
      }),
    })

    expect(screen.getByText("Payment Failed")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Unable to process payment for accepted offer. Update payment method.",
      ),
    ).toBeInTheDocument()

    expect(screen.getByTestId("orderActionLink")).toHaveAttribute(
      "href",
      "/orders/orderID/payment/new",
    )
  })

  it("OFFER_RECEIVED", async () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [
            { node: { buyerAction: "OFFER_RECEIVED", internalID: "orderID" } },
          ],
        },
      }),
    })

    expect(screen.getByText("Offer Received")).toBeInTheDocument()

    expect(screen.getByTestId("orderActionLink")).toHaveAttribute(
      "href",
      "/orders/orderID/respond",
    )
  })

  it("OFFER_ACCEPTED", async () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [
            { node: { buyerAction: "OFFER_ACCEPTED", internalID: "orderID" } },
          ],
        },
      }),
    })

    expect(
      screen.getByText("Congratulations! Offer Accepted"),
    ).toBeInTheDocument()
    expect(screen.getByText("Tap to view")).toBeInTheDocument()
    expect(screen.getByTestId("orderActionLink")).toHaveAttribute(
      "href",
      "/orders/orderID/details",
    )
  })

  it("OFFER_ACCEPTED_CONFIRM_NEEDED", async () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [
            {
              node: {
                buyerAction: "OFFER_ACCEPTED_CONFIRM_NEEDED",
                internalID: "orderID",
              },
            },
          ],
        },
      }),
    })

    expect(
      screen.getByText("Offer Accepted - Confirm total"),
    ).toBeInTheDocument()

    expect(screen.getByTestId("orderActionLink")).toHaveAttribute(
      "href",
      "/orders/orderID/respond",
    )
  })

  it("OFFER_RECEIVED_CONFIRM_NEEDED", async () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [
            {
              node: {
                buyerAction: "OFFER_RECEIVED_CONFIRM_NEEDED",
                internalID: "orderID",
              },
            },
          ],
        },
      }),
    })

    expect(
      screen.getByText("Counteroffer Received - Confirm Total"),
    ).toBeInTheDocument()

    expect(screen.getByTestId("orderActionLink")).toHaveAttribute(
      "href",
      "/orders/orderID/respond",
    )
  })

  it("PROVISIONAL_OFFER_ACCEPTED", async () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [
            {
              node: {
                buyerAction: "PROVISIONAL_OFFER_ACCEPTED",
                internalID: "orderID",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
    expect(screen.getByText("Tap to view")).toBeInTheDocument()

    expect(screen.getByTestId("orderActionLink")).toHaveAttribute(
      "href",
      "/orders/orderID/details",
    )
  })
})
