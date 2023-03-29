import { graphql } from "relay-runtime"
import { act, fireEvent, screen } from "@testing-library/react"
import { MarkAsSpamModal } from "../MarkAsSpamModal"
import { MarkAsSpamModalTestQuery } from "__generated__/MarkAsSpamModalTestQuery.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapper } from "utils/test/setupTestWrapper"
import mockRouter from "next-router-mock"

jest.mock("next/router", () => require("next-router-mock"))

jest.mock("react-tracking")

jest.mock("system/SystemContext", () => ({
  useSystemContext: () => ({
    user: { currentPartner: { _id: "mocked-partner-id" } },
  }),
}))

describe("MarkAsSpamModal", () => {
  const onClose = jest.fn()
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapper<MarkAsSpamModalTestQuery>({
    Component: ({ conversation }) => (
      <MarkAsSpamModal conversation={conversation!} onClose={onClose} />
    ),
    query: graphql`
      query MarkAsSpamModalTestQuery @relay_test_operation {
        conversation(id: "conversation-id") {
          ...MarkAsSpamModal_conversation
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))

    mockRouter.query = { conversationId: "mocked-conversation-id" }
  })

  it("tracks when confirming mark as spam", async () => {
    const { mockResolveLastOperation } = renderWithRelay({
      ConversationItemType: () => ({ id: "mocked-artwork-id" }),
    })

    fireEvent.click(screen.getByText("Delete And Mark as Spam"))

    // useMarkAsSpamMutation
    act(() => {
      mockResolveLastOperation({
        Conversation: () => ({ initialMessage: "000" }),
      })
    })
    // useDeleteConversationMutation
    act(() => {
      mockResolveLastOperation({
        Conversation: () => ({ deletedAt: new Date().toISOString() }),
      })
    })

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      conversation_id: "mocked-conversation-id",
      context_module: "conversations",
      context_page_owner_type: "conversation",
      artwork_id: "mocked-artwork-id",
      partner_id: "mocked-partner-id",
      label: "Mark as spam",
    })
  })

  it.each(["Cancel", "Close"])(
    "tracks when mark as spam is canceled using %s button",
    (text) => {
      renderWithRelay({
        ConversationItemType: () => ({ id: "mocked-artwork-id" }),
      })

      fireEvent.click(screen.getByText(text))

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0][0]).toMatchObject({
        conversation_id: "mocked-conversation-id",
        context_module: "conversations",
        context_page_owner_type: "conversation",
        artwork_id: "mocked-artwork-id",
        partner_id: "mocked-partner-id",
        label: "Cancel mark as spam",
      })
    }
  )
})
