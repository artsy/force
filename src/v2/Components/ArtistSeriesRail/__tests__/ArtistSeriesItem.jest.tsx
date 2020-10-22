import { mount } from "enzyme"
import React from "react"
import { ArtistSeriesItem, StyledLink } from "../ArtistSeriesItem"
import { ArtistSeriesItem_artistSeries } from "v2/__generated__/ArtistSeriesItem_artistSeries.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { OwnerType } from "@artsy/cohesion"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("Artist Series Rail Item", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      artistSeries: itemContent,
      contextModule: "context-module",
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
    const component = mount(
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "context-page-owner-id",
          contextPageOwnerSlug: "context-page-owner-slug",
          contextPageOwnerType: OwnerType.artist,
        }}
      >
        <ArtistSeriesItem {...props} />
      </AnalyticsContext.Provider>
    )
    const elem = component.find(StyledLink).first()
    elem.props().onClick({} as any)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtistSeriesGroup",
      context_module: "context-module",
      context_page_owner_id: "context-page-owner-id",
      context_page_owner_slug: "context-page-owner-slug",
      context_page_owner_type: "artist",
      curation_boost: true,
      destination_page_owner_id: "internal-id",
      destination_page_owner_slug: "slug",
      destination_page_owner_type: "artistSeries",
      horizontal_slide_position: 2,
      type: "thumbnail",
    })
  })

  it("does not try to render a null image", () => {
    const wrapper = mount(<ArtistSeriesItem {...props} />)
    expect(wrapper.find("img")).toHaveLength(1)

    wrapper.setProps({
      ...props,
      artistSeries: { image: null },
    })
    wrapper.update()

    expect(wrapper.find("img")).toHaveLength(0)
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
