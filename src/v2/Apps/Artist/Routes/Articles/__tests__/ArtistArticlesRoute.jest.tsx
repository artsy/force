import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistArticlesRouteFragmentContainer } from "../ArtistArticlesRoute"
import { ArtistArticlesRoute_Test_Query } from "v2/__generated__/ArtistArticlesRoute_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("react-head", () => ({
  Title: () => null,
}))
jest.mock("v2/Components/Pagination", () => ({
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

  it("does not render rail if no articles", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        articlesConnection: { edges: null },
      }),
    })
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "artistName",
      }),
    })

    const text = wrapper.text()
    expect(text).toContain("artistName Articles")
    expect(text).toContain("publishedAt")
    expect(text).toContain("thumbnailTitle")
    expect(text).toContain("name")
    expect(wrapper.find("PaginationFragmentContainer").length).toBe(1)
  })
})
