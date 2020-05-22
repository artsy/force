import { ArtworkRelatedArtistsFixture } from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkRelatedArtists.fixture"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import { ArtworkRelatedArtists } from "../ArtworkRelatedArtists"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("ArtworkRelatedArtists", () => {
  const getWrapper = props => {
    return mount(
      <ArtworkRelatedArtists relay={{ hasMore: () => true }} {...props} />
    )
  }

  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders related artists", () => {
    const props = { artwork: { artist: ArtworkRelatedArtistsFixture } }

    const wrapper = getWrapper(props)

    expect(wrapper.find("ArtistCard").length).toEqual(4)
  })

  it("tracks ArtistCard clicks", () => {
    const props = {
      artwork: { artist: ArtworkRelatedArtistsFixture, " $refType": null },
    }

    const wrapper = getWrapper(props)

    const artistCard = wrapper.find("ArtistCard").at(0)
    artistCard.simulate("click")

    expect(trackEvent).toBeCalledWith({
      action_type: "Click",
      context_module: "RelatedArtists",
      type: "Artist card",
    })
    expect(trackEvent).toHaveBeenCalledTimes(1)
  })
})
