import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { useTracking as baseUseTracking } from "react-tracking"
import { TrendingLotsFragmentContainer } from "../TrendingLots"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("TrendingLots", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <TrendingLotsFragmentContainer viewer={props.viewer} />
    },
    query: graphql`
      query TrendingLots_Test_Query {
        viewer {
          ...TrendingLots_viewer
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
    jest.clearAllMocks()
  })

  it("guards against null data", () => {
    expect(() =>
      getWrapper({
        SaleArtworksConnection: () => ({
          edges: null,
        }),
      })
    ).not.toThrowError()
  })

  it("does not render if no trending lots", () => {
    const wrapper = getWrapper({
      SaleArtworksConnection: () => ({
        edges: [],
      }),
    })

    expect(wrapper.html()).not.toContain("Works with the most bids today")
    expect(wrapper.find("Carousel").length).toBe(0)
    expect(wrapper.find("FillwidthItem").length).toBe(0)
  })

  it("renders the correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain("Works with the most bids today")
    expect(wrapper.find("Carousel")).toBeDefined()
    expect(wrapper.find("FillwidthItem")).toBeDefined()
  })
})
