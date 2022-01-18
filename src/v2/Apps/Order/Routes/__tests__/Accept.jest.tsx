import { AcceptTestQueryRawResponse } from "v2/__generated__/AcceptTestQuery.graphql"
import {
  Buyer,
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  Offers,
} from "v2/Apps/__tests__/Fixtures/Order"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import {
  acceptOfferFailed,
  acceptOfferInsufficientInventoryFailure,
  acceptOfferPaymentFailed,
  acceptOfferPaymentFailedInsufficientFunds,
  acceptOfferPaymentRequiresAction,
  acceptOfferSuccess,
  fixFailedPaymentSuccess,
} from "../__fixtures__/MutationResults"
import { AcceptFragmentContainer } from "../Accept"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { mockLocation } from "v2/DevTools/mockLocation"
import { useTracking } from "v2/System"
import { mockStripe } from "v2/DevTools/mockStripe"

jest.unmock("react-relay")

jest.mock("v2/Utils/getCurrentTimeAsIsoString")
jest.mock("v2/System/Analytics/useTracking")
const NOW = "2018-12-05T13:47:16.446Z"
require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("@stripe/stripe-js", () => {
  let mock = null
  return {
    loadStripe: () => {
      if (mock === null) {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        mock = mockStripe()
      }
      return mock
    },
    _mockStripe: () => mock,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    _mockReset: () => (mock = mockStripe()),
  }
})

const realSetInterval = global.setInterval

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
    amount: "$sellers.offer",
    fromParticipant: "SELLER",
  },
  offers: { edges: Offers },
  buyer: Buyer,
  creditCardId: "creditCardId",
}

describe("Accept seller offer", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  beforeEach(() => {
    mockLocation()
  })

  const { mutations, buildPage, routes } = createTestEnv({
    Component: AcceptFragmentContainer,
    query: graphql`
      query AcceptTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "") {
          ...Accept_order
        }
      }
    `,
    defaultData: {
      order: testOrder,
      system: {
        time: {
          unix: 222,
        },
      },
    } as AcceptTestQueryRawResponse,
    defaultMutationResults: {
      ...acceptOfferSuccess,
      ...fixFailedPaymentSuccess,
    },
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

    it("shows the countdown timer", async () => {
      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
    })

    it("Shows the stepper", async () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckRespondNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe(`Review`)
    })

    it("shows the transaction summary", async () => {
      expect(page.transactionSummary.text()).toMatch(
        "Accept seller's offerChange"
      )
      expect(page.transactionSummary.text()).toMatch(
        "Seller's offerUS$sellers.offer"
      )
    })

    it("shows the artwork summary", async () => {
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South"
      )
    })

    it("shows the shipping details", async () => {
      expect(page.shippingSummary.text()).toMatch(
        "Ship toLockedJoelle Van Dyne401 Broadway"
      )
    })

    it("shows the payment details", async () => {
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"Lockedvisa•••• 4444   Exp 03/21"`
      )
    })

    it("shows buyer guarentee", () => {
      expect(page.buyerGuarantee.length).toBe(1)
    })

    it("shows the submit button", async () => {
      expect(page.submitButton.text()).toBe("Submit")
    })

    it("Shows the conditions of sale disclaimer.", async () => {
      expect(page.conditionsOfSaleDisclaimer.text()).toMatchInlineSnapshot(
        `"By clicking Submit, I agree to Artsy’s Conditions of Sale."`
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
        `/orders/${testOrder.internalID}/status`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mutations.useResultsOnce(acceptOfferFailed)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("commits fixFailedPayment mutation with Gravity credit card id", async () => {
      mutations.useResultsOnce(acceptOfferPaymentRequiresAction)
      await page.clickSubmit()

      expect(mutations.lastFetchVariables).toMatchObject({
        input: {
          creditCardId: "creditCardId",
          offerId: "myoffer-id",
        },
      })
    })

    it("shows an error modal if there is a capture_failed error", async () => {
      mutations.useResultsOnce(acceptOfferPaymentFailed)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Charge failed",
        "Payment authorization has been declined. Please contact your card provider, then press “Submit” again. Alternatively, use a new card."
      )
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/payment/new`
      )
    })

    it("shows an error modal if there is a capture_failed error with insufficient_funds", async () => {
      mutations.useResultsOnce(acceptOfferPaymentFailedInsufficientFunds)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Insufficient funds",
        "There aren’t enough funds available on the card you provided. Please use a new card. Alternatively, contact your card provider, then press “Submit” again."
      )
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/payment/new`
      )
    })

    it("shows an error modal and routes the user to the artist page if there is insufficient inventory", async () => {
      mutations.useResultsOnce(acceptOfferInsufficientInventoryFailure)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      const artistId = testOrder.lineItems.edges[0].node.artwork.artists[0].slug
      expect(window.location.assign).toHaveBeenCalledWith(`/artist/${artistId}`)
    })
  })
})
