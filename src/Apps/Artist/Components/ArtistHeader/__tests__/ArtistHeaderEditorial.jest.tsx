import { screen } from "@testing-library/react"
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
})
