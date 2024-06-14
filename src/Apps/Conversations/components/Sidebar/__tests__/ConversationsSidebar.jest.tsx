import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationsSidebarPaginationContainer } from "Apps/Conversations/components/Sidebar/ConversationsSidebar"
import { ConversationsSidebarTestQuery } from "__generated__/ConversationsSidebarTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

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
    }
  )

  beforeEach(() => {
    jest.clearAllMocks()
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
      screen.getByText("All conversations with galleries will show here.")
    ).toBeInTheDocument()
  })
})
