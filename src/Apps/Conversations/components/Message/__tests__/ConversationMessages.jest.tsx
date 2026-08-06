import { act, fireEvent, screen, waitFor } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationsProvider } from "Apps/Conversations/ConversationsContext"
import { ConversationMessagesPaginationContainer } from "Apps/Conversations/components/Message/ConversationMessages"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"
import { useLoadMore } from "Apps/Conversations/hooks/useLoadMore"
import { useRefetchLatestMessagesPoll } from "Apps/Conversations/hooks/useRefetchLatestMessagesPoll"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { intersect } from "Utils/Hooks/__tests__/mockIntersectionObserver"
import { useTabVisible } from "Utils/Hooks/useTabVisible"
import { getENV } from "Utils/getENV"
import type { ConversationMessagesTestQuery } from "__generated__/ConversationMessagesTestQuery.graphql"
import { format, subDays } from "date-fns"
import { graphql } from "react-relay"

jest.mock("Apps/Conversations/hooks/useLoadMore")
jest.mock("Apps/Conversations/hooks/useConversationsWebsocket")
jest.mock("Apps/Conversations/hooks/useRefetchLatestMessagesPoll")

jest.mock("Utils/getENV", () => ({ getENV: jest.fn() }))
jest.mock("Utils/Hooks/useTabVisible", () => ({ useTabVisible: jest.fn() }))

jest.unmock("react-relay")

const mockGetENV = getENV as jest.Mock
const mockUseTabVisible = useTabVisible as jest.Mock

