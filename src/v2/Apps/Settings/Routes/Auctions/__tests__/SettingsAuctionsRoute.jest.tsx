import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { SettingsAuctionsRouteFragmentContainer } from "../SettingsAuctionsRoute"
import { SettingsAuctionsRouteQuery_Test_Query } from "v2/__generated__/SettingsAuctionsRouteQuery_Test_Query.graphql"

jest.unmock("react-relay")

describe("SettingsAuctionsRoute", () => {
  const { getWrapper } = setupTestWrapper<
    SettingsAuctionsRouteQuery_Test_Query
  >({
    Component: SettingsAuctionsRouteFragmentContainer,
    query: graphql`
      query SettingsAuctionsRouteQuery_Test_Query @relay_test_operation {
        me {
          ...SettingsAuctionsRoute_me
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Me: () => {},
    })

    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders 3 correct children", () => {
    const wrapper = getWrapper({
      Me: () => {},
    })

    expect(wrapper.find("UserActiveBids").length).toBe(1)
    expect(wrapper.find("UserBidHistory").length).toBe(1)
    expect(wrapper.find("UserRegistrationAuctions").length).toBe(1)
  })
})
