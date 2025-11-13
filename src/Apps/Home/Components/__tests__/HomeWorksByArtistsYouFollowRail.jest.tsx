import { HomeWorksByArtistsYouFollowRailFragmentContainer } from "Apps/Home/Components/HomeWorksByArtistsYouFollowRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"
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
      renderWithRelay({
        CollectorSignals: () => ({ primaryLabel: null, auction: null }),
      })

      fireEvent.click(screen.getByTestId("ShelfArtwork"))

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "worksByArtistsYouFollowRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
        signal_label: "",
        signal_bid_count: undefined,
        signal_lot_watcher_count: undefined,
      })
    })

    it("tracks auction item clicks", () => {
      renderWithRelay({
        CollectorSignals: () => ({
          primaryLabel: null,
          auction: {
            lotWatcherCount: 5,
            bidCount: 1,
          },
        }),
      })

      fireEvent.click(screen.getByTestId("ShelfArtwork"))

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "worksByArtistsYouFollowRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
        signal_label: "",
        signal_bid_count: 1,
        signal_lot_watcher_count: 5,
      })
    })
  })
})
