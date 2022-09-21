import { useTracking } from "react-tracking"
import { MockedConversation } from "Apps/__tests__/Fixtures/Conversation"
import { Conversation_conversation$data } from "__generated__/Conversation_conversation.graphql"
import { Reply } from "../Components/Reply"
import { mount } from "enzyme"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"

jest.mock("react-tracking")

describe("Reply", () => {
  describe("tracking", () => {
    const trackEvent = jest.fn()

    beforeAll(() => {
      const mockTracking = useTracking as jest.Mock
      mockTracking.mockImplementation(() => {
        return {
          trackEvent,
        }
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("tracks event when text input is focused", async () => {
      const wrapper = mount(
        <Reply
          conversation={
            (MockedConversation as unknown) as Conversation_conversation$data
          }
          openInquiryModal={() => {
            jest.fn
          }}
          openOrderModal={() => {
            jest.fn
          }}
          onScroll={jest.fn()}
          environment={{} as RelayModernEnvironment}
          refetch={() => ({ dispose: jest.fn })}
        />
      )
      wrapper.find("textarea").simulate("focus")
      expect(trackEvent).toHaveBeenCalledWith({
        action: "focusedOnConversationMessageInput",
        impulse_conversation_id: "conversation1",
      })
    })

    it.todo("tracks event when a message is sent")
  })
})
