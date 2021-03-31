import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionArtworksRailFragmentContainer } from "../AuctionArtworksRail/AuctionArtworksRail"

jest.unmock("react-relay")

describe("AuctionArtworksRails", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <AuctionArtworksRailFragmentContainer sale={props.sale} />
    },
    query: graphql`
      query AuctionArtworksRails_Test_Query {
        sale(id: "xxx") {
          ...AuctionArtworksRail_sale
        }
      }
    `,
  })

  it("renders correct components and data", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        internalID: "testid123",
        href: "/auction/test-href",
        name: "Test Href",
        formattedStartDateTime: "Ends Apr 10 at 8:27pm UTC",
      }),
    })

    expect(wrapper.find("Waypoint")).toBeDefined()
    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").first().props().to).toContain(
      "/auction/test-href"
    )

    const text = wrapper.text()
    expect(text).toContain("Test Href")
  })
})
