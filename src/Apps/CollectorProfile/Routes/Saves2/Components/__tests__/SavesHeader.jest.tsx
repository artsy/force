import { render, screen, fireEvent } from "@testing-library/react"
import { SavesHeader } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesHeader"

describe("SavesHeader", () => {
  it("renders header text and crate button", () => {
    render(<SavesHeader />)

    expect(screen.getByText("Saved Artworks")).toBeInTheDocument()
    expect(
      screen.getAllByText("Curate your own lists of the works you love").length
    ).toBe(2)
  })

  it("opens the 'Create a new list' modal", () => {
    render(<SavesHeader />)

    const button = screen.getAllByText("Create New List")[0]
    fireEvent.click(button)

    expect(screen.getByTestId("CreateNewList")).toBeInTheDocument()
  })
})
