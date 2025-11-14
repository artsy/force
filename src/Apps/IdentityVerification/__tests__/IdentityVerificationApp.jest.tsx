import { IdentityVerificationAppFragmentContainer } from "Apps/IdentityVerification/IdentityVerificationApp"
import { MockBoot } from "DevTools/MockBoot"
import { mockLocation } from "DevTools/mockLocation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { Toasts, ToastsProvider } from "@artsy/palette"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { HttpError } from "found"
import { graphql } from "react-relay"
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

  const { renderWithRelay } = setupTestWrapperTL({
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
      query IdentityVerificationAppQuery
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
        renderWithRelay()

        expect(mockHttpError).toHaveBeenCalledWith(404)
      })

      it("renders a message about an identity verification that is `passed`", async () => {
        renderWithRelay({
          IdentityVerification: () => ({
            state: "passed",
          }),
        })

        expect(
          screen.getByText("Identity verification complete"),
        ).toBeInTheDocument()
        expect(
          screen.queryByRole("button", { name: /continue to verification/i }),
        ).not.toBeInTheDocument()
        expect(
          screen.getByRole("link", { name: /finish/i }),
        ).toBeInTheDocument()
      })

      it("renders a message about an identity verification that is `failed`", async () => {
        renderWithRelay({
          IdentityVerification: () => ({
            state: "failed",
          }),
        })

        expect(
          screen.getByText("Identity verification failed"),
        ).toBeInTheDocument()
        expect(
          screen.queryByRole("button", { name: /continue to verification/i }),
        ).not.toBeInTheDocument()
        expect(
          screen.getByRole("link", { name: /contact support/i }),
        ).toBeInTheDocument()
      })

      it("renders a message about an identity verification that is `watchlist_hit`", async () => {
        renderWithRelay({
          IdentityVerification: () => ({
            state: "watchlist_hit",
          }),
        })

        expect(
          screen.getByText("Artsy is reviewing your identity verification"),
        ).toBeInTheDocument()
        expect(
          screen.queryByRole("button", { name: /continue to verification/i }),
        ).not.toBeInTheDocument()
        expect(
          screen.getByRole("link", { name: /return home/i }),
        ).toBeInTheDocument()
      })
    })

    it("allows an identity verification instance's owner to view the landing page", async () => {
      renderWithRelay()

      expect(
        screen.getByText("Artsy Identity Verification"),
      ).toBeInTheDocument()
    })

    describe("user enters verification flow", () => {
      beforeAll(() => {
        mockLocation()
      })

      it("user click on 'continue to verification' button is tracked", async () => {
        renderWithRelay()

        const continueButton = screen.getByRole("button", {
          name: /continue to verification/i,
        })
        fireEvent.click(continueButton)

        expect(trackEvent).toHaveBeenCalledTimes(1)
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "ClickedContinueToIdVerification",
          context_page: "Identity Verification page",
          context_page_owner_id: "<IdentityVerification-mock-id-1>",
        })
      })

      it("user is redirected to the verification flow on a successful mutation", async () => {
        const env = createMockEnvironment()
        renderWithRelay({}, {}, env)

        const continueButton = screen.getByRole("button", {
          name: /continue to verification/i,
        })
        fireEvent.click(continueButton)

        env.mock.resolveMostRecentOperation(operation =>
          MockPayloadGenerator.generate(operation, {
            startIdentityVerificationMutationPayload: () => ({
              __typename: "StartIdentityVerificationSuccess",
              startIdentityVerificationResponseOrError: {
                identityVerificationFlowUrl: "www.identity.biz",
                mutationError: null,
              },
            }),
          }),
        )

        await waitFor(() => {
          expect(window.location.assign).toHaveBeenCalledWith(
            "www.identity.biz",
          )
        })
      })

      it("user sees an error toast if the mutation fails", async () => {
        const env = createMockEnvironment()
        renderWithRelay({}, {}, env)

        const continueButton = screen.getByRole("button", {
          name: /continue to verification/i,
        })
        fireEvent.click(continueButton)

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
          }),
        )

        await waitFor(() => {
          expect(
            screen.getByText(
              "Something went wrong. Please try again or contact verification@artsy.net.",
            ),
          ).toBeInTheDocument()
        })
      })

      it("shows an error message on network failiure", async () => {
        const env = createMockEnvironment()
        renderWithRelay({}, {}, env)

        const continueButton = screen.getByRole("button", {
          name: /continue to verification/i,
        })
        fireEvent.click(continueButton)

        env.mock.rejectMostRecentOperation(new Error("something went wrong"))

        await waitFor(() => {
          expect(
            screen.getByText(
              "Something went wrong. Please try again or contact verification@artsy.net.",
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })
})
