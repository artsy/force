import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistOverviewRouteFragmentContainer } from "Apps/Artist/Routes/Overview/ArtistOverviewRoute"
import { ArtistOverviewRoute_Test_Query } from "__generated__/ArtistOverviewRoute_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("react-head", () => ({
  Title: () => null,
}))
jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistCareerHighlights",
  () => ({
    ArtistCareerHighlightsQueryRenderer: () => null,
  })
)
jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistIconicCollectionsRail",
  () => ({
    ArtistIconicCollectionsRailQueryRenderer: () => null,
  })
)
jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistWorksForSaleRail",
  () => ({
    ArtistWorksForSaleRailQueryRenderer: () => null,
  })
)
jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistCurrentShowsRail",
  () => ({
    ArtistCurrentShowsRailQueryRenderer: () => null,
  })
)
jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail",
  () => ({
    ArtistCurrentArticlesRailQueryRenderer: () => null,
  })
)

jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistRelatedArtistsRail",
  () => ({
    ArtistRelatedArtistsRailQueryRenderer: () => null,
  })
)

describe("ArtistOverviewRoute", () => {
  const { getWrapper } = setupTestWrapper<ArtistOverviewRoute_Test_Query>({
    Component: ArtistOverviewRouteFragmentContainer,
    query: graphql`
      query ArtistOverviewRoute_Test_Query @relay_test_operation {
        artist(id: "test") {
          ...ArtistOverviewRoute_artist
        }
      }
    `,
  })

  // FIXME: SWC_COMPILER_MIGRATION
  it.skip("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ArtistCareerHighlightsQueryRenderer").length).toBe(1)
    expect(
      wrapper.find("ArtistIconicCollectionsRailQueryRenderer").length
    ).toBe(1)
    expect(wrapper.find("ArtistWorksForSaleRailQueryRenderer").length).toBe(1)
    expect(wrapper.find("ArtistCurrentShowsRailQueryRenderer").length).toBe(1)
    expect(wrapper.find("ArtistCurrentArticlesRailQueryRenderer").length).toBe(
      1
    )
    expect(wrapper.find("ArtistRelatedArtistsRailQueryRenderer").length).toBe(1)
  })
})
