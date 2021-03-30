import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { tests } from "../MyBids"

jest.unmock("react-relay")

describe("MyBids", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <tests.MyBidsFragmentContainer me={props.me} />
    },
    query: graphql`
      query MyBids_Test_Query {
        me {
          ...MyBids_me
        }
      }
    `,
  })

  it("renders the correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("CarouselRail")).toBeDefined()
    expect(wrapper.find("SaleContainer")).toBeDefined()
    expect(wrapper.find("MyBidsBidHeaderFragmentContainer")).toBeDefined()
    expect(wrapper.find("MyBidsBidItemFragmentContainer")).toBeDefined()
  })
})
