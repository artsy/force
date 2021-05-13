import { ArtistArtworkFilterRefetchContainer as ArtworkFilter } from "v2/Apps/Artist/Routes/Overview/Components/ArtistArtworkFilter"
import { WorksRouteFragmentContainer } from "v2/Apps/Artist/Routes/Works"
import { MockBoot } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "v2/Apps/Artist/Components/ArtistTopWorksRail/ArtistTopWorksRail"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.mock("v2/Artsy/Analytics/useTracking")
jest.unmock("react-relay")
jest.mock("v2/Components/Pagination/useComputeHref")

jest.mock("v2/Components/Artwork/FillwidthItem", () => () => {
  const FillwidthItem = () => <div />
  return <FillwidthItem />
})

// Mocking the ArtistRecommendations component because it is tested elsewhere
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistRecommendations",
  () => ({
    ArtistRecommendationsQueryRenderer: () => (
      <div>Mock ArtistRecommendations</div>
    ),
  })
)

jest.mock("v2/Apps/Artist/Components/ArtistCollectionsRail", () => ({
  ArtistCollectionsRailContent: () => <div>Mock ArtistCollections</div>,
}))

describe("Works Route", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint="xl">
          <WorksRouteFragmentContainer artist={props.artist} />
        </MockBoot>
      )
    },
    query: graphql`
      query Works_Test_Query($artistID: String!) {
        artist(id: $artistID) {
          ...Works_artist
        }
      }
    `,
    variables: {
      artistID: "pablo-picasso",
    },
  })

  describe("general behavior", () => {
    it("renders correct sections", () => {
      const wrapper = getWrapper()
      expect(wrapper.find(ArtworkFilter).length).toEqual(1)
      expect(wrapper.html()).toContain("Mock ArtistRecommendations")
    })

    it("includes the correct sort options", () => {
      const wrapper = getWrapper()

      const sortOptions = wrapper.find("option").map(el => el.text())

      expect(sortOptions).toEqual([
        "Default",
        "Price (desc.)",
        "Price (asc.)",
        "Recently updated",
        "Recently added",
        "Artwork year (desc.)",
        "Artwork year (asc.)",
      ])
    })
  })

  describe("Artist Recommendations", () => {
    it("Does not display recommendations if related.artists is empty", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          related: {
            artistsConnection: null,
          },
        }),
      })

      expect(wrapper.html()).not.toContain("Mock ArtistRecommendations")
    })

    it("Does not display recommendations if related.artists.edges.length === 0", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          related: {
            artistsConnection: {
              edges: [],
            },
          },
        }),
      })

      expect(wrapper.html()).not.toContain("Mock ArtistRecommendations")
    })
  })

  describe("Artist Notable Works", () => {
    it("Displays Notable Works rail", () => {
      const wrapper = getWrapper()
      expect(wrapper.find(ArtistTopWorksRail).length).toEqual(1)
    })
  })

  describe("Artist Series Rail", () => {
    it("Displays artist series rail if data is present", () => {
      const wrapper = getWrapper()
      expect(wrapper.find("V2ArtistSeriesRail").length).toBe(1)
      expect(wrapper.find("V2ArtistSeriesItem").length).toBe(1)
    })

    it("Displays collections as a fallback if artist series data is not present", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          artistSeriesConnection: null,
        }),
      })

      expect(wrapper.find("V2ArtistSeriesRail").length).toBe(0)
      expect(wrapper.html()).toContain("Mock ArtistCollections")
    })
  })
})
