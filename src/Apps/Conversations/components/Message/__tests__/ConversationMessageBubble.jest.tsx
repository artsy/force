import { screen } from "@testing-library/react"
import { ConversationMessageBubble } from "Apps/Conversations/components/Message/ConversationMessageBubble"
import { render } from "DevTools/renderWithMockBoot"

describe("ConversationMessageBubble", () => {
  it("renders given fromViewer", () => {
    render(
      <ConversationMessageBubble fromViewer time="10:00AM" seenBy="Gumball">
        test message
      </ConversationMessageBubble>
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText("10:00AM")).toBeInTheDocument()
    expect(screen.getByText("Seen by Gumball")).toBeInTheDocument()
  })

  it("renders given fromViewer and simplified", () => {
    render(
      <ConversationMessageBubble fromViewer simplified seenBy="Gumball">
        test message
      </ConversationMessageBubble>
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText("Seen by Gumball")).toBeInTheDocument()
  })

  it("renders given not fromViewer", () => {
    render(
      <ConversationMessageBubble
        time="11:00AM"
        name="Gumball"
        avatarUrl="https://images.com/gumbal.webp"
      >
        test message
      </ConversationMessageBubble>
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText("• 11:00AM")).toBeInTheDocument()
    expect(screen.getByText("Gumball")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://images.com/gumbal.webp"
    )
  })

  it("renders given not fromViewer and without avatarUrl", () => {
    render(
      <ConversationMessageBubble time="11:00AM" name="Gumball">
        test message
      </ConversationMessageBubble>
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.getByText("• 11:00AM")).toBeInTheDocument()
    expect(screen.getByText("Gumball")).toBeInTheDocument()
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("renders given not fromViewer and simplified", () => {
    render(
      <ConversationMessageBubble simplified>
        test message
      </ConversationMessageBubble>
    )

    expect(screen.getByText("test message")).toBeInTheDocument()
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("Linkify converts only links", () => {
    render(
      <ConversationMessageBubble time="11:00AM" name="Gumball">
        Link here: https://artsy.net
      </ConversationMessageBubble>
    )
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "https://artsy.net")
    expect(link).toHaveTextContent("https://artsy.net")

    expect(screen.getByText("Link here:")).toBeInTheDocument()
  })
})
