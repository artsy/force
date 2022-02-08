import { ConversationMessagesFragmentContainer } from "../ConversationMessages"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ me }: any) => {
    return (
      <ConversationMessagesFragmentContainer
        messages={me.conversation.messagesConnection}
        events={me.conversation.orderConnection}
        setShowDetails={jest.fn()}
      />
    )
  },
  query: graphql`
    query ConversationMessages_Test_Query @relay_test_operation {
      me {
        conversation(id: "1234") {
          messagesConnection(first: 10) {
            ...ConversationMessages_messages
          }
          orderConnection(first: 10) {
            ...ConversationMessages_events
          }
        }
      }
    }
  `,
})

describe("ConversationMessages", () => {
  it("check components render", async () => {
    renderWithRelay({
      MessageConnection: () => ({
        edges: [
          {
            node: {
              __typename: "Message",
              internalID: "123",
              body: "First test message",
              isFromUser: true,
              createdAt: Date.now().toString(),
            },
          },
          {
            node: {
              __typename: "Message",
              internalID: "456",
              body: "Second test message",
              isFromUser: true,
              createdAt: Date.now().toString(),
            },
          },
        ],
      }),
      CommerceOrderConnectionWithTotalCount: () => ({
        edges: [
          {
            node: {
              orderHistory: [
                {
                  __typename: "CommerceOfferSubmittedEvent",
                  internalID: "7adde1e2-bdd4-4360-9484-989d6dd3248e",
                  createdAt: Date.now().toString(),
                  state: "PENDING",
                  offer: {
                    amount: "£40,000",
                    fromParticipant: "SELLER",
                    offerAmountChanged: false,
                  },
                },
                {
                  __typename: "CommerceOrderStateChangedEvent",
                  internalID: "7adde1e2-bdd4-4360-9484-989d6dde",
                  createdAt: Date.now().toString(),
                  state: "APPROVED",
                  stateReason: null,
                  offer: {
                    amount: "£40,000",
                    fromParticipant: "SELLER",
                    offerAmountChanged: false,
                  },
                },
              ],
            },
          },
        ],
      }),
    })

    expect(
      await screen.findByText("Offer Accepted - Pending Action")
    ).toBeInTheDocument()
    expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
    expect(screen.getByText("First test message")).toBeInTheDocument()
    expect(screen.getByText("Second test message")).toBeInTheDocument()
  })
})
