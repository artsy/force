import { act, fireEvent, screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "utils/test/setupTestWrapper"
import { ConversationReplyTestQuery } from "__generated__/ConversationReplyTestQuery.graphql"
import { ConversationReply } from "../ConversationReply"
import * as formik from "formik"
import { useTracking } from "react-tracking"
import { sentConversationMessage } from "@artsy/cohesion"
import mockRouter from "next-router-mock"

jest.mock("react-tracking")
jest.mock("next/router", () => require("next-router-mock"))
jest.mock("system/SystemContext", () => ({
  useSystemContext: () => ({
    user: {
      email: "partner@mail.com",
      id: "partner-id",
    },
  }),
}))

const sendToastMock = jest.fn()
jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: () => ({
    sendToast: sendToastMock,
  }),
}))

describe("ConversationReply", () => {
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

  const { renderWithRelay } = setupTestWrapper<ConversationReplyTestQuery>({
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
    mockUseTracking.mockImplementation(() => ({ trackEvent: trackingMock }))
    mockRouter.query = { conversationId: conversation.internalID }
  })

  it("submits a reply", async () => {
    spyOnFormik("some message")

    const { mockResolveLastOperation } = renderWithRelay({
      Conversation: () => conversation,
    })

    expect(resetFormMock).toHaveBeenCalledTimes(1)

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

  it("doesn't submit the reply given loading attachments", () => {
    spyOnFormik("some message")

    const { env } = renderWithRelay()

    fireEvent.change(screen.getByTestId("attachments-input"), {
      target: { files: [files[0]] },
    })

    fireEvent.submit(screen.getByRole("form"))

    expect(env.mock.getAllOperations().length).toBe(0)
    expect(sendToastMock).toHaveBeenCalledWith({
      variant: "alert",
      message: "Wait for the attachments to be fully loaded.",
    })
  })

  it("shows toast error given attachments size greater than 20mb", () => {
    spyOnFormik("some message")

    renderWithRelay()

    fireEvent.change(screen.getByTestId("attachments-input"), {
      target: { files: [files[1]] },
    })

    fireEvent.submit(screen.getByRole("form"))

    expect(sendToastMock).toHaveBeenCalledWith({
      variant: "error",
      message: "Unable to attach document (exceeds message size limit of 20MB)",
      ttl: 6000,
    })
  })

  it("tracks an event when clicking on the attach button", async () => {
    spyOnFormik("")

    renderWithRelay({
      ConversationItemType: () => ({ id: "mocked-artwork-id" }),
    })

    fireEvent.click(screen.getByTestId("attach-button"))

    expect(trackingMock).toHaveBeenCalledTimes(1)
    expect(trackingMock.mock.calls[0][0]).toMatchObject({
      action: "Click",
      label: "Attach",
      context_module: "conversations",
      artwork_id: "mocked-artwork-id",
    })
  })
})

const files = [
  { name: "file.pdf", type: ".pdf", size: 1000 },
  {
    name: "file.pdf",
    type: ".pdf",
    size: 20_000_001,
  },
]
