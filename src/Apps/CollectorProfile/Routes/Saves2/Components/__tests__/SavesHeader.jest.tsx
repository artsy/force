import { render, screen, fireEvent } from "@testing-library/react"
import { SavesHeader } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesHeader"

describe("SavesHeader", () => {
  it("renders header text and creates button", () => {
    render(<SavesHeader />)

    const title = "Saved Artworks"
    const description = "Curate your own lists of the works you love"

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it("opens the 'Create a new list' modal", () => {
    render(<SavesHeader />)

    const button = screen.getByText("Create New List")
    fireEvent.click(button)

    expect(screen.getByTestId("CreateNewList")).toBeInTheDocument()
  })
})
