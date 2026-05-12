import { act, fireEvent, screen } from "@testing-library/react"
import { HomeNewWorksForYouRailFragmentContainer } from "Apps/Home/Components/HomeNewWorksForYouRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { intersect } from "Utils/Hooks/__tests__/mockIntersectionObserver"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: () => ({ contextPageOwnerType: "home" }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HomeNewWorksForYouRailFragmentContainer
        artworksForUser={props.artworksForUser!}
        railPositionY={4}
      />
    )
  },
  query: graphql`
    query HomeNewWorksForYouRail_Test_Query @relay_test_operation {
      artworksForUser(includeBackfill: true, first: 20) {
        ...HomeNewWorksForYouRail_artworksForUser
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
  jest.useRealTimers()
})

describe("HomeNewWorksForYouRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      ArtworkConnection: () => ({
        edges: [
          {
            node: {
              title: "Test Artist",
              href: "/test-href",
            },
          },
        ],
      }),
    })

    expect(screen.getByText("Test Artist")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test-href")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      renderWithRelay({
        CollectorSignals: () => ({
          primaryLabel: null,
          auction: null,
        }),
      })

      fireEvent.click(screen.getByTestId("ShelfArtwork"))

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "newWorksForYouRail",
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
        context_module: "newWorksForYouRail",
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

    it("tracks item viewed impressions", () => {
      jest.useFakeTimers()

      renderWithRelay({
        Artwork: () => ({
          internalID: "artwork-1-id",
          slug: "artwork-1",
        }),
      })

      const item = screen.getAllByTestId("ArtworkItemImpression")[0]

      act(() => intersect(item, true))
      act(() => jest.advanceTimersByTime(500))

      expect(trackEvent).not.toHaveBeenCalled()

      act(() => jest.advanceTimersByTime(501))

      expect(trackEvent).toHaveBeenCalledWith({
        action: "item_viewed",
        context_module: "newWorksForYouRail",
        context_screen: "home",
        item_id: "artwork-1-id",
        item_type: "artwork",
        position: 0,
      })
    })
  })
})
