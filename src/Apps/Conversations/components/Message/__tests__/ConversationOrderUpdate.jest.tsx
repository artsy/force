import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationOrderUpdate_Test_Query } from "__generated__/ConversationOrderUpdate_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { ConversationOrderUpdate } from "Apps/Conversations/components/Message/ConversationOrderUpdate"

jest.unmock("react-relay")

describe("testing different statuses", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ConversationOrderUpdate_Test_Query
  >({
    Component: props => {
      const event = props.conversation?.orderConnection?.edges?.[0]?.node!
        .orderHistory[0]

      return <ConversationOrderUpdate event={event!} />
    },
    query: graphql`
      query ConversationOrderUpdate_Test_Query($conversationID: String!)
        @relay_test_operation {
        conversation(id: $conversationID) {
          orderConnection(first: 10, participantType: BUYER) {
            edges {
              node {
                orderHistory {
                  __typename
                  ...ConversationOrderUpdate_event
                }
              }
            }
          }
        }
      }
    `,
  })

  it("render offer", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOfferSubmittedEvent",
                    offer: {
                      amount: "$39999",
                      fromParticipant: "BUYER",
                      offerAmountChanged: false,
                      respondsTo: null,
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("You sent an offer for $39999")).toBeInTheDocument()
  })

  it("render counteroffer", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOfferSubmittedEvent",
                    offer: {
                      amount: "$40000",
                      definesTotal: true,
                      fromParticipant: "BUYER",
                      offerAmountChanged: false,
                      respondsTo: {
                        fromParticipant: "BUYER",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(
      screen.getByText("You sent a counteroffer for $40000")
    ).toBeInTheDocument()
  })

  it("render received a counteroffer", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOfferSubmittedEvent",
                    offer: {
                      amount: "$40000",
                      fromParticipant: "SELLER",
                      offerAmountChanged: true,
                      respondsTo: {
                        fromParticipant: "BUYER",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(
      screen.getByText("You received a counteroffer for $40000")
    ).toBeInTheDocument()
    expect(screen.queryByText("See details.")).not.toBeInTheDocument()
  })

  it("render Offer Accepted - Pending Action", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOfferSubmittedEvent",
                    offer: {
                      amount: "$40000",
                      fromParticipant: "SELLER",
                      offerAmountChanged: false,
                      respondsTo: {
                        fromParticipant: "BUYER",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(
      screen.getByText("Offer Accepted - Pending Action")
    ).toBeInTheDocument()
    expect(screen.queryByText("See details.")).not.toBeInTheDocument()
  })

  it("render Offer Accepted", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOrderStateChangedEvent",
                    orderUpdateState: "offer_approved",
                    state: "APPROVED",
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
    expect(screen.queryByText("See details.")).not.toBeInTheDocument()
  })

  it("render Offer Processing approval", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOrderStateChangedEvent",
                    state: "PROCESSING_APPROVAL",
                  },
                ],
              },
            },
          ],
        },
      }),
    })
    expect(
      screen.getByText("Offer accepted. Payment processing")
    ).toBeInTheDocument()
  })

  it("render Offer Declined", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOrderStateChangedEvent",
                    orderUpdateState: "offer_rejected",
                    state: "CANCELED",
                    stateReason: ["_rejected"],
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Offer Declined")).toBeInTheDocument()
    expect(screen.queryByText("See details.")).not.toBeInTheDocument()
  })

  it("render Offer Expired", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOrderStateChangedEvent",
                    orderUpdateState: "offer_lapsed",
                    state: "CANCELED",
                    stateReason: ["_lapsed"],
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Offer Expired")).toBeInTheDocument()
    expect(screen.queryByText("See details.")).not.toBeInTheDocument()
  })

  it("render Purchase Submitted", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOrderStateChangedEvent",
                    orderUpdateState: "buy_submitted",
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("You purchased this artwork")).toBeInTheDocument()
  })

  it("render Purchase Accepted", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOrderStateChangedEvent",
                    orderUpdateState: "buy_approved",
                    state: "APPROVED",
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Purchase Accepted")).toBeInTheDocument()
  })

  it("render Purchase Expired", () => {
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOrderStateChangedEvent",
                    orderUpdateState: "buy_lapsed",
                    state: "CANCELED",
                    stateReason: ["_lapsed"],
                  },
                ],
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Purchase Expired")).toBeInTheDocument()
  })
})
