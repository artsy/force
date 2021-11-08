import { graphql } from "react-relay"
import { AlertsRoute_Test_Query } from "v2/__generated__/AlertsRoute_Test_Query.graphql"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { AlertsRouteFragmentContainer } from "../Routes/Alerts/AlertsRoute"
import { HeadProvider } from "react-head"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("AlertsRoute", () => {
  const { renderWithRelay } = setupTestWrapperTL<AlertsRoute_Test_Query>({
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

  it("renders without throwing an error", () => {
    renderWithRelay({
      SearchCriteriaConnection: () => ({
        pageInfo: {
          endCursor: "cursor",
          hasNextPage: false,
        },
        edges: [],
      }),
    })

    expect(screen.getByText("Saved alerts")).toBeInTheDocument()
  })
})
