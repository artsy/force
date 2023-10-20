import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistSeriesFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistSeriesFilter"

const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
  aggregations: [
    {
      slice: "ARTIST_SERIES",
      counts: [
        { name: "Companions", value: "kaws-companions", count: 42 },
        { name: "Toys", value: "kaws-toys", count: 420 },
      ],
    },
  ],
}

const render = createArtworkFilterTestRenderer(artworkFilterContext)

describe(ArtistSeriesFilter, () => {
  it("renders a list of options based on current aggregation", () => {
    render(<ArtistSeriesFilter expanded />)
    expect(screen.getByText("Companions")).toBeInTheDocument()
    expect(screen.getByText("Toys")).toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<ArtistSeriesFilter expanded />)
    expect(currentArtworkFilterContext().filters?.artistSeriesIDs).toEqual([])

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.artistSeriesIDs).toEqual([
      "kaws-companions",
    ])

    userEvent.click(screen.getAllByRole("checkbox")[1])
    expect(currentArtworkFilterContext().filters?.artistSeriesIDs).toEqual([
      "kaws-companions",
      "kaws-toys",
    ])
  })

  it("clears local input state after Clear All", () => {
    render(<ArtistSeriesFilter expanded />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    userEvent.click(screen.getAllByRole("checkbox")[1])
    expect(currentArtworkFilterContext().filters?.artistSeriesIDs).toEqual([
      "kaws-companions",
      "kaws-toys",
    ])

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.artistSeriesIDs).toEqual([])
  })

  it("can render in expanded or collapsed state", () => {
    render(<ArtistSeriesFilter />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<ArtistSeriesFilter expanded={false} />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<ArtistSeriesFilter expanded={true} />)
    expect(screen.getAllByRole("checkbox")).toHaveLength(2)
  })
})
