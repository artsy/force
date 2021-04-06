import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionArtworksRailArtworksFragmentContainer } from "../AuctionArtworksRail/AuctionArtworksRailArtworks"

jest.unmock("react-relay")

describe("AuctionArtworksRailArtworks", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <AuctionArtworksRailArtworksFragmentContainer
          sale={props.sale}
          tabType="myBids"
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

    expect(wrapper.find("Carousel")).toBeDefined()
    expect(wrapper.find("FillwidthItem")).toBeDefined()
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

    console.log(wrapper.find("Carousel").length)
    expect(wrapper.find("Carousel")).toHaveLength(0)
  })
})
