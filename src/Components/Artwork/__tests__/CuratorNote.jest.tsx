import { Theme } from "@artsy/palette"
import { fireEvent, render, screen } from "@testing-library/react"
import { CuratorNote } from "Components/Artwork/CuratorNote"

describe("CuratorNote", () => {
  const renderComponent = (note: string) => {
    return render(
      <Theme>
        <CuratorNote note={note} />
      </Theme>,
    )
  }

  it("renders the note text", () => {
    renderComponent("Chosen for its bold use of color")

    expect(
      screen.getByText(/Chosen for its bold use of color/),
    ).toBeInTheDocument()
  })

  it("renders nothing when the note is empty", () => {
    const { container } = renderComponent("")

    expect(container).toBeEmptyDOMElement()
  })

  it("opens a dialog with the full note when clicked", () => {
    renderComponent("Chosen for its bold use of color")

    fireEvent.click(screen.getByText(/Chosen for its bold use of color/))

    // The dialog title is unique to the opened dialog.
    expect(screen.getByText("Curator’s note")).toBeInTheDocument()
  })

  it("shows a Read more cue for long notes but not short ones", () => {
    const { rerender } = renderComponent("A short note.")
    expect(screen.queryByText("Read more")).not.toBeInTheDocument()

    rerender(
      <Theme>
        <CuratorNote note={"A much longer curator note ".repeat(6)} />
      </Theme>,
    )
    expect(screen.getByText("Read more")).toBeInTheDocument()
  })
})
