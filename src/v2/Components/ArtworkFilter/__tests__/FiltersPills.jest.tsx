import { render, screen, within } from "@testing-library/react"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { FiltersPills } from "../SavedSearch/Components/FiltersPills"

const savedSearchAttributes: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "test-artist-name",
}

const mockedPills = [
  { name: "Red", isDefault: false },
  { name: "Open Edition", isDefault: false },
]

const renderPills = (pills = mockedPills) => {
  render(
    <FiltersPills pills={pills} savedSearchAttributes={savedSearchAttributes} />
  )
}

describe("FiltersPills", () => {
  it("renders correctly", () => {
    renderPills()
    expect(screen.getByText("Red")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
    expect(screen.getAllByTitle("Close")).toHaveLength(2)
    expect(screen.getByText("Create an Alert")).toBeInTheDocument()
  })

  it("renders default pills without CloseIcon", () => {
    renderPills([{ name: "Banksy", isDefault: true }, ...mockedPills])
    expect(
      within(screen.getByText("Banksy")).queryByTitle("Close")
    ).not.toBeInTheDocument()
    expect(
      within(screen.getByText("Red")).getByTitle("Close")
    ).toBeInTheDocument()
    expect(
      within(screen.getByText("Open Edition")).getByTitle("Close")
    ).toBeInTheDocument()
    expect(screen.getAllByTitle("Close")).toHaveLength(2)
  })
})
