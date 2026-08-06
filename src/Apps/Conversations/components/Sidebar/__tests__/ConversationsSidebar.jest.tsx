import { act, screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationsSidebarPaginationContainer } from "Apps/Conversations/components/Sidebar/ConversationsSidebar"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"
import { useRefetchLatestMessagesPoll } from "Apps/Conversations/hooks/useRefetchLatestMessagesPoll"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useTabVisible } from "Utils/Hooks/useTabVisible"
import { getENV } from "Utils/getENV"
import type { ConversationsSidebarTestQuery } from "__generated__/ConversationsSidebarTestQuery.graphql"
import { graphql } from "react-relay"

jest.mock("Apps/Conversations/hooks/useConversationsWebsocket")
jest.mock("Apps/Conversations/hooks/useRefetchLatestMessagesPoll")

jest.mock("Utils/getENV", () => ({ getENV: jest.fn() }))
jest.mock("Utils/Hooks/useTabVisible", () => ({ useTabVisible: jest.fn() }))

jest.unmock("react-relay")

const mockGetENV = getENV as jest.Mock
const mockUseTabVisible = useTabVisible as jest.Mock

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: {},
      },
      params: {
        conversationId: "some-id",
      },
    },
  }),
}))

describe("ConversationDetails", () => {
  const { renderWithRelay } = setupTestWrapperTL<ConversationsSidebarTestQuery>(
    {
      Component: ({ viewer }) => {
        return <ConversationsSidebarPaginationContainer viewer={viewer!} />
      },
      query: graphql`
        query ConversationsSidebarTestQuery @relay_test_operation {
          viewer {
            ...ConversationsSidebar_viewer
          }
        }
      `,
    },
  )

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetENV.mockImplementation(
      key => key === "ENABLE_CONVERSATIONS_MESSAGES_AUTO_REFRESH",
    )
    mockUseTabVisible.mockReturnValue(true)
  })

  it("renders", () => {
    renderWithRelay({
      ConversationConnection: () => ({
        edges: [
          {
            node: {
              internalID: "conversation-1",
              to: { name: "Collector 1" },
              lastMessageAt: "2022-12-02",
              unread: false,
            },
          },
        ],
      }),
    })

    expect(screen.getByText("Collector 1")).toBeInTheDocument()
    expect(screen.getByText("2022-12-02")).toBeInTheDocument()
  })

  it("renders empty message given no conversation", () => {
    renderWithRelay({
      ConversationConnection: () => ({
        edges: null,
      }),
    })

    expect(
      screen.getByText("All conversations with galleries will show here."),
    ).toBeInTheDocument()
  })

  describe("realtime updates", () => {
    const mockUseFlag = useFlag as jest.Mock
    const mockUseConversationsWebsocket = useConversationsWebsocket as jest.Mock
    const mockUseRefetchLatestMessagesPoll =
      useRefetchLatestMessagesPoll as jest.Mock

    const oneConversation = {
      ConversationConnection: () => ({
        edges: [
          {
            node: {
              internalID: "conversation-1",
              to: { name: "Collector 1" },
              lastMessageAt: "2022-12-02",
              unread: false,
            },
          },
        ],
      }),
    }

    it("subscribes with the 'inbox' key when the flag is on", () => {
      mockUseFlag.mockReturnValue(true)

      renderWithRelay(oneConversation)

      expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
        expect.objectContaining({ enabled: true, subscriptionKey: "inbox" }),
      )
    })

    it("does not enable the websocket hook when the flag is off", () => {
      mockUseFlag.mockReturnValue(false)

      renderWithRelay(oneConversation)

      expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
        expect.objectContaining({ enabled: false, subscriptionKey: "inbox" }),
      )
    })

    it("does not enable the websocket hook when the auto-refresh kill switch is off", () => {
      mockUseFlag.mockReturnValue(true)
      mockGetENV.mockReturnValue(false)

      renderWithRelay(oneConversation)

      expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
        expect.objectContaining({ enabled: false, subscriptionKey: "inbox" }),
      )
    })

    it("refetches the sidebar list on a message.sent event", () => {
      mockUseFlag.mockReturnValue(true)

      const { env } = renderWithRelay(oneConversation)

      const operationCountBefore = env.mock.getAllOperations().length

      const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
      act(() => {
        onEvent({
          type: "message.sent",
          conversation_id: "conversation-1",
          message_id: "msg-99",
          created_at: "2026-08-06T00:00:00Z",
        })
      })

      expect(env.mock.getAllOperations().length).toBeGreaterThan(
        operationCountBefore,
      )
    })

    it("ignores events of an unknown type", () => {
      mockUseFlag.mockReturnValue(true)

      const { env } = renderWithRelay(oneConversation)

      const operationCountBefore = env.mock.getAllOperations().length

      const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
      act(() => {
        onEvent({
          type: "conversation.archived",
          conversation_id: "conversation-1",
          message_id: "msg-99",
          created_at: "2026-08-06T00:00:00Z",
        })
      })

      expect(env.mock.getAllOperations().length).toBe(operationCountBefore)
    })

    it("does not refetch when the tab is in the background", () => {
      mockUseFlag.mockReturnValue(true)
      mockUseTabVisible.mockReturnValue(false)

      const { env } = renderWithRelay(oneConversation)

      const operationCountBefore = env.mock.getAllOperations().length

      const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
      act(() => {
        onEvent({
          type: "message.sent",
          conversation_id: "conversation-1",
          message_id: "msg-99",
          created_at: "2026-08-06T00:00:00Z",
        })
      })

      expect(env.mock.getAllOperations().length).toBe(operationCountBefore)
    })

    it("clears polling when the websocket flag is on", () => {
      mockUseFlag.mockReturnValue(true)

      renderWithRelay(oneConversation)

      expect(mockUseRefetchLatestMessagesPoll).toHaveBeenCalledWith(
        expect.objectContaining({ clearWhen: true }),
      )
    })

    it("keeps polling when the websocket flag is off", () => {
      mockUseFlag.mockReturnValue(false)

      renderWithRelay(oneConversation)

      expect(mockUseRefetchLatestMessagesPoll).toHaveBeenCalledWith(
        expect.objectContaining({ clearWhen: false }),
      )
    })
  })
})
