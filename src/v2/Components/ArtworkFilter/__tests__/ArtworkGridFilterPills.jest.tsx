import { render, screen, within, fireEvent } from "@testing-library/react"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
  SharedArtworkFilterContextProps,
} from "../ArtworkFilterContext"
import { ArtworkGridFilterPillsContainer } from "../SavedSearch/Components/ArtworkGridFilterPills"

const savedSearchEntity: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "Banksy",
  slug: "example-slug",
}

const mockedFilters: ArtworkFiltersState = {
  attributionClass: ["open edition"],
  colors: ["red"],
}

describe("ArtworkGridFilterPills", () => {
  const renderPills = (props: SharedArtworkFilterContextProps = {}) => {
    render(
      <ArtworkFilterContextProvider {...props}>
        <ArtworkGridFilterPillsContainer
          savedSearchAttributes={savedSearchEntity}
        />
      </ArtworkFilterContextProvider>
    )
  }

  it("renders correctly", () => {
    renderPills({
      filters: mockedFilters,
    })
    expect(screen.getByText("Red")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
    expect(screen.getAllByTitle("Close")).toHaveLength(2)
    expect(screen.getByText("Create Alert")).toBeInTheDocument()
  })

  it("renders default pills without CloseIcon", () => {
    renderPills({
      filters: mockedFilters,
    })
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

  it("updates filters on pill click", () => {
    renderPills({
      filters: mockedFilters,
    })

    fireEvent.click(screen.getByText("Red"))

    expect(screen.queryByText("Red")).not.toBeInTheDocument()
  })

  it("does not update filters on default pill click", () => {
    renderPills({
      filters: mockedFilters,
    })

    fireEvent.click(screen.getByText("Banksy"))

    expect(screen.getByText("Banksy")).toBeInTheDocument()
  })
})
