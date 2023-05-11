import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistFeaturedWorksRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistFeaturedWorksRail"
import { ArtistFeaturedWorksRail_Test_Query } from "__generated__/ArtistFeaturedWorksRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
}))

describe("ArtistFeaturedWorksRail", () => {
  const { getWrapper } = setupTestWrapper<ArtistFeaturedWorksRail_Test_Query>({
    Component: ArtistFeaturedWorksRailFragmentContainer,
    query: graphql`
      query ArtistFeaturedWorksRail_Test_Query @relay_test_operation {
        artist(id: "test") {
          ...ArtistFeaturedWorksRail_artist
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
    expect(wrapper.text()).toContain("Featured Works")
    expect(wrapper.find("RouterLink").length).toBe(3)
    expect(wrapper.find("RouterLink").first().props().to).toContain(
      "/artist/artistSlug/works-for-sale"
    )
    expect(wrapper.text()).toContain("View All Works")
    expect(wrapper.find("Shelf").length).toBe(1)
    expect(wrapper.find("Image").length).toBe(1)
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
    const wrapper = getWrapper({
      Artist: () => ({
        filterArtworksConnection: {
          edges: [
            {
              node: {
                internalID: "artwork-id-one",
                slug: "artwork-slug-one",
              },
            },
          ],
        },
      }),
    })

    wrapper.find("RouterLink").last().simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtworkGroup",
        context_module: "topWorksRail",
        destination_page_owner_id: "artwork-id-one",
        destination_page_owner_slug: "artwork-slug-one",
        destination_page_owner_type: "artwork",
        horizontal_slide_position: 1,
        type: "thumbnail",
      })
    )
  })
})
