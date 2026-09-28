import { fireEvent, screen } from "@testing-library/react"
import { ArtistHeaderEditorial } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderEditorial"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
    contextPageOwnerSlug: "pablo-picasso",
    contextPageOwnerType: "artist",
  })),
}))

const mockUseTracking = useTracking as jest.Mock
const trackEvent = jest.fn()

beforeAll(() => {
  mockUseTracking.mockImplementation(() => ({ trackEvent }))
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    match: {
      location: {
        query: {},
      },
    },
  }))
})

beforeEach(() => {
  trackEvent.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <ArtistHeaderEditorial artist={props.artist} />
  },
  query: graphql`
    query ArtistHeaderEditorial_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistHeaderEditorial_artist
      }
    }
  `,
})

const article = (index: number) => ({
  node: {
    internalID: `article-${index}`,
    slug: `article-${index}-slug`,
    href: `/article/article-${index}`,
    title: `Article ${index}`,
    byline: "Artsy Editorial",
    publishedAt: "Jan 1, 2026",
    thumbnailImage: null,
  },
})

describe("ArtistHeaderEditorial", () => {
  it("renders nothing when there are no articles", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Pablo Picasso",
        articlesConnection: {
          totalCount: 0,
          edges: [],
        },
      }),
    })

    expect(
      screen.queryByText("Artsy Editorial Featuring Pablo Picasso"),
    ).not.toBeInTheDocument()
  })

  it("renders the heading and articles", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Pablo Picasso",
        articlesConnection: {
          totalCount: 1,
          edges: [article(1)],
        },
      }),
    })

    expect(
      screen.getByText("Artsy Editorial Featuring Pablo Picasso"),
    ).toBeInTheDocument()
    expect(screen.getByText("Article 1")).toBeInTheDocument()
    expect(screen.queryByText("View All")).not.toBeInTheDocument()
  })

  it("renders a View All link when there are more than one article", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Pablo Picasso",
        href: "/artist/pablo-picasso",
        articlesConnection: {
          totalCount: 2,
          edges: [article(1), article(2)],
        },
      }),
    })

    const viewAll = screen.getByText("View All")
    expect(viewAll).toBeInTheDocument()
    expect(viewAll.closest("a")).toHaveAttribute(
      "href",
      "/artist/pablo-picasso/articles",
    )
  })

  it("renders the article thumbnail", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        name: "Pablo Picasso",
        articlesConnection: {
          totalCount: 1,
          edges: [
            {
              node: {
                ...article(1).node,
                thumbnailImage: {
                  small: {
                    src: "https://example.com/thumbnail.jpg",
                    srcSet: "https://example.com/thumbnail.jpg 1x",
                  },
                },
              },
            },
          ],
        },
      }),
    })

    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "https://example.com/thumbnail.jpg",
    )
  })

  it("renders no thumbnail when the article does not have one", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        name: "Pablo Picasso",
        articlesConnection: { totalCount: 1, edges: [article(1)] },
      }),
    })

    expect(screen.getByText("Article 1")).toBeInTheDocument()
    expect(container.querySelector("img")).not.toBeInTheDocument()
  })

  it("removes the thumbnail when it fails to load", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        name: "Pablo Picasso",
        articlesConnection: {
          totalCount: 1,
          edges: [
            {
              node: {
                ...article(1).node,
                thumbnailImage: {
                  small: {
                    src: "https://example.com/missing.jpg",
                    srcSet: "https://example.com/missing.jpg 1x",
                  },
                },
              },
            },
          ],
        },
      }),
    })

    fireEvent.error(container.querySelector("img") as HTMLImageElement)

    expect(screen.getByText("Article 1")).toBeInTheDocument()
    expect(container.querySelector("img")).not.toBeInTheDocument()
  })

  it("tracks a click on an article card", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Pablo Picasso",
        articlesConnection: { totalCount: 1, edges: [article(1)] },
      }),
    })

    fireEvent.click(screen.getByText("Article 1"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArticleGroup",
      context_module: "artistHeader",
      context_page_owner_type: "artist",
      context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
      context_page_owner_slug: "pablo-picasso",
      destination_page_owner_type: "article",
      destination_page_owner_id: "article-1",
      destination_page_owner_slug: "article-1-slug",
      type: "thumbnail",
    })
  })

  it("tracks a click on the View All link", () => {
    renderWithRelay({
      Artist: () => ({
        internalID: "artist-id",
        slug: "pablo-picasso",
        name: "Pablo Picasso",
        href: "/artist/pablo-picasso",
        articlesConnection: {
          totalCount: 2,
          edges: [article(1), article(2)],
        },
      }),
    })

    fireEvent.click(screen.getByText("View All"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArticleGroup",
      context_module: "artistHeader",
      context_page_owner_type: "artist",
      context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
      context_page_owner_slug: "pablo-picasso",
      destination_page_owner_type: "articles",
      destination_page_owner_id: "artist-id",
      destination_page_owner_slug: "pablo-picasso",
      type: "viewAll",
    })
  })
})
