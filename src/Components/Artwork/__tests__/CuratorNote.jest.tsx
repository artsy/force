import { Theme } from "@artsy/palette"
import { render, screen } from "@testing-library/react"
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
})
