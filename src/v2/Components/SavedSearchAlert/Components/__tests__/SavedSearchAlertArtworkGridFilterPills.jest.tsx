import { OwnerType } from "@artsy/cohesion"
import { render, screen, fireEvent } from "@testing-library/react"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchEntity } from "../../types"
import { SavedSearchAlertArtworkGridFilterPills } from "../SavedSearchAlertArtworkGridFilterPills"

const savedSearchEntity: SavedSearchEntity = {
  placeholder: "Banksy",
  defaultArtists: [
    {
      id: "test-artist-id",
      name: "Banksy",
      slug: "example-slug",
    },
  ],
  owner: {
    type: OwnerType.artist,
    id: "owner-id",
    slug: "owner-slug",
    name: "Owner Name",
  },
}

const mockedFilters: ArtworkFiltersState = {
  attributionClass: ["open edition"],
  colors: ["red"],
}

describe("SavedSearchAlertArtworkGridFilterPills", () => {
  it("renders only 'Create Alert' button", () => {
    render(
      <ArtworkFilterContextProvider filters={mockedFilters}>
        <SavedSearchAlertArtworkGridFilterPills
          savedSearchEntity={savedSearchEntity}
        />
      </ArtworkFilterContextProvider>
    )

    expect(screen.getByText("Create Alert")).toBeInTheDocument()
    expect(screen.queryByText("Red")).not.toBeInTheDocument()
    expect(screen.queryByText("Open Edition")).not.toBeInTheDocument()
  })

  it("renders pills when displayFilterPills props is passed", () => {
    render(
      <ArtworkFilterContextProvider filters={mockedFilters}>
        <SavedSearchAlertArtworkGridFilterPills
          displayFilterPills
          savedSearchEntity={savedSearchEntity}
        />
      </ArtworkFilterContextProvider>
    )

    expect(screen.getByText("Red")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
    expect(screen.getAllByTitle("Close")).toHaveLength(2)
    expect(screen.getByText("Create Alert")).toBeInTheDocument()
  })

  it("renders default pills without CloseIcon", () => {
    render(
      <ArtworkFilterContextProvider filters={mockedFilters}>
        <SavedSearchAlertArtworkGridFilterPills
          displayFilterPills
          savedSearchEntity={savedSearchEntity}
        />
      </ArtworkFilterContextProvider>
    )

    expect(screen.getAllByTitle("Close")).toHaveLength(2)
  })

  it("updates filters on pill click", () => {
    render(
      <ArtworkFilterContextProvider filters={mockedFilters}>
        <SavedSearchAlertArtworkGridFilterPills
          displayFilterPills
          savedSearchEntity={savedSearchEntity}
        />
      </ArtworkFilterContextProvider>
    )

    fireEvent.click(screen.getByText("Red"))

    expect(screen.queryByText("Red")).not.toBeInTheDocument()
  })

  it("does not update filters on default pill click", () => {
    render(
      <ArtworkFilterContextProvider filters={mockedFilters}>
        <SavedSearchAlertArtworkGridFilterPills
          displayFilterPills
          savedSearchEntity={savedSearchEntity}
        />
      </ArtworkFilterContextProvider>
    )

    fireEvent.click(screen.getByText("Banksy"))

    expect(screen.getByText("Banksy")).toBeInTheDocument()
  })
})
