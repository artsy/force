import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ConversationMessagesFragmentContainer } from "../ConversationMessages"
import { useTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "v2/System/useSystemContext"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/useSystemContext")

describe("ConversationMessages", () => {
  const { getWrapper } = setupTestWrapper({
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

  it("renders correct number of messages and order events", () => {
    const wrapper = getWrapper({
      Conversation: () => ({
        conversationEventConnection: {
          edges: [
            { node: { __typename: "Message", body: "Hello I'm a message" } },

            { node: { __typename: "ConversationOfferSubmitted" } },
            {
              node: {
                __typename: "ConversationOrderStateChanged",
                state: "ACCEPTED",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.find("Message").length).toBe(1)
    expect(wrapper.find("OrderUpdate").length).toBe(2)
  })
})
