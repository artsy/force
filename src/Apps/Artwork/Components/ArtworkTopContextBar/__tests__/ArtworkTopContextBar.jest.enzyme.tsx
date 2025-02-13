import { ArtworkTopContextBarFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBar"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { getENV } from "Utils/getENV"
import type { ArtworkTopContextBar_Test_Query } from "__generated__/ArtworkTopContextBar_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("ArtworkTopContextBar", () => {
  const { getWrapper } = setupTestWrapper<ArtworkTopContextBar_Test_Query>({
    Component: ArtworkTopContextBarFragmentContainer,
    query: graphql`
      query ArtworkTopContextBar_Test_Query @relay_test_operation {
        artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
          ...ArtworkTopContextBar_artwork
        }
      }
    `,
  })

  beforeEach(() => {
    ;(getENV as jest.Mock).mockImplementation(key => {
      if (key === "APP_URL") return "https://artsy.net"
      return process.env[key]
    })
  })

  it("returns null if no artist data", () => {
    const { wrapper } = getWrapper({
      Artwork: () => ({
        artist: null,
      }),
    })

    expect(wrapper.html()).toEqual("")
  })

  it("renders artist information by default", () => {
    const { wrapper } = getWrapper({
      Artwork: () => ({
        artist: {
          name: "Andy Warhol",
          href: "/artist/andy-warhol",
        },
        title: "Campbell's Soup Can",
        href: "/artwork/andy-warhol-campbells-soup-can",
        context: null,
      }),
    })

    expect(wrapper.text()).toContain("Andy Warhol")
    expect(wrapper.find("TopContextBar").prop("href")).toBe(
      "/artist/andy-warhol",
    )
    expect(wrapper.find("TopContextBar").prop("displayBackArrow")).toBe(true)
  })

  it("renders structured data for breadcrumbs", () => {
    const { wrapper } = getWrapper({
      Artwork: () => ({
        artist: {
          name: "Andy Warhol",
          href: "/artist/andy-warhol",
        },
        title: "Campbell's Soup Can",
        href: "/artwork/andy-warhol-campbells-soup-can",
        context: null,
      }),
    })

    const structuredData = wrapper.find("StructuredData")
    expect(structuredData.length).toBe(1)
    expect(structuredData.prop("schemaData")).toEqual({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "https://artsy.net/artist/andy-warhol",
            name: "Andy Warhol",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": "https://artsy.net/artwork/andy-warhol-campbells-soup-can",
            name: "Campbell's Soup Can",
          },
        },
      ],
    })
  })

  describe("sale context", () => {
    it("renders sale information when artwork is in a sale", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          artist: {
            name: "Andy Warhol",
            href: "/artist/andy-warhol",
          },
          context: {
            __typename: "Sale",
            name: "Contemporary Evening Sale",
            href: "/auction/contemporary-evening-sale",
            isAuction: true,
            isBenefit: false,
            isGalleryAuction: false,
          },
          partner: {
            name: "Christie's",
          },
        }),
      })

      const text = wrapper.text()
      expect(text).toContain("Contemporary Evening Sale")
      expect(text).toContain("Christie's")
      expect(text).toContain("In auction")
      expect(wrapper.find("TopContextBar").prop("href")).toBe(
        "/auction/contemporary-evening-sale",
      )
    })

    it("omits partner name for benefit auctions", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          artist: {
            name: "Andy Warhol",
            href: "/artist/andy-warhol",
          },
          context: {
            __typename: "Sale",
            name: "Benefit Auction",
            href: "/auction/benefit-auction",
            isAuction: true,
            isBenefit: true,
            isGalleryAuction: false,
          },
          partner: {
            name: "Partner Name",
          },
        }),
      })

      expect(wrapper.text()).not.toContain("Partner Name")
    })

    it("shows 'In sale' for non-auction sales", () => {
      const { wrapper } = getWrapper({
        Artwork: () => ({
          artist: {
            name: "Andy Warhol",
            href: "/artist/andy-warhol",
          },
          context: {
            __typename: "Sale",
            name: "Gallery Sale",
            href: "/sale/gallery-sale",
            isAuction: false,
            isBenefit: false,
            isGalleryAuction: false,
          },
        }),
      })

      expect(wrapper.text()).toContain("In sale")
    })
  })
})
