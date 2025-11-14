import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import {
  getTimePeriodToDisplay,
  TimePeriodFilter,
} from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe(TimePeriodFilter, () => {
  describe("with aggregations", () => {
    const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
      aggregations: [
        {
          slice: "MAJOR_PERIOD",
          counts: [
            {
              name: "2000",
              value: "2000-period",
              count: 42,
            },
            {
              name: "Late 19th Century",
              value: "foo-period",
              count: 42,
            },
            {
              name: "18th Century & Earlier",
              value: "bar-period",
              count: 42,
            },
          ],
        },
      ],
    }

    const render = createArtworkFilterTestRenderer(artworkFilterContext)

    it("shows specific time periods from aggregations", () => {
      render(<TimePeriodFilter expanded />)

      expect(screen.getByText("2000s")).toBeInTheDocument()
      expect(screen.getByText("Late 19th Century")).toBeInTheDocument()
      expect(screen.getByText("18th Century & Earlier")).toBeInTheDocument()
      expect(screen.queryByText("2010s")).not.toBeInTheDocument()
    })

    it("applies correct display formats to time periods", () => {
      render(<TimePeriodFilter expanded />)
      // Confirm numeric periods have "s" appended
      expect(screen.getByText("2000s")).toBeInTheDocument()
      // While text periods remain as-is
      expect(screen.getByText("Late 19th Century")).toBeInTheDocument()
    })

    it("updates context on filter change", () => {
      render(<TimePeriodFilter expanded />)
      expect(currentArtworkFilterContext().filters?.majorPeriods).toEqual([])

      userEvent.click(screen.getByText("2000s"))
      expect(currentArtworkFilterContext().filters?.majorPeriods).toEqual([
        "2000",
      ])

      userEvent.click(screen.getByText("Late 19th Century"))
      expect(currentArtworkFilterContext().filters?.majorPeriods).toEqual([
        "2000",
        "Late 19th Century",
      ])
    })

    it("clears local input state after Clear All", () => {
      render(<TimePeriodFilter expanded />)

      userEvent.click(screen.getByText("2000s"))
      userEvent.click(screen.getByText("Late 19th Century"))
      expect(currentArtworkFilterContext().filters?.majorPeriods).toEqual([
        "2000",
        "Late 19th Century",
      ])

      userEvent.click(screen.getByText("Clear all"))
      expect(currentArtworkFilterContext().filters?.majorPeriods).toEqual([])
    })

    it("can render in expanded or collapsed state", () => {
      render(<TimePeriodFilter />)
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

      render(<TimePeriodFilter expanded={false} />)
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

      render(<TimePeriodFilter expanded={true} />)
      expect(screen.getAllByRole("checkbox")).toHaveLength(3) // Based on our mock aggregations
    })
  })

  describe("with empty aggregations", () => {
    const emptyAggregations: Partial<ArtworkFilterContextProps> = {
      aggregations: [
        {
          slice: "MAJOR_PERIOD",
          counts: [],
        },
      ],
    }

    const emptyRender = createArtworkFilterTestRenderer(emptyAggregations)

    it("doesn't render any time period options", () => {
      emptyRender(<TimePeriodFilter expanded />)
      // The filter shouldn't render any checkboxes
      expect(screen.queryByText("Time Period")).not.toBeInTheDocument()
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()
    })
  })

  describe("getTimePeriodToDisplay", () => {
    it("appends 's' to numeric periods", () => {
      expect(getTimePeriodToDisplay("2020")).toBe("2020s")
      expect(getTimePeriodToDisplay("1980")).toBe("1980s")
    })

    it("leaves non-numeric periods unchanged", () => {
      expect(getTimePeriodToDisplay("Late 19th Century")).toBe(
        "Late 19th Century",
      )
      expect(getTimePeriodToDisplay("18th Century & Earlier")).toBe(
        "18th Century & Earlier",
      )
    })
  })
})
