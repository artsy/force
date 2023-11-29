import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationMessagesPaginationContainer } from "Apps/Conversations/components/Message/ConversationMessages"
import { ConversationMessagesTestQuery } from "__generated__/ConversationMessagesTestQuery.graphql"
import { format, subDays } from "date-fns"
import { act, fireEvent, screen, waitFor } from "@testing-library/react"
import { intersect } from "Utils/Hooks/__tests__/mockIntersectionObserver"
import { useLoadMore } from "Apps/Conversations/hooks/useLoadMore"

jest.mock("Apps/Conversations/hooks/useLoadMore")

jest.unmock("react-relay")

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
        <ConversationMessagesPaginationContainer conversation={conversation!} />
      ),
      query: graphql`
        query ConversationMessagesTestQuery @relay_test_operation {
          conversation(id: "1234") {
            ...ConversationMessages_conversation
          }
        }
      `,
    }
  )

  beforeEach(() => {
    jest.clearAllMocks()
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
        screen.getByText("Offer Accepted - Pending Action")
      ).toBeInTheDocument()
      expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
      expect(screen.getByText("First test message")).toBeInTheDocument()
      expect(screen.getByText("Second test message")).toBeInTheDocument()
    })
  })

  it("groups messages sent at the same minute by the same sender", async () => {
    const createdAt = new Date()
    const createdAtTime = format(new Date(createdAt), "h:mma")
    renderWithRelay({
      MessageConnection: () => ({
        edges: [
          {
            node: {
              createdAt,
              createdAtTime,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          {
            node: {
              createdAt,
              createdAtTime,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          { node: { createdAt, createdAtTime, from: { name: null } } },
          { node: { createdAt, createdAtTime, from: { name: null } } },
        ],
      }),
    })

    await waitFor(() => {
      expect(screen.getAllByText(`• ${createdAtTime}`).length).toEqual(2) // Collector
      expect(screen.getAllByText(createdAtTime).length).toEqual(2) // Partner
    })

    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  it("load more messages when scrolling to the top", async () => {
    const createdAt = new Date()
    const createdAtTime = format(new Date(createdAt), "h:mma")
    renderWithRelay({
      MessageConnection: () => ({
        edges: [
          {
            node: {
              createdAt,
              createdAtTime,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          {
            node: {
              createdAt,
              createdAtTime,
              isFromUser: true,
              from: { name: "Collector Collectorson" },
            },
          },
          { node: { createdAt, createdAtTime, from: { name: null } } },
          { node: { createdAt, createdAtTime, from: { name: null } } },
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
    const { env } = renderWithRelay({
      MessageConnection: () => ({
        edges: [
          { node: { createdAt: "2022-12-25T21:03:20+00:00" } },
          { node: { createdAt: subDays(new Date(), 1).toISOString() } },
          { node: { createdAt: new Date().toISOString() } },
        ],
      }),
    })

    const bottomSentinel = screen.getByTestId("LatestMessagesSentinel")
    act(() => intersect(bottomSentinel, true))
    act(() => intersect(bottomSentinel, false))

    fireEvent.click(screen.getByText("Latest Messages"))

    expect(screen.getAllByTestId("LoadingSpinner").length).toBe(1)
    expect(env.mock.getAllOperations().length).toBe(1)
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
          screen.getByText("This is the formatted first message")
        ).toBeInTheDocument()
        expect(
          screen.queryAllByText("This is the formatted first message").length
        ).toEqual(1)
        expect(
          screen.queryByText("This is the first message")
        ).not.toBeInTheDocument()
        expect(
          screen.getByText("This is the second message")
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
          screen.getByText("This is the first message")
        ).toBeInTheDocument()
        expect(
          screen.getByText("This is the second message")
        ).toBeInTheDocument()
      })
    })
  })
})
