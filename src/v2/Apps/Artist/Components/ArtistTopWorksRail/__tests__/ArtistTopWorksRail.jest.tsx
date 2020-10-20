import { mount } from "enzyme"
import React from "react"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "../ArtistTopWorksRail"
import { ArtistTopWorksRail_artist } from "v2/__generated__/ArtistTopWorksRail_artist.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"
import { OwnerType } from "@artsy/cohesion"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("Artist Notable Works Rail Component", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      artist: topWorksContent,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  const getWrapper = (passedProps = props) => {
    return mount(
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "artist-id",
          contextPageOwnerSlug: "artist-slug",
          contextPageOwnerType: OwnerType.artist,
        }}
      >
        <ArtistTopWorksRail {...passedProps} />
      </AnalyticsContext.Provider>
    )
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the Notable Works Rail", () => {
    const component = getWrapper()

    expect(component.text()).toMatch("Notable Works")
    expect(component.text()).toMatch("View all works")
    expect(component.find(Carousel)).toHaveLength(1)
    expect(component.find(FillwidthItem)).toHaveLength(2)
  })

  it("tracks the analytics properties when an artwork is clicked on the Notable Works rail", () => {
    const component = getWrapper()
    const elem = component.find(FillwidthItem).first()
    elem.props().onClick({})

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "topWorksRail",
      context_page_owner_id: "artist-id",
      context_page_owner_slug: "artist-slug",
      context_page_owner_type: "artist",
      destination_page_owner_id: "artwork-id",
      destination_page_owner_slug: "artwork-slug",
      destination_page_owner_type: "artwork",
      horizontal_slide_position: 1,
      type: "thumbnail",
    })
  })

  it("tracks the analytics properties when View All is clicked", () => {
    const component = getWrapper()
    const elem = component.find(StyledLink).first()
    elem.props().onClick(null)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtistGroup",
      context_module: "topWorksRail",
      context_page_owner_id: "artist-id",
      context_page_owner_slug: "artist-slug",
      context_page_owner_type: "artist",
      destination_page_owner_id: "artist-id",
      destination_page_owner_slug: "artist-slug",
      destination_page_owner_type: "artist",
      horizontal_slide_position: undefined,
      type: "viewAll",
    })
  })
})

const topWorksContent: ArtistTopWorksRail_artist = {
  slug: "artist-slug",
  internalID: "artist-id",
  " $refType": null,
  filterArtworksConnection: {
    edges: [
      {
        node: {
          slug: "artwork-slug",
          " $fragmentRefs": null,
          internalID: "artwork-id",
        },
      },
    ],
  },
}
