import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SavedSearchAlertsAppPaginationContainer } from "../SavedSearchAlertsApp"
import { SavedSearchAlertsApp_Test_Query } from "v2/__generated__/SavedSearchAlertsApp_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("react-head", () => ({
  Title: () => null,
  Meta: () => null,
  Link: () => null,
}))

describe("SavedSearchAlertsApp", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    SavedSearchAlertsApp_Test_Query
  >({
    Component: SavedSearchAlertsAppPaginationContainer,
    query: graphql`
      query SavedSearchAlertsApp_Test_Query @raw_response_type {
        me {
          ...SavedSearchAlertsApp_me
        }
      }
    `,
  })

  it("renders all alerts", () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: mockedSavedSearchesConnection,
      }),
    })

    expect(screen.getAllByText("Alert #1")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Alert #2")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Alert #3")[0]).toBeInTheDocument()
  })

  it("renders a empty results message if there are no alerts", () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: {
          edges: [],
        },
      }),
    })
    const emptyMessageTitle = "You haven't created any Alerts yet."
    const emptyMessageDescription =
      "Filter for the artworks you love on an Artist Page and tap ‘Create Alert’ to be notified when new works are added to Artsy."

    expect(screen.getByText(emptyMessageTitle)).toBeInTheDocument()
    expect(screen.getByText(emptyMessageDescription)).toBeInTheDocument()
  })

  it('renders edit form when "Edit" button is pressed', async () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: mockedSavedSearchesConnection,
      }),
    })

    fireEvent.click(screen.getAllByText("Edit")[0])

    expect(screen.getAllByText("Edit Alert #1")[0]).toBeInTheDocument()
  })
})

const mockedSavedSearchesConnection = {
  edges: [
    {
      node: {
        userAlertSettings: {
          name: "Alert #1",
        },
      },
    },
    {
      node: {
        userAlertSettings: {
          name: "Alert #2",
        },
      },
    },
    {
      node: {
        userAlertSettings: {
          name: "Alert #3",
        },
      },
    },
  ],
}
