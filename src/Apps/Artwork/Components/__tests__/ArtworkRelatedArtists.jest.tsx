import { ArtworkRelatedArtistsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkRelatedArtists.fixture"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import { ArtworkRelatedArtists } from "../ArtworkRelatedArtists"

jest.mock("react-tracking")

describe("ArtworkRelatedArtists", () => {
  const getWrapper = props => {
    return mount(
      <ArtworkRelatedArtists relay={{ hasMore: () => true }} {...props} />
    )
  }

  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders related artists", () => {
    const props = { artwork: { artist: ArtworkRelatedArtistsFixture } }

    const wrapper = getWrapper(props)

    expect(wrapper.find("EntityHeaderArtist").length).toEqual(4)
  })

  it("tracks ArtistCard clicks", () => {
    const props = {
      artwork: { artist: ArtworkRelatedArtistsFixture, " $refType": null },
    }

    const wrapper = getWrapper(props)

    const artistCard = wrapper.find("EntityHeaderArtist").at(0).find("a")

    artistCard.simulate("click")

    expect(trackEvent).toBeCalledWith({
      action_type: "Click",
      context_module: "RelatedArtists",
      type: "Artist card",
    })
    expect(trackEvent).toHaveBeenCalledTimes(1)
  })
})
