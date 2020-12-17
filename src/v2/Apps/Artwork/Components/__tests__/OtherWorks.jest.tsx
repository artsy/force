import { Text } from "@artsy/palette"
import { mount, shallow } from "enzyme"
import React from "react"
import { Header } from "../OtherWorks/Header"
import { OtherWorksFragmentContainer as OtherWorks } from "../OtherWorks/index"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("OtherWorks", () => {
  let genericOtherWorksData

  beforeEach(() => {
    let trackEvent
    beforeEach(() => {
      trackEvent = jest.fn()
      ;(useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
    })

    genericOtherWorksData = {
      " $fragmentRefs": null,
      context: {
        __typename: "ArtworkContextPartnerShow",
      },
      contextGrids: null,
      gravityID: "asdbsd",
      internalID: "artwork1",
      layer: {
        artworksConnection: null,
      },
      layers: [],
      sale: null,
    }
  })

  it("renders no grids if there are none provided", () => {
    const component = shallow(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(0)
  })

  it("renders no grids if an empty array is provided", () => {
    genericOtherWorksData.contextGrids = []
    const component = shallow(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(0)
  })

  it("renders the grid if one is provided", () => {
    genericOtherWorksData.contextGrids = [
      {
        __typename: "ArtistArtworkGrid",
        artworksConnection: {
          edges: [
            {
              node: {
                internalID: "artwork1",
              },
            },
          ],
        },
        ctaHref: "/artist/andy-warhol",
        ctaTitle: "View all works by Andy Warhol",
        title: "Other works by Andy Warhol",
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Text).text()).toEqual("Other works by Andy Warhol")
  })

  it("renders the grids if multiple are provided", () => {
    genericOtherWorksData.contextGrids = [
      {
        __typename: "ArtistArtworkGrid",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
        ctaHref: "/artist/andy-warhol",
        ctaTitle: "View all works by Andy Warhol",
        title: "Other works by Andy Warhol",
      },
      {
        __typename: "PartnerArtworkGrid",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
        ctaHref: "/gagosian-gallery",
        ctaTitle: "View all works from Gagosian Gallery",
        title: "Other works from Gagosian Gallery",
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(2)
    expect(component.find(Text).first().text()).toEqual(
      "Other works by Andy Warhol"
    )
    expect(component.find(Text).last().text()).toEqual(
      "Other works from Gagosian Gallery"
    )
  })

  it("excludes the related artwork grid", () => {
    genericOtherWorksData.contextGrids = [
      {
        __typename: "ArtistArtworkGrid",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
        ctaHref: "/artist/andy-warhol",
        ctaTitle: "View all works by Andy Warhol",
        title: "Other works by Andy Warhol",
      },
      {
        __typename: "RelatedArtworkGrid",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
        title: "Related works",
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Text).text()).toEqual("Other works by Andy Warhol")
  })

  it("renders only grids with artworks", () => {
    genericOtherWorksData.contextGrids = [
      {
        __typename: "ArtistArtworkGrid",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
        ctaHref: "/artist/andy-warhol",
        ctaTitle: "View all works by Andy Warhol",
        title: "Other works by Andy Warhol",
      },
      {
        __typename: "PartnerArtworkGrid",
        artworksConnection: null,
        ctaHref: "/gagosian-gallery",
        ctaTitle: "View all works from Gagosian Gallery",
        title: "Other works from Gagosian Gallery",
      },
      {
        __typename: "ShowArtworkGrid",
        artworksConnection: { edges: [] },
        ctaHref: "/show/gagosian-gallery-at-art-basel-2019",
        ctaTitle: "View all works from the booth",
        title: "Other works from Gagosian Gallery at Art Basel 2019",
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Text).text()).toEqual("Other works by Andy Warhol")
  })

  describe("Context-specific behavior", () => {
    it("renders a RelatedWorks grid for ArtworkContextArtist", () => {
      genericOtherWorksData.context.__typename = "ArtworkContextArtist"
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find("RelatedWorksArtworkGrid").length).toEqual(1)
      expect(component.find("OtherAuctionsQueryRenderer").length).toEqual(0)
    })

    it("renders a RelatedWorks grid for ArtworkContextPartnerShow", () => {
      genericOtherWorksData.context.__typename = "ArtworkContextPartnerShow"
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find("RelatedWorksArtworkGrid").length).toEqual(1)
      expect(component.find("OtherAuctionsQueryRenderer").length).toEqual(0)
    })

    it("renders a RelatedWorks grid for ArtworkContextFair", () => {
      genericOtherWorksData.context.__typename = "ArtworkContextFair"
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find("RelatedWorksArtworkGrid").length).toEqual(1)
      expect(component.find("OtherAuctionsQueryRenderer").length).toEqual(0)
    })

    it("renders RelatedWorks and OtherAuctions for ArtworkContextAuction if the auction is closed", () => {
      genericOtherWorksData.context.__typename = "ArtworkContextAuction"
      genericOtherWorksData.sale = { is_closed: true }
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find("RelatedWorksArtworkGrid").length).toEqual(1)
      expect(component.find("OtherAuctionsQueryRenderer").length).toEqual(1)
    })

    it("renders OtherAuctions but no RelatedWorks grid for ArtworkContextAuction if the auction is open", () => {
      genericOtherWorksData.context.__typename = "ArtworkContextAuction"
      genericOtherWorksData.sale = { is_closed: false }
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find("RelatedWorksArtworkGrid").length).toEqual(0)
      expect(component.find("OtherAuctionsQueryRenderer").length).toEqual(1)
    })

    it("safely renders when there's a missing layer", () => {
      genericOtherWorksData.layer = null
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find("RelatedWorksArtworkGrid").length).toEqual(1)
    })
  })
})
