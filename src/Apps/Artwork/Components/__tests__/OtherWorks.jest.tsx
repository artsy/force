import { OtherWorksFragmentContainer as OtherWorks } from "Apps/Artwork/Components/OtherWorks/index"
import { render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("OtherWorks", () => {
  let genericOtherWorksData

  beforeEach(() => {
    const trackEvent = jest.fn()
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
    render(<OtherWorks artwork={genericOtherWorksData} />)
    expect(screen.queryByText("Other works")).not.toBeInTheDocument()
  })

  it("renders no grids if an empty array is provided", () => {
    genericOtherWorksData.contextGrids = []
    render(<OtherWorks artwork={genericOtherWorksData} />)
    expect(screen.queryByText("Other works")).not.toBeInTheDocument()
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
    render(<OtherWorks artwork={genericOtherWorksData} />)
    expect(screen.getByText("Other works by Andy Warhol")).toBeInTheDocument()
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
    render(<OtherWorks artwork={genericOtherWorksData} />)
    expect(screen.getByText("Other works by Andy Warhol")).toBeInTheDocument()
    expect(
      screen.getByText("Other works from Gagosian Gallery"),
    ).toBeInTheDocument()
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
    render(<OtherWorks artwork={genericOtherWorksData} />)
    expect(screen.getByText("Other works by Andy Warhol")).toBeInTheDocument()
    expect(
      screen.queryByText("Other works from Gagosian Gallery"),
    ).not.toBeInTheDocument()
  })

  describe("Context-specific behavior", () => {
    it("renders OtherAuctions for ArtworkContextAuction if the auction is open", () => {
      genericOtherWorksData.context.__typename = "ArtworkContextAuction"
      genericOtherWorksData.sale = { is_closed: false }
      const { container } = render(
        <OtherWorks artwork={genericOtherWorksData} />,
      )
      expect(container.firstChild).toBeTruthy()
    })
  })
})
