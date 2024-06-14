import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { graphql } from "react-relay"
import { RequestConditionReportFragmentContainer } from "Apps/Artwork/Components/ArtworkDetails/RequestConditionReport"
import { RequestConditionReportTestPage } from "./Utils/RequestConditionReportTestPage"
import { Toasts, ToastsProvider } from "@artsy/palette"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  createMockEnvironment,
  MockPayloadGenerator,
  MockEnvironment,
} from "relay-test-utils"
import { useTracking } from "react-tracking"
import { useAuthDialog } from "Components/AuthDialog"

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ title, children }) => (
      <div>
        {title}
        <div>{children}</div>
      </div>
    ),
  }
})

jest.mock("Components/AuthDialog/useAuthDialog")

describe("RequestConditionReport", () => {
  let me
  const artwork = {
    internalID: "artwork-id",
    slug: "artwork-slug",
    saleArtwork: { internalID: "sale-artwork-id" },
  }
  let relayEnv: MockEnvironment = createMockEnvironment()
  let trackEvent: jest.Mock

  const { getWrapper } = setupTestWrapper({
    Component: ({ artwork }: any) => (
      <ToastsProvider>
        <Toasts />
        {/* @ts-ignore */}
        <RequestConditionReportFragmentContainer artwork={artwork} me={me} />
      </ToastsProvider>
    ),
    query: graphql`
      query RequestConditionReportTestQuery
        @raw_response_type
        @relay_test_operation {
        me {
          ...RequestConditionReport_me
        }

        artwork(id: "artwork-id") {
          ...RequestConditionReport_artwork
        }
      }
    `,
  })

  beforeAll(() => {
    me = { internalID: "user-id", email: "user@example.com" }

    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        isLoggedIn: true,
        relayEnvironment: relayEnv,
      }
    })
    ;(useAuthDialog as jest.Mock).mockImplementation(() => {
      return { showAuthDialog: jest.fn() }
    })
  })

  afterEach(() => {
    relayEnv.mockClear()
  })

  it("requests a condition report and tracks click event", async () => {
    const { wrapper } = getWrapper(
      {
        Artwork: () => artwork,
      },
      {},
      relayEnv
    )
    let page = new RequestConditionReportTestPage(wrapper)

    await page.clickRequestConditionReportButton()

    relayEnv.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation)
    )
    await page.update()

    expect(trackEvent).toBeCalledWith({
      action_type:
        DeprecatedAnalyticsSchema.ActionType.ClickedRequestConditionReport,
      subject: DeprecatedAnalyticsSchema.Subject.RequestConditionReport,
    })

    expect(page.text()).toContain("Condition report requested")
  })

  it("shows a toast if the mutation fails", async () => {
    const { wrapper } = getWrapper(
      {
        Artwork: () => artwork,
      },
      {},
      relayEnv
    )
    let page = new RequestConditionReportTestPage(wrapper)

    await page.clickRequestConditionReportButton()

    relayEnv.mock.rejectMostRecentOperation(() => new Error("Error"))
    await page.update()

    expect(page.text()).toContain("Something went wrong")
  })

  describe("when unauthenticated", () => {
    it("redirects to login/signup flow and tracks click event", async () => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return { user: null }
      })

      const showAuthDialog = jest.fn()

      ;(useAuthDialog as jest.Mock).mockImplementation(() => {
        return { showAuthDialog }
      })

      me = null
      const { wrapper } = getWrapper(
        {
          Artwork: () => artwork,
        },
        {},
        relayEnv
      )
      let page = new RequestConditionReportTestPage(wrapper)

      await page.clickLogInButton()

      expect(showAuthDialog).toHaveBeenCalledWith({
        mode: "Login",
        analytics: {
          contextModule: "aboutTheWork",
          intent: "requestConditionReport",
        },
      })

      expect(trackEvent).toHaveBeenCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        sale_artwork_id: "sale-artwork-id",
        subject: DeprecatedAnalyticsSchema.Subject.Login,
      })
    })
  })
})
