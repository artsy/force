import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { useTracking as baseUseTracking } from "react-tracking"
import { WorksByArtistsYouFollowRailFragmentContainer } from "../WorksByArtistsYouFollowRail"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("WorksByArtistsYouFollowRail", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <WorksByArtistsYouFollowRailFragmentContainer viewer={props.viewer} />
      )
    },
    query: graphql`
      query WorksByArtistsYouFollowRail_Test_Query {
        viewer {
          ...WorksByArtistsYouFollowRail_viewer
        }
      }
    `,
  })

  beforeEach(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("does not render if no followed artists", () => {
    const wrapper = getWrapper({
      SaleArtworksConnection: () => ({
        edges: [],
      }),
    })

    expect(wrapper.html()).not.toContain("Works by artists you follow")
    expect(wrapper.find("Carousel").length).toBe(0)
    expect(wrapper.find("FillwidthItem").length).toBe(0)
  })

  it("renders the correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain("Works by artists you follow")
    expect(wrapper.find("Carousel")).toBeDefined()
    expect(wrapper.find("FillwidthItem")).toBeDefined()
  })
})
