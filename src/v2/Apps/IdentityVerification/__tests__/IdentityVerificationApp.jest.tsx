import { IdentityVerificationAppTestQueryRawResponse } from "v2/__generated__/IdentityVerificationAppTestQuery.graphql"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import deepMerge from "deepmerge"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { expectOne } from "v2/DevTools/RootTestPage"
import { graphql } from "react-relay"
import { IdentityVerificationAppQueryResponseFixture } from "../__fixtures__/routes_IdentityVerificationAppQuery"
import { IdentityVerificationAppFragmentContainer } from "../IdentityVerificationApp"
import { IdentityVerificationAppTestPage } from "./Utils/IdentityVerificationAppTestPage"
import { mockLocation } from "v2/DevTools/mockLocation"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))

const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

const setupTestEnv = () => {
  return createTestEnv({
    TestPage: IdentityVerificationAppTestPage,
    Component: IdentityVerificationAppFragmentContainer,
    query: graphql`
      query IdentityVerificationAppTestQuery
        @raw_response_type
        @relay_test_operation {
        identityVerification(id: "identity-verification-id") {
          ...IdentityVerificationApp_identityVerification
            @arguments(id: "identity-verification-id")
        }
      }
    `,
    defaultData: IdentityVerificationAppQueryResponseFixture as IdentityVerificationAppTestQueryRawResponse,
    defaultMutationResults: {
      startIdentityVerification: {
        startIdentityVerificationResponseOrError: {
          identityVerificationFlowUrl: "www.identity.biz",
          mutationError: null,
        },
      },
    },
  })
}

describe("IdentityVerification route", () => {
  describe("for signed-in user", () => {
    describe("unactionable end states", () => {
      it("renders a message about an identity verification that is `passed`", async () => {
        const env = setupTestEnv()

        const page = await env.buildPage({
          mockData: deepMerge(IdentityVerificationAppQueryResponseFixture, {
            identityVerification: {
              state: "passed",
            },
          }),
        })

        expect(page.text()).toContain("Identity verification complete")
        expect(page.startVerificationButton.exists()).toBeFalsy()
        expect(page.finishButton.exists()).toBeTruthy()
      })

      it("renders a message about an identity verification that is `failed`", async () => {
        const env = setupTestEnv()

        const page = await env.buildPage({
          mockData: deepMerge(IdentityVerificationAppQueryResponseFixture, {
            identityVerification: {
              state: "failed",
            },
          }),
        })

        expect(page.text()).toContain("Identity verification failed")
        expect(page.startVerificationButton.exists()).toBeFalsy()
        expect(page.contactSupportButton.exists()).toBeTruthy()
      })

      it("renders a message about an identity verification that is `watchlist_hit`", async () => {
        const env = setupTestEnv()

        const page = await env.buildPage({
          mockData: deepMerge(IdentityVerificationAppQueryResponseFixture, {
            identityVerification: {
              state: "watchlist_hit",
            },
          }),
        })

        expect(page.text()).toContain(
          "Artsy is reviewing your identity verification"
        )
        expect(page.startVerificationButton.exists()).toBeFalsy()
        expect(page.returnHomeButton.exists()).toBeTruthy()
      })
    })

    it("allows an identity verification instance's owner to view the landing page", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      expect(page.text()).toContain("Artsy identity verification")
    })

    // it("shows a message if the user does not own the identity verification", async () => {
    //   const env = setupTestEnv()

    //   const page = await env.buildPage({
    //     mockData: deepMerge(IdentityVerificationAppQueryResponseFixture, {
    //       me: {
    //         email: "barry@example.com",
    //         internalID: "some-guy",
    //         identityVerification: {
    //           userID: "someone-else",
    //         },
    //       },
    //     }),
    //   })

    //   expect(page.text()).toContain(
    //     "You are currently logged in as barry@example.com. To complete identity verification, please log out of this account, and log back into the account that received the email."
    //   )
    // })

    describe("user enters verification flow", () => {
      beforeAll(() => {
        mockLocation()
      })

      it("user click on 'continue to verification' button is tracked", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()

        await page.clickStartVerification()

        expect(mockPostEvent).toHaveBeenCalledTimes(1)
        expect(mockPostEvent).toHaveBeenCalledWith({
          action_type: "ClickedContinueToIdVerification",
          context_page: "Identity Verification page",
          context_page_owner_id: "identity-verification-id",
        })
      })

      it("user is redirected to the verification flow on a successful mutation", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()

        await page.clickStartVerification()
        expect(window.location.assign).toHaveBeenCalledWith("www.identity.biz")
      })

      it("user sees an error modal if the mutation fails", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()
        const badResult = {
          startIdentityVerification: {
            startIdentityVerificationResponseOrError: {
              mutationError: {
                error: "something bad :|",
                message: "oh noes",
                detail: "beep boop beep",
              },
            },
          },
        }
        env.mutations.useResultsOnce(badResult)

        await page.clickStartVerification()
        const errorModal = expectOne(page.find(ErrorModal))
        expect(errorModal.props().show).toBe(true)
        expect(page.text()).toContain(
          "Something went wrong. Please try again or contact verification@artsy.net."
        )
      })

      it("shows an error message on network failiure", async () => {
        const env = setupTestEnv()
        const page = await env.buildPage()
        env.mutations.mockNetworkFailureOnce()

        await page.clickStartVerification()
        const errorModal = expectOne(page.find(ErrorModal))
        expect(errorModal.props().show).toBe(true)
        expect(page.text()).toContain(
          "Something went wrong. Please try again or contact verification@artsy.net."
        )
      })
    })
  })
})
