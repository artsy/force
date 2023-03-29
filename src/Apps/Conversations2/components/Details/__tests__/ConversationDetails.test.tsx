import { graphql } from "relay-runtime"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapper } from "utils/test/setupTestWrapper"
import { ConversationDetails } from "../ConversationDetails"
import { ConversationDetailsTestQuery } from "__generated__/ConversationDetailsTestQuery.graphql"
import { useTracking } from "react-tracking"
import { MediaContextProvider } from "utils/responsive"
import * as getConfig from "next/config"

jest.mock("next/navigation", () => ({
  usePathname: () => "conversation/test-id",
}))

jest.mock("react-tracking")

jest.mock("next/config", () => ({
  __esModule: true, // Allows to import * as getConfig
  ...jest.requireActual("next/config"),
}))

describe("ConversationDetails", () => {
  let breakpoint: "md" | "sm"
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapper<ConversationDetailsTestQuery>({
    Component: ({ viewer }) => (
      <MediaContextProvider onlyMatch={[breakpoint]}>
        <ConversationDetails viewer={viewer!} />
      </MediaContextProvider>
    ),
    query: graphql`
      query ConversationDetailsTestQuery @relay_test_operation {
        viewer {
          ...ConversationDetails_viewer
            @arguments(conversationId: "conversation-id", sellerId: "123")
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))
    jest.spyOn(getConfig, "default").mockImplementation(() => ({
      publicRuntimeConfig: { NEXT_PUBLIC_SALESFORCE_CHAT_ENABLED: "true" },
    }))

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

    expect(screen.queryByText("Order Information")).not.toBeInTheDocument()
    expect(screen.queryByText("Artwork")).not.toBeInTheDocument()

    const collector = screen.getByText("Collector Profile")
    const manage = screen.getByText("Manage This Inquiry")
    const help = screen.getByText("Help Center")

    expect(collector.compareDocumentPosition(manage)).toBe(4)
    expect(manage.compareDocumentPosition(help)).toBe(4)

    expect(screen.getByTestId("salesforce-chat-bubble")).toBeInTheDocument()
  })

  it("doesn't render salesforce chat bubble when env variable is false", () => {
    jest.spyOn(getConfig, "default").mockImplementationOnce(() => ({
      publicRuntimeConfig: { NEXT_PUBLIC_SALESFORCE_CHAT_ENABLED: "false" },
    }))

    renderWithRelay()

    expect(
      screen.queryByTestId("salesforce-chat-bubble")
    ).not.toBeInTheDocument()
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

      const order = screen.getByText("Order Information")
      const artwork = screen.getByText("Artwork")
      const collector = screen.getByText("Collector Profile")
      const manage = screen.getByText("Manage This Inquiry")
      const help = screen.getByText("Help Center")

      expect(order.compareDocumentPosition(artwork)).toBe(4)
      expect(artwork.compareDocumentPosition(collector)).toBe(4)
      expect(collector.compareDocumentPosition(manage)).toBe(4)
      expect(manage.compareDocumentPosition(help)).toBe(4)

      expect(
        screen.queryByTestId("salesforce-chat-bubble")
      ).not.toBeInTheDocument()
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
