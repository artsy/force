import { fireEvent, screen, waitFor } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SavedSearchAlertsAppPaginationContainer } from "Apps/Settings/Routes/SavedSearchAlerts/SavedSearchAlertsApp"
import { SavedSearchAlertsApp_Test_Query } from "__generated__/SavedSearchAlertsApp_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { MockEnvironment, createMockEnvironment } from "relay-test-utils"
import { useSystemContext } from "System/useSystemContext"
import { MediaContextProvider } from "Utils/Responsive"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("System/useSystemContext")

let relayEnv: MockEnvironment = createMockEnvironment()

describe("SavedSearchAlertsApp", () => {
  let breakpoint: "md" | "sm" | "xs"
  const trackEvent = jest.fn()
  const mockuseSystemContext = useSystemContext as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<
    SavedSearchAlertsApp_Test_Query
  >({
    Component: ({ me }) => (
      <MediaContextProvider onlyMatch={[breakpoint]}>
        <SavedSearchAlertsAppPaginationContainer me={me!} />
      </MediaContextProvider>
    ),
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

    mockuseSystemContext.mockImplementation(() => {
      return {
        relayEnvironment: relayEnv,
      }
    })
  })

  afterEach(() => {
    relayEnv.mockClear()
  })

  describe("alerts list", () => {
    beforeEach(() => {
      breakpoint = "sm"
    })

    it("renders all alert titles", () => {
      renderWithRelay({
        Me: () => ({
          alertsConnection: mockedAlertsConnection,
        }),
      })

      expect(screen.getAllByText("Alert Name 1")[0]).toBeInTheDocument()
      expect(screen.getAllByText("Alert Name 2")[0]).toBeInTheDocument()
      expect(screen.getAllByText("Alert Name 3")[0]).toBeInTheDocument()
    })

    it("should expand/collapse filter pills when user toggles show all/close all filters button", async () => {
      renderWithRelay({
        Me: () => ({
          alertsConnection: mockedAlertsConnectionWithFilters,
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
          alertsConnection: {
            edges: [],
          },
        }),
      })

      expect(
        screen.getByText("Get notifications when there’s a match.")
      ).toBeInTheDocument()
    })
  })

  describe("desktop", () => {
    beforeEach(() => {
      breakpoint = "md"
    })

    afterEach(() => {
      relayEnv.mockClear()
    })

    it("on render opens the edit form of the first alert in the list", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {
          Me: () => ({
            alertsConnection: mockedAlertsConnection,
          }),
        },
        {},
        relayEnv
      )

      await flushPromiseQueue()

      setTimeout(() => {
        expect(window.location.pathname).toEqual(
          `/settings/alerts/example-id-1/edit`
        )
      }, 200)

      const mockedPreviewResolver = {
        Me: () => ({
          alert: {
            internalID: "example-id-1",
            artistIDs: ["artist-id"],
            settings: {
              name: "user-search-criteria-custom-name",
            },
          },
        }),
      }

      mockResolveLastOperation(mockedPreviewResolver)

      expect(screen.getAllByText("Edit Alert")[0]).toBeInTheDocument()
    })

    it("opens the edit form on Edit CTA press", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {
          Me: () => ({
            alertsConnection: mockedAlertsConnection,
          }),
        },
        {},
        relayEnv
      )

      setTimeout(() => {
        expect(window.location.pathname).toEqual(
          `/settings/alerts/example-id-1/edit`
        )
      }, 200)

      const mockedPreviewResolver = {
        Me: () => ({
          alert: {
            internalID: "example-id-1",
            artistIDs: ["artist-id"],
            settings: {
              name: "user-search-criteria-custom-name",
            },
          },
        }),
      }

      mockResolveLastOperation(mockedPreviewResolver)

      expect(screen.getAllByText("Edit Alert")[0]).toBeInTheDocument()

      fireEvent.click(screen.getAllByText("Edit")[1])

      expect(window.location.pathname).toEqual(
        `/settings/alerts/example-id-2/edit`
      )
    })
  })

  describe("mobile", () => {
    beforeEach(() => {
      breakpoint = "sm"
    })

    it("show edit form on Edit CTA press", () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {
          Me: () => ({
            alertsConnection: mockedAlertsConnection,
          }),
        },
        {},
        relayEnv
      )

      fireEvent.click(screen.getAllByText("Edit")[0])

      expect(window.location.pathname).toEqual(
        `/settings/alerts/example-id-1/edit`
      )

      const mockedPreviewResolver = {
        Me: () => ({
          alert: {
            internalID: "example-id-1",
            artistIDs: ["artist-id"],
            settings: {
              name: "user-search-criteria-custom-name",
            },
          },
        }),
      }

      mockResolveLastOperation(mockedPreviewResolver)

      expect(screen.getAllByText("Edit Alert")[0]).toBeInTheDocument()

      fireEvent.click(screen.getByLabelText("Close"))

      expect(window.location.pathname).toEqual(`/settings/alerts`)
    })
  })
})

const mockedAlertsConnection = {
  edges: [
    {
      node: {
        internalID: "example-id-1",
        labels: [
          { displayValue: "Limited Edition" },
          { displayValue: "Andy Warhol" },
        ],
        displayName: "Alert Name 1",
      },
    },
    {
      node: {
        internalID: "example-id-2",
        displayName: "Alert Name 2",
      },
    },
    {
      node: {
        labels: [{ displayValue: "$0–$34,240" }, { displayValue: "Omar Ba" }],
        displayName: "Alert Name 3",
      },
    },
  ],
}

const mockedAlertsConnectionWithFilters = {
  edges: [
    {
      node: {
        settings: {
          name: "Alert With Some Filters",
        },
        displayName: "Alert With Some Filters",
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
