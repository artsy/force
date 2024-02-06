import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"

const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
  filters: {
    forSale: undefined,
  },
}

const render = createArtworkFilterTestRenderer(artworkFilterContext)

describe(AvailabilityFilter, () => {
  it("renders a for-sale toggle", () => {
    render(<AvailabilityFilter />)
    expect(screen.getByText("Only works for sale")).toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<AvailabilityFilter />)
    expect(currentArtworkFilterContext().filters?.forSale).toBeUndefined()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.forSale).toBeTruthy()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.forSale).toBeFalsy()
  })

  it("clears local input state after Clear All", () => {
    render(<AvailabilityFilter />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.forSale).toBeTruthy()

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.forSale).toBeFalsy()
  })
})
