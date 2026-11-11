import { fireEvent, screen } from "@testing-library/react"
import {
  ArtistHeaderSeries,
  getDesktopSeriesWidth,
} from "Apps/Artist/Components/ArtistHeader/ArtistHeaderSeries"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import type { ArtistHeaderSeries_Test_Query } from "__generated__/ArtistHeaderSeries_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "artist-id",
    contextPageOwnerSlug: "andy-warhol",
    contextPageOwnerType: "artist",
  })),
}))

const mockUseTracking = useTracking as jest.Mock
const trackEvent = jest.fn()

beforeAll(() => {
  mockUseTracking.mockImplementation(() => ({ trackEvent }))
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    match: {
      location: {
        query: {},
      },
    },
  }))
})

beforeEach(() => {
  trackEvent.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL<ArtistHeaderSeries_Test_Query>({
  Component: (props: any) => {
    return <ArtistHeaderSeries artist={props.artist} />
  },
  query: graphql`
    query ArtistHeaderSeries_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistHeaderSeries_artist
      }
    }
  `,
})

const seriesEdge = ({
  title,
  forSaleArtworksCount,
}: {
  title: string
  forSaleArtworksCount: number
}) => {
  return {
    node: {
      internalID: title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      featured: true,
      forSaleArtworksCount,
      image: {
        cropped: {
          src: "https://example.com/image.jpg",
          srcSet: "https://example.com/image.jpg 1x",
        },
      },
    },
  }
}

const artistWithSeries = ({
  forSaleCounts,
  name = "Andy Warhol",
}: {
  forSaleCounts: number[]
  name?: string | null
}) => {
  return {
    Artist: () => {
      return {
        name,
        href: "/artist/andy-warhol",
        artistSeriesConnection: {
          edges: forSaleCounts.map((forSaleArtworksCount, index) => {
            return seriesEdge({
              title: `Series ${index + 1}`,
              forSaleArtworksCount,
            })
          }),
        },
      }
    },
  }
}

describe("getDesktopSeriesWidth", () => {
  it("uses the largest width for one, two and three series", () => {
    expect(getDesktopSeriesWidth(1)).toBe(140)
    expect(getDesktopSeriesWidth(2)).toBe(140)
    expect(getDesktopSeriesWidth(3)).toBe(140)
  })

  it("uses the medium width for four series", () => {
    expect(getDesktopSeriesWidth(4)).toBe(120)
  })

  it("uses the smallest width for five series", () => {
    expect(getDesktopSeriesWidth(5)).toBe(100)
  })
})

describe("ArtistHeaderSeries", () => {
  it("renders the heading with the artist's name", () => {
    renderWithRelay(artistWithSeries({ forSaleCounts: [10, 20] }))

    expect(screen.getByText("Shop Andy Warhol Series")).toBeInTheDocument()
  })

  it("falls back to a generic heading when the artist has no name", () => {
    renderWithRelay(artistWithSeries({ forSaleCounts: [10, 20], name: null }))

    expect(screen.getByText("Shop Series")).toBeInTheDocument()
  })

  it("drops series with fewer than five works for sale", () => {
    renderWithRelay(artistWithSeries({ forSaleCounts: [4, 5] }))

    expect(screen.queryByText("Series 1")).not.toBeInTheDocument()
    expect(screen.getByText("Series 2")).toBeInTheDocument()
  })

  it("renders nothing when no series qualify", () => {
    renderWithRelay(artistWithSeries({ forSaleCounts: [1, 2, 3, 4] }))

    expect(screen.queryByText(/Shop/)).not.toBeInTheDocument()
  })

  it("preserves the order returned by the API", () => {
    renderWithRelay(artistWithSeries({ forSaleCounts: [10, 50, 30] }))

    const titles = screen.getAllByText(/^Series \d$/).map(element => {
      return element.textContent
    })

    expect(titles).toEqual(["Series 1", "Series 2", "Series 3"])
  })

  it("renders at most five series", () => {
    renderWithRelay(
      artistWithSeries({ forSaleCounts: [10, 10, 10, 10, 10, 10, 10] }),
    )

    expect(screen.getAllByText(/^Series \d$/)).toHaveLength(5)
  })

  it("hides View More when exactly five series qualify", () => {
    renderWithRelay(artistWithSeries({ forSaleCounts: [10, 10, 10, 10, 10] }))

    expect(screen.queryByText("View More")).not.toBeInTheDocument()
  })

  it("shows View More when more than five series qualify", () => {
    renderWithRelay(
      artistWithSeries({ forSaleCounts: [10, 10, 10, 10, 10, 10] }),
    )

    expect(screen.getByText("View More")).toBeInTheDocument()
  })

  it("links View More to the artist's series page", () => {
    renderWithRelay(
      artistWithSeries({ forSaleCounts: [10, 10, 10, 10, 10, 10] }),
    )

    expect(screen.getByText("View More").closest("a")).toHaveAttribute(
      "href",
      "/artist/andy-warhol/series",
    )
  })

  describe("tracking", () => {
    it("tracks a click on a series", () => {
      renderWithRelay(artistWithSeries({ forSaleCounts: [10, 20, 30] }))

      fireEvent.click(screen.getByText("Series 1").closest("a")!)

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedArtistSeriesGroup",
          context_module: "artistHeader",
          context_page_owner_id: "artist-id",
          context_page_owner_slug: "andy-warhol",
          context_page_owner_type: "artist",
          curation_boost: true,
          destination_page_owner_id: "Series 1",
          destination_page_owner_slug: "series-1",
          destination_page_owner_type: "artistSeries",
          horizontal_slide_position: 0,
          type: "thumbnail",
        }),
      )
    })

    it("tracks the position of the clicked series", () => {
      renderWithRelay(artistWithSeries({ forSaleCounts: [10, 20, 30] }))

      fireEvent.click(screen.getByText("Series 3").closest("a")!)

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          destination_page_owner_id: "Series 3",
          horizontal_slide_position: 2,
          type: "thumbnail",
        }),
      )
    })

    it("tracks a click on View More", () => {
      renderWithRelay(
        artistWithSeries({ forSaleCounts: [10, 10, 10, 10, 10, 10] }),
      )

      fireEvent.click(screen.getByText("View More").closest("a")!)

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedArtistSeriesGroup",
          context_module: "artistHeader",
          context_page_owner_id: "artist-id",
          context_page_owner_slug: "andy-warhol",
          context_page_owner_type: "artist",
          destination_page_owner_type: "allArtistSeries",
          type: "viewAll",
        }),
      )
    })
  })
})
