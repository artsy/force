import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { OrderUpdateFragmentContainer } from "../OrderUpdate"
import { OrderUpdate_Test_Query } from "v2/__generated__/OrderUpdate_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { DateTime } from "luxon"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<OrderUpdate_Test_Query>({
  Component: props => {
    const event = props!.me!.conversation!.orderConnection!.edges![0]!.node!
      .orderHistory[0]

    return <OrderUpdateFragmentContainer event={event} />
  },
  query: graphql`
    query OrderUpdate_Test_Query($conversationID: String!) {
      me {
        conversation(id: $conversationID) {
          orderConnection(first: 10, participantType: BUYER) {
            edges {
              node {
                orderHistory {
                  __typename
                  ...OrderUpdate_event
                }
              }
            }
          }
        }
      }
    }
  `,
})

describe("testing different statuses", () => {
  it("render counteroffer", () => {
    const createdAt = "2021-07-04T12:46:40Z"
    renderWithRelay({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOfferSubmittedEvent",
                    createdAt,
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

    const date = DateTime.fromISO(createdAt)
    expect(screen.getByText(date.toFormat("ccc, LLL d, t"))).toBeInTheDocument()
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
  })
})
