import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistNotableWorksRailFragmentContainer } from "../ArtistNotableWorksRail"
import { ArtistNotableWorksRail_Test_Query } from "v2/__generated__/ArtistNotableWorksRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtistNotableWorksRail", () => {
  const { getWrapper } = setupTestWrapper<ArtistNotableWorksRail_Test_Query>({
    Component: ArtistNotableWorksRailFragmentContainer,
    query: graphql`
      query ArtistNotableWorksRail_Test_Query @relay_test_operation {
        artist(id: "test") {
          ...ArtistNotableWorksRail_artist
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
    const wrapper = getWrapper({
      Artist: () => ({
        filterArtworksConnection: { edges: null },
      }),
    })
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
      }),
    })
    expect(wrapper.text()).toContain("Notable Works")
    expect(wrapper.find("RouterLink").length).toBe(4)
    expect(wrapper.find("RouterLink").at(0).props().to).toContain(
      "/artist/artistSlug/works-for-sale"
    )
    expect(wrapper.text()).toContain("View All Works")
    expect(wrapper.find("Shelf").length).toBe(1)
    expect(wrapper.find("Image").length).toBe(2)
    expect(wrapper.text()).toContain("title")
    expect(wrapper.text()).toContain("date")
  })

  it("tracks to works route", () => {
    const wrapper = getWrapper()
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtistGroup",
        context_module: "topWorksRail",
        destination_page_owner_id: "<Artist-mock-id-2>",
        destination_page_owner_slug: "<Artist-mock-id-1>",
        destination_page_owner_type: "artist",
        type: "viewAll",
      })
    )
  })

  it("tracks work click", () => {
    const wrapper = getWrapper()
    wrapper.find("RouterLink").at(2).simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtworkGroup",
        context_module: "topWorksRail",
        destination_page_owner_id: "<Artwork-mock-id-3>",
        destination_page_owner_slug: "<Artwork-mock-id-4>",
        destination_page_owner_type: "artwork",
        horizontal_slide_position: 1,
        type: "thumbnail",
      })
    )
  })
})
