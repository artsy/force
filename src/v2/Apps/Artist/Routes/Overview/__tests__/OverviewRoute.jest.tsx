import { Button, Text } from "@artsy/palette"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "../Components/ArtistRecommendations"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "v2/Apps/Artist/Components/ArtistTopWorksRail/ArtistTopWorksRail"
import { FeaturedArticlesItem, OverviewRouteFragmentContainer } from "../index"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Analytics/useTracking")
jest.mock("v2/Components/Artwork/FillwidthItem", () => () => {
  const FillwidthItem = () => <div />
  return <FillwidthItem />
})
jest.mock("v2/Components/SelectedCareerAchievements", () => {
  return { SelectedCareerAchievementsFragmentContainer: () => <div /> }
})
jest.mock("v2/Apps/Artist/Components/ArtistCollectionsRail/index", () => {
  return { ArtistCollectionsRailContent: () => <div /> }
})
jest.mock("v2/Apps/Artist/Routes/Overview/Components/WorksForSaleRail", () => {
  return { WorksForSaleRailQueryRenderer: () => <div /> }
})
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistRecommendations",
  () => {
    return { ArtistRecommendationsQueryRenderer: () => <div /> }
  }
)

describe("OverviewRoute", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot>
          <OverviewRouteFragmentContainer artist={props.artist} />
        </MockBoot>
      )
    },
    query: graphql`
      query OverviewRoute_Test_Query($artistID: String!) {
        artist(id: $artistID) {
          ...Overview_artist
        }
      }
    `,
    variables: {
      artistID: "banksy",
    },
  })

  describe("Content", () => {
    it("Displays articles and shows", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          name: "Juan Gris",
        }),
      })

      expect(
        wrapper
          .find(Text)
          .filterWhere(t => t.text() === "Articles Featuring Juan Gris")
      ).toHaveLength(1)

      expect(wrapper.find(FeaturedArticlesItem).length).toEqual(1)

      expect(
        wrapper
          .find(Text)
          .filterWhere(t => t.text() === "Shows Featuring Juan Gris")
      ).toHaveLength(1)
    })

    it("Includes a link to the /cv page", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          slug: "juan-gris",
        }),
      })

      const CVButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all past shows and fair booths")
      expect(CVButton.length).toEqual(1)
      expect(CVButton.first().prop("to")).toEqual("/artist/juan-gris/cv")

      CVButton.first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        destination_path: "/artist/juan-gris/cv",
        subject: "See all past shows and fair booths",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    it("doesn't include a link to the /cv page if there is no cv", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          statuses: {
            cv: false,
          },
        }),
      })

      const CVButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all past shows and fair booths")
      expect(CVButton.length).toEqual(0)
    })

    it("Includes a link to the /shows page", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          slug: "juan-gris",
        }),
      })

      const ShowsButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all current and upcoming shows")
      expect(ShowsButton.length).toEqual(1)
      expect(ShowsButton.prop("to")).toEqual("/artist/juan-gris/shows")

      ShowsButton.simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        destination_path: "/artist/juan-gris/shows",
        subject: "See all current and upcoming shows",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    it("Includes a link to the /articles page", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          slug: "juan-gris",
        }),
      })

      const ArticlesButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all articles")
      expect(ArticlesButton.length).toEqual(1)
      expect(ArticlesButton.prop("to")).toEqual("/artist/juan-gris/articles")

      ArticlesButton.simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        destination_path: "/artist/juan-gris/articles",
        subject: "See all articles",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    it("displays a different button label if the artist has no for sale works", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          counts: {
            forSaleArtworks: 0,
          },
        }),
      })

      expect(
        wrapper.find(Button).filterWhere(t => t.text() === "Browse all works")
          .length
      ).toEqual(1)
    })

    it("Takes you to the /works-for-sale page if you click the big button", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          counts: {
            forSaleArtworks: 5,
          },
          slug: "juan-gris",
        }),
      })

      const browseButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "Browse all works for sale (5)")
      expect(browseButton.length).toEqual(1)
      expect(browseButton.prop("to")).toEqual(
        "/artist/juan-gris/works-for-sale"
      )
    })

    it("does not display a big button if the artist has no works", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          counts: {
            forSaleArtworks: 5,
          },
          statuses: {
            artworks: false,
          },
        }),
      })

      expect(
        wrapper
          .find(Button)
          .filterWhere(t => t.text().includes("Browse all works for sale (5)"))
          .length
      ).toEqual(0)
    })

    it("does not display the articles section if the artist has no articles", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          articlesConnection: null,
          name: "Juan Gris",
        }),
      })

      expect(wrapper.text()).not.toContain("Articles Featuring Juan Gris")
    })

    it("does not display the articles section if the artist zero articles edges", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          articlesConnection: {
            edges: [],
          },
          name: "Juan Gris",
        }),
      })

      expect(wrapper.text()).not.toContain("Articles Featuring Juan Gris")
    })

    it("does not display the shows section if the artist has no shows", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          name: "Juan Gris",
          showsConnection: null,
        }),
      })

      expect(wrapper.text()).not.toContain("Shows Featuring Juan Gris")
    })

    it("does not display the shows section if the artist zero shows edges", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          name: "Juan Gris",
          showsConnection: {
            edges: [],
          },
        }),
      })

      expect(wrapper.text()).not.toContain("Shows Featuring Juan Gris")
    })
  })

  describe("ConsignButton", () => {
    it("shows a default consign button", () => {
      const wrapper = getWrapper()
      expect(wrapper.find("ArtistConsignButton").length).toEqual(1)
    })
  })

  describe("Artist Recommendations", () => {
    it("Does not display recommendations if related.artistsConnection is empty", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          related: {
            artistsConnection: null,
          },
        }),
      })

      expect(wrapper.find(ArtistRecommendations).length).toEqual(0)
    })

    it("Does not display recommendations if related.artistsConnection.edges.length === 0", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          related: {
            artistsConnection: {
              edges: [],
            },
          },
        }),
      })

      expect(wrapper.find(ArtistRecommendations).length).toEqual(0)
    })

    it("Displays recommendations if there are related artists", () => {
      const wrapper = getWrapper()

      expect(wrapper.find(ArtistRecommendations).length).toEqual(1)
    })
  })

  describe("Artist Notable Works Rail", () => {
    it("Displays Notable Works rail", () => {
      const wrapper = getWrapper()

      expect(wrapper.find(ArtistTopWorksRail).length).toEqual(1)
    })
  })

  it("Takes you to the /works-for-sale page if you click 'View All Works'", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        slug: "juan-gris",
      }),
    })

    const viewAllWorksButton = wrapper
      .find("[data-test='link-to-works-for-sale']")
      .first()

    expect(viewAllWorksButton.length).toEqual(1)
    expect(viewAllWorksButton.prop("to")).toEqual(
      "/artist/juan-gris/works-for-sale"
    )
  })
})
