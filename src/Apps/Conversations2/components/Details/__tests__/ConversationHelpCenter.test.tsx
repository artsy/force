import { graphql } from "relay-runtime"
import { fireEvent, screen } from "@testing-library/react"
import { ConversationHelpCenter } from "../ConversationHelpCenter"
import { ConversationHelpCenterTestQuery } from "__generated__/ConversationHelpCenterTestQuery.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.mock("react-tracking")

describe("ConversationHelpCenter", () => {
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL<
    ConversationHelpCenterTestQuery
  >({
    Component: ({ conversation }) => (
      <ConversationHelpCenter conversation={conversation!} />
    ),
    query: graphql`
      query ConversationHelpCenterTestQuery @relay_test_operation {
        conversation(id: "conversation-id") {
          ...ConversationHelpCenter_conversation
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))
  })

  it.each([
    "Helpful Tips About Artsy Inquiries",
    "Security Best Practices For Artsy CMS",
    "Stop Phishing Attempts",
    "Identify Suspicious Collectors",
  ])("tracks click on %s", text => {
    renderWithRelay({
      ConversationItemType: () => ({ id: "mocked-artwork-id" }),
    })

    fireEvent.click(screen.getByText(text))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      action: "Click",
      label: "Help article link",
      context_module: "conversations",
      artwork_id: "mocked-artwork-id",
    })
  })
})
