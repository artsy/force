import { render, screen } from "@testing-library/react"
import { ArtworkFilterContextProvider } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { FilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"

describe("FilterQuick", () => {
  it("renders correctly", async () => {
    render(
      <ArtworkFilterContextProvider>
        <FilterQuick
          label="Rarity"
          name="attributionClass"
          options={ATTRIBUTION_CLASS_OPTIONS}
          visible
        />
      </ArtworkFilterContextProvider>
    )

    expect(screen.getByText("Rarity")).toBeInTheDocument()
    expect(screen.getByText("Unique")).toBeInTheDocument()
    expect(screen.getByText("Limited Edition")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
    expect(screen.getByText("Unknown Edition")).toBeInTheDocument()
  })

  describe("with aggregations", () => {
    it("renders correctly", () => {
      render(
        <ArtworkFilterContextProvider
          aggregations={[
            {
              slice: "MEDIUM",
              counts: [
                { name: "Example Medium", value: "example-medium", count: 1 },
              ],
            },
          ]}
        >
          <FilterQuick
            label="Medium"
            name="additionalGeneIDs"
            slice="MEDIUM"
            options={[]}
            visible
          />
        </ArtworkFilterContextProvider>
      )

      expect(screen.getByText("Example Medium")).toBeInTheDocument()
    })
  })
})
