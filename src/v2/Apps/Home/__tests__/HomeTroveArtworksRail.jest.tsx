import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeTroveArtworksRailFragmentContainer } from "../Components/HomeTroveArtworksRail"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: HomeTroveArtworksRailFragmentContainer,
  query: graphql`
    query HomeTroveArtworksRail_Test_Query @relay_test_operation {
      viewer {
        ...HomeTroveArtworksRail_viewer
      }
    }
  `,
})

describe("HomeTroveArtworksRail", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        artworksConnection: {
          edges: [
            {
              node: {
                title: "Test Artwork",
                href: "test-href",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Test Artwork")
    expect(wrapper.html()).toContain("test-href")
  }),
    it("tracks artwork click", () => {
      const wrapper = getWrapper({
        Viewer: () => ({
          artworksConnection: {
            edges: [
              {
                node: {
                  title: "Test Artwork",
                  href: "test-href",
                },
              },
            ],
          },
        }),
      })

      wrapper.find("Shelf").find("RouterLink").first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "troveArtworksRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-6>",
        destination_page_owner_slug: "<Artwork-mock-id-7>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    }),
    it("tracks view all", () => {
      const wrapper = getWrapper()

      wrapper.find("RouterLink").first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "troveArtworksRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "60a6b70fa7025f0012fdf5df",
        destination_page_owner_slug: "trove",
        destination_page_owner_type: "gene",
        type: "viewAll",
      })
    })
})
