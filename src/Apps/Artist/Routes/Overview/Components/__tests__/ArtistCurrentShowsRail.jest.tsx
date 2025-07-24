import { screen } from "@testing-library/react"
import { ArtistCurrentShowsRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentShowsRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistCurrentShowsRailTestQuery } from "__generated__/ArtistCurrentShowsRailTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { fireEvent } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtistCurrentShowsRail", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<ArtistCurrentShowsRailTestQuery>({
      Component: ArtistCurrentShowsRailFragmentContainer,
      query: graphql`
        query ArtistCurrentShowsRailTestQuery @relay_test_operation {
          artist(id: "test") {
            ...ArtistCurrentShowsRail_artist
          }
        }
      `,
    })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("does not render rail if no shows", () => {
    renderWithRelay({
      Artist: () => ({
        showsConnection: { edges: null },
      }),
    })
    expect(screen.queryByText(/Shows Featuring/)).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        href: "/artist/artistSlug/shows",
      }),
    })

    expect(screen.getByText("Shows Featuring artistName")).toBeInTheDocument()
    expect(screen.getAllByRole("link")).toHaveLength(3)
    expect(screen.getAllByRole("link")[0]).toHaveAttribute(
      "href",
      expect.stringContaining("/artist/artistSlug/shows"),
    )
    expect(screen.getByText("View All Shows")).toBeInTheDocument()
    expect(screen.getAllByText('<mock-value-for-field-"name">')).toHaveLength(2)
    expect(
      screen.getByText('<mock-value-for-field-"exhibitionPeriod">'),
    ).toBeInTheDocument()
  })

  it("tracks to shows route", () => {
    renderWithRelay()
    fireEvent.click(screen.getAllByRole("link")[0])
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtistGroup",
        context_module: "currentShowsRail",
        destination_page_owner_type: "artist",
        type: "viewAll",
      }),
    )
  })

  it("tracks show click", () => {
    renderWithRelay({
      Artist: () => ({
        internalId: "artistID",
        slug: "artistSlug",
        href: "/artist/artistSlug/shows",
      }),

      Show: () => ({
        internalID: "showID",
        slug: "showSlug",
        href: "/show/showSlug",
      }),
    })

    fireEvent.click(screen.getAllByRole("link")[2])

    expect(trackingSpy).toHaveBeenCalledWith({
      action_type: "Click",
      contextModule: "currentShowsRail",
      destinationPageOwnerId: "showID",
      destinationPageOwnerSlug: "showSlug",
      destinationPageOwnerType: "show",
      destination_path: "/show/showSlug",
      horizontalSlidePosition: 1,
      subject: "showCarouselSlide",
      type: "thumbnail",
    })
  })
})
