import { MockBoot } from "v2/DevTools"
import React from "react"
import { AuctionsAppFragmentContainer } from "../AuctionsApp"
import { graphql } from "react-relay"
import { AuctionsApp_Test_Query } from "v2/__generated__/AuctionsApp_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<AuctionsApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <AuctionsAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query AuctionsApp_Test_Query {
      me {
        ...AuctionsApp_me
      }
    }
  `,
})

describe("AuctionsApp", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("displays the auctions landing page", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("AuctionsMeta").length).toBe(1)
  })

  it("renders the Current Auctions tab by default", () => {
    const wrapper = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Current Auctions")
  })

  it("renders the Upcoming tab by default", () => {
    const wrapper = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Upcoming")
  })

  it("renders the Past tab by default", () => {
    const wrapper = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Past")
  })

  it("redirects to the Bid At Auction page", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").first().props().to).toBe(
      "https://support.artsy.net/hc/en-us/sections/360008298773-Bid-at-Auction"
    )
  })

  it("does not render auctions if they are not present", () => {
    const wrapper = getWrapper({
      salesConnection: () => ({ edges: [] }),
    })

    const html = wrapper.html()

    expect(html).not.toContain("Starts")
    expect(html).not.toContain("Ends")
    expect(html).not.toContain("Ended")
    expect(html).not.toContain("In Progress")
  })
})
