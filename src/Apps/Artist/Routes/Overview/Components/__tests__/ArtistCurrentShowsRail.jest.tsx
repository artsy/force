import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistCurrentShowsRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentShowsRail"
import { ArtistCurrentShowsRail_Test_Query } from "__generated__/ArtistCurrentShowsRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtistCurrentShowsRail", () => {
  const { getWrapper } = setupTestWrapper<ArtistCurrentShowsRail_Test_Query>({
    Component: ArtistCurrentShowsRailFragmentContainer,
    query: graphql`
      query ArtistCurrentShowsRail_Test_Query @relay_test_operation {
        artist(id: "test") {
          ...ArtistCurrentShowsRail_artist
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

  it("does not render rail if no shows", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        showsConnection: { edges: null },
      }),
    })
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        href: "/artist/artistSlug/shows",
      }),
    })

    expect(wrapper.text()).toContain("Shows Featuring artistName")
    expect(wrapper.find("RouterLink").length).toBe(3)
    expect(wrapper.find("RouterLink").at(0).props().to).toContain(
      "/artist/artistSlug/shows"
    )
    expect(wrapper.text()).toContain("View All Shows")
    expect(wrapper.find("Shelf").length).toBe(1)
    expect(wrapper.find("Image").length).toBe(1)
    expect(wrapper.text()).toContain("name")
    expect(wrapper.text()).toContain("exhibitionPeriod")
  })

  it("tracks to shows route", () => {
    const { wrapper } = getWrapper()
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "clickedArtistGroup",
        context_module: "currentShowsRail",
        destination_page_owner_type: "artist",
        type: "viewAll",
      })
    )
  })

  it("tracks show click", () => {
    const { wrapper } = getWrapper({
      Artist: () => ({
        internalId: "artistID",
        slug: "artistSlug",
        href: "/artist/artistSlug/shows",
      }),

      Show: () => ({
        internalID: "showID",
        slug: "showSlug",
        href: "/show/showSlug",
      }),
    })

    wrapper.find("RouterLink").last().simulate("click")

    expect(trackingSpy).toHaveBeenCalledWith({
      action_type: "Click",
      contextModule: "currentShowsRail",
      destinationPageOwnerId: "showID",
      destinationPageOwnerSlug: "showSlug",
      destinationPageOwnerType: "show",
      destination_path: "/show/showSlug",
      horizontalSlidePosition: 1,
      subject: "showCarouselSlide",
      type: "thumbnail",
    })
  })
})
