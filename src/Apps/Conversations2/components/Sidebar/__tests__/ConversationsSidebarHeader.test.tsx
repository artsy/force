import { fireEvent, render, screen } from "@testing-library/react"
import { ConversationsSidebarHeader } from "Apps/Conversations2/components/Sidebar/ConversationsSidebarHeader"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("System/useSystemContext", () => ({
  useSystemContext: () => ({
    user: {
      currentPartner: {
        _id: "partner-id-1",
        id: "partner-slug",
      },
    },
  }),
}))

describe("ConversationsSidebarHeader", () => {
  const mockRouter = {} as any
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockTracking.mockImplementation(() => ({ trackEvent }))

    jest.clearAllMocks()
  })

  it("renders", () => {
    render(<ConversationsSidebarHeader />)

    expect(screen.getByText("Conversations")).toBeInTheDocument()
    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("New")).toBeInTheDocument()
    expect(screen.getByText("Replied")).toBeInTheDocument()
    expect(screen.getByRole("button", { pressed: true })).toHaveTextContent(
      "All"
    )
  })

  it("renders the corresponding selected Pill given a filter", () => {
    // FIXME
    // mockRouter.query = { conversationsFilter: "replied" }
    render(<ConversationsSidebarHeader />)

    expect(screen.getByRole("button", { pressed: true })).toHaveTextContent(
      "Replied"
    )
  })

  it("changes the filter to new_inquiries when interacting with Pills", () => {
    // FIXME
    // mockRouter.query = { conversationId: "123" }
    render(<ConversationsSidebarHeader />)

    expect(screen.getByRole("button", { pressed: true })).toHaveTextContent(
      "All"
    )

    fireEvent.click(screen.getByText("New"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      action: "clickedConversationsFilter",
      context_module: "conversations",
      context_owner_id: "partner-id-1",
      context_owner_slug: "partner-slug",
      context_page_owner_type: "conversation",
      label: "new_inquiries",
      partner_id: "partner-id-1",
    })

    expect(screen.getByRole("button", { pressed: true })).toHaveTextContent(
      "New"
    )
    expect(mockRouter.query).toMatchObject({
      conversationId: "123",
      conversationsFilter: "new_inquiries",
    })
  })

  it("removes the filter when selecting the All Pill", () => {
    mockRouter.query = { conversationId: "123", conversationsFilter: "replied" }
    render(<ConversationsSidebarHeader />)

    fireEvent.click(screen.getByText("All"))

    expect(screen.getByRole("button", { pressed: true })).toHaveTextContent(
      "All"
    )
    expect(mockRouter.query).toMatchObject({ conversationId: "123" })
  })

  it("doesn't replace the url when clicking on the selected Pill", () => {
    const replaceSpy = jest.spyOn(mockRouter, "replace")
    mockRouter.query = { conversationId: "123" }
    render(<ConversationsSidebarHeader />)

    fireEvent.click(screen.getByText("All"))

    expect(replaceSpy).not.toHaveBeenCalled()
  })
})
