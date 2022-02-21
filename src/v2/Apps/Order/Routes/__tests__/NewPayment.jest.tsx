import { NewPaymentTestQuery$rawResponse } from "v2/__generated__/NewPaymentTestQuery.graphql"
import {
  OfferOrderWithShippingDetails,
  OfferWithTotals,
} from "v2/Apps/__tests__/Fixtures/Order"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import * as paymentPickerMock from "../../Components/__mocks__/PaymentPicker"
import {
  creatingCreditCardSuccess,
  fixFailedPaymentFailure,
  fixFailedPaymentInsufficientInventoryFailure,
  fixFailedPaymentSuccess,
  fixFailedPaymentWithActionRequired,
} from "../__fixtures__/MutationResults"
import { NewPaymentFragmentContainer } from "../NewPayment"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { GlobalData } from "sharify"
import { mockLocation } from "v2/DevTools/mockLocation"
import { mockStripe } from "v2/DevTools/mockStripe"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))

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

const { _mockStripe } = require("@stripe/stripe-js")

jest.mock(
  "v2/Apps/Order/Components/PaymentPicker",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return require("../../Components/__mocks__/PaymentPicker")
  }
)

const realSetInterval = global.setInterval

jest.mock("v2/Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

const testOrder: NewPaymentTestQuery$rawResponse["order"] = {
  ...OfferOrderWithShippingDetails,
  internalID: "1234",
  state: "SUBMITTED",
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
  },
}

describe("Payment", () => {
  beforeAll(() => {
    window.sd = { STRIPE_PUBLISHABLE_KEY: "" } as GlobalData
  })
  const { buildPage, mutations, routes, ...hooks } = createTestEnv({
    Component: NewPaymentFragmentContainer,
    defaultData: {
      order: testOrder,
      me: { creditCards: { edges: [] } },
      system: {
        time: {
          unix: 222,
        },
      },
    },
    defaultMutationResults: {
      ...creatingCreditCardSuccess,
      ...fixFailedPaymentSuccess,
    },
    query: graphql`
      query NewPaymentTestQuery @raw_response_type @relay_test_operation {
        me {
          ...NewPayment_me
        }
        order: commerceOrder(id: "unused") {
          ...NewPayment_order
        }
      }
    `,
    TestPage: OrderAppTestPage,
  })

  beforeEach(() => {
    mockLocation()
    hooks.clearErrors()
    global.setInterval = jest.fn()
  })

  afterEach(() => {
    hooks.clearMocksAndErrors()
    global.setInterval = realSetInterval
  })

  it("shows the countdown timer", async () => {
    const page = await buildPage({
      mockData: {
        order: {
          ...testOrder,
          stateExpiresAt: DateTime.fromISO(NOW)
            .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
            .toString(),
        },
      },
    })

    expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
  })

  it("shows the button spinner while loading the mutation", async () => {
    const page = await buildPage()
    await page.expectButtonSpinnerWhenSubmitting()
  })

  it("commits fixFailedPayment mutation with Gravity credit card id", async () => {
    const page = await buildPage()
    await page.clickSubmit()

    expect(mutations.lastFetchVariables).toMatchObject({
      input: {
        creditCardId: "credit-card-id",
        offerId: "myoffer-id",
      },
    })
  })

  it("takes the user to the status page", async () => {
    const page = await buildPage()
    await page.clickSubmit()
    expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/status")
  })

  it("does not do anything when there are form errors", async () => {
    const page = await buildPage()
    paymentPickerMock.useInvalidFormResult()
    await page.clickSubmit()
    expect(mutations.mockFetch).not.toHaveBeenCalled()
    expect(routes.mockPushRoute).not.toHaveBeenCalled()
    expect(page.modalDialog.props().show).toBeFalsy()
  })

  it("shows the default error modal when the payment picker throws an error", async () => {
    paymentPickerMock.useThrownError()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  it("shows an error modal and redirects to artist page when not enough inventory", async () => {
    const page = await buildPage()

    mutations.useResultsOnce(fixFailedPaymentInsufficientInventoryFailure)

    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "Not available",
      "Sorry, the work is no longer available."
    )
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const artistId = testOrder.lineItems.edges[0].node.artwork.artists[0].slug
    expect(window.location.assign).toHaveBeenCalledWith(`/artist/${artistId}`)
  })

  it("shows a custom error modal with when the payment picker returns a normal error", async () => {
    paymentPickerMock.useErrorResult()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "This is the description of an error.",
      "Please enter another payment method or contact your bank for more information."
    )
  })

  it("shows an error modal with the title 'An internal error occurred' and the default message when the payment picker returns an error with the type 'internal_error'", async () => {
    paymentPickerMock.useInternalErrorResult()
    const page = await buildPage()
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "An internal error occurred",
      "Please try again or contact orders@artsy.net."
    )
  })

  it("shows an error modal when fixing the failed payment fails", async () => {
    const page = await buildPage()
    mutations.useResultsOnce(fixFailedPaymentFailure)
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "Charge failed",
      "Payment authorization has been declined. Please contact your card provider and try again."
    )
  })

  it("shows an error modal when there is a network error", async () => {
    const page = await buildPage()
    mutations.mockNetworkFailureOnce()

    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  it("shows SCA modal when required", async () => {
    const page = await buildPage()
    mutations.useResultsOnce(fixFailedPaymentWithActionRequired)

    await page.clickSubmit()
    expect(_mockStripe().handleCardAction).toBeCalledWith("client-secret")
  })
})
