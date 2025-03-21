import { fireEvent, screen } from "@testing-library/react"
import { HomeNewWorksFromGalleriesYouFollowRailFragmentContainer } from "Apps/Home/Components/HomeNewWorksFromGalleriesYouFollowRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HomeNewWorksFromGalleriesYouFollowRailFragmentContainer
        newWorksFromGalleriesYouFollowConnection={
          props.me?.newWorksFromGalleriesYouFollowConnection!
        }
      />
    )
  },
  query: graphql`
    query HomeNewWorksFromGalleriesYouFollowRail_Test_Query
    @relay_test_operation {
      me {
        newWorksFromGalleriesYouFollowConnection(first: 20) {
          ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection
        }
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

describe("HomeNewWorksFromGalleriesYouFollowRail", () => {
  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "/new-works-from-galleries-you-follow",
    )
    expect(
      screen.getByText("New Works from Galleries You Follow"),
    ).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks view all clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "newWorksByGalleriesYouFollowRail",
        destination_page_owner_type: "newWorksFromGalleriesYouFollow",
        type: "viewAll",
      })
    })

    it("tracks item clicks", () => {
      renderWithRelay({
        CollectorSignals: () => ({
          primaryLabel: null,
          auction: null,
        }),
      })

      fireEvent.click(screen.getAllByRole("link")[2])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "newWorksByGalleriesYouFollowRail",
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

      fireEvent.click(screen.getAllByRole("link")[2])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "newWorksByGalleriesYouFollowRail",
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
