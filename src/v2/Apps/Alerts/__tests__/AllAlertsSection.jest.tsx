import { graphql } from "react-relay"
import { AllAlertsSection_Test_Query } from "v2/__generated__/AllAlertsSection_Test_Query.graphql"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { AllAlertsPaginationContainer } from "../components/AllAlertsSection"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("AllAlertsSection", () => {
  const { renderWithRelay } = setupTestWrapperTL<AllAlertsSection_Test_Query>({
    Component: AllAlertsPaginationContainer,
    query: graphql`
      query AllAlertsSection_Test_Query {
        me {
          ...AllAlertsSection_me
        }
      }
    `,
  })

  it("renders without throwing an error", () => {
    renderWithRelay({
      SearchCriteriaConnection: () => ({
        pageInfo: {
          endCursor: "cursor",
          hasNextPage: true,
        },
        edges: ALERT_EDGES,
      }),
    })

    expect(screen.getByText("Alert Name #1")).toBeInTheDocument()
    expect(screen.getByText("Show more")).toBeInTheDocument()
  })

  it('should hide "show more" button when all alerts are loaded', () => {
    renderWithRelay({
      SearchCriteriaConnection: () => ({
        pageInfo: {
          endCursor: "cursor",
          hasNextPage: false,
        },
        edges: ALERT_EDGES,
      }),
    })

    expect(screen.queryByText("Show more")).not.toBeInTheDocument()
  })

  it("should show empty message when there are no alerts", () => {
    renderWithRelay({
      SearchCriteriaConnection: () => ({
        pageInfo: {
          endCursor: "cursor",
          hasNextPage: false,
        },
        edges: [],
      }),
    })

    const emptyTitle = "You haven’t created any Alerts yet."
    const emptyDescription =
      "Filter for the artworks you love on an Artist Page and tap ‘Create Alert’ to be notified when new works are added to Artsy."

    expect(screen.getByText(emptyTitle)).toBeInTheDocument()
    expect(screen.getByText(emptyDescription)).toBeInTheDocument()
  })
})

const ALERT_EDGES = [
  {
    node: {
      internalID: "internalID-1",
      userAlertSettings: {
        name: "Alert Name #1",
      },
    },
  },
  {
    node: {
      internalID: "internalID-2",
      userAlertSettings: {
        name: "Alert Name #2",
      },
    },
  },
  {
    node: {
      internalID: "internalID-3",
      userAlertSettings: {
        name: "Alert Name #3",
      },
    },
  },
]
