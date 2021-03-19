import React from "react"
import { graphql } from "react-relay"
import { PartnerApp_Test_Query } from "v2/__generated__/PartnerApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PartnerAppFragmentContainer } from "../PartnerApp"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<PartnerApp_Test_Query>({
  Component: props => {
    return <PartnerAppFragmentContainer {...props} />
  },
  query: graphql`
    query PartnerApp_Test_Query {
      partner(id: "example") {
        ...PartnerApp_partner
      }
    }
  `,
})

describe("PartnerApp", () => {
  it("displays navigation tabs for the partner page", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("NavigationTabs").length).toBe(1)
  })
})
