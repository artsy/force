import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistAppFragmentContainer } from "../ArtistApp"
import { ArtistApp_Test_Query } from "v2/__generated__/ArtistApp_Test_Query.graphql"
import { findCurrentRoute } from "v2/System/Router/Utils/findCurrentRoute"

jest.unmock("react-relay")
jest.mock("v2/System/Router/Utils/findCurrentRoute")

jest.mock("../Components/ArtistMeta", () => ({
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

  afterEach(() => {
    jest.resetAllMocks()
  })

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
      const wrapper = getWrapper({
        Artist: () => ({
          statuses: {
            auctionLots: true,
            artworks: true,
          },
        }),
      })
      expect(wrapper.find("ArtistMetaFragmentContainer").length).toBe(1)
      expect(wrapper.find("ArtistHeaderFragmentContainer").length).toBe(1)
      expect(wrapper.find("RouteTabs").length).toBe(1)
      expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Artworks")
      expect(wrapper.find("RouteTab").at(2).text()).toBe("Auction Resultss")
    })

    it("tabs navigate to the correct urls", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper({
        Artist: () => ({
          slug: "artist-slug",
          statuses: {
            auctionLots: true,
            artworks: true,
          },
        }),
      })
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
        const wrapper = getWrapper({
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
        })
        expect(wrapper.find("RouteTab").at(0).text()).toBe("Artworks")
        expect(wrapper.find("RouteTab").at(1).text()).toBe("Auction Results")
      })

      it("hides works-for-sale tab when appropriate", () => {
        mockfindCurrentRoute.mockImplementation(() => ({}))
        const wrapper = getWrapper({
          Artist: () => ({
            statuses: {
              artworks: false,
              auctionLots: true,
            },
          }),
        })
        expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
        expect(wrapper.find("RouteTab").at(1).text()).toBe("Auction Results")
      })

      it("hides auction results tab when appropriate", () => {
        mockfindCurrentRoute.mockImplementation(() => ({}))
        const wrapper = getWrapper({
          Artist: () => ({
            statuses: {
              auctionLots: false,
              artworks: true,
            },
          }),
        })
        expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
        expect(wrapper.find("RouteTab").at(1).text()).toBe("Artworks")
      })
    })

    it("renders the correct for sale artwork tab count", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper({
        Artist: () => ({
          counts: {
            forSaleArtworks: 20,
          },
          statuses: {
            artworks: true,
          },
        }),
      })
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Works for Sale (20)")
    })

    it("does not render auction results tab when no auction results are available", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper({
        Artist: () => ({
          statuses: {
            auctionLots: false,
            artworks: true,
          },
          counts: {
            forSaleArtworks: 20,
          },
        }),
      })

      expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Works for Sale (20)")
      expect(wrapper.find("RouteTab").length).toBe(2)
    })

    it("renders auction results tab when auction results are available", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const wrapper = getWrapper({
        Artist: () => ({
          statuses: {
            artworks: true,
            auctionLots: true,
          },
          counts: {
            forSaleArtworks: 20,
          },
        }),
      })

      expect(wrapper.find("RouteTab").at(0).text()).toBe("Overview")
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Works for Sale (20)")
      expect(wrapper.find("RouteTab").at(2).text()).toBe("Auction Results")
    })
  })

  describe("for `displayFullPage` routes", () => {
    it("renders correct components", () => {
      mockfindCurrentRoute.mockImplementation(() => ({
        displayFullPage: true,
      }))
      const wrapper = getWrapper()
      expect(wrapper.find("ArtistMetaFragmentContainer").length).toBe(1)
      expect(wrapper.find("ArtistHeaderFragmentContainer").length).toBe(0)
      expect(wrapper.find("RouteTabs").length).toBe(0)
    })
  })

  describe("for `hideNavigationTabs` routes", () => {
    it("renders correct components", () => {
      mockfindCurrentRoute.mockImplementation(() => ({
        hideNavigationTabs: true,
      }))
      const wrapper = getWrapper()
      expect(wrapper.find("ArtistMetaFragmentContainer").length).toBe(1)
      expect(wrapper.find("ArtistHeaderFragmentContainer").length).toBe(0)
      expect(wrapper.find("RouteTabs").length).toBe(0)
      expect(wrapper.find("BackLinkFragmentContainer").length).toBe(1)
    })
  })
})
