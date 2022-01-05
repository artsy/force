import { ArtworkSidebarFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar"
import { ArtworkSidebarArtists } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarMetadata } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")
jest.mock("../ArtworkSidebarClassification", () => ({
  ArtworkSidebarClassificationFragmentContainer: () => <div />,
}))
jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const { getWrapper } = setupTestWrapper({
  Component: ArtworkSidebarFragmentContainer,
  query: graphql`
    query ArtworkSidebar_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebar_artwork
      }
      me {
        ...ArtworkSidebar_me
      }
    }
  `,
})

describe("ArtworkSidebar", () => {
  it("renders ArtworkSidebarArtists component", () => {
    const wrapper = getWrapper()
    expect(wrapper.find(ArtworkSidebarArtists).length).toBe(1)
  })

  it("renders Metadata component", () => {
    const wrapper = getWrapper()
    expect(wrapper.find(ArtworkSidebarMetadata).length).toBe(1)
  })
})
