import { graphql } from "react-relay"
import { ConversationMessagesFragmentContainer } from "../ConversationMessages"
import { useTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "v2/System/useSystemContext"
import { ConversationMessages_Test_Query } from "v2/__generated__/ConversationMessages_Test_Query.graphql"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/useSystemContext")

describe("ConversationMessages", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ConversationMessages_Test_Query
  >({
    Component: (props: any) => {
      return (
        <ConversationMessagesFragmentContainer
          messagesAndEvents={props.me.conversation.conversationEventConnection}
          lastViewedMessageID={null}
        />
      )
    },
    query: graphql`
      query ConversationMessages_Test_Query {
        me {
          conversation(id: "1234") {
            conversationEventConnection {
              ...ConversationMessages_messagesAndEvents
            }
          }
        }
      }
    `,
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()
  let useSystemContext = baseUseSystemContext as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))

    useSystemContext.mockImplementation(() => {
      return {
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
        },
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("check components render", async () => {
    renderWithRelay({
      Conversation: () => ({
        conversationEventConnection: {
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

            {
              node: {
                __typename: "ConversationOfferSubmitted",
                internalID: "7adde1e2-bdd4-4360-9484-989d6dd3248e",
                createdAt: Date.now().toString(),
                state: "PENDING",
                amount: "£40,000",
                fromParticipant: "SELLER",
                offerAmountChanged: false,
              },
            },
            {
              node: {
                __typename: "ConversationOrderStateChanged",
                internalID: "7adde1e2-bdd4-4360-9484-989d6dde",
                createdAt: Date.now().toString(),
                state: "APPROVED",
                stateReason: null,
                amount: "£40,000",
                fromParticipant: "SELLER",
                offerAmountChanged: false,
              },
            },
          ],
        },
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
