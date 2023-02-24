import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistAppFragmentContainer } from "Apps/Artist/ArtistApp"
import { ArtistApp_Test_Query } from "__generated__/ArtistApp_Test_Query.graphql"
import { findCurrentRoute } from "System/Router/Utils/findCurrentRoute"

jest.unmock("react-relay")
jest.mock("System/Router/Utils/findCurrentRoute")

jest.mock("Apps/Artist/Components/ArtistMeta/ArtistMeta", () => ({
  ArtistMetaFragmentContainer: () => null,
}))
jest.mock("../Components/ArtistHeader/ArtistHeader", () => ({
  ArtistHeaderFragmentContainer: () => null,
}))
jest.mock("../Components/BackLink.tsx", () => ({
  BackLinkFragmentContainer: () => null,
}))

describe("ArtistApp", () => {
  let mockfindCurrentRoute = findCurrentRoute as jest.Mock

  const { getWrapper } = setupTestWrapper<ArtistApp_Test_Query>({
    Component: ArtistAppFragmentContainer,
    query: graphql`
      query ArtistApp_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistApp_artist
        }
      }
    `,
  })

  describe("for default routes", () => {
    it("renders correct components", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))

      const wrapper = getWrapper(
        {
          Artist: () => ({
            statuses: {
              auctionLots: true,
              artworks: true,
            },
          }),
        },
        { match: { params: { artworkId: undefined } } }
      )

      expect(wrapper.find("ArtistMetaFragmentContainer").length).toBe(1)
      expect(wrapper.find("ArtistHeaderFragmentContainer").length).toBe(1)
      expect(wrapper.find("RouteTabs").length).toBe(1)
      expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Artworks")
      expect(wrapper.find("RouteTab").at(2).text()).toBe("Auction Results")
    })

    it("tabs navigate to the correct urls", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper(
        {
          Artist: () => ({
            slug: "artist-slug",
            statuses: {
              auctionLots: true,
              artworks: true,
            },
          }),
        },
        { match: { params: { artworkId: undefined } } }
      )
      expect(wrapper.find("RouteTab").at(0).html()).toContain(
        'href="/artist/artist-slug"'
      )
      expect(wrapper.find("RouteTab").at(1).html()).toContain(
        'href="/artist/artist-slug/works-for-sale"'
      )
      expect(wrapper.find("RouteTab").at(2).html()).toContain(
        'href="/artist/artist-slug/auction-results"'
      )
    })

    describe("hiding main tabs", () => {
      it("hides tabs overview tab when appropriate", () => {
        mockfindCurrentRoute.mockImplementation(() => ({}))
        const wrapper = getWrapper(
          {
            Artist: () => ({
              biographyBlurb: null,
              related: null,
              insights: null,
              statuses: {
                articles: false,
                cv: false,
                shows: false,
                auctionLots: true,
                artworks: true,
              },
            }),
          },
          { match: { params: { artworkId: undefined } } }
        )
        expect(wrapper.find("RouteTab").at(0).text()).toBe("Artworks")
        expect(wrapper.find("RouteTab").at(1).text()).toBe("Auction Results")
      })

      it("hides works-for-sale tab when appropriate", () => {
        mockfindCurrentRoute.mockImplementation(() => ({}))
        const wrapper = getWrapper(
          {
            Artist: () => ({
              statuses: {
                artworks: false,
                auctionLots: true,
              },
            }),
          },
          { match: { params: { artworkId: undefined } } }
        )
        expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
        expect(wrapper.find("RouteTab").at(1).text()).toBe("Auction Results")
      })

      it("hides auction results tab when appropriate", () => {
        mockfindCurrentRoute.mockImplementation(() => ({}))
        const wrapper = getWrapper(
          {
            Artist: () => ({
              statuses: {
                auctionLots: false,
                artworks: true,
              },
            }),
          },
          { match: { params: { artworkId: undefined } } }
        )
        expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
        expect(wrapper.find("RouteTab").at(1).text()).toBe("Artworks")
      })
    })

    it("renders the correct for sale artwork tab count", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper(
        {
          Artist: () => ({
            counts: {
              forSaleArtworks: 20,
            },
            statuses: {
              artworks: true,
            },
          }),
        },
        { match: { params: { artworkId: undefined } } }
      )
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Works for Sale (20)")
    })

    it("does not render auction results tab when no auction results are available", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper(
        {
          Artist: () => ({
            statuses: {
              auctionLots: false,
              artworks: true,
            },
            counts: {
              forSaleArtworks: 20,
            },
          }),
        },
        { match: { params: { artworkId: undefined } } }
      )

      expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Works for Sale (20)")
      expect(wrapper.find("RouteTab").length).toBe(2)
    })

    it("renders auction results tab when auction results are available", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper(
        {
          Artist: () => ({
            statuses: {
              artworks: true,
              auctionLots: true,
            },
            counts: {
              forSaleArtworks: 20,
            },
          }),
        },
        { match: { params: { artworkId: undefined } } }
      )

      expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Works for Sale (20)")
      expect(wrapper.find("RouteTab").at(2).text()).toBe("Auction Results")
    })
  })

  describe("for `hideNavigationTabs` routes", () => {
    it("renders correct components", () => {
      mockfindCurrentRoute.mockImplementation(() => ({
        hideNavigationTabs: true,
      }))
      const wrapper = getWrapper(
        {},
        { match: { params: { artworkId: undefined } } }
      )
      expect(wrapper.find("ArtistMetaFragmentContainer").length).toBe(1)
      expect(wrapper.find("ArtistHeaderFragmentContainer").length).toBe(0)
      expect(wrapper.find("RouteTabs").length).toBe(0)
      expect(wrapper.find("BackLinkFragmentContainer").length).toBe(1)
    })
  })
})
