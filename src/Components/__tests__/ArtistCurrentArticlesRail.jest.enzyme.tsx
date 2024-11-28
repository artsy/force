import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistCurrentArticlesRailFragmentContainer } from "Components/ArtistCurrentArticlesRail"
import { ArtistCurrentArticlesRail_Test_Query } from "__generated__/ArtistCurrentArticlesRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtistCurrentArticlesRail", () => {
  const { getWrapper } = setupTestWrapper<ArtistCurrentArticlesRail_Test_Query>(
    {
      Component: ArtistCurrentArticlesRailFragmentContainer,
      query: graphql`
        query ArtistCurrentArticlesRail_Test_Query @relay_test_operation {
          artist(id: "test") {
            ...ArtistCurrentArticlesRail_artist
          }
        }
      `,
    }
  )

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("does not render rail if no articles", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        articlesConnection: { edges: null },
      }),
    })

    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
      }),
    })

    expect(wrapper.text()).toContain("Articles Featuring artistName")
    expect(wrapper.find("RouterLink").length).toBe(3)
    expect(wrapper.find("RouterLink").at(0).props().to).toContain(
      "/artist/artistSlug/articles"
    )
    expect(wrapper.find("Shelf").length).toBe(1)
    expect(wrapper.find("Image").length).toBe(1)
    expect(wrapper.text()).toContain("thumbnailTitle")
    expect(wrapper.text()).toContain("publishedAt")
  })

  it("tracks to articles route", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        internalID: "test-artist-id",
        slug: "test-artist-slug",
      }),
    })

    wrapper.find("RouterLink").first().simulate("click")

    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtistGroup",
        context_module: "relatedArticles",
        destination_page_owner_id: "test-artist-id",
        destination_page_owner_slug: "test-artist-slug",
        destination_page_owner_type: "artist",
        type: "viewAll",
      })
    )
  })

  it("tracks article click", () => {
    const { wrapper } = getWrapper({
      Article: () => ({
        internalID: "test-article-id",
        slug: "test-article-slug",
        href: "/article/test-article-slug",
      }),
    })

    wrapper.find("RouterLink").last().simulate("click")

    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action_type: "Click",
        contextModule: "relatedArticles",
        destinationPageOwnerId: "test-article-id",
        destinationPageOwnerSlug: "test-article-slug",
        destinationPageOwnerType: "article",
        destination_path: "/article/test-article-slug",
        horizontalSlidePosition: 1,
        subject: "showCarouselSlide",
        type: "thumbnail",
      })
    )
  })
})
