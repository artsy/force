import { CounterTestQuery$rawResponse } from "v2/__generated__/CounterTestQuery.graphql"
import {
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  Offers,
} from "v2/Apps/__tests__/Fixtures/Order"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import {
  insufficientInventoryResponse,
  submitPendingOfferFailed,
  submitPendingOfferSuccess,
} from "../__fixtures__/MutationResults/submitPendingOffer"
import { CounterFragmentContainer } from "../Counter"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { useTracking } from "v2/System"

jest.mock("v2/Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)
jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const realSetInterval = global.setInterval

const testOrder: CounterTestQuery$rawResponse["order"] = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    ...OfferWithTotals,
    internalID: "lastOffer",
    id: "lastOffer",
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
    amount: "$sellers.offer",
  },
  myLastOffer: {
    ...OfferWithTotals,
    internalID: "myLastOffer",
    id: "myLastOffer",
    amount: "$your.offer",
    fromParticipant: "BUYER",
  },
  offers: { edges: Offers },
}

describe("Submit Pending Counter Offer", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  const { buildPage, mutations, routes } = createTestEnv({
    Component: CounterFragmentContainer,
    query: graphql`
      query CounterTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "") {
          ...Counter_order
        }
      }
    `,
    defaultMutationResults: {
      ...submitPendingOfferSuccess,
    },
    defaultData: {
      order: testOrder,
      system: {
        time: {
          unix: 222,
        },
      },
    } as CounterTestQuery$rawResponse,
    TestPage: OrderAppTestPage,
  })

  describe("with default data", () => {
    let page: OrderAppTestPage
    beforeAll(async () => {
      global.setInterval = jest.fn()
      page = await buildPage({
        mockData: {
          order: {
            ...testOrder,
            stateExpiresAt: DateTime.fromISO(NOW)
              .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
              .toString(),
          },
        },
      })
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("shows the countdown timer", () => {
      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
    })

    it("Shows the stepper", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckRespondNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
    })

    it("shows the transaction summary", () => {
      expect(
        page.transactionSummary.find("Entry").find("[data-test='offer']").text()
      ).toMatch("Your offerUS$your.offer")
      expect(
        page.transactionSummary.find("TransactionDetailsSummaryItem").text()
      ).toMatch("Your counterofferChange")
      expect(page.transactionSummary.text()).toMatch(
        "Seller's offerUS$sellers.offer"
      )
    })

    it("shows the artwork summary", () => {
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South"
      )
    })

    it("shows the shipping details", () => {
      expect(page.shippingSummary.text()).toMatch(
        "Ship toLockedJoelle Van Dyne401 Broadway"
      )
    })

    it("shows the payment details", () => {
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"Lockedvisa•••• 4444   Exp 03/21"`
      )
    })

    it("shows buyer guarentee", () => {
      expect(page.buyerGuarantee.length).toBe(1)
    })

    it("shows the submit button", () => {
      expect(page.submitButton.text()).toBe("Submit")
    })

    it("Shows the conditions of sale disclaimer.", () => {
      expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
        "By clicking Submit, I agree to Artsy’s Conditions of Sale."
      )
    })
  })

  describe("mutation", () => {
    let page: OrderAppTestPage
    beforeEach(async () => {
      global.setInterval = jest.fn()
      page = await buildPage()
    })

    afterEach(() => {
      global.setInterval = realSetInterval
    })

    it("routes to status page after mutation completes", async () => {
      await page.clickSubmit()
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder?.internalID}/status`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal with proper error when there is insufficient inventory", async () => {
      mutations.useResultsOnce(insufficientInventoryResponse)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "This work has already been sold.",
        "Please contact orders@artsy.net with any questions."
      )
    })

    it("shows generic error modal when there is an error from the server", async () => {
      mutations.useResultsOnce(submitPendingOfferFailed)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })
  })
})
