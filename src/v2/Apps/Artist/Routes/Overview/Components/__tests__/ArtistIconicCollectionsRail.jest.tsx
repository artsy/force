import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistIconicCollectionsRailFragmentContainer } from "../ArtistIconicCollectionsRail"
import { ArtistIconicCollectionsRail_Test_Query } from "v2/__generated__/ArtistIconicCollectionsRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("sharify", () => ({
  data: { APP_URL: "https://www.artsy-test.net" },
}))

describe("ArtistIconicCollectionsRail", () => {
  const { getWrapper } = setupTestWrapper<
    ArtistIconicCollectionsRail_Test_Query
  >({
    Component: ArtistIconicCollectionsRailFragmentContainer,
    query: graphql`
      query ArtistIconicCollectionsRail_Test_Query(
        $isFeaturedArtistContent: Boolean
        $size: Int
        $artistID: String
      ) @relay_test_operation {
        marketingCollections(
          isFeaturedArtistContent: $isFeaturedArtistContent
          size: $size
          artistID: $artistID
        ) {
          ...ArtistIconicCollectionsRail_marketingCollections
        }
      }
    `,
    variables: {
      artistID: "test",
      isFeaturedArtistContent: true,
      size: 16,
    },
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("does not render rail if no collections", () => {
    const wrapper = getWrapper({
      MarketingCollection: () => ({
        artworksConnection: { edges: null },
      }),
    })
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Iconic Collections")
    expect(wrapper.find("Shelf").length).toBe(1)
    expect(wrapper.find("RouterLink").length).toBe(1)
    expect(wrapper.find("Image").length).toBe(1)
    expect(wrapper.text()).toContain("From $4")
  })

  it("tracks correctly", () => {
    const wrapper = getWrapper({
      MarketingCollection: () => ({
        slug: "artistSlug",
      }),
    })
    wrapper.find("RouterLink").simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith({
      action_type: "Click",
      context_module: "collectionRail",
      context_page_owner_type: "artist",
      destination_path: "https://www.artsy-test.net/collection/artistSlug",
      type: "thumbnail",
    })
  })
})
