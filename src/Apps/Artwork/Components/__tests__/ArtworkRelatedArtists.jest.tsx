import { ArtworkRelatedArtistsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkRelatedArtists.fixture"
import { ArtworkRelatedArtists } from "Apps/Artwork/Components/ArtworkRelatedArtists"
import { fireEvent, render } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("ArtworkRelatedArtists", () => {
  const getWrapper = props => {
    return render(
      <ArtworkRelatedArtists relay={{ hasMore: () => true }} {...props} />,
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

    const { container } = getWrapper(props)

    expect(container.querySelectorAll("a")).toHaveLength(4)
  })

  it("tracks ArtistCard clicks", () => {
    const props = {
      artwork: { artist: ArtworkRelatedArtistsFixture, " $refType": null },
    }

    const { container } = getWrapper(props)

    const artistLinks = container.querySelectorAll("a")
    const firstArtistLink = artistLinks[0]

    fireEvent.click(firstArtistLink)

    expect(trackEvent).toBeCalledWith({
      action_type: "Click",
      context_module: "RelatedArtists",
      type: "Artist card",
    })
    expect(trackEvent).toHaveBeenCalledTimes(1)
  })
})
