import { act, fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationReplyTestQuery } from "__generated__/ConversationReplyTestQuery.graphql"
import { ConversationReply } from "Apps/Conversations/components/ConversationReply"
import * as formik from "formik"
import { useTracking } from "react-tracking"
import { sentConversationMessage } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock(
  "Apps/Conversations/components/ConversationCTA/ConversationCTA",
  () => {
    return {
      ConversationCTA: () => <div>ConversationCTA</div>,
    }
  }
)

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: jest.fn().mockReturnValue({
    sendToast: jest.fn(),
  }),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({
    user: {
      email: "partner@mail.com",
      id: "partner-id",
    },
  }),
}))

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: {},
      },
      params: {
        conversationId: "conversation-id",
      },
    },
  }),
}))

describe("ConversationReply", () => {
  const sendToastMock = jest.fn()
  const mockUseToasts = useToasts as jest.Mock
  const mockUseTracking = useTracking as jest.Mock
  const trackingMock = jest.fn()
  const resetFormMock = jest.fn()

  const conversation = {
    from: {
      email: "sender@mail.com",
      id: "sender-id",
    },
    internalID: "conversation-id",
    inquiryID: "inquiry-id",
    lastMessageID: "last-message-id",
  }

  const { renderWithRelay } = setupTestWrapperTL<ConversationReplyTestQuery>({
    Component: ({ conversation }) => (
      <ConversationReply conversation={conversation!} />
    ),
    query: graphql`
      query ConversationReplyTestQuery @relay_test_operation {
        conversation(id: "conversation-id") {
          ...ConversationReply_conversation
        }
      }
    `,
  })

  const spyOnFormik = (message: string) => {
    const formikSpy = jest.spyOn(formik, "useFormik") as jest.Mock
    formikSpy.mockImplementation(({ onSubmit }) => ({
      resetForm: resetFormMock,
      setFieldValue: jest.fn(),
      values: {
        message: "",
      },
      handleSubmit: () => {
        onSubmit({ message }, { resetForm: resetFormMock })
      },
    }))
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTracking.mockImplementation(() => ({
      trackEvent: trackingMock,
    }))
  })

  it("submits a reply", async () => {
    spyOnFormik("some message")

    const { mockResolveLastOperation } = renderWithRelay({
      Conversation: () => conversation,
    })

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "some message" },
    })

    fireEvent.submit(screen.getByRole("form"))

    act(() => {
      mockResolveLastOperation({
        Conversation: () => ({
          lastMessageID: "000",
        }),
      })
    })

    expect(trackingMock).toHaveBeenLastCalledWith(
      sentConversationMessage({
        impulseConversationId: conversation.internalID,
        impulseMessageId: "000",
      })
    )
    expect(resetFormMock).toHaveBeenCalledTimes(2)
  })

  it("shows toast error given an error when submitting", () => {
    mockUseToasts.mockImplementation(() => ({
      sendToast: sendToastMock,
    }))

    spyOnFormik("")

    const { mockRejectLastOperation } = renderWithRelay({
      Conversation: () => conversation,
    })

    fireEvent.input(screen.getByRole("textbox"), {
      target: { value: "some message" },
    })

    fireEvent.submit(screen.getByRole("form"))

    act(() => {
      mockRejectLastOperation(new Error("Something went wrong"))
    })

    expect(resetFormMock).toHaveBeenCalledTimes(1)
    expect(sendToastMock).toHaveBeenCalledWith({
      variant: "error",
      message: "Error sending message. Please try again.",
    })
  })
})
