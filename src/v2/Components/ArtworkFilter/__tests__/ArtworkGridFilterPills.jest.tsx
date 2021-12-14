import { render, screen, within, fireEvent } from "@testing-library/react"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import {
  ArtworkGridFilterPills,
  ArtworkGridFilterPillsProps,
} from "../SavedSearch/Components/ArtworkGridFilterPills"
import {
  DefaultFilterPill,
  FilterPill,
  FilterPillsContextProvider,
} from "../SavedSearch/Utils/FilterPillsContext"

const savedSearchAttributes: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "test-artist-name",
  slug: "example-slug",
}

const mockedPills: FilterPill[] = [
  { filterName: "colors", name: "red", displayName: "Red" },
  {
    filterName: "attributionClass",
    name: "open-edition",
    displayName: "Open Edition",
  },
]

const defaultPill: DefaultFilterPill = {
  isDefault: true,
  name: "banksy",
  displayName: "Banksy",
}

describe("ArtworkGridFilterPills", () => {
  let context: ArtworkFilterContextProps

  const renderPills = (pills: FilterPill[] = mockedPills) => {
    render(
      <ArtworkFilterContextProvider>
        <FilterPillsContextProvider pills={pills}>
          <ArtworkGridFilterPillsTest
            savedSearchAttributes={savedSearchAttributes}
          />
        </FilterPillsContextProvider>
      </ArtworkFilterContextProvider>
    )
  }

  const ArtworkGridFilterPillsTest = (props: ArtworkGridFilterPillsProps) => {
    context = useArtworkFilterContext()
    return <ArtworkGridFilterPills {...props} />
  }

  it("renders correctly", () => {
    renderPills()
    expect(screen.getByText("Red")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
    expect(screen.getAllByTitle("Close")).toHaveLength(2)
    expect(screen.getByText("Create an Alert")).toBeInTheDocument()
  })

  it("renders default pills without CloseIcon", () => {
    renderPills([defaultPill, ...mockedPills])
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
    renderPills()
    const setFilterSpy = jest.spyOn(context, "setFilter")
    fireEvent.click(screen.getByText("Red"))
    expect(setFilterSpy).toHaveBeenCalled()
  })

  it("does not update filters on default pill click", () => {
    renderPills([defaultPill, ...mockedPills])
    const setFilterSpy = jest.spyOn(context, "setFilter")
    fireEvent.click(screen.getByText("Banksy"))
    expect(setFilterSpy).not.toHaveBeenCalled()
  })
})
