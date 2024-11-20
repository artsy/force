import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistArticlesRouteFragmentContainer } from "Apps/Artist/Routes/Articles/ArtistArticlesRoute"
import { ArtistArticlesRoute_Test_Query } from "__generated__/ArtistArticlesRoute_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("Components/Pagination", () => ({
  PaginationFragmentContainer: () => null,
}))

describe("ArtistArticlesRoute", () => {
  const { getWrapper } = setupTestWrapper<ArtistArticlesRoute_Test_Query>({
    Component: ArtistArticlesRouteFragmentContainer,
    query: graphql`
      query ArtistArticlesRoute_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistArticlesRoute_artist
        }
      }
    `,
  })

  it("render a zero state if no articles", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        articlesConnection: { edges: null },
      }),
    })
    expect(wrapper.html()).toContain("There aren’t any articles at this time.")
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        name: "Example Artist",
      }),
      Article: () => ({
        thumbnailTitle: "Example Article",
      }),
    })

    const text = wrapper.text()
    expect(text).toContain("Example Artist Articles")
    expect(text).toContain("Example Article")
    expect(wrapper.find("PaginationFragmentContainer").length).toBe(1)
  })
})
