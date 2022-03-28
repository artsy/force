import { FairFollowedArtists } from "../FairOverview/FairFollowedArtists"
import { useTracking } from "react-tracking"
import { AnalyticsContextProvider } from "v2/System/Analytics/AnalyticsContext"
import { mount } from "enzyme"
import { OwnerType } from "@artsy/cohesion"

jest.mock("react-tracking")
jest.mock("v2/Components/Artwork/FillwidthItem", () => ({ onClick }) => (
  <button onClick={onClick}>FillwidthItem</button>
))

const FAIR_FOLLOWED_ARTISTS_FIXTURE = {
  internalID: "example-fair-id",
  slug: "example-fair-slug",
  followedArtistArtworks: {
    edges: [
      {
        artwork: {
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
    return mount(
      <AnalyticsContextProvider
        value={{
          contextPageOwnerId: "example-fair-id",
          contextPageOwnerSlug: "example-fair-slug",
          contextPageOwnerType: OwnerType.fair,
        }}
      >
        <FairFollowedArtists fair={FAIR_FOLLOWED_ARTISTS_FIXTURE as any} />
      </AnalyticsContextProvider>
    )
  }

  it("makes the appropriate analytics call when 'View all' is clicked", () => {
    const wrapper = getWrapper()

    const viewAll = wrapper
      .find("a")
      .findWhere(node => node.text() === "View all")
      .first()

    expect(trackEvent).not.toBeCalled()

    viewAll.simulate("click")

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
    const wrapper = getWrapper()

    const fillwidthItem = wrapper
      .find("button")
      .findWhere(node => node.text() === "FillwidthItem")
      .first()

    expect(trackEvent).not.toBeCalled()

    fillwidthItem.simulate("click")

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
      type: "thumbnail",
    })
  })
})
