import { ArtistWorksForSaleRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistWorksForSaleRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { ArtistWorksForSaleRailTestQuery } from "__generated__/ArtistWorksForSaleRailTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
}))

describe("ArtistWorksForSaleRail", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<ArtistWorksForSaleRailTestQuery>({
      Component: ArtistWorksForSaleRailFragmentContainer,
      query: graphql`
        query ArtistWorksForSaleRailTestQuery @relay_test_operation {
          artist(id: "test") {
            ...ArtistWorksForSaleRail_artist
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

  it("does not render rail if no works", () => {
    renderWithRelay({
      Artist: () => ({
        artworksConnection: { edges: null },
      }),
    })
    expect(screen.queryByText("Works For Sale")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
      }),
    })
    expect(screen.getByText("Works For Sale")).toBeInTheDocument()
    expect(screen.getAllByRole("link")).toHaveLength(3)
    expect(screen.getAllByRole("link")[0]).toHaveAttribute(
      "href",
      expect.stringContaining("/artist/artistSlug"),
    )
    expect(screen.getByText("View All Works")).toBeInTheDocument()
    expect(screen.getAllByText('<mock-value-for-field-"title">')).toHaveLength(
      1,
    )
    expect(
      screen.getByText(', <mock-value-for-field-"date">'),
    ).toBeInTheDocument()
  })

  it("tracks to works route", () => {
    renderWithRelay()
    fireEvent.click(screen.getAllByRole("link")[0])
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtistGroup",
        context_module: "worksForSaleRail",
        destination_page_owner_type: "artist",
        type: "viewAll",
      }),
    )
  })

  it("tracks work click", () => {
    renderWithRelay()
    fireEvent.click(screen.getAllByRole("link")[2])
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtworkGroup",
        context_module: "worksForSaleRail",
        destination_page_owner_type: "artwork",
        horizontal_slide_position: 1,
        type: "thumbnail",
      }),
    )
  })
})
