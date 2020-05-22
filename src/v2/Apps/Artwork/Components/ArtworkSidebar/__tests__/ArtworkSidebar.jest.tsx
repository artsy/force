import { ArtworkSidebar_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebar_Test_Query.graphql"
import { ArtworkSidebarFixture } from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar"
import { ArtworkSidebarFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar"
import { ArtworkSidebarArtists } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarMetadata } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebar", () => {
  const getWrapper = async (
    response: ArtworkSidebar_Test_QueryRawResponse["artwork"] = ArtworkSidebarFixture
  ) => {
    return await renderRelayTree({
      Component: ArtworkSidebarFragmentContainer,
      query: graphql`
        query ArtworkSidebar_Test_Query @raw_response_type {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebar_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebar_Test_QueryRawResponse,
    })
  }

  let wrapper

  beforeAll(async () => {
    wrapper = await getWrapper()
  })

  it("renders ArtworkSidebarArtists component", () => {
    expect(wrapper.find(ArtworkSidebarArtists).length).toBe(1)
  })
  it("renders Metadata component", () => {
    expect(wrapper.find(ArtworkSidebarMetadata).length).toBe(1)
  })
})
