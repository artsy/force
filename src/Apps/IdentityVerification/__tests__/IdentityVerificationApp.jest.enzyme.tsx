import { graphql } from "react-relay"
import { IdentityVerificationAppFragmentContainer } from "Apps/IdentityVerification/IdentityVerificationApp"
import { IdentityVerificationAppTestPage } from "./Utils/IdentityVerificationAppTestPage"
import { mockLocation } from "DevTools/mockLocation"
import { HttpError } from "found"
import { Toasts, ToastsProvider } from "@artsy/palette"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { useTracking } from "react-tracking"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
jest.mock("found")

describe("IdentityVerification route", () => {
  let sendProps
  let trackEvent

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      const propsFiltered = sendProps ? props : {}
      return (
        <MockBoot>
          <ToastsProvider>
            <Toasts />
            <IdentityVerificationAppFragmentContainer {...propsFiltered} />
          </ToastsProvider>
        </MockBoot>
      )
    },
    query: graphql`
      query IdentityVerificationAppTestQuery
        @raw_response_type
        @relay_test_operation {
        identityVerification(id: "identity-verification-id") {
          ...IdentityVerificationApp_identityVerification
        }
      }
    `,
  })

  beforeEach(() => {
    sendProps = true
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  describe("for a visitor", () => {
    describe("unactionable end states", () => {
      it("returns a 404 when the identity verification is not found", async () => {
        sendProps = false
        const mockHttpError = HttpError as jest.Mock
        getWrapper()

        expect(mockHttpError).toHaveBeenCalledWith(404)
      })

      it("renders a message about an identity verification that is `passed`", async () => {
        const { wrapper } = getWrapper({
          IdentityVerification: () => ({
            state: "passed",
          }),
        })
        const page = new IdentityVerificationAppTestPage(wrapper)

        expect(page.text()).toContain("Identity verification complete")
        expect(page.startVerificationButton.exists()).toBeFalsy()
        expect(page.finishButton.exists()).toBeTruthy()
      })

      it("renders a message about an identity verification that is `failed`", async () => {
        const { wrapper } = getWrapper({
          IdentityVerification: () => ({
            state: "failed",
          }),
        })
        const page = new IdentityVerificationAppTestPage(wrapper)

        expect(page.text()).toContain("Identity verification failed")
        expect(page.startVerificationButton.exists()).toBeFalsy()
        expect(page.contactSupportButton.exists()).toBeTruthy()
      })

      it("renders a message about an identity verification that is `watchlist_hit`", async () => {
        const { wrapper } = getWrapper({
          IdentityVerification: () => ({
            state: "watchlist_hit",
          }),
        })
        const page = new IdentityVerificationAppTestPage(wrapper)

        expect(page.text()).toContain(
          "Artsy is reviewing your identity verification"
        )
        expect(page.startVerificationButton.exists()).toBeFalsy()
        expect(page.returnHomeButton.exists()).toBeTruthy()
      })
    })

    it("allows an identity verification instance's owner to view the landing page", async () => {
      const { wrapper } = getWrapper()
      const page = new IdentityVerificationAppTestPage(wrapper)

      expect(page.text()).toContain("Artsy Identity Verification")
    })

    describe("user enters verification flow", () => {
      beforeAll(() => {
        mockLocation()
      })

      it("user click on 'continue to verification' button is tracked", async () => {
        const { wrapper } = getWrapper()
        const page = new IdentityVerificationAppTestPage(wrapper)

        await page.clickStartVerification()

        expect(trackEvent).toHaveBeenCalledTimes(1)
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "ClickedContinueToIdVerification",
          context_page: "Identity Verification page",
          context_page_owner_id: "<IdentityVerification-mock-id-1>",
        })
      })

      it("user is redirected to the verification flow on a successful mutation", async () => {
        const env = createMockEnvironment()
        const { wrapper } = getWrapper({}, {}, env)
        const page = new IdentityVerificationAppTestPage(wrapper)

        await page.clickStartVerification()

        env.mock.resolveMostRecentOperation(operation =>
          MockPayloadGenerator.generate(operation, {
            startIdentityVerificationMutationPayload: () => ({
              __typename: "StartIdentityVerificationSuccess",
              startIdentityVerificationResponseOrError: {
                identityVerificationFlowUrl: "www.identity.biz",
                mutationError: null,
              },
            }),
          })
        )
        await page.update()

        expect(window.location.assign).toHaveBeenCalledWith("www.identity.biz")
      })

      it("user sees an error toast if the mutation fails", async () => {
        const env = createMockEnvironment()
        const { wrapper } = getWrapper({}, {}, env)
        const page = new IdentityVerificationAppTestPage(wrapper)

        await page.clickStartVerification()

        env.mock.resolveMostRecentOperation(operation =>
          MockPayloadGenerator.generate(operation, {
            startIdentityVerificationMutationPayload: () => ({
              startIdentityVerificationResponseOrError: {
                __typename: "StartIdentityVerificationFailure",
                mutationError: {
                  error: "something bad :|",
                  message: "oh noes",
                  detail: "beep boop beep",
                },
              },
            }),
          })
        )
        await page.update()

        expect(page.text()).toContain(
          "Something went wrong. Please try again or contact verification@artsy.net."
        )
      })

      it("shows an error message on network failiure", async () => {
        const env = createMockEnvironment()
        const { wrapper } = getWrapper({}, {}, env)
        const page = new IdentityVerificationAppTestPage(wrapper)

        await page.clickStartVerification()

        env.mock.rejectMostRecentOperation(new Error("something went wrong"))
        await page.update()

        expect(page.text()).toContain(
          "Something went wrong. Please try again or contact verification@artsy.net."
        )
      })
    })
  })
})
