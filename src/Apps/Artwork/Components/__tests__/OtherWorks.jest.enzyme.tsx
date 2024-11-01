import { mount, shallow } from "enzyme"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import { OtherWorksFragmentContainer as OtherWorks } from "Apps/Artwork/Components/OtherWorks/index"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("OtherWorks", () => {
  let genericOtherWorksData

  beforeEach(() => {
    let trackEvent
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })

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
    expect(component.text()).toContain("Other works by Andy Warhol")
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
    expect(component.text()).toContain("Other works by Andy Warhol")
    expect(component.text()).toContain("Other works from Gagosian Gallery")
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
    expect(component.text()).toContain("Other works by Andy Warhol")
  })

  describe("Context-specific behavior", () => {
    it("renders OtherAuctions for ArtworkContextAuction if the auction is open", () => {
      genericOtherWorksData.context.__typename = "ArtworkContextAuction"
      genericOtherWorksData.sale = { is_closed: false }
      const component = mount(<OtherWorks artwork={genericOtherWorksData} />)
      expect(component.find("OtherAuctionsQueryRenderer").length).toEqual(1)
    })
  })
})
