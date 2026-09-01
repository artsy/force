import { screen, render } from "@testing-library/react"
import { SearchResultsFilterPills } from "Apps/Search/Components/SearchResultsFilterPills"
import {
  ArtworkFilterContextProvider,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FILTER_VOCABULARY } from "Components/Search/utils/filterQueryVocabulary"

const renderPills = (
  filters: SharedArtworkFilterContextProps["filters"],
  aggregations?: SharedArtworkFilterContextProps["aggregations"],
) => {
  render(
    <ArtworkFilterContextProvider filters={filters} aggregations={aggregations}>
      <SearchResultsFilterPills />
    </ArtworkFilterContextProvider>,
  )
}

describe("SearchResultsFilterPills", () => {
  it("renders a pill per filter", () => {
    renderPills({})

    expect(screen.getByText("Filter:")).toBeInTheDocument()
    expect(screen.getByText("Medium")).toBeInTheDocument()
    expect(screen.getByText("Rarity")).toBeInTheDocument()
    expect(screen.getByText("Price Range")).toBeInTheDocument()
    expect(screen.getByText("Years")).toBeInTheDocument()
  })

  it("names the applied medium in place of the label", () => {
    renderPills({ additionalGeneIDs: ["work-on-paper"] })

    expect(screen.getByText("Work on Paper")).toBeInTheDocument()
    expect(screen.queryByText("Medium")).not.toBeInTheDocument()
  })

  it("names the applied rarity", () => {
    renderPills({ attributionClass: ["limited edition"] })

    expect(screen.getByText("Limited Edition")).toBeInTheDocument()
    expect(screen.queryByText("Rarity")).not.toBeInTheDocument()
  })

  it("formats the applied price range", () => {
    renderPills({ priceRange: "*-5000" })

    expect(screen.getByText("Under $5,000")).toBeInTheDocument()
    expect(screen.queryByText("Price Range")).not.toBeInTheDocument()
  })

  it("names the applied years", () => {
    renderPills({ majorPeriods: ["1990"] })

    expect(screen.getByText("1990s")).toBeInTheDocument()
    expect(screen.queryByText("Years")).not.toBeInTheDocument()
  })

  it("formats the years from a live aggregation, not just the static options", () => {
    // The route doesn't request MAJOR_PERIOD today, but the sidebar's own
    // filter formats these names either way
    renderPills({ majorPeriods: ["1990"] }, [
      {
        slice: "MAJOR_PERIOD",
        counts: [{ name: "1990", value: "1990", count: 12 }],
      },
    ])

    expect(screen.getByText("1990s")).toBeInTheDocument()
    expect(screen.queryByText("1990")).not.toBeInTheDocument()
  })

  describe("every medium the search parser can produce", () => {
    // A medium the options don't carry renders as an unlit "Medium" pill
    // while the results are silently filtered.
    const vocabularyMediums = [
      ...new Set(
        [...FILTER_VOCABULARY.values()]
          .filter(entry => {
            return entry.type === "medium"
          })
          .map(entry => {
            return entry.value
          }),
      ),
    ]

    it.each(vocabularyMediums)("lights up the pill for %s", medium => {
      renderPills({ additionalGeneIDs: [medium] })

      expect(screen.queryByText("Medium")).not.toBeInTheDocument()
    })
  })

  it("counts the rest rather than listing every applied value", () => {
    renderPills({ additionalGeneIDs: ["painting", "prints", "sculpture"] })

    expect(screen.getByText("Painting +2")).toBeInTheDocument()
  })

  it("counts a value it cannot name", () => {
    // An option list narrowed by a live aggregation can omit an applied value;
    // the pill still has to account for it
    renderPills({ additionalGeneIDs: ["painting", "not-a-medium"] })

    expect(screen.getByText("Painting +1")).toBeInTheDocument()
  })

  it("names the value applied first, not the first in the option list", () => {
    // "painting" precedes "prints" in MEDIUM_OPTIONS
    renderPills({ additionalGeneIDs: ["prints", "painting"] })

    expect(screen.getByText("Prints +1")).toBeInTheDocument()
  })
})
