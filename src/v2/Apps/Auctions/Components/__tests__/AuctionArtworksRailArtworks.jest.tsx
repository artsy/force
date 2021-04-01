import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionArtworksRailArtworksFragmentContainer } from "../AuctionArtworksRail/AuctionArtworksRailArtworks"

jest.unmock("react-relay")

describe("AuctionArtworksRailArtworks", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <AuctionArtworksRailArtworksFragmentContainer sale={props.sale} />
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
})
