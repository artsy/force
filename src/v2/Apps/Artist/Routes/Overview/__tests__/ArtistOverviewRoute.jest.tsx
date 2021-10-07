import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistOverviewRouteFragmentContainer } from "../ArtistOverviewRoute"
import { ArtistOverviewRoute_Test_Query } from "v2/__generated__/ArtistOverviewRoute_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("react-head", () => ({
  Title: () => null,
}))
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistIconicCollectionsRail",
  () => ({
    ArtistIconicCollectionsRailQueryRenderer: () => null,
  })
)
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistNotableWorksRail",
  () => ({
    ArtistNotableWorksRailFragmentContainer: () => null,
  })
)
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistWorksForSaleRail",
  () => ({
    ArtistWorksForSaleRailFragmentContainer: () => null,
  })
)
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistCurrentShowsRail",
  () => ({
    ArtistCurrentShowsRailFragmentContainer: () => null,
  })
)
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail",
  () => ({
    ArtistCurrentArticlesRailFragmentContainer: () => null,
  })
)
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistCareerHighlights",
  () => ({
    ArtistCareerHighlightsFragmentContainer: () => null,
  })
)
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistRelatedArtistsRail",
  () => ({
    ArtistRelatedArtistsRailFragmentContainer: () => null,
  })
)

describe("ArtistOverviewRoute", () => {
  const { getWrapper } = setupTestWrapper<ArtistOverviewRoute_Test_Query>({
    Component: ArtistOverviewRouteFragmentContainer,
    query: graphql`
      query ArtistOverviewRoute_Test_Query {
        artist(id: "test") {
          ...ArtistOverviewRoute_artist
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ArtistNotableWorksRailFragmentContainer").length).toBe(
      1
    )
    expect(wrapper.find("ArtistCareerHighlightsFragmentContainer").length).toBe(
      1
    )
    expect(
      wrapper.find("ArtistIconicCollectionsRailQueryRenderer").length
    ).toBe(1)
    expect(wrapper.find("ArtistWorksForSaleRailFragmentContainer").length).toBe(
      1
    )
    expect(wrapper.find("ArtistCurrentShowsRailFragmentContainer").length).toBe(
      1
    )
    expect(
      wrapper.find("ArtistCurrentArticlesRailFragmentContainer").length
    ).toBe(1)
    expect(
      wrapper.find("ArtistRelatedArtistsRailFragmentContainer").length
    ).toBe(1)
  })
})
