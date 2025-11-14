import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import {
  ATTRIBUTION_CLASS_OPTIONS,
  AttributionClassFilter,
} from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const artworkFilterContext: Partial<ArtworkFilterContextProps> = {}

const render = createArtworkFilterTestRenderer(artworkFilterContext)

describe(AttributionClassFilter, () => {
  it("renders a list of (hard-coded) rarity options", () => {
    render(<AttributionClassFilter expanded />)

    ATTRIBUTION_CLASS_OPTIONS.forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument()
    })
  })

  it("updates context on filter change", () => {
    render(<AttributionClassFilter expanded />)
    expect(currentArtworkFilterContext().filters?.attributionClass).toEqual([])

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.attributionClass).toEqual([
      "unique",
    ])

    userEvent.click(screen.getAllByRole("checkbox")[2])
    expect(currentArtworkFilterContext().filters?.attributionClass).toEqual([
      "unique",
      "open edition",
    ])
  })

  it("clears local input state after Clear All", () => {
    render(<AttributionClassFilter expanded />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    userEvent.click(screen.getAllByRole("checkbox")[2])
    expect(currentArtworkFilterContext().filters?.attributionClass).toEqual([
      "unique",
      "open edition",
    ])

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.attributionClass).toEqual([])
  })

  it("can render in expanded or collapsed state", () => {
    render(<AttributionClassFilter />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<AttributionClassFilter expanded={false} />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<AttributionClassFilter expanded={true} />)
    expect(screen.getAllByRole("checkbox")).toHaveLength(
      ATTRIBUTION_CLASS_OPTIONS.length,
    )
  })
})
