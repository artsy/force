import { fireEvent, render, screen } from "@testing-library/react"
import { ConversationMessageImage } from "Apps/Conversations/components/Message/ConversationMessageImage"

describe("ConversationMessageImage", () => {
  it("renders", () => {
    render(<ConversationMessageImage src="https://image.com/img.webp" />)

    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("opens the image when clicked", () => {
    const mockOpen = jest.fn()
    global.open = mockOpen

    render(<ConversationMessageImage src="https://image.com/img.webp" />)

    fireEvent.click(screen.getByRole("button"))

    expect(mockOpen).toHaveBeenCalledWith(
      "https://image.com/img.webp",
      "_blank"
    )
  })
})
