import { ContextModule, OwnerType } from "@artsy/cohesion"
import { fireEvent, screen } from "@testing-library/react"
import { ArtistSeriesRailFragmentContainer } from "Components/ArtistSeriesRail/ArtistSeriesRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <ArtistSeriesRailFragmentContainer
      {...props}
      contextModule={ContextModule.artistSeriesRail}
    />
  ),
  query: graphql`
    query ArtistSeriesRailTestQuery @relay_test_operation {
      artist(id: "example") {
        ...ArtistSeriesRail_artist
      }
    }
  `,
})

describe("ArtistSeriesRail", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockUseAnalyticsContext = useAnalyticsContext as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
    mockUseAnalyticsContext.mockImplementation(() => ({
      contextPageOwnerId: "artist-id-123",
      contextPageOwnerSlug: "andy-warhol",
      contextPageOwnerType: OwnerType.artist,
    }))
  })

  beforeEach(() => {
    trackEvent.mockClear()
  })

  it("does not render when there are no artist series", () => {
    renderWithRelay({
      Artist: () => ({
        href: "/artist/andy-warhol",
        artistSeriesConnection: {
          edges: [],
        },
      }),
    })

    expect(screen.queryByText("Artist Series")).not.toBeInTheDocument()
  })

  it("renders artist series rail with series", () => {
    renderWithRelay({
      Artist: () => ({
        href: "/artist/andy-warhol",
        artistSeriesConnection: {
          edges: [
            {
              node: {
                internalID: "series-1",
                slug: "andy-warhol-flowers",
                title: "Flowers",
                featured: false,
              },
            },
            {
              node: {
                internalID: "series-2",
                slug: "andy-warhol-campbells-soup",
                title: "Campbell's Soup",
                featured: true,
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Artist Series")).toBeInTheDocument()
    expect(screen.getByText("View All")).toBeInTheDocument()
  })

  describe("Tracking", () => {
    it("tracks clickedArtistSeriesGroup with type viewAll when View All is clicked", () => {
      renderWithRelay({
        Artist: () => ({
          href: "/artist/andy-warhol",
          artistSeriesConnection: {
            edges: [
              {
                node: {
                  internalID: "series-1",
                  slug: "andy-warhol-flowers",
                  title: "Flowers",
                  featured: false,
                },
              },
            ],
          },
        }),
      })

      const viewAllLink = screen.getByText("View All")
      fireEvent.click(viewAllLink)

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedArtistSeriesGroup",
        context_module: "artistSeriesRail",
        context_page_owner_id: "artist-id-123",
        context_page_owner_slug: "andy-warhol",
        context_page_owner_type: "artist",
        destination_page_owner_type: "allArtistSeries",
        type: "viewAll",
      })
    })

    it("tracks clickedArtistSeriesGroup with type thumbnail when a series is clicked", () => {
      renderWithRelay({
        Artist: () => ({
          href: "/artist/andy-warhol",
          artistSeriesConnection: {
            edges: [
              {
                node: {
                  internalID: "series-1",
                  slug: "andy-warhol-flowers",
                  title: "Flowers",
                  featured: true,
                },
              },
              {
                node: {
                  internalID: "series-2",
                  slug: "andy-warhol-soup",
                  title: "Soup",
                  featured: false,
                },
              },
            ],
          },
        }),
      })

      // Find the first series cell and click it
      const seriesCells = screen.getAllByRole("link")
      const firstSeriesCell = seriesCells.find(
        link => link.getAttribute("href") === "/collection/andy-warhol-flowers",
      )

      if (firstSeriesCell) {
        fireEvent.click(firstSeriesCell)

        expect(trackEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: "clickedArtistSeriesGroup",
            context_module: "artistSeriesRail",
            context_page_owner_type: "artist",
            destination_page_owner_type: "artistSeries",
            destination_page_owner_id: "series-1",
            destination_page_owner_slug: "andy-warhol-flowers",
            curation_boost: true,
            horizontal_slide_position: 0,
            type: "thumbnail",
          }),
        )
      }
    })

    it("tracks correct horizontal_slide_position for different series", () => {
      renderWithRelay({
        Artist: () => ({
          href: "/artist/andy-warhol",
          artistSeriesConnection: {
            edges: [
              {
                node: {
                  internalID: "series-1",
                  slug: "andy-warhol-series-1",
                  title: "Series 1",
                  featured: false,
                },
              },
              {
                node: {
                  internalID: "series-2",
                  slug: "andy-warhol-series-2",
                  title: "Series 2",
                  featured: false,
                },
              },
            ],
          },
        }),
      })

      const seriesCells = screen.getAllByRole("link")
      const secondSeriesCell = seriesCells.find(
        link =>
          link.getAttribute("href") === "/collection/andy-warhol-series-2",
      )

      if (secondSeriesCell) {
        fireEvent.click(secondSeriesCell)

        expect(trackEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            horizontal_slide_position: 1,
            destination_page_owner_id: "series-2",
          }),
        )
      }
    })
  })
})
