import { useTracking } from "v2/System/Analytics/useTracking"
import { MockedConversation } from "v2/Apps/__tests__/Fixtures/Conversation"
import { Conversation_conversation$data } from "v2/__generated__/Conversation_conversation.graphql"
import { Reply } from "../Components/Reply"
import { mount } from "enzyme"
import { Environment } from "react-relay"

jest.mock("v2/System/Analytics/useTracking")

describe("Reply", () => {
  describe("tracking", () => {
    const trackEvent = jest.fn()

    beforeEach(() => {
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
          environment={{} as Environment}
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
