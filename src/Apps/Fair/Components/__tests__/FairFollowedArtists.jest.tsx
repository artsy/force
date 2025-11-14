import { FairFollowedArtists } from "Apps/Fair/Components/FairOverview/FairFollowedArtists"
import { AnalyticsCombinedContextProvider } from "System/Contexts/AnalyticsContext"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("Components/Artwork/ShelfArtwork", () => {
  return {
    ShelfArtworkFragmentContainer: ({ onClick }) => (
      <button onClick={onClick}>ShelfArtwork</button>
    ),
  }
})

const FAIR_FOLLOWED_ARTISTS_FIXTURE = {
  internalID: "example-fair-id",
  slug: "example-fair-slug",
  followedArtistArtworks: {
    edges: [
      {
        node: {
          internalID: "example-artwork-internal-id",
          slug: "example-artwork-slug",
        },
      },
    ],
  },
}

describe("FairFollowedArtists", () => {
  let trackEvent

  beforeEach(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = () => {
    return render(
      <AnalyticsCombinedContextProvider
        contextPageOwnerId="example-fair-id"
        path="/fair/example-fair-slug"
      >
        <FairFollowedArtists fair={FAIR_FOLLOWED_ARTISTS_FIXTURE as any} />
      </AnalyticsCombinedContextProvider>,
    )
  }

  it("makes the appropriate analytics call when 'View all' is clicked", () => {
    getWrapper()

    const viewAll = screen.getByText("View all")

    expect(trackEvent).not.toBeCalled()

    fireEvent.click(viewAll)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "worksByArtistsYouFollowRail",
      context_page_owner_id: "example-fair-id",
      context_page_owner_slug: "example-fair-slug",
      context_page_owner_type: "fair",
      destination_page_owner_id: "example-fair-id",
      destination_page_owner_slug: "example-fair-slug",
      destination_page_owner_type: "fair",
      type: "viewAll",
    })
  })

  it("makes the appropriate analytics call when an artwork is clicked", () => {
    getWrapper()

    const fillwidthItem = screen.getByText("ShelfArtwork")

    expect(trackEvent).not.toBeCalled()

    fireEvent.click(fillwidthItem)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "worksByArtistsYouFollowRail",
      context_page_owner_id: "example-fair-id",
      context_page_owner_slug: "example-fair-slug",
      context_page_owner_type: "fair",
      destination_page_owner_id: "example-artwork-internal-id",
      destination_page_owner_slug: "example-artwork-slug",
      destination_page_owner_type: "artwork",
      horizontal_slide_position: 0,
      signal_bid_count: undefined,
      signal_label: "",
      signal_lot_watcher_count: undefined,
      type: "thumbnail",
    })
  })
})
