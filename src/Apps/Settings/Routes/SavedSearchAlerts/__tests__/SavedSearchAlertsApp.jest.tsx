import { fireEvent, screen } from "@testing-library/react"
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

      expect(screen.getAllByText("Artist Name 1")[0]).toBeInTheDocument()
      expect(screen.getAllByText("Artist Name 2")[0]).toBeInTheDocument()
      expect(screen.getAllByText("Artist Name 3")[0]).toBeInTheDocument()
    })

    it("renders all alert subtitles", () => {
      renderWithRelay({
        Me: () => ({
          alertsConnection: mockedAlertsConnection,
        }),
      })

      expect(screen.getAllByText("Alert Subtitle 1")[0]).toBeInTheDocument()
      expect(screen.getAllByText("Alert Subtitle 2")[0]).toBeInTheDocument()
      expect(screen.getAllByText("Alert Subtitle 3")[0]).toBeInTheDocument()
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
        title: "Artist Name 1",
        subtitle: "Alert Subtitle 1",
      },
    },
    {
      node: {
        internalID: "example-id-2",
        title: "Artist Name 2",
        subtitle: "Alert Subtitle 2",
      },
    },
    {
      node: {
        title: "Artist Name 3",
        subtitle: "Alert Subtitle 3",
      },
    },
  ],
}
