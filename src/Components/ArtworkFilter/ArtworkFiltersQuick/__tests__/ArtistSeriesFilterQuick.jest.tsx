import { screen } from "@testing-library/react"
import { createArtworkFilterTestRenderer } from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistSeriesFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/ArtistSeriesFilterQuick"

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

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

let render: ReturnType<typeof createArtworkFilterTestRenderer>

describe(ArtistSeriesFilterQuick, () => {
  beforeEach(() => {
    render = createArtworkFilterTestRenderer(artworkFilterContext)
  })

  describe("when artist series aggregations are present", () => {
    it("renders the artist series quick filter", () => {
      render(<ArtistSeriesFilterQuick />)
      expect(screen.getByText("Artist Series")).toBeInTheDocument()
    })
  })

  describe("when artist series aggregations are absent", () => {
    it("does not render the artist series quick filter", () => {
      render = createArtworkFilterTestRenderer({
        aggregations: [
          {
            slice: "ARTIST_SERIES",
            counts: [],
          },
        ],
      })
      render(<ArtistSeriesFilterQuick />)
      expect(screen.queryByText("Artist Series")).not.toBeInTheDocument()
    })
  })
})
