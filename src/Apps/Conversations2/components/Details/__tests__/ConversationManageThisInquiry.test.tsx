import { graphql } from "relay-runtime"
import { fireEvent, screen } from "@testing-library/react"
import { ConversationManageThisInquiry } from "../ConversationManageThisInquiry"
import { ConversationManageThisInquiryTestQuery } from "__generated__/ConversationManageThisInquiryTestQuery.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

jest.mock("next/router", () => require("next-router-mock"))

jest.mock("react-tracking")

describe("ConversationManageThisInquiry", () => {
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } =
    setupTestWrapper<ConversationManageThisInquiryTestQuery>({
      Component: ({ conversation }) => (
        <ConversationManageThisInquiry conversation={conversation!} />
      ),
      query: graphql`
        query ConversationManageThisInquiryTestQuery @relay_test_operation {
          conversation(id: "conversation-id") {
            ...ConversationManageThisInquiry_conversation
          }
        }
      `,
    })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("renders", () => {
    renderWithRelay()

    expect(screen.getByText("Manage This Inquiry")).toBeInTheDocument()

    const buttons = screen.getAllByRole("button")
    expect(buttons[0]).toHaveTextContent("Mark as spam")
    expect(buttons[1]).toHaveTextContent("Dismiss inquiry")
  })

  it.each([
    ["Mark as spam", "Open Mark as Spam modal"],
    ["Dismiss inquiry", "Open Dismiss Inquiry modal"],
  ])("tracks click on %s", (text, label) => {
    renderWithRelay({
      ConversationItemType: () => ({ id: "mocked-artwork-id" }),
    })

    fireEvent.click(screen.getByText(text))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      action: "Click",
      label,
      context_module: "conversations",
      artwork_id: "mocked-artwork-id",
    })
  })
})
