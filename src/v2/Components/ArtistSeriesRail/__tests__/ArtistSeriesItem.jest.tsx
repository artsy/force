import { mount } from "enzyme"
import React from "react"
import { ArtistSeriesItem, StyledLink } from "../ArtistSeriesItem"
import { ArtistSeriesItem_artistSeries } from "v2/__generated__/ArtistSeriesItem_artistSeries.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("Artist Series Rail Item", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      artistSeries: itemContent,
      contextPageOwnerId: "context-page-owner-id",
      contextPageOwnerSlug: "context-page-owner-slug",
      contextModule: "context-module",
      contextPageOwnerType: "page-owner-type",
      index: 2,
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("tracks the analytics properties when an artwork is clicked on the Notable Works rail", () => {
    const component = mount(<ArtistSeriesItem {...props} />)
    const elem = component.find(StyledLink).first()
    elem.props().onClick({} as any)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtistSeriesGroup",
      context_module: "context-module",
      context_page_owner_id: "context-page-owner-id",
      context_page_owner_slug: "context-page-owner-slug",
      context_page_owner_type: "page-owner-type",
      curation_boost: true,
      destination_page_owner_id: "internal-id",
      destination_page_owner_slug: "slug",
      destination_page_owner_type: "artistSeries",
      horizontal_slide_position: 2,
      type: "thumbnail",
    })
  })
})

const itemContent: ArtistSeriesItem_artistSeries = {
  artworksCountMessage: "5 available",
  internalID: "internal-id",
  slug: "slug",
  title: "title",
  featured: true,
  " $refType": null,
  image: {
    cropped: {
      url: "/path/to/cats.jpg",
    },
  },
}
