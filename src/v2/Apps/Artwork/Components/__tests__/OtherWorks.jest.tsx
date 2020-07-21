import { Serif } from "@artsy/palette"
import { mount, shallow } from "enzyme"
import React from "react"
import { Header } from "../OtherWorks/Header"
import { OtherWorksFragmentContainer as OtherWorks } from "../OtherWorks/index"
import { SystemContextProvider } from "v2/Artsy"
import { ArtistSeriesArtworkRail } from "../OtherWorks/ArtistSeriesArtworkRail"

describe("OtherWorks", () => {
  let genericOtherWorksData

  beforeEach(() => {
    genericOtherWorksData = {
      contextGrids: null,
      context: {
        __typename: "ArtworkContextPartnerShow",
      },
      sale: null,
      internalID: "artwork1",
      gravityID: "asdbsd",
      layers: [],
      layer: {
        artworksConnection: null,
      },
      " $fragmentRefs": null,
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
        title: "Other works by Andy Warhol",
        ctaTitle: "View all works by Andy Warhol",
        ctaHref: "/artist/andy-warhol",
        artworksConnection: {
          edges: [
            {
              node: {
                internalID: "artwork1",
              },
            },
          ],
        },
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Serif).text()).toEqual("Other works by Andy Warhol")
  })

  describe("artist series", () => {
    beforeEach(() => {
      genericOtherWorksData.contextGrids = [
        {
          __typename: "ArtistArtworkGrid",
          title: "Other works by Andy Warhol",
          ctaTitle: "View all works by Andy Warhol",
          ctaHref: "/artist/andy-warhol",
          artworksConnection: {
            edges: [
              {
                node: {
                  internalID: "artwork1",
                },
              },
            ],
          },
        },
      ]

      genericOtherWorksData.artistSeriesConnection = {
        edges: [
          {
            node: {
              slug: "artist-series",
              artworksConnection: {
                edges: [
                  {
                    node: {
                      internalID: "artwork",
                    },
                  },
                ],
              },
            },
          },
        ],
      }
    })

    it("renders the other works from the artist series when the lab feature is enabled", () => {
      const user = { lab_features: ["Artist Series"] }
      const component = mount(
        <SystemContextProvider user={user}>
          <OtherWorks artwork={genericOtherWorksData} />
        </SystemContextProvider>
      )
      expect(component.find(ArtistSeriesArtworkRail).length).toEqual(1)
    })

    it("doesnt render the other works from the artist series without the lab feature", () => {
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find(ArtistSeriesArtworkRail).length).toEqual(0)
    })
  })

  it("renders the grids if multiple are provided", () => {
    genericOtherWorksData.contextGrids = [
      {
        __typename: "ArtistArtworkGrid",
        title: "Other works by Andy Warhol",
        ctaTitle: "View all works by Andy Warhol",
        ctaHref: "/artist/andy-warhol",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
      },
      {
        __typename: "PartnerArtworkGrid",
        title: "Other works from Gagosian Gallery",
        ctaTitle: "View all works from Gagosian Gallery",
        ctaHref: "/gagosian-gallery",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(2)
    expect(component.find(Serif).first().text()).toEqual(
      "Other works by Andy Warhol"
    )
    expect(component.find(Serif).last().text()).toEqual(
      "Other works from Gagosian Gallery"
    )
  })

  it("excludes the related artwork grid", () => {
    genericOtherWorksData.contextGrids = [
      {
        __typename: "ArtistArtworkGrid",
        title: "Other works by Andy Warhol",
        ctaTitle: "View all works by Andy Warhol",
        ctaHref: "/artist/andy-warhol",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
      },
      {
        __typename: "RelatedArtworkGrid",
        title: "Related works",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Serif).text()).toEqual("Other works by Andy Warhol")
  })

  it("renders only grids with artworks", () => {
    genericOtherWorksData.contextGrids = [
      {
        __typename: "ArtistArtworkGrid",
        title: "Other works by Andy Warhol",
        ctaTitle: "View all works by Andy Warhol",
        ctaHref: "/artist/andy-warhol",
        artworksConnection: { edges: [{ node: { internalID: "artwork1" } }] },
      },
      {
        __typename: "PartnerArtworkGrid",
        title: "Other works from Gagosian Gallery",
        ctaTitle: "View all works from Gagosian Gallery",
        ctaHref: "/gagosian-gallery",
        artworksConnection: null,
      },
      {
        __typename: "ShowArtworkGrid",
        title: "Other works from Gagosian Gallery at Art Basel 2019",
        ctaTitle: "View all works from the booth",
        ctaHref: "/show/gagosian-gallery-at-art-basel-2019",
        artworksConnection: { edges: [] },
      },
    ]
    const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
    expect(component.find(Header).length).toEqual(1)
    expect(component.find(Serif).text()).toEqual("Other works by Andy Warhol")
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
