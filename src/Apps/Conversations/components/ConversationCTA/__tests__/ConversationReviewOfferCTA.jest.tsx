import { fireEvent, screen, waitFor } from "@testing-library/react"
import { ConversationReviewOfferCTA } from "Apps/Conversations/components/ConversationCTA/ConversationReviewOfferCTA"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
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
        "Unable to process payment for accepted offer. Update payment method."
      )
    ).toBeInTheDocument()

    // Modal details
    fireEvent.click(screen.getByText("Payment Failed"))

    await waitFor(() => {
      expect(screen.getByText("Update Payment Details")).toBeInTheDocument()
      expect(screen.getByTestId("orderModalIframe")).toHaveAttribute(
        "src",
        "/orders/orderID/payment/new?isModal=true"
      )
    })
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

    // Modal details
    fireEvent.click(screen.getByText("Offer Received"))

    await waitFor(() => {
      expect(screen.getByText("Review Offer")).toBeInTheDocument()
      expect(screen.getByTestId("orderModalIframe")).toHaveAttribute(
        "src",
        "/orders/orderID/respond?isModal=true"
      )
    })
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
      screen.getByText("Congratulations! Offer Accepted")
    ).toBeInTheDocument()
    expect(screen.getByText("Tap to view")).toBeInTheDocument()

    // Modal details
    fireEvent.click(screen.getByText("Tap to view"))

    await waitFor(() => {
      expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
      expect(screen.getByTestId("orderModalIframe")).toHaveAttribute(
        "src",
        "/orders/orderID/status?isModal=true"
      )
    })
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
      screen.getByText("Offer Accepted - Confirm total")
    ).toBeInTheDocument()

    // Modal details
    fireEvent.click(screen.getByText("Offer Accepted - Confirm total"))

    await waitFor(() => {
      expect(screen.getByText("Review Offer")).toBeInTheDocument()
      expect(screen.getByTestId("orderModalIframe")).toHaveAttribute(
        "src",
        "/orders/orderID/respond?isModal=true"
      )
    })
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
      screen.getByText("Counteroffer Received - Confirm Total")
    ).toBeInTheDocument()

    // Modal details
    fireEvent.click(screen.getByText("Counteroffer Received - Confirm Total"))

    await waitFor(() => {
      expect(screen.getByText("Review Offer")).toBeInTheDocument()
      expect(screen.getByTestId("orderModalIframe")).toHaveAttribute(
        "src",
        "/orders/orderID/respond?isModal=true"
      )
    })
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

    // Modal details
    fireEvent.click(screen.getByText("Tap to view"))

    await waitFor(() => {
      expect(screen.getAllByText("Offer Accepted")[1]).toBeInTheDocument()
      expect(screen.getByTestId("orderModalIframe")).toHaveAttribute(
        "src",
        "/orders/orderID/status?isModal=true"
      )
    })
  })
})
