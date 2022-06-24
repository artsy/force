import { OwnerType } from "@artsy/cohesion"
import { render, screen, fireEvent } from "@testing-library/react"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import {
  FilterPill,
  SavedSearchEntity,
} from "v2/Components/SavedSearchAlert/types"
import { ActiveFilterPills } from "../ActiveFilterPills"
import { ArtworkGridFilterPills } from "../ArtworkGridFilterPills"
import { DefaultCreateAlertButton } from "../DefaultCreateAlertButton"

const savedSearchEntity: SavedSearchEntity = {
  placeholder: "Banksy",
  defaultCriteria: {
    artistIDs: [
      {
        value: "test-artist-id",
        displayValue: "Banksy",
      },
    ],
  },
  owner: {
    type: OwnerType.artist,
    id: "owner-id",
    slug: "owner-slug",
    name: "Owner Name",
  },
}

const defaultPills: FilterPill[] = [
  {
    isDefault: true,
    value: "test-artist-id",
    displayValue: "Banksy",
    field: "artistIDs",
  },
]

const mockedFilters: ArtworkFiltersState = {
  attributionClass: ["open edition"],
  colors: ["red"],
}

describe("ArtworkGridFilterPills", () => {
  const renderPills = (props: SharedArtworkFilterContextProps = {}) => {
    render(
      <ArtworkFilterContextProvider {...props}>
        <ArtworkGridFilterPills
          renderFilterPills={() => (
            <ActiveFilterPills defaultPills={defaultPills} />
          )}
          renderCreateAlertButton={() => (
            <DefaultCreateAlertButton savedSearchEntity={savedSearchEntity} />
          )}
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
