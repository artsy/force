import { screen } from "@testing-library/react"
import { createArtworkFilterTestRenderer } from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistSeriesFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/ArtistSeriesFilterQuick"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.mock("System/useFeatureFlag", () => ({
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

  describe("when onyx_enable-artist-series-filter flag is enabled", () => {
    beforeEach(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)
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

  describe("when onyx_enable-artist-series-filter flag is disabled", () => {
    beforeEach(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
    })

    it("does not render the artist series quick filter", () => {
      render(<ArtistSeriesFilterQuick />)
      expect(screen.queryByText("Artist Series")).not.toBeInTheDocument()
    })
  })
})
