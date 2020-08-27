import { mount } from "enzyme"
import React from "react"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "../ArtistTopWorksRail"
import { ArtistTopWorksRail_artist } from "v2/__generated__/ArtistTopWorksRail_artist.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"

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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the Notable Works Rail", () => {
    const component = mount(<ArtistTopWorksRail {...props} />)

    expect(component.text()).toMatch("Notable Works")
    expect(component.text()).toMatch("View all works")
    expect(component.find(Carousel)).toHaveLength(1)
    expect(component.find(FillwidthItem)).toHaveLength(2)
  })

  it("tracks the analytics properties when an artwork is clicked on the Notable Works rail", () => {
    const component = mount(<ArtistTopWorksRail {...props} />)
    const elem = component.find(FillwidthItem).first()
    elem.props().onClick({})

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "topWorksRail",
      context_page_owner_id: "artist-id",
      context_page_owner_slug: "artist-slug",
      context_page_owner_type: "artist",
      destination_page_owner_id: "QXJ0d29yazo1ZGVjZDRiYjNjN2NiMTAwMTAwYWQzNmQ=",
      destination_page_owner_slug: "artwork-slug",
      destination_page_owner_type: "artwork",
      horizontal_slide_position: 1,
      type: "thumbnail",
    })
  })

  it("tracks the analytics properties when View All is clicked", () => {
    const component = mount(<ArtistTopWorksRail {...props} />)
    const elem = component.find(StyledLink).first()
    elem.props().onClick(null)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtistGroup",
      context_module: "topWorksRail",
      context_page_owner_id: "artist-id",
      context_page_owner_slug: "artist-slug",
      context_page_owner_type: "artist",
      destination_page_owner_id: "artist-slug",
      destination_page_owner_slug: "artist-slug",
      destination_page_owner_type: "artist",
      horizontal_slide_position: undefined,
      type: "viewAll",
    })
  })
})

const topWorksContent: ArtistTopWorksRail_artist = {
  slug: "artist-slug",
  id: "artist-id",
  " $refType": null,
  filterArtworksConnection: {
    edges: [
      {
        node: {
          slug: "artwork-slug",
          " $fragmentRefs": null,
          id: "QXJ0d29yazo1ZGVjZDRiYjNjN2NiMTAwMTAwYWQzNmQ=",
          image: {
            href: "/artwork/andy-warhol-roy-lichtenstein-authenticated-3",
            imageAspectRatio: 0.78,
            resized: {
              width: 100,
              height: 200,
              url:
                "https://d32dm0rphc51dk.cloudfront.net/JS5CsvkO_SpL1Vg7R-h_Zw/large.jpg",
            },
          },
        },
      },
    ],
  },
}
