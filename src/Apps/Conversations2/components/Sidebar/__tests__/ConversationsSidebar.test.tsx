import { graphql } from "relay-runtime"
import { screen } from "@testing-library/react"
import { setupTestWrapper } from "utils/test/setupTestWrapper"
import { ConversationsSidebar } from "../ConversationsSidebar"
import { ConversationsSidebarTestQuery } from "__generated__/ConversationsSidebarTestQuery.graphql"
import mockRouter from "next-router-mock"

jest.mock("next/router", () => require("next-router-mock"))

describe("ConversationDetails", () => {
  const { renderWithRelay } = setupTestWrapper<ConversationsSidebarTestQuery>({
    Component: ({ viewer }) => <ConversationsSidebar viewer={viewer!} />,
    query: graphql`
      query ConversationsSidebarTestQuery @relay_test_operation {
        viewer {
          ...ConversationsSidebar_viewer
            @arguments(partnerId: "partner-id", sellerId: "partner-id")
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()

    mockRouter.query = { conversationId: "123" }
  })

  it("renders", () => {
    renderWithRelay({
      ConversationConnection: () => ({
        edges: [
          {
            node: {
              internalID: "conversation-1",
              from: { name: "Collector 1" },
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
      screen.getByText("All conversations with collectors will show here.")
    ).toBeInTheDocument()
  })
})
