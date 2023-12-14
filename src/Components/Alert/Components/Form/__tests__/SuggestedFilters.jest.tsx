import { fireEvent, screen } from "@testing-library/react"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { SugggestedFiltersQueryRenderer } from "Components/Alert/Components/Form/SuggestedFilters"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.unmock("react-relay")

const mockTransitionToFiltersAndTrack = jest.fn()

describe("SuggestedFilters", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: () => (
      <AlertProvider initialCriteria={{}}>
        <SugggestedFiltersQueryRenderer
          transitionToFiltersAndTrack={mockTransitionToFiltersAndTrack}
        />
      </AlertProvider>
    ),
  })

  it("Shows Suggested Filters when there are suggested filters", async () => {
    renderWithRelay({
      PreviewSavedSearch: () => ({ suggestedFilters: mockSuggestedFilters }),
    })

    await flushPromiseQueue()

    expect(screen.getByText("Add Filters")).toBeInTheDocument()

    mockSuggestedFilters.forEach(filter => {
      expect(screen.getByText(filter.displayValue)).toBeInTheDocument()
    })

    expect(screen.getByText("More Filters")).toBeInTheDocument()

    fireEvent.click(screen.getByText("More Filters"))

    expect(mockTransitionToFiltersAndTrack).toHaveBeenCalled()
  })

  it("Does not show Suggested Filters when there are no suggested filters", async () => {
    renderWithRelay({
      PreviewSavedSearch: () => ({ suggestedFilters: [] }),
    })

    await flushPromiseQueue()

    expect(() => screen.getByText("Add Filters")).toThrow()

    mockSuggestedFilters.forEach(filter => {
      expect(() => screen.getByText(filter.displayValue)).toThrow()
    })

    expect(screen.getByText("Add Filters:")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Add Filters:"))

    expect(mockTransitionToFiltersAndTrack).toHaveBeenCalled()
  })
})

const mockSuggestedFilters = [
  {
    displayValue: "Painting",
    field: "additionalGeneIDs",
    name: "Medium",
    value: "painting",
  },
  {
    displayValue: "Unique",
    field: "attributionClass",
    name: "Rarity",
    value: "unique",
  },
  {
    displayValue: "$0-$10,000",
    field: "priceRange",
    name: "Price",
    value: "*-10000",
  },
  {
    displayValue: "Toys",
    field: "artistSeriesIDs",
    name: "Artist Series",
    value: "kaws-toys",
  },
]
