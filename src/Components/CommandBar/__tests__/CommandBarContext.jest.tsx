import {
  CommandBarProvider,
  useCommandBar,
} from "Components/CommandBar/CommandBarContext"
import { fireEvent, render, screen } from "@testing-library/react"

const Consumer = () => {
  const { isOpen, open, close } = useCommandBar()

  return (
    <div>
      <div data-testid="state">{isOpen ? "open" : "closed"}</div>
      <button type="button" onClick={open}>
        open
      </button>
      <button type="button" onClick={close}>
        close
      </button>
    </div>
  )
}

const renderProvider = () => {
  return render(
    <CommandBarProvider>
      <Consumer />
    </CommandBarProvider>,
  )
}

describe("CommandBarContext", () => {
  it("starts closed", () => {
    renderProvider()

    expect(screen.getByTestId("state")).toHaveTextContent("closed")
  })

  it("toggles open when ⌘K is pressed", () => {
    renderProvider()

    fireEvent.keyDown(window, { key: "k", metaKey: true })

    expect(screen.getByTestId("state")).toHaveTextContent("open")

    fireEvent.keyDown(window, { key: "k", metaKey: true })

    expect(screen.getByTestId("state")).toHaveTextContent("closed")
  })

  it("toggles open when Ctrl+K is pressed", () => {
    renderProvider()

    fireEvent.keyDown(window, { key: "K", ctrlKey: true })

    expect(screen.getByTestId("state")).toHaveTextContent("open")
  })

  it("closes on Escape", () => {
    renderProvider()

    fireEvent.click(screen.getByText("open"))
    expect(screen.getByTestId("state")).toHaveTextContent("open")

    fireEvent.keyDown(window, { key: "Escape" })
    expect(screen.getByTestId("state")).toHaveTextContent("closed")
  })
})
