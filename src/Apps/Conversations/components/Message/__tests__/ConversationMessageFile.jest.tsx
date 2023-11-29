import { fireEvent, render, screen } from "@testing-library/react"
import { ConversationMessageFile } from "Apps/Conversations/components/Message/ConversationMessageFile"

describe("ConversationMessageFile", () => {
  it("renders", () => {
    render(
      <ConversationMessageFile
        src="https://file.com/file.pdf"
        name="Edgar.pdf"
        size="10.0 Kb"
      />
    )

    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByText("Edgar.pdf")).toBeInTheDocument()
    expect(screen.getByText("10.0 Kb")).toBeInTheDocument()
  })

  it("opens the file when clicked", () => {
    const mockOpen = jest.fn()
    global.open = mockOpen

    render(
      <ConversationMessageFile
        src="https://file.com/file.pdf"
        name="Edgar.pdf"
        size="10.0 Kb"
      />
    )

    fireEvent.click(screen.getByRole("button"))

    expect(mockOpen).toHaveBeenCalledWith("https://file.com/file.pdf", "_blank")
  })
})
