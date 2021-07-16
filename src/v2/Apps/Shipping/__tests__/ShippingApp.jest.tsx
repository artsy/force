import React from "react"
import { graphql } from "react-relay"
import { ShippingApp_Test_Query } from "v2/__generated__/ShippingApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ShippingAppFragmentContainer } from "../Routes/Shipping/ShippingApp"
import { HeadProvider } from "react-head"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ShippingApp_Test_Query>({
  Component: props => {
    return (
      <HeadProvider>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <ShippingAppFragmentContainer {...props} />
      </HeadProvider>
    )
  },
  query: graphql`
    query ShippingApp_Test_Query {
      me {
        ...ShippingApp_me
      }
    }
  `,
})

describe("ShippingApp", () => {
  it("renders collector name and some menu routes", () => {
    const wrapper = getWrapper({
      Me: () => ({
        name: "Rob Ross",
      }),
    })

    const userSettingsTabs = wrapper.find("UserSettingsTabs")

    expect(userSettingsTabs.text()).toContain("Rob Ross")
    expect(userSettingsTabs.find("RouteTab").length).toBeGreaterThan(1)
  })
})
