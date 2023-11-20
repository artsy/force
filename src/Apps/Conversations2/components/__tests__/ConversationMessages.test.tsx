import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationMessagesPaginationContainer } from "Apps/Conversations2/components/Message/ConversationMessages"
import { ConversationMessagesTestQuery } from "__generated__/ConversationMessagesTestQuery.graphql"
import { format, subDays } from "date-fns"
import { act, fireEvent, screen } from "@testing-library/react"
import { intersect } from "Utils/Hooks/__tests__/mockIntersectionObserver"

const loadMoreMock = jest.fn()
const useLoadMoreMock = jest.fn().mockReturnValue({
  loadMore: loadMoreMock,
})
jest.mock("utils/hooks/useLoadMore", () => ({
  useLoadMore: (arg: any) => useLoadMoreMock(arg),
}))

jest.mock("next/router", () => require("next-router-mock"))

describe("ConversationMessages", () => {
  const scrollIntoViewMock = jest.fn()
  const { renderWithRelay } = setupTestWrapperTL<ConversationMessagesTestQuery>(
    {
      Component: ({ conversation }) => (
        <ConversationMessagesPaginationContainer conversation={conversation!} />
      ),
      query: graphql`
        query ConversationMessagesTestQuery @relay_test_operation {
          conversation(id: "123") {
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

  it("groups messages by day under a title", () => {
    renderWithRelay({
      MessageConnection: () => ({
        edges: [
          { node: { createdAt: "2022-12-25T21:03:20+00:00" } },
          { node: { createdAt: subDays(new Date(), 1).toISOString() } },
          { node: { createdAt: new Date().toISOString() } },
        ],
      }),
    })

    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.getByText("Yesterday")).toBeInTheDocument()
    expect(screen.getByText("Dec 25, 2022")).toBeInTheDocument()

    expect(screen.getAllByText("Today").length).toEqual(1)
    expect(screen.getAllByText("Yesterday").length).toEqual(1)
    expect(screen.getAllByText("Dec 25, 2022").length).toEqual(1)
  })

  it("groups messages sent at the same minute by the same sender", () => {
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

    expect(screen.getByText(`• ${createdAtTime}`)).toBeInTheDocument() // Collector
    expect(screen.getByText(createdAtTime)).toBeInTheDocument() // Partner

    expect(screen.getAllByText(`• ${createdAtTime}`).length).toEqual(1) // Collector
    expect(screen.getAllByText(createdAtTime).length).toEqual(1) // Partner

    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  it.skip("shows who has seen the message, on the last grouped message from the partner", () => {
    const createdAt = new Date()
    const createdAtTime = format(new Date(createdAt), "h:mma")
    const collectorMessage = {
      createdAt,
      createdAtTime,
      isFromUser: true,
      from: {
        name: "Collector Collectorson",
        email: "collector@cat.com",
      },
    }
    const partnerMessage = {
      createdAt,
      createdAtTime,
      from: { name: null },
      deliveries: [
        {
          openedAt: "2022-12-25T21:03:20+00:00",
          fullTransformedEmail: "collector@cat.com",
        },
      ],
      to: ["collector@cat.com"],
      cc: [],
    }
    renderWithRelay({
      MessageConnection: () => ({
        edges: [
          { node: collectorMessage },
          { node: collectorMessage },
          { node: partnerMessage },
          { node: partnerMessage },
          { node: partnerMessage },
        ],
      }),
    })

    const seenByText = "Seen by all"
    expect(screen.getByText(seenByText)).toBeInTheDocument()
    expect(screen.getAllByText(seenByText).length).toEqual(1)
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

    expect(useLoadMoreMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        pageSize: 15,
      })
    )

    const bottomSentinel = screen.getByTestId("messages-bottom-sentinel")
    expect(bottomSentinel).toBeInTheDocument()

    act(() => intersect(bottomSentinel, true))

    const topSentinel = screen.getByTestId("messages-top-sentinel")
    expect(topSentinel).toBeInTheDocument()

    act(() => intersect(topSentinel, true))
    expect(loadMoreMock).toHaveBeenCalledTimes(1)
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

    const bottomSentinel = screen.getByTestId("messages-bottom-sentinel")
    act(() => intersect(bottomSentinel, true))
    act(() => intersect(bottomSentinel, false))

    fireEvent.click(screen.getByText("Latest Messages"))

    expect(screen.getByTestId("messages-bottom-spinner")).toBeInTheDocument()
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

    it("renders properly formatted first message field instead of the body only once and for the first message", () => {
      renderWithRelay({
        Conversation: () => ({
          messagesConnection,
          inquiryRequest: {
            formattedFirstMessage: "This is the formatted first message",
          },
        }),
      })
      expect(
        screen.getByText("This is the formatted first message")
      ).toBeInTheDocument()
      expect(
        screen.queryAllByText("This is the formatted first message").length
      ).toEqual(1)
      expect(
        screen.queryByText("This is the first message")
      ).not.toBeInTheDocument()
      expect(screen.getByText("This is the second message")).toBeInTheDocument()
    })

    it("renders the body if the formatted first message is missing (can only happen on staging)", () => {
      renderWithRelay({
        Conversation: () => ({
          messagesConnection,
          inquiryRequest: {
            formattedFirstMessage: null,
          },
        }),
      })
      expect(screen.getByText("This is the first message")).toBeInTheDocument()
      expect(screen.getByText("This is the second message")).toBeInTheDocument()
    })
  })
})
