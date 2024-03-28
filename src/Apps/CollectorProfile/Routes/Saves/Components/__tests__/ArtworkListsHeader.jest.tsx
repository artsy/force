import { screen, fireEvent } from "@testing-library/react"
import { ArtworkListsHeader } from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListsHeader"
import { render } from "DevTools/renderWithMockBoot"

describe("ArtworkListsHeader", () => {
  let me

  it("renders header text and creates button", () => {
    render(<ArtworkListsHeader me={me} savedArtworksCount={0} />)

    const title = "Saves"
    const description = "Curate your own lists of the works you love and"
    const link = "signal your interest to galleries"

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText(link)).toBeInTheDocument()
  })

  it("opens the 'Create a new list' modal", () => {
    render(<ArtworkListsHeader me={me} savedArtworksCount={0} />)

    const button = screen.getByText("Create New List")
    fireEvent.click(button)

    expect(screen.getByTestId("CreateNewList")).toBeInTheDocument()
  })
})
