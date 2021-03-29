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
})
