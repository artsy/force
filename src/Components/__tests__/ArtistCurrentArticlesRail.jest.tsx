import { ArtistCurrentArticlesRailFragmentContainer } from "Components/ArtistCurrentArticlesRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistCurrentArticlesRailTestQuery } from "__generated__/ArtistCurrentArticlesRailTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { fireEvent } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtistCurrentArticlesRail", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<ArtistCurrentArticlesRailTestQuery>({
      Component: ArtistCurrentArticlesRailFragmentContainer,
      query: graphql`
        query ArtistCurrentArticlesRailTestQuery @relay_test_operation {
          artist(id: "test") {
            ...ArtistCurrentArticlesRail_artist
          }
        }
      `,
    })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("does not render rail if no articles", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        articlesConnection: { edges: null },
      }),
    })

    expect(container.innerHTML).toBeFalsy()
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
      }),
    })

    expect(container.textContent).toContain("Articles Featuring artistName")

    const links = container.querySelectorAll("a")
    expect(links.length).toBe(3)
    expect(links[0].getAttribute("href")).toContain(
      "/artist/artistSlug/articles",
    )

    const image = container.querySelector("img")
    expect(image).toBeTruthy()

    expect(container.textContent).toContain("thumbnailTitle")
    expect(container.textContent).toContain("publishedAt")
  })

  it("tracks to articles route", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        internalID: "test-artist-id",
        slug: "test-artist-slug",
      }),
    })

    const firstLink = container.querySelector("a")!
    fireEvent.click(firstLink)

    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtistGroup",
        context_module: "relatedArticles",
        destination_page_owner_id: "test-artist-id",
        destination_page_owner_slug: "test-artist-slug",
        destination_page_owner_type: "artist",
        type: "viewAll",
      }),
    )
  })

  it("tracks article click", () => {
    const { container } = renderWithRelay({
      Article: () => ({
        internalID: "test-article-id",
        slug: "test-article-slug",
        href: "/article/test-article-slug",
      }),
    })

    const links = container.querySelectorAll("a")
    const lastLink = links[links.length - 1]
    fireEvent.click(lastLink)

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
      }),
    )
  })
})
