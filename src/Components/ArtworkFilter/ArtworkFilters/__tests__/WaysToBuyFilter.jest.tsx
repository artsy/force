import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import {
  WAYS_TO_BUY_OPTIONS,
  WaysToBuyFilter,
} from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const artworkFilterContext: Partial<ArtworkFilterContextProps> = {}

const render = createArtworkFilterTestRenderer(artworkFilterContext)

describe(WaysToBuyFilter, () => {
  it("renders a list of ways to buy options", () => {
    render(<WaysToBuyFilter expanded />)

    Object.values(WAYS_TO_BUY_OPTIONS).forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument()
    })
  })

  it("updates context on filter change", () => {
    render(<WaysToBuyFilter expanded />)

    expect(currentArtworkFilterContext().filters?.acquireable).toBeFalsy()
    expect(currentArtworkFilterContext().filters?.offerable).toBeFalsy()
    expect(currentArtworkFilterContext().filters?.atAuction).toBeFalsy()
    expect(currentArtworkFilterContext().filters?.inquireableOnly).toBeFalsy()

    userEvent.click(screen.getByText("Purchase"))
    expect(currentArtworkFilterContext().filters?.acquireable).toBe(true)

    userEvent.click(screen.getByText("Make Offer"))
    expect(currentArtworkFilterContext().filters?.offerable).toBe(true)
  })

  it("clears local input state after Clear All", () => {
    render(<WaysToBuyFilter expanded />)

    userEvent.click(screen.getByText("Purchase"))
    userEvent.click(screen.getByText("Make Offer"))

    expect(currentArtworkFilterContext().filters?.acquireable).toBe(true)
    expect(currentArtworkFilterContext().filters?.offerable).toBe(true)

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.acquireable).toBeFalsy()
    expect(currentArtworkFilterContext().filters?.offerable).toBeFalsy()
  })

  it("can render in expanded or collapsed state", () => {
    render(<WaysToBuyFilter />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<WaysToBuyFilter expanded={false} />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<WaysToBuyFilter expanded={true} />)
    expect(screen.getAllByRole("checkbox")).toHaveLength(
      Object.keys(WAYS_TO_BUY_OPTIONS).length,
    )
  })
})
