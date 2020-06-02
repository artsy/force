import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "../ArtistTopWorksRail"
import { ArtistTopWorksRail_artist } from "v2/__generated__/ArtistTopWorksRail_artist.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"

describe("Artist Top Works Rail Component", () => {
  let props

  beforeEach(() => {
    props = {
      artist: topWorksContent,
    }
  })

  it("renders the Top Works components", () => {
    const component = mount(<ArtistTopWorksRail {...props} />)

    expect(component.text()).toMatch("Top Works")
    expect(component.text()).toMatch("View all works")
    expect(component.find(Carousel)).toHaveLength(1)
    expect(component.find(FillwidthItem)).toHaveLength(8)
  })
})

const topWorksContent: ArtistTopWorksRail_artist = {
  slug: "artist-slug",
  " $refType": null,
  topWorksArtworks: {
    edges: [
      {
        node: {
          " $fragmentRefs": null,
          id: "QXJ0d29yazo1ZGVjZDRiYjNjN2NiMTAwMTAwYWQzNmQ=",
          image: {
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
      {
        node: {
          " $fragmentRefs": null,
          id: "QXJ0d29yazo1ZGVjZDRiYjNjN2NiMTAwMTAwYWQzNmQ=",
          image: {
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
      {
        node: {
          " $fragmentRefs": null,
          id: "fasdfadsfasdfds=",
          image: {
            imageAspectRatio: 0.18,
            resized: {
              width: 100,
              height: 20,
              url:
                "https://fasdfadsfasdfds.cloudfront.net/JS5CsvkO_SpL1Vg7R-h_Zw/large.jpg",
            },
          },
        },
      },
      {
        node: {
          " $fragmentRefs": null,
          id: "fjaojopapja=",
          image: {
            imageAspectRatio: 0.38,
            resized: {
              width: 100,
              height: 12411,
              url:
                "https://fjaojopapja.cloudfront.net/JS5CsvkO_SpL1Vg7R-h_Zw/large.jpg",
            },
          },
        },
      },
    ],
  },
}