describe("ConversationMessages", () => {
  const mockUseLoadMore = useLoadMore as jest.Mock
  const loadMoreMock = jest.fn()
  const useLoadMoreMock = jest.fn().mockReturnValue({
    loadMore: loadMoreMock,
  })

  mockUseLoadMore.mockReturnValue(useLoadMoreMock)

  const scrollIntoViewMock = jest.fn()
  const { renderWithRelay } = setupTestWrapperTL<ConversationMessagesTestQuery>(
    {
      Component: ({ conversation }) => (
        <ConversationsProvider conversation={conversation!}>
          <ConversationMessagesPaginationContainer
            conversation={conversation!}
          />
        </ConversationsProvider>
      ),
      query: graphql`
        query ConversationMessagesTestQuery @relay_test_operation {
          conversation(id: "1234") {
            ...ConversationsContext_conversation
            ...ConversationMessages_conversation
          }
        }
      `,
    },
  )

  // The "Latest Messages" text sits in an inner div that doesn't carry the
  // opacity styling itself (opacity doesn't inherit into computed style), so
  // assertions on visibility need the actual <button>.
  const getLatestMessagesButton = () => {
    return screen.getByText("Latest Messages").closest("button") as HTMLElement
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetENV.mockImplementation(
      key => key === "ENABLE_CONVERSATIONS_MESSAGES_AUTO_REFRESH",
    )
    mockUseTabVisible.mockReturnValue(true)
    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  it("groups messages by day under a title", async () => {
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
                  orderUpdateState: "offer_approved",
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

    await waitFor(() => {
      expect(
        screen.getByText("Offer Accepted - Pending Action"),
      ).toBeInTheDocument()
      expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
      expect(screen.getByText("First test message")).toBeInTheDocument()
      expect(screen.getByText("Second test message")).toBeInTheDocument()
    })
  })

  it("groups messages sent at the same minute by the same sender", async () => {
    const createdAt = new Date().toISOString()
    const createdAtTime = format(new Date(createdAt), "h:mma")
    renderWithRelay({
      MessageConnection: () => ({
        edges: [
          {
            node: {
              createdAt,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          {
            node: {
              createdAt,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          { node: { createdAt, from: { name: null } } },
          { node: { createdAt, from: { name: null } } },
        ],
      }),
    })

    await waitFor(() => {
      const timeElements = screen.getAllByText(`• ${createdAtTime}`)
      expect(timeElements.length).toBeGreaterThanOrEqual(1)
    })

    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  it("load more messages when scrolling to the top", async () => {
    const createdAt = new Date()
    renderWithRelay({
      MessageConnection: () => ({
        edges: [
          {
            node: {
              createdAt,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          {
            node: {
              createdAt,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          { node: { createdAt, from: { name: null } } },
          { node: { createdAt, from: { name: null } } },
        ],
      }),

      PageInfo: () => ({
        startCursor: "cursor-1",
        endCursor: "cursor-15",
        hasNextPage: true,
        hasPreviousPage: false,
      }),
    })

    const bottomSentinel = screen.getByTestId("LatestMessagesSentinel")
    expect(bottomSentinel).toBeInTheDocument()
    act(() => intersect(bottomSentinel, true))
  })

  it("calls refetch when clicking the latest messages button", () => {
    jest.useFakeTimers()

    const { env } = renderWithRelay({
      MessageConnection: () => ({
        edges: [
          { node: { createdAt: "2022-12-25T21:03:20+00:00" } },
          { node: { createdAt: subDays(new Date(), 1).toISOString() } },
          { node: { createdAt: new Date().toISOString() } },
        ],
      }),
    })

    // Genuine scroll-away, past the initial layout settling window (see the
    // "initial layout settling window" tests below for the false-positive
    // case this window guards against).
    act(() => {
      jest.advanceTimersByTime(500)
    })

    const bottomSentinel = screen.getByTestId("LatestMessagesSentinel")
    act(() => intersect(bottomSentinel, true))
    act(() => intersect(bottomSentinel, false))

    jest.useRealTimers()

    fireEvent.click(screen.getByText("Latest Messages"))

    expect(screen.getAllByTestId("LoadingSpinner").length).toBe(1)
    expect(
      env.mock
        .getAllOperations()
        .map(operation => operation.request.node.params.name),
    ).toContain("ConversationMessagesPaginationQuery")
  })

  describe("first message", () => {
    const messagesConnection = {
      edges: [
        {
          node: {
            body: "This is the first message",
            createdAt: "2022-12-25T21:03:21+00:00",
            isFirstMessage: true,
          },
        },
        {
          node: {
            body: "This is the second message",
            createdAt: "2022-12-26T21:03:22+00:00",
            isFirstMessage: false,
          },
        },
      ],
    }

    it("renders properly formatted first message field instead of the body only once and for the first message", async () => {
      renderWithRelay({
        Conversation: () => ({
          messagesConnection,
          inquiryRequest: {
            formattedFirstMessage: "This is the formatted first message",
          },
        }),
      })

      await waitFor(() => {
        expect(
          screen.getByText("This is the formatted first message"),
        ).toBeInTheDocument()
        expect(
          screen.queryAllByText("This is the formatted first message").length,
        ).toEqual(1)
        expect(
          screen.queryByText("This is the first message"),
        ).not.toBeInTheDocument()
        expect(
          screen.getByText("This is the second message"),
        ).toBeInTheDocument()
      })
    })

    it("renders the body if the formatted first message is missing (can only happen on staging)", async () => {
      renderWithRelay({
        Conversation: () => ({
          messagesConnection,
          inquiryRequest: {
            formattedFirstMessage: null,
          },
        }),
      })

      await waitFor(() => {
        expect(
          screen.getByText("This is the first message"),
        ).toBeInTheDocument()
        expect(
          screen.getByText("This is the second message"),
        ).toBeInTheDocument()
      })
    })
  })

  describe("initial layout settling window", () => {
    afterEach(() => {
      jest.useRealTimers()
    })

    const threeMessages = {
      MessageConnection: () => ({
        edges: [
          { node: { createdAt: "2022-12-25T21:03:20+00:00" } },
          { node: { createdAt: subDays(new Date(), 1).toISOString() } },
          { node: { createdAt: new Date().toISOString() } },
        ],
      }),
    }

    it("does not show the latest messages flyout when the bottom sentinel exits view right after mount", () => {
      jest.useFakeTimers()

      renderWithRelay(threeMessages)

      const bottomSentinel = screen.getByTestId("LatestMessagesSentinel")

      // Simulate the false-positive: layout is still settling (e.g. the
      // partner offer CTA growing below us), so the sentinel reports an
      // "exit" even though the user never scrolled.
      act(() => intersect(bottomSentinel, false))

      expect(getLatestMessagesButton()).toHaveStyle({ opacity: 0 })
    })

    it("shows the latest messages flyout when the bottom sentinel genuinely exits view after the settling window elapses", () => {
      jest.useFakeTimers()

      renderWithRelay(threeMessages)

      act(() => {
        jest.advanceTimersByTime(500)
      })

      const bottomSentinel = screen.getByTestId("LatestMessagesSentinel")
      act(() => intersect(bottomSentinel, false))

      expect(getLatestMessagesButton()).toHaveStyle({ opacity: 1 })
    })

    it("re-pins the view to the bottom when the message list's own height shrinks during the settling window", () => {
      jest.useFakeTimers()

      let resizeCallback: (() => void) | undefined

      class MockResizeObserver {
        constructor(callback: () => void) {
          resizeCallback = callback
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      }

      // @ts-ignore - jsdom doesn't implement ResizeObserver
      global.ResizeObserver = MockResizeObserver

      renderWithRelay(threeMessages)

      // Flush the scroll-to-bottom-on-mount effects so only the
      // resize-triggered call below is attributed to the assertion.
      act(() => {
        jest.advanceTimersByTime(0)
      })
      scrollIntoViewMock.mockClear()

      act(() => {
        resizeCallback?.()
      })

      act(() => {
        jest.advanceTimersByTime(0)
      })

      expect(scrollIntoViewMock).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: "instant", block: "end" }),
      )

      // @ts-ignore
      delete global.ResizeObserver
    })

    it("does not re-pin the view once the settling window has elapsed", () => {
      jest.useFakeTimers()

      let resizeCallback: (() => void) | undefined

      class MockResizeObserver {
        constructor(callback: () => void) {
          resizeCallback = callback
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      }

      // @ts-ignore - jsdom doesn't implement ResizeObserver
      global.ResizeObserver = MockResizeObserver

      renderWithRelay(threeMessages)

      act(() => {
        jest.advanceTimersByTime(500)
      })

      scrollIntoViewMock.mockClear()

      act(() => {
        resizeCallback?.()
      })

      act(() => {
        jest.advanceTimersByTime(0)
      })

      expect(scrollIntoViewMock).not.toHaveBeenCalled()

      // @ts-ignore
      delete global.ResizeObserver
    })
  })

  describe("realtime updates", () => {
    const mockUseFlag = useFlag as jest.Mock
    const mockUseConversationsWebsocket = useConversationsWebsocket as jest.Mock
    const mockUseRefetchLatestMessagesPoll =
      useRefetchLatestMessagesPoll as jest.Mock

    const oneMessage = {
      MessageConnection: () => ({
        edges: [
          {
            node: {
              internalID: "msg-1",
              body: "Hello",
              isFromUser: true,
              createdAt: new Date().toISOString(),
            },
          },
        ],
      }),
      Conversation: () => ({ internalID: "conv-1" }),
    }

    it("does not enable the websocket hook when the flag is off", () => {
      mockUseFlag.mockReturnValue(false)

      renderWithRelay(oneMessage)

      expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
          subscriptionKey: "conversation:conv-1",
        }),
      )
    })

    it("enables the websocket hook, keyed by the conversation id, when the flag is on", () => {
      mockUseFlag.mockReturnValue(true)

      renderWithRelay(oneMessage)

      expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          subscriptionKey: "conversation:conv-1",
        }),
      )
    })

    it("refetches messages when a matching event arrives", () => {
      mockUseFlag.mockReturnValue(true)

      const { env } = renderWithRelay(oneMessage)

      const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
      act(() => {
        onEvent({
          type: "message.sent",
          conversation_id: "conv-1",
          message_id: "msg-99",
          created_at: "2026-08-06T00:00:00Z",
        })
      })

      expect(
        env.mock
          .getAllOperations()
          .map(operation => operation.request.node.params.name),
      ).toContain("ConversationMessagesPaginationQuery")
    })

    it("ignores events for a different conversation", () => {
      mockUseFlag.mockReturnValue(true)

      const { env } = renderWithRelay(oneMessage)

      const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
      act(() => {
        onEvent({
          type: "message.sent",
          conversation_id: "some-other-conversation",
          message_id: "msg-99",
          created_at: "2026-08-06T00:00:00Z",
        })
      })

      expect(
        env.mock
          .getAllOperations()
          .map(operation => operation.request.node.params.name),
      ).not.toContain("ConversationMessagesPaginationQuery")
    })

    it("ignores events of an unknown type", () => {
      mockUseFlag.mockReturnValue(true)

      const { env } = renderWithRelay(oneMessage)

      const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
      act(() => {
        onEvent({
          type: "conversation.archived",
          conversation_id: "conv-1",
          message_id: "msg-99",
          created_at: "2026-08-06T00:00:00Z",
        })
      })

      expect(
        env.mock
          .getAllOperations()
          .map(operation => operation.request.node.params.name),
      ).not.toContain("ConversationMessagesPaginationQuery")
    })

    it("does not refetch when the tab is in the background", () => {
      mockUseFlag.mockReturnValue(true)
      mockUseTabVisible.mockReturnValue(false)

      const { env } = renderWithRelay(oneMessage)

      const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
      act(() => {
        onEvent({
          type: "message.sent",
          conversation_id: "conv-1",
          message_id: "msg-99",
          created_at: "2026-08-06T00:00:00Z",
        })
      })

      expect(
        env.mock
          .getAllOperations()
          .map(operation => operation.request.node.params.name),
      ).not.toContain("ConversationMessagesPaginationQuery")
    })

    it("does not enable the websocket hook when the auto-refresh kill switch is off", () => {
      mockUseFlag.mockReturnValue(true)
      mockGetENV.mockReturnValue(false)

      renderWithRelay(oneMessage)

      expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
          subscriptionKey: "conversation:conv-1",
        }),
      )
    })

    it("clears polling when the websocket flag is on", () => {
      mockUseFlag.mockReturnValue(true)

      renderWithRelay(oneMessage)

      expect(mockUseRefetchLatestMessagesPoll).toHaveBeenCalledWith(
        expect.objectContaining({ clearWhen: true }),
      )
    })

    it("keeps polling when the websocket flag is off", () => {
      mockUseFlag.mockReturnValue(false)

      renderWithRelay(oneMessage)

      expect(mockUseRefetchLatestMessagesPoll).toHaveBeenCalledWith(
        expect.objectContaining({ clearWhen: false }),
      )
    })
  })
})
