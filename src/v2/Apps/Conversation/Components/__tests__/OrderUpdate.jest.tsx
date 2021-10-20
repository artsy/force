import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { OrderUpdateFragmentContainer } from "../OrderUpdate"
import { OrderUpdate_Test_Query } from "v2/__generated__/OrderUpdate_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<OrderUpdate_Test_Query>({
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
    let wrapper = getWrapper({
      Conversation: () => ({
        orderConnection: {
          edges: [
            {
              node: {
                orderHistory: [
                  {
                    __typename: "CommerceOfferSubmittedEvent",
                    createdAt: "2021-07-04T12:46:40+03:00",
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
    expect(wrapper.find("TimeSince").length).toEqual(1)
    expect(wrapper.text()).toContain("You sent a counteroffer for $40000")
  })

  it("render received a counteroffer", () => {
    let wrapper = getWrapper({
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
    expect(wrapper.text()).toContain("You received a counteroffer for $40000")
  })

  it("render Offer Accepted - Pending Action", () => {
    let wrapper = getWrapper({
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
    expect(wrapper.text()).toContain("Offer Accepted - Pending Action")
  })

  it("render Offer Accepted", () => {
    let wrapper = getWrapper({
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
    expect(wrapper.text()).toContain("Offer Accepted")
  })
  it("render Offer Declined", () => {
    let wrapper = getWrapper({
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
    expect(wrapper.text()).toContain("Offer Declined")
  })
  it("render Offer Expired", () => {
    let wrapper = getWrapper({
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
    expect(wrapper.text()).toContain("Offer Expired")
  })
})
