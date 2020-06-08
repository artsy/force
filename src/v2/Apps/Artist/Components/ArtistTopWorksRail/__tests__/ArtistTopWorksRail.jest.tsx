import { mount } from "enzyme"
import React from "react"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "../ArtistTopWorksRail"
import { ArtistTopWorksRail_artist } from "v2/__generated__/ArtistTopWorksRail_artist.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("Artist Top Works Rail Component", () => {
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

  it("renders the Top Works Rail", () => {
    const component = mount(<ArtistTopWorksRail {...props} />)

    expect(component.text()).toMatch("Top Works")
    expect(component.text()).toMatch("View all works")
    expect(component.find(Carousel)).toHaveLength(1)
    expect(component.find(FillwidthItem)).toHaveLength(2)
  })
})

const topWorksContent: ArtistTopWorksRail_artist = {
  slug: "artist-slug",
  " $refType": null,
  filterArtworksConnection: {
    edges: [
      {
        node: {
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
