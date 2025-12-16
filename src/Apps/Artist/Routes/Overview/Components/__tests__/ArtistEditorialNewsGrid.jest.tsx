import { screen, fireEvent } from "@testing-library/react"
import { ArtistEditorialNewsGridFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsGrid"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistEditorialNewsGridTestQuery } from "__generated__/ArtistEditorialNewsGridTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "example-artist-id",
    contextPageOwnerSlug: "example-artist-slug",
    contextPageOwnerType: "artist",
  })),
}))

const { renderWithRelay } =
  setupTestWrapperTL<ArtistEditorialNewsGridTestQuery>({
    Component: ArtistEditorialNewsGridFragmentContainer,
    query: graphql`
      query ArtistEditorialNewsGridTestQuery @relay_test_operation {
        artist(id: "test-artist") {
          ...ArtistEditorialNewsGrid_artist
        }
      }
    `,
  })

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("ArtistEditorialNewsGrid", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Test Artist",
        articlesConnection: {
          edges: [
            {
              node: {
                href: "/article/test-article",
                title: "Test Article",
                publishedAt: "Jun 1, 2023",
              },
            },
          ],
        },
      }),
    })

    expect(
      screen.getByText("Artsy Editorial Featuring Test Artist"),
    ).toBeInTheDocument()
    expect(screen.getByText("View All")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /test article/i })).toHaveAttribute(
      "href",
      "/article/test-article",
    )
  })

  describe("tracking", () => {
    it("tracks large article clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_id: "example-artist-id",
        context_page_owner_slug: "example-artist-slug",
        context_page_owner_type: "artist",
        destination_page_owner_type: "article",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      renderWithRelay()

      fireEvent.click(screen.getAllByRole("link")[0])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_id: "example-artist-id",
        context_page_owner_slug: "example-artist-slug",
        context_page_owner_type: "artist",
        destination_page_owner_type: "articles",
        type: "viewAll",
      })
    })

    it("tracks small article thumbnail clicks", () => {
      renderWithRelay({
        Artist: () => ({
          articlesConnection: {
            edges: [
              {
                node: {
                  href: "/article/first-article",
                  title: "First Article",
                },
              },
              {
                node: {
                  href: "/article/second-article",
                  title: "Second Article",
                },
              },
            ],
          },
        }),
      })

      // Click on the second article (first is the large one, second is a small thumbnail)
      const articleLinks = screen.getAllByRole("link")
      // Index 0 is "View All", Index 1 is the large article, Index 2 is the first small thumbnail
      fireEvent.click(articleLinks[2])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_id: "example-artist-id",
        context_page_owner_slug: "example-artist-slug",
        context_page_owner_type: "artist",
        destination_page_owner_type: "article",
        type: "thumbnail",
      })
    })
  })
})
