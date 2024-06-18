import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistAppFragmentContainer } from "Apps/Artist/ArtistApp"
import { ArtistApp_Test_Query } from "__generated__/ArtistApp_Test_Query.graphql"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"

jest.unmock("react-relay")

jest.mock("System/Router/Utils/routeUtils")

jest.mock("Apps/Artist/Components/ArtistMeta/ArtistMeta", () => ({
  ArtistMetaFragmentContainer: () => null,
}))

jest.mock("../Components/ArtistHeader/ArtistHeader", () => ({
  ArtistHeaderFragmentContainer: () => null,
}))

jest.mock("../Components/ArtistBackLink.tsx", () => ({
  ArtistBackLinkFragmentContainer: () => null,
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

      const { wrapper } = getWrapper(
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
      expect(wrapper.find("RouteTab").at(0).text()).toBe("Artworks")
      expect(wrapper.find("RouteTab").at(1).text()).toBe("Auction Results")
      expect(wrapper.find("RouteTab").at(2).text()).toBe("About")
    })

    it("tabs navigate to the correct urls", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      const { wrapper } = getWrapper(
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
        'href="/artist/artist-slug/auction-results"'
      )
      expect(wrapper.find("RouteTab").at(2).html()).toContain(
        'href="/artist/artist-slug/about"'
      )
    })
  })
})
