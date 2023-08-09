import { screen, fireEvent, render } from "@testing-library/react"
import {
  ActiveFilterPills,
  ActiveFilterPillsProps,
} from "Components/SavedSearchAlert/Components/ActiveFilterPills"
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
