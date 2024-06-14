import { MockEnvironment, createMockEnvironment } from "relay-test-utils"
import { screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { graphql } from "react-relay"

import { AlertProvider } from "Components/Alert/AlertProvider"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { useAuthDialog } from "Components/AuthDialog"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("Components/AuthDialog/useAuthDialog")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

jest.mock("System/Hooks/useSystemContext")

describe("AlertProvider", () => {
  let relayEnv: MockEnvironment = createMockEnvironment()
  let mockUseAuthDialog: jest.Mock = useAuthDialog as jest.Mock
  let mockUseTracking: jest.Mock = useTracking as jest.Mock
  let mockUseSystemContext: jest.Mock = useSystemContext as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ artist }: any) => (
      <AlertProvider initialCriteria={{ artistIDs: [artist.internalID] }}>
        <CreateAlertButton />
      </AlertProvider>
    ),
    query: graphql`
      query AlertProviderTestQuery @raw_response_type @relay_test_operation {
        artist(id: "artist-id") {
          internalID
        }
      }
    `,
  })

  beforeAll(() => {
    mockUseAuthDialog.mockImplementation(() => ({
      showAuthDialog: jest.fn(),
    }))
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
    mockUseSystemContext.mockImplementation(() => ({
      isLoggedIn: true,
      relayEnvironment: relayEnv,
    }))
  })

  afterEach(() => {
    relayEnv.mockClear()
  })

  it("opens the create alert modal with initial criteria", async () => {
    const { mockResolveLastOperation } = renderWithRelay(
      {
        Artist: () => {
          return { internalID: "artist-id" }
        },
      },
      {},
      relayEnv
    )

    // open modal, defaults to details step
    screen.getByTestId("createAlert").click()

    const mockedPreviewResolver = {
      Viewer: () => ({
        previewSavedSearch: {
          labels: [
            { displayValue: "Andy Warhol" },
            { displayValue: "Limited edition" },
          ],
        },
      }),
    }

    const mockedSuggestionResolver = {
      PreviewSavedSearch: () => ({
        suggestedFilters: [
          { displayValue: "Photography" },
          { displayValue: "Print" },
        ],
      }),
    }

    mockResolveLastOperation(mockedNotificationPreferencesResolver)
    mockResolveLastOperation(mockedPreviewResolver)
    mockResolveLastOperation(mockedSuggestionResolver)

    await flushPromiseQueue()

    // initial criteria
    expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
    expect(screen.getByText("Limited edition")).toBeInTheDocument()

    // suggested criteria
    expect(screen.getByText("Add Filters")).toBeInTheDocument()
    expect(screen.getByText("Photography")).toBeInTheDocument()
    expect(screen.getByText("Print")).toBeInTheDocument()

    // transition to filters step
    screen.getByTestId("moreFilters").click()

    expect(screen.getByText("Medium")).toBeInTheDocument()
    expect(screen.getByText("Rarity")).toBeInTheDocument()
    expect(screen.getByText("Price Range")).toBeInTheDocument()
    expect(screen.getByText("Colors")).toBeInTheDocument()
    expect(screen.getByText("Ways to Buy")).toBeInTheDocument()

    // transition back to details step
    screen.getByTestId("setFilters").click()

    expect(screen.getByText("Add Filters")).toBeInTheDocument()
    // submit form
    screen.getByTestId("submitCreateAlert").click()
    await flushPromiseQueue()

    // useCreateAlert
    mockResolveLastOperation({})
    await flushPromiseQueue()

    expect(screen.getByText("Your alert has been saved.")).toBeInTheDocument()
    expect(
      screen.getByText(
        "We’ll let you know when matching works are added to Artsy."
      )
    ).toBeInTheDocument()
  })
})

const mockedNotificationPreferencesResolver = {
  Viewer: () => ({
    notificationPreferences: [
      {
        channel: "email",
        name: "custom_alerts",
        status: "NOT_SUBSCRIBED",
      },
    ],
  }),
}
