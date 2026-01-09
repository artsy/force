import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"

describe(MediumFilter, () => {
  describe("with default options", () => {
    const artworkFilterContext: Partial<ArtworkFilterContextProps> = {}
    const render = createArtworkFilterTestRenderer(artworkFilterContext)

    it("shows default medium options", () => {
      render(<MediumFilter expanded />)

      // Check a few of the default medium options are displayed
      expect(screen.getByText("Painting")).toBeInTheDocument()
      expect(screen.getByText("Photography")).toBeInTheDocument()
      expect(screen.getByText("Sculpture")).toBeInTheDocument()
    })

    it("updates context on filter change", () => {
      render(<MediumFilter expanded />)
      expect(currentArtworkFilterContext().filters?.additionalGeneIDs).toEqual(
        [],
      )

      userEvent.click(screen.getByText("Painting"))
      expect(currentArtworkFilterContext().filters?.additionalGeneIDs).toEqual([
        "painting",
      ])

      userEvent.click(screen.getByText("Photography"))
      expect(currentArtworkFilterContext().filters?.additionalGeneIDs).toEqual([
        "painting",
        "photography",
      ])
    })

    it("clears local input state after Clear All", () => {
      render(<MediumFilter expanded />)

      userEvent.click(screen.getByText("Painting"))
      userEvent.click(screen.getByText("Photography"))
      expect(currentArtworkFilterContext().filters?.additionalGeneIDs).toEqual([
        "painting",
        "photography",
      ])

      userEvent.click(screen.getByText("Clear all"))
      expect(currentArtworkFilterContext().filters?.additionalGeneIDs).toEqual(
        [],
      )
    })

    describe("expanded prop", () => {
      it("renders collapsed when not set", () => {
        render(<MediumFilter />)
        const button = screen.getByRole("button", {
          name: "Medium",
          expanded: false,
        })
        expect(button).toHaveAttribute("aria-expanded", "false")
      })

      it("renders collapsed when false", () => {
        render(<MediumFilter expanded={false} />)
        const button = screen.getByRole("button", {
          name: "Medium",
          expanded: false,
        })
        expect(button).toHaveAttribute("aria-expanded", "false")
      })

      it("renders expanded when true", () => {
        render(<MediumFilter expanded={true} />)
        const button = screen.getByRole("button", {
          name: "Medium",
          expanded: true,
        })
        expect(button).toHaveAttribute("aria-expanded", "true")
        // By default, it shows the initial 6 items
        expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0)
      })
    })
  })

  describe("with custom aggregations", () => {
    const customAggregations: Partial<ArtworkFilterContextProps> = {
      aggregations: [
        {
          slice: "MEDIUM",
          counts: [
            {
              name: "Foo Medium",
              value: "foo-medium",
              count: 42,
            },
            {
              name: "Bar Medium",
              value: "bar-medium",
              count: 24,
            },
          ],
        },
      ],
    }

    const render = createArtworkFilterTestRenderer(customAggregations)

    it("shows custom medium options from aggregations", () => {
      render(<MediumFilter expanded />)

      expect(screen.getByText("Foo Medium")).toBeInTheDocument()
      expect(screen.getByText("Bar Medium")).toBeInTheDocument()

      // Default options shouldn't be shown when custom aggregations are provided
      expect(screen.queryByText("Painting")).not.toBeInTheDocument()
    })

    it("updates context with custom medium values", () => {
      render(<MediumFilter expanded />)
      expect(currentArtworkFilterContext().filters?.additionalGeneIDs).toEqual(
        [],
      )

      userEvent.click(screen.getByText("Foo Medium"))
      expect(currentArtworkFilterContext().filters?.additionalGeneIDs).toEqual([
        "foo-medium",
      ])
    })
  })
})
