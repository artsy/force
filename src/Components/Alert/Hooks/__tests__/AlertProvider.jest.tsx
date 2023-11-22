import { MockEnvironment, createMockEnvironment } from "relay-test-utils"
import { useTracking } from "react-tracking"
import { graphql } from "react-relay"

import { AlertProvider } from "Components/Alert/AlertProvider"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { AlertProviderTestPage } from "Components/Alert/Hooks/__tests__/Utils/AlertProviderTestPage"
import { useAuthDialog } from "Components/AuthDialog"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { useSystemContext } from "System/SystemContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("Components/AuthDialog/useAuthDialog")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))
jest.mock("System/useSystemContext")

describe("AlertProvider", () => {
  let relayEnv: MockEnvironment = createMockEnvironment()
  let mockUseAuthDialog: jest.Mock = useAuthDialog as jest.Mock
  let mockUseTracking: jest.Mock = useTracking as jest.Mock
  let mockUseSystemContext: jest.Mock = useSystemContext as jest.Mock

  const { getWrapper } = setupTestWrapper({
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
    const { mockResolveLastOperation, wrapper } = getWrapper(
      {
        Artist: () => {
          return { internalID: "artist-id" }
        },
      },
      {},
      relayEnv
    )
    let page = new AlertProviderTestPage(wrapper)

    // open modal, defaults to details step
    page.clickCreateAlertButton()

    const mockedPreviewResolver = {
      Viewer: () => ({
        previewSavedSearch: {
          displayName: "Andy Warhol",
          labels: [
            {
              displayValue: "Andy Warhol",
              field: "artistIDs",
              value: "artist-id",
            },
          ],
        },
      }),
    }
    mockResolveLastOperation(mockedPreviewResolver)
    await flushPromiseQueue()

    expect(page.text()).toContain("Add Filters")
    expect(page.text()).toContain("Andy Warhol")

    // transition to filters step
    page.clickAddFiltersButton()

    expect(page.text()).toContain("Medium")
    expect(page.text()).toContain("Rarity")
    expect(page.text()).toContain("Price Range")
    expect(page.text()).toContain("Colors")
    expect(page.text()).toContain("Ways to Buy")

    // transition back to details step
    page.clickSetFiltersButton()

    expect(page.text()).toContain("Add Filters")

    // submit form
    page.clickSubmitCreateAlertButton()
    await flushPromiseQueue()

    // useCreateAlert
    mockResolveLastOperation({})
    await flushPromiseQueue()

    expect(page.text()).toContain("Your alert has been saved.")
  })
})
