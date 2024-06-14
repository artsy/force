import { graphql } from "react-relay"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationDetails } from "Apps/Conversations/components/Details/ConversationDetails"
import { ConversationDetailsTestQuery } from "__generated__/ConversationDetailsTestQuery.graphql"
import { useTracking } from "react-tracking"
import { MediaContextProvider } from "Utils/Responsive"

jest.mock("react-tracking")
jest.unmock("react-relay")

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

describe("ConversationDetails", () => {
  let breakpoint: "md" | "sm"
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL<ConversationDetailsTestQuery>({
    Component: ({ conversation }) => (
      <MediaContextProvider onlyMatch={[breakpoint]}>
        <ConversationDetails conversation={conversation!} />
      </MediaContextProvider>
    ),
    query: graphql`
      query ConversationDetailsTestQuery @relay_test_operation {
        conversation(id: "conversation-id") {
          ...ConversationDetails_conversation
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))
    breakpoint = "md"
  })

  it("renders sections in the right order", async () => {
    renderWithRelay({
      Viewer: () => ({
        conversation: {
          fromUser: { collectorProfile: { email: "test-email@mail.com" } },
        },
      }),
      CommerceOrderConnectionWithTotalCount: () => ({ edges: [] }),
    })

    expect(screen.getByText("Artwork")).toBeInTheDocument()
    expect(screen.getByText("Attachments")).toBeInTheDocument()
    expect(screen.getByText("Support")).toBeInTheDocument()
  })

  it("renders order information if there is an order associated", () => {
    renderWithRelay({
      Viewer: () => ({
        conversation: {
          fromUser: { collectorProfile: { email: "test-email@mail.com" } },
        },
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [{ node: { state: "SUBMITTED" } }],
        }),
      }),
    })

    expect(screen.getByText("Order Information")).toBeInTheDocument()
  })

  describe("sm breakpoint", () => {
    beforeEach(() => {
      breakpoint = "sm"
    })

    it("renders sections in the right order", async () => {
      renderWithRelay({
        Viewer: () => ({
          conversation: {
            fromUser: { collectorProfile: { email: "test-email@mail.com" } },
          },
        }),
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [{ node: { state: "SUBMITTED" } }],
        }),
      })

      expect(screen.getByText("Order Information")).toBeInTheDocument()
      expect(screen.getByText("Artwork")).toBeInTheDocument()
      expect(screen.getByText("Attachments")).toBeInTheDocument()
      expect(screen.getByText("Support")).toBeInTheDocument()
    })

    it("tracks click on View Artwork", () => {
      renderWithRelay({
        ConversationItemType: () => ({ id: "mocked-artwork-id" }),
      })

      fireEvent.click(screen.getByText("View Artwork"))

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0][0]).toMatchObject({
        action: "Click",
        label: "View artwork",
        context_module: "conversations",
        artwork_id: "mocked-artwork-id",
      })
    })
  })
})
