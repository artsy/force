import { OwnerType } from "@artsy/cohesion"
import { render, screen, fireEvent } from "@testing-library/react"
import {
  Aggregations,
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
  FollowedArtists,
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
          FilterPills={<ActiveFilterPills defaultPills={defaultPills} />}
          CreateAlertButton={
            <DefaultCreateAlertButton savedSearchEntity={savedSearchEntity} />
          }
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

  it("display followed artist pills when 'Artists I Follow' is selected", () => {
    const aggregations: Aggregations = [
      {
        slice: "ARTIST",
        counts: [
          {
            name: "Damien Hirst",
            value: "damien-hirst",
            count: 20,
          },
          {
            name: "KAWS",
            value: "kaws",
            count: 10,
          },
        ],
      },
    ]
    const followedArtists: FollowedArtists = [
      {
        slug: "kaws",
        internalID: "kaws-internal-id",
      },
      {
        slug: "damien-hirst",
        internalID: "damien-hirst-internal-id",
      },
    ]

    renderPills({
      filters: {
        includeArtworksByFollowedArtists: true,
      },
      followedArtists,
      aggregations,
    })

    expect(screen.getByText("Damien Hirst")).toBeInTheDocument()
    expect(screen.getByText("KAWS")).toBeInTheDocument()
  })

  it("should display only those artists who are present in ARTIST aggregation", () => {
    const aggregations: Aggregations = [
      {
        slice: "ARTIST",
        counts: [
          {
            name: "KAWS",
            value: "kaws",
            count: 10,
          },
        ],
      },
    ]

    renderPills({
      filters: {
        artistIDs: ["kaws", "banksy"],
      },
      aggregations,
    })

    expect(screen.queryByText("KAWS")).toBeInTheDocument()
    expect(screen.queryByText("banksy")).not.toBeInTheDocument()
  })
})
