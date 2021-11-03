import { graphql } from "react-relay"
import { AlertItem_Test_Query } from "v2/__generated__/AlertItem_Test_Query.graphql"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { AlertItemFragmentContainer } from "../components/AlertItem"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("AlertItem", () => {
  const { renderWithRelay } = setupTestWrapperTL<AlertItem_Test_Query>({
    Component: props => {
      if (props.me?.savedSearchesConnection?.edges?.[0]?.node) {
        return (
          <AlertItemFragmentContainer
            item={props.me.savedSearchesConnection.edges[0].node}
          />
        )
      }

      return null
    },
    query: graphql`
      query AlertItem_Test_Query {
        me {
          savedSearchesConnection {
            edges {
              node {
                internalID
                ...AlertItem_item
              }
            }
          }
        }
      }
    `,
  })

  it("renders without throwing an error", () => {
    renderWithRelay({
      SearchCriteria: () => ALERT_ITEM,
    })

    expect(screen.getByText("Alert Name")).toBeInTheDocument()
  })

  it("should render fallback name when alert name is empty", () => {
    renderWithRelay({
      SearchCriteria: () => ({
        ...ALERT_ITEM,
        userAlertSettings: {
          ...ALERT_ITEM.userAlertSettings,
          name: null,
        },
      }),
    })

    expect(screen.getByText("Untitled Alert")).toBeInTheDocument()
  })
})

const ALERT_ITEM = {
  internalID: "alert-internalID",
  userAlertSettings: {
    name: "Alert Name",
    push: false,
    email: true,
  },
}
