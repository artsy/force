import { ConversationMessageBubble } from "Apps/Conversations/components/Message/ConversationMessageBubble"
import { messageTime } from "Apps/Conversations/components/Message/Utils/dateFormatters"
import { render } from "DevTools/renderWithMockBoot"
import { screen } from "@testing-library/react"

describe("ConversationMessageBubble", () => {
  it("renders given fromViewer", () => {
    const isoDate = new Date("2023-01-01T10:00:00.000Z").toISOString()
    const expectedTime = messageTime(isoDate)

    render(
      <ConversationMessageBubble fromViewer time={isoDate} seenBy="Gumball">
        test message
      </ConversationMessageBubble>,
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText(expectedTime)).toBeInTheDocument()
    expect(screen.getByText("Seen by Gumball")).toBeInTheDocument()
  })

  it("renders given fromViewer and simplified", () => {
    render(
      <ConversationMessageBubble fromViewer simplified seenBy="Gumball">
        test message
      </ConversationMessageBubble>,
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText("Seen by Gumball")).toBeInTheDocument()
  })

  it("renders given not fromViewer", () => {
    const isoDate = new Date("2023-01-01T11:00:00.000Z").toISOString()
    const expectedTime = `• ${messageTime(isoDate)}`

    render(
      <ConversationMessageBubble
        time={isoDate}
        name="Gumball"
        avatarUrl="https://images.com/gumbal.webp"
      >
        test message
      </ConversationMessageBubble>,
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText(expectedTime)).toBeInTheDocument()
    expect(screen.getByText("Gumball")).toBeInTheDocument()
    expect(screen.getByRole("presentation")).toHaveAttribute(
      "src",
      "https://images.com/gumbal.webp",
    )
  })

  it("renders given not fromViewer and without avatarUrl", () => {
    const isoDate = new Date("2023-01-01T11:00:00.000Z").toISOString()
    const expectedTime = `• ${messageTime(isoDate)}`

    render(
      <ConversationMessageBubble time={isoDate} name="Gumball">
        test message
      </ConversationMessageBubble>,
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText(expectedTime)).toBeInTheDocument()
    expect(screen.getByText("Gumball")).toBeInTheDocument()
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("renders given not fromViewer and simplified", () => {
    render(
      <ConversationMessageBubble simplified>
        test message
      </ConversationMessageBubble>,
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("Linkify converts only links", () => {
    const isoDate = new Date("2023-01-01T11:00:00.000Z").toISOString()

    render(
      <ConversationMessageBubble time={isoDate} name="Gumball">
        Link here: https://artsy.net
      </ConversationMessageBubble>,
    )
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "https://artsy.net")
    expect(link).toHaveTextContent("https://artsy.net")

    expect(screen.getByText("Link here:")).toBeInTheDocument()
  })
})
