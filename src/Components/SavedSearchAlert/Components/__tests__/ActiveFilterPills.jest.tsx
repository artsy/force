import { screen, fireEvent, render } from "@testing-library/react"
import { FilterPill } from "Components/SavedSearchAlert/types"
import { ActiveFilterPills, ActiveFilterPillsProps } from "../ActiveFilterPills"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
} from "Components/ArtworkFilter/ArtworkFilterContext"

describe("ActiveFilterPills", () => {
  const TestWrapper = (props: Partial<ActiveFilterPillsProps>) => {
    return (
      <ArtworkFilterContextProvider filters={mockedFilters}>
        <ActiveFilterPills {...props} />
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
})

const mockedFilters: ArtworkFiltersState = {
  colors: ["yellow", "pink"],
}
