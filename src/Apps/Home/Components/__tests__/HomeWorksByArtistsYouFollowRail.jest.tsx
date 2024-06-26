import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { HomeWorksByArtistsYouFollowRailFragmentContainer } from "Apps/Home/Components/HomeWorksByArtistsYouFollowRail"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HomeWorksByArtistsYouFollowRailFragmentContainer
        homePage={props.homePage!}
      />
    )
  },
  query: graphql`
    query HomeWorksByArtistsYouFollowRail_Test_Query @relay_test_operation {
      homePage {
        ...HomeWorksByArtistsYouFollowRail_homePage
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

describe("HomeWorksByArtistsYouFollowRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      HomePage: () => ({
        artworkModule: {
          results: [
            {
              title: "Test Artist",
              href: "/test-href",
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Test Artist")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test-href")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getByTestId("ShelfArtwork"))

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "worksByArtistsYouFollowRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
