import { graphql } from "relay-runtime"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { DismissInquiryModal } from "Apps/Conversations2/components/Details/DismissInquiryModal"
import { DismissInquiryModalTestQuery } from "__generated__/DismissInquiryModalTestQuery.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.mock("react-tracking")

jest.mock("System/useSystemContext", () => ({
  useSystemContext: () => ({
    user: { currentPartner: { _id: "mocked-partner-id" } },
  }),
}))

describe("DismissInquiryModal", () => {
  const onClose = jest.fn()
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL<DismissInquiryModalTestQuery>({
    Component: ({ conversation }) => (
      <DismissInquiryModal conversation={conversation!} onClose={onClose} />
    ),
    query: graphql`
      query DismissInquiryModalTestQuery @relay_test_operation {
        conversation(id: "conversation-id") {
          ...DismissInquiryModal_conversation
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))

    // FIXME
    // mockRouter.query = { conversationId: "mocked-conversation-id" }
  })

  it("renders", () => {
    renderWithRelay()

    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getAllByRole("option").length).toBe(4)
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Dismiss Inquiry")).toBeInTheDocument()
  })

  it("renders a textbox for comments when reason is Other", () => {
    renderWithRelay()

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "other" },
    })

    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("renders checkbox to set artwork as sold when reason is work_unavailable", () => {
    renderWithRelay()

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "work_unavailable" },
    })

    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("doesn't render checkbox to set artwork as sold when it's already sold", () => {
    renderWithRelay({
      ConversationItemType: () => ({ availability: "sold" }),
    })

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "work_unavailable" },
    })

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()
  })

  it("Dismisses inquiry", async () => {
    const { mockResolveLastOperation } = renderWithRelay({
      ConversationItemType: () => ({ id: "mocked-artwork-id" }),
    })

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "already_contacted" },
    })

    fireEvent.click(screen.getByText("Dismiss Inquiry"))

    await waitFor(() => {
      mockResolveLastOperation({
        Conversation: () => ({ internalID: "000" }),
      })
    })

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      conversation_id: "mocked-conversation-id",
      context_module: "conversations",
      context_page_owner_type: "conversation",
      artwork_id: "mocked-artwork-id",
      partner_id: "mocked-partner-id",
      label: "Dismiss inquiry",
      reason: "already_contacted",
    })
  })

  // TODO: unskip when the new event for mark as sold is added to Cohesion
  it.skip("Dismisses inquiry and sets the artwork as sold", async () => {
    const { mockResolveLastOperation } = renderWithRelay()

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "work_unavailable" },
    })

    fireEvent.click(screen.getByRole("checkbox"), {
      target: { checked: true },
    })

    fireEvent.click(screen.getByText("Dismiss Inquiry"))

    // useDismissInquiry
    await waitFor(() => {
      mockResolveLastOperation({
        Conversation: () => ({ internalID: "000" }),
      })
    })
    // useUpdateArtwork
    await waitFor(() => {
      mockResolveLastOperation({
        ArtworkConnection: () => ({ internalID: "000" }),
      })
    })

    expect(trackEvent).toHaveBeenCalledTimes(2)
  })

  it.each(["Cancel", "Close"])(
    "tracks when dismiss inquiry is canceled using %s button",
    text => {
      renderWithRelay({
        ConversationItemType: () => ({ id: "mocked-artwork-id" }),
      })

      fireEvent.click(screen.getByText(text))

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0][0]).toMatchObject({
        conversation_id: "mocked-conversation-id",
        context_module: "conversations",
        context_page_owner_type: "conversation",
        artwork_id: "mocked-artwork-id",
        partner_id: "mocked-partner-id",
        label: "Cancel dismiss inquiry",
      })
    }
  )
})
