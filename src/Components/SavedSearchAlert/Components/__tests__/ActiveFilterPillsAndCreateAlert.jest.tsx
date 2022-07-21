import { screen, fireEvent, render } from "@testing-library/react"
import {
  FilterPill,
  SavedSearchEntity,
} from "Components/SavedSearchAlert/types"
import { OwnerType } from "@artsy/cohesion"
import {
  ActiveFilterPillsAndCreateAlert,
  ActiveFilterPillsAndCreateAlertProps,
} from "../ActiveFilterPillsAndCreateAlert"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
} from "Components/ArtworkFilter/ArtworkFilterContext"

describe("ActiveFilterPillsAndCreateAlert", () => {
  const TestWrapper = (
    props: Partial<ActiveFilterPillsAndCreateAlertProps>
  ) => {
    return (
      <ArtworkFilterContextProvider filters={mockedFilters}>
        <ActiveFilterPillsAndCreateAlert
          savedSearchEntity={mockedSavedSearchEntity}
          {...props}
        />
      </ArtworkFilterContextProvider>
    )
  }

  it("renders active filter pills", () => {
    render(<TestWrapper />)

    expect(screen.getByText("Yellow")).toBeInTheDocument()
    expect(screen.getByText("Pink")).toBeInTheDocument()
  })

  it("renders default pills", () => {
    const defaultPills: FilterPill[] = [
      {
        isDefault: true,
        value: "artistOne",
        displayValue: "Artist One",
        field: "artistIDs",
      },
      {
        isDefault: true,
        value: "artistTwo",
        displayValue: "Artist Two",
        field: "artistIDs",
      },
    ]

    render(<TestWrapper defaultPills={defaultPills} />)

    expect(screen.getByText("Artist One")).toBeInTheDocument()
    expect(screen.getByText("Artist Two")).toBeInTheDocument()
  })

  it("removes pill after click on it", () => {
    render(<TestWrapper />)

    fireEvent.click(screen.getByText("Yellow"))

    expect(screen.queryByText("Yellow")).not.toBeInTheDocument()
    expect(screen.getByText("Pink")).toBeInTheDocument()
  })

  it("renders 'Create Alert' button", () => {
    render(<TestWrapper />)

    expect(screen.getByText("Create Alert")).toBeInTheDocument()
  })
})

const mockedSavedSearchEntity: SavedSearchEntity = {
  placeholder: "Test Artist",
  defaultCriteria: {},
  owner: {
    type: OwnerType.artist,
    id: "owner-id",
    slug: "owner-slug",
    name: "Owner Name",
  },
}

const mockedFilters: ArtworkFiltersState = {
  colors: ["yellow", "pink"],
}
