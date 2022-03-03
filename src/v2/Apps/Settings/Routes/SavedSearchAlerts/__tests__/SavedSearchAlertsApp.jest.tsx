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

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock

    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders all alert titles and the pills for filters applied", () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: mockedSavedSearchesConnection,
      }),
    })

    expect(screen.getAllByText("Alert #1")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Limited Edition")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Andy Warhol")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Alert #2")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Alert #3")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Omar Ba")[0]).toBeInTheDocument()
    expect(screen.getAllByText("$0–$34,240")[0]).toBeInTheDocument()
  })

  it("renders all the filter labels if there are up to 8 filters", () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: mockedSavedSearchesConnectionWith8Filters,
      }),
    })

    expect(screen.getAllByText("Alert With 8 Filters")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Limited Edition")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Andy Warhol")[0]).toBeInTheDocument()
    expect(screen.getAllByText("$0–$34,240")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Painting")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Open Edition")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Sculpture")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Prints")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Photography")[0]).toBeInTheDocument()

    expect(screen.queryByText("Show all filters")).not.toBeInTheDocument()
    expect(screen.queryByText("Close all filters")).not.toBeInTheDocument()
  })

  it("renders up to 8 filters when there are more and display show all button", async () => {
    renderWithRelay({
      Me: () => ({
        savedSearchesConnection: mockedSavedSearchesConnectionWithMoreThan8Filters,
      }),
    })

    expect(
      screen.getAllByText("Alert With More Than 8 Filters")[0]
    ).toBeInTheDocument()
    expect(screen.getAllByText("Limited Edition")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Andy Warhol")[0]).toBeInTheDocument()
    expect(screen.getAllByText("$0–$34,240")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Painting")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Open Edition")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Sculpture")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Prints")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Photography")[0]).toBeInTheDocument()

    // the rest of the filters are not displayed
    expect(screen.queryAllByText("Ephemera or Merchandise")).toStrictEqual([])
    expect(screen.queryAllByText("Make Offer")).toStrictEqual([])
    // the show all filters button is displayed
    expect(screen.getAllByText("Show all filters")[0]).toBeInTheDocument()
    expect(screen.queryAllByText("Close all filters")).toStrictEqual([])
    fireEvent.click(screen.getAllByText("Show all filters")[0])

    await waitFor(() =>
      expect(screen.queryAllByText("Show all filters").length).toBe(1)
    )
    // after pressing show all filters the hidden filters appear
    expect(screen.getAllByText("Close all filters")[0]).toBeInTheDocument()
    expect(
      screen.getAllByText("Ephemera or Merchandise")[0]
    ).toBeInTheDocument()
    expect(screen.getAllByText("Make Offer")[0]).toBeInTheDocument()
    // collapses the filters
    fireEvent.click(screen.getByText("Close all filters"))

    await waitFor(() =>
      expect(screen.queryByText("Close all filters")).not.toBeInTheDocument()
    )
    // after pressing close all filters the filters are collapsed
    expect(screen.queryAllByText("Ephemera or Merchandise")).toStrictEqual([])
    expect(screen.queryAllByText("Make Offer")).toStrictEqual([])
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
        labels: [{ value: "Limited Edition" }, { value: "Andy Warhol" }],
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
        labels: [{ value: "$0–$34,240" }, { value: "Omar Ba" }],
        userAlertSettings: {
          name: "Alert #3",
        },
      },
    },
  ],
}

const mockedSavedSearchesConnectionWith8Filters = {
  edges: [
    {
      node: {
        userAlertSettings: {
          name: "Alert With 8 Filters",
        },
        labels: [
          { value: "Limited Edition" },
          { value: "Andy Warhol" },
          { value: "$0–$34,240" },
          { value: "Painting" },
          { value: "Open Edition" },
          { value: "Sculpture" },
          { value: "Prints" },
          { value: "Photography" },
        ],
      },
    },
  ],
}

const mockedSavedSearchesConnectionWithMoreThan8Filters = {
  edges: [
    {
      node: {
        userAlertSettings: {
          name: "Alert With More Than 8 Filters",
        },
        labels: [
          { value: "Limited Edition" },
          { value: "Andy Warhol" },
          { value: "$0–$34,240" },
          { value: "Painting" },
          { value: "Open Edition" },
          { value: "Sculpture" },
          { value: "Prints" },
          { value: "Photography" },
          { value: "Ephemera or Merchandise" },
          { value: "Make Offer" },
        ],
      },
    },
  ],
}
