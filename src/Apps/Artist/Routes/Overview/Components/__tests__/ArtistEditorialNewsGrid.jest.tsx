import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistEditorialNewsGridFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsGrid"
import { ArtistEditorialNewsGrid_Test_Query } from "__generated__/ArtistEditorialNewsGrid_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<ArtistEditorialNewsGrid_Test_Query>({
  Component: ArtistEditorialNewsGridFragmentContainer,
  query: graphql`
    query ArtistEditorialNewsGrid_Test_Query @relay_test_operation {
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
    const { wrapper } = getWrapper({
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

    expect(wrapper.text()).toContain("Artsy Editorial Featuring Test Artist")
    expect(wrapper.text()).toContain("View All")
    expect(wrapper.html()).toContain("/article/test-article")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      const { wrapper } = getWrapper({
        Artist: () => ({
          internalID: "example-artist-id",
          slug: "example-artist-slug",
        }),
      })

      wrapper.find("RouterLink").last().simulate("click")

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
      const { wrapper } = getWrapper()

      wrapper.find("RouterLink").first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_type: "artist",
        destination_page_owner_type: "articles",
        type: "viewAll",
      })
    })
  })
})
