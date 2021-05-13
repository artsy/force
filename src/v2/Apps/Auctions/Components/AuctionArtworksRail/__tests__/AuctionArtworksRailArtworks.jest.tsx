import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionArtworksRailArtworksFragmentContainer } from "../AuctionArtworksRailArtworks"
import { useTracking as baseUseTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("AuctionArtworksRailArtworks", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <AuctionArtworksRailArtworksFragmentContainer
          sale={props.sale}
          tabType="current"
        />
      )
    },
    query: graphql`
      query AuctionArtworksRailArtworks_Test_Query {
        sale(id: "xxx") {
          ...AuctionArtworksRailArtworks_sale
        }
      }
    `,
  })

  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

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

  it("renders correct components and data", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        internalID: "testID123",
        slug: "test-auction",
      }),
      Artwork: () => ({
        image: {
          url: "xxx",
          aspectRatio: 1,
        },
      }),
    })

    expect(wrapper.find("Shelf")).toBeDefined()
    expect(wrapper.find("FillwidthItem")).toBeDefined()
  })

  it("guards against null data", () => {
    expect(() =>
      getWrapper({
        ArtworkConnection: () => ({
          edges: null,
        }),
      })
    ).not.toThrowError()
  })

  it("returns no artworks if there are no published artworks to return", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        internalID: "testID123",
        slug: "test-auction",
      }),
      ArtworkConnection: () => ({
        edges: [],
      }),
    })

    expect(wrapper.find("Carousel")).toHaveLength(0)
  })

  it("tracks clicks", () => {
    const wrapper = getWrapper()
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "currentAuctions",
      destination_page_owner_id: '<mock-value-for-field-"internalID">',
      destination_page_owner_slug: '<mock-value-for-field-"slug">',
      destination_page_owner_type: "artwork",
      horizontal_slide_position: 0,
      type: "thumbnail",
    })
  })
})
