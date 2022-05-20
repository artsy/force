import { fireEvent, screen, waitFor } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SavedSearchAlertsAppPaginationContainer } from "../SavedSearchAlertsApp"
import { SavedSearchAlertsApp_Test_Query } from "v2/__generated__/SavedSearchAlertsApp_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("react-head", () => ({
  Title: () => null,
  Meta: () => null,
  Link: () => null,
}))
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("SavedSearchAlertsApp", () => {
  const trackEvent = jest.fn()

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

  beforeAll(() => {
    const mockTracking = useTracking as jest.Mock

    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders all alert titles", () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: mockedSavedSearchesConnection,
      }),
    })

    expect(screen.getAllByText("Alert #1")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Alert #2")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Alert #3")[0]).toBeInTheDocument()
  })

  it("should expand/collapse filter pills when user toggles show all/close all filters button", async () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: mockedSavedSearchesConnectionWithFilters,
      }),
    })

    expect(
      screen.getAllByText("Alert With Some Filters")[0]
    ).toBeInTheDocument()

    // the rest of the filters are hidden by default
    expect(screen.queryAllByText("Limited Edition")).toStrictEqual([])
    expect(screen.queryAllByText("Andy Warhol")).toStrictEqual([])
    expect(screen.queryAllByText("$0–$34,240")).toStrictEqual([])
    expect(screen.queryAllByText("Painting")).toStrictEqual([])

    // the show all filters button is displayed
    expect(screen.getAllByText("Show all filters")[0]).toBeInTheDocument()
    expect(screen.queryAllByText("Close all filters")).toStrictEqual([])
    fireEvent.click(screen.getAllByText("Show all filters")[0])

    // after pressing show all filters the hidden filters appear
    expect(screen.getAllByText("Close all filters")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Limited Edition")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Andy Warhol")[0]).toBeInTheDocument()
    expect(screen.getAllByText("$0–$34,240")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Painting")[0]).toBeInTheDocument()

    // collapses the filters
    fireEvent.click(screen.getByText("Close all filters"))

    await waitFor(() =>
      expect(screen.queryByText("Close all filters")).not.toBeInTheDocument()
    )
    // after pressing close all filters, all the filters are collapsed
    expect(screen.queryAllByText("Limited Edition")).toStrictEqual([])
    expect(screen.queryAllByText("Andy Warhol")).toStrictEqual([])
    expect(screen.queryAllByText("$0–$34,240")).toStrictEqual([])
    expect(screen.queryAllByText("Painting")).toStrictEqual([])
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
        labels: [
          { displayValue: "Limited Edition" },
          { displayValue: "Andy Warhol" },
        ],
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
        labels: [{ displayValue: "$0–$34,240" }, { displayValue: "Omar Ba" }],
        userAlertSettings: {
          name: "Alert #3",
        },
      },
    },
  ],
}

const mockedSavedSearchesConnectionWithFilters = {
  edges: [
    {
      node: {
        userAlertSettings: {
          name: "Alert With Some Filters",
        },
        labels: [
          { displayValue: "Limited Edition" },
          { displayValue: "Andy Warhol" },
          { displayValue: "$0–$34,240" },
          { displayValue: "Painting" },
        ],
      },
    },
  ],
}
