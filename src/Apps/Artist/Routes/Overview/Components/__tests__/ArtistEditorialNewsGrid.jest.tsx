import { fireEvent, screen } from "@testing-library/react"
import { ArtistEditorialNewsGrid } from "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsGrid"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistEditorialNewsGridTestQuery } from "__generated__/ArtistEditorialNewsGridTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useDidMount: () => true,
}))
jest.mock("react-tracking")
jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => false),
  useVariant: jest.fn(() => ({ enabled: false, name: "disabled" })),
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "example-artist-id",
    contextPageOwnerSlug: "example-artist-slug",
    contextPageOwnerType: "artist",
  })),
}))

const trackEvent = jest.fn()

const { renderWithRelay } =
  setupTestWrapperTL<ArtistEditorialNewsGridTestQuery>({
    Component: props => {
      if (!props.artist) return null

      return <ArtistEditorialNewsGrid artist={props.artist} />
    },
    query: graphql`
      query ArtistEditorialNewsGridTestQuery @relay_test_operation {
        artist(id: "test-artist") {
          ...ArtistEditorialNewsGrid_artist
        }
      }
    `,
  })

const renderArtistEditorialNewsGrid = () => {
  return renderWithRelay()
}

const getArticleLink = () => {
  const links = screen.getAllByRole("link")
  const viewAllLink = screen.getByRole("link", { name: "View All" })
  const articleLink = links.find(link => link !== viewAllLink)

  if (!articleLink) {
    throw new Error("Expected an article link")
  }

  return articleLink
}

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("ArtistEditorialNewsGrid", () => {
  it("renders the editorial grid", () => {
    renderArtistEditorialNewsGrid()

    expect(screen.getByText(/Artsy Editorial Featuring/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "View All" })).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks article clicks", () => {
      renderArtistEditorialNewsGrid()

      fireEvent.click(getArticleLink())

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

    it("tracks view all clicks", () => {
      renderArtistEditorialNewsGrid()

      fireEvent.click(screen.getByRole("link", { name: "View All" }))

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
  })
})
