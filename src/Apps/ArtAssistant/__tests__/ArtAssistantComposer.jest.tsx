import { fireEvent, render, screen } from "@testing-library/react"
import { ArtAssistantComposer } from "Apps/ArtAssistant/Components/ArtAssistantComposer"
import { MockBoot } from "DevTools/MockBoot"

describe("Art Assistant composer", () => {
  it("sends on desktop Enter but preserves Shift+Enter and IME input", () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })
    const onSubmit = jest.fn(() => true)
    const onChange = jest.fn()
    render(
      <MockBoot>
        <ArtAssistantComposer
          value="Find art"
          isResponding={false}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </MockBoot>,
    )
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("rows", "1")
    expect(input).toHaveStyle({ minHeight: "44px", height: "44px" })
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true })
    fireEvent.keyDown(input, { key: "Enter", isComposing: true })
    expect(onSubmit).not.toHaveBeenCalled()
    fireEvent.keyDown(input, { key: "Enter" })
    expect(onSubmit).toHaveBeenCalledWith("Find art")
    expect(onChange).toHaveBeenCalledWith("")
  })
})
