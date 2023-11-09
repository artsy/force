import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistWorksForSaleRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistWorksForSaleRail"
import { ArtistWorksForSaleRail_Test_Query } from "__generated__/ArtistWorksForSaleRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
}))

describe("ArtistWorksForSaleRail", () => {
  const { getWrapper } = setupTestWrapper<ArtistWorksForSaleRail_Test_Query>({
    Component: ArtistWorksForSaleRailFragmentContainer,
    query: graphql`
      query ArtistWorksForSaleRail_Test_Query @relay_test_operation {
        artist(id: "test") {
          ...ArtistWorksForSaleRail_artist
        }
      }
    `,
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("does not render rail if no works", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        artworksConnection: { edges: null },
      }),
    })
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
      }),
    })
    expect(wrapper.text()).toContain("Works For Sale")
    expect(wrapper.find("RouterLink").length).toBe(3)
    expect(wrapper.find("RouterLink").at(0).props().to).toContain(
      "/artist/artistSlug"
    )
    expect(wrapper.text()).toContain("View All Works")
    expect(wrapper.find("Shelf").length).toBe(1)
    expect(wrapper.find("Image").length).toBe(1)
    expect(wrapper.text()).toContain("title")
    expect(wrapper.text()).toContain("date")
  })

  it("tracks to works route", () => {
    const { wrapper } = getWrapper()
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtistGroup",
        context_module: "worksForSaleRail",
        destination_page_owner_type: "artist",
        type: "viewAll",
      })
    )
  })

  it("tracks work click", () => {
    const { wrapper } = getWrapper()
    wrapper.find("RouterLink").at(2).simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtworkGroup",
        context_module: "worksForSaleRail",
        destination_page_owner_type: "artwork",
        horizontal_slide_position: 1,
        type: "thumbnail",
      })
    )
  })
})
