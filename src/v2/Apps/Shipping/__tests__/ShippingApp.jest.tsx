import { graphql } from "react-relay"
import { ShippingApp_Test_Query } from "v2/__generated__/ShippingApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ShippingAppFragmentContainer } from "../Routes/Shipping/ShippingApp"
import { HeadProvider } from "react-head"
import { useTracking } from "v2/System"

jest.mock("react-tracking")
jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
const { getWrapper } = setupTestWrapper<ShippingApp_Test_Query>({
  Component: ({ me }) => {
    return (
      <HeadProvider>
        <ShippingAppFragmentContainer me={me!} />
      </HeadProvider>
    )
  },
  query: graphql`
    query ShippingApp_Test_Query @relay_test_operation {
      me {
        ...ShippingApp_me
      }
    }
  `,
})

describe("ShippingApp", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("renders collector name and some menu routes", () => {
    const wrapper = getWrapper({
      Me: () => ({
        name: "Rob Ross",
      }),
    })

    const userSettingsTabs = wrapper.find("UserSettingsTabs")

    expect(userSettingsTabs.find("RouteTab").length).toBeGreaterThan(1)
    expect(userSettingsTabs.text()).toContain("Rob Ross")
  })
})
