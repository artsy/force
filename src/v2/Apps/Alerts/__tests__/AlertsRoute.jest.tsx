import { graphql } from "react-relay"
import { AlertsRoute_Test_Query } from "v2/__generated__/AlertsRoute_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AlertsRouteFragmentContainer } from "../Routes/Alerts/AlertsRoute"
import { HeadProvider } from "react-head"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<AlertsRoute_Test_Query>({
  Component: ({ me }) => {
    return (
      <HeadProvider>
        <AlertsRouteFragmentContainer me={me!} />
      </HeadProvider>
    )
  },
  query: graphql`
    query AlertsRoute_Test_Query {
      me {
        ...AlertsRoute_me
      }
    }
  `,
})

describe("AlertsRoute", () => {
  it("renders collector name and some menu routes", () => {
    const wrapper = getWrapper({
      Me: () => ({
        name: "Rob Ross",
      }),
      SearchCriteriaConnection: () => ({
        pageInfo: {
          endCursor: "cursor",
          hasNextPage: false,
        },
        edges: [],
      }),
    })

    const userSettingsTabs = wrapper.find("UserSettingsTabs")

    expect(userSettingsTabs.text()).toContain("Rob Ross")
    expect(userSettingsTabs.find("RouteTab").length).toBeGreaterThan(1)
  })
})
