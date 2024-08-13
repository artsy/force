import { graphql } from "react-relay"
import { HomeTrendingArtistsRailFragmentContainer } from "Apps/Home/Components/HomeTrendingArtistsRail"
import { useTracking } from "react-tracking"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Components/FollowButton/FollowArtistButton", () => ({
  FollowArtistButtonQueryRenderer: () => <>Following</>,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <HomeTrendingArtistsRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeTrendingArtistsRail_Test_Query @relay_test_operation {
      viewer {
        ...HomeTrendingArtistsRail_viewer
      }
    }
  `,
})

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeTrendingArtistsRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Test Artist",
        href: "/test-href",
      }),
    })

    expect(screen.getByText("Trending Artists on Artsy")).toBeInTheDocument()
    expect(screen.getByText("View All Artists")).toBeInTheDocument()
    expect(screen.getByText("Test Artist")).toBeInTheDocument()
    expect(screen.getByText("Following")).toBeInTheDocument()
    expect(screen.getAllByRole("link")[2]).toHaveAttribute("href", "/test-href")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay({
        Artist: () => ({
          internalID: "test-artist-id",
          slug: "test-artist-slug",
        }),
      })

      fireEvent.click(screen.getAllByRole("link")[2])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtistGroup",
        context_module: "trendingArtistsRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "test-artist-id",
        destination_page_owner_slug: "test-artist-slug",
        destination_page_owner_type: "artist",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtistGroup",
        context_module: "trendingArtistsRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "artists",
        type: "viewAll",
      })
    })
  })
})
