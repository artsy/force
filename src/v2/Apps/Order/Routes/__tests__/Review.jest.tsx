import { ReviewTestQueryRawResponse } from "v2/__generated__/ReviewTestQuery.graphql"
import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
} from "v2/Apps/__tests__/Fixtures/Order"
import { OfferSummaryItemFragmentContainer } from "v2/Apps/Order/Components/OfferSummaryItem"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { expectOne } from "v2/DevTools/RootTestPage"
import { graphql } from "react-relay"
import {
  submitOfferOrderFailedConfirmation,
  submitOfferOrderSuccess,
  submitOfferOrderWithActionRequired,
  submitOfferOrderWithFailure,
  submitOfferOrderWithNoInventoryFailure,
  submitOfferOrderWithVersionMismatchFailure,
  submitOrderSuccess,
  submitOrderWithActionRequired,
  submitOrderWithFailure,
  submitOrderWithFailureCardDeclined,
  submitOrderWithFailureInsufficientFunds,
  submitOrderWithMissingInfo,
  submitOrderWithNoInventoryFailure,
  submitOrderWithVersionMismatchFailure,
} from "../__fixtures__/MutationResults"
import { ReviewFragmentContainer } from "../Review"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { GlobalData } from "sharify"
import { mockLocation } from "v2/DevTools/mockLocation"

jest.unmock("react-relay")

const testOrder: ReviewTestQueryRawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
}

class ReviewTestPage extends OrderAppTestPage {
  get offerSummary() {
    return expectOne(this.root.find(OfferSummaryItemFragmentContainer))
  }
}

const handleCardAction = jest.fn()
const handleCardSetup = jest.fn()

describe("Review", () => {
  beforeAll(() => {
    // @ts-ignore
    window.Stripe = () => {
      return { handleCardAction, handleCardSetup }
    }

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" } as GlobalData
  })

  beforeEach(() => {
    mockLocation()
  })

  const { buildPage, mutations, routes } = createTestEnv({
    Component: ReviewFragmentContainer,
    defaultData: {
      order: testOrder,
    },
    defaultMutationResults: {
      ...submitOrderSuccess,
      ...submitOfferOrderSuccess,
    },
    query: graphql`
      query ReviewTestQuery @raw_response_type {
        order: commerceOrder(id: "unused") {
          ...Review_order
        }
      }
    `,
    TestPage: ReviewTestPage,
  })

  describe("buy-mode orders", () => {
    let page: ReviewTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("enables the button and routes to the payoff page", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/status")
    })

    it("takes the user back to the /shipping view", () => {
      page.shippingSummary.find("a").simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/shipping")
    })

    it("takes the user back to the /payment view", () => {
      page.paymentSummary.find("a").simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/payment")
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mutations.useResultsOnce(submitOrderWithFailure)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      mutations.useResultsOnce(submitOrderWithVersionMismatchFailure)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Work has been updated",
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal with a helpful error message if a user has not entered shipping and payment information", async () => {
      mutations.useResultsOnce(submitOrderWithMissingInfo)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Missing information",
        "Please review and update your shipping and/or payment details and try again."
      )
    })

    it("shows a modal with a helpful error message if the user's card is declined", async () => {
      mutations.useResultsOnce(submitOrderWithFailureCardDeclined)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Charge failed",
        "Payment authorization has been declined. Please contact your card provider and try again."
      )
    })

    it("shows a modal with a helpful error message if the user's card is declined due to insufficient funds", async () => {
      mutations.useResultsOnce(submitOrderWithFailureInsufficientFunds)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Insufficient funds",
        "There aren't enough funds available on the payment methods you provided. Please contact your card provider or try another card."
      )
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      mutations.useResultsOnce(submitOrderWithNoInventoryFailure)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })
    it("shows SCA modal when required", async () => {
      mutations.useResultsOnce(submitOrderWithActionRequired)

      await page.clickSubmit()
      expect(handleCardAction).toBeCalledWith("client-secret")
    })
  })

  describe("Offer-mode orders", () => {
    let page: ReviewTestPage
    beforeEach(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetails,
            internalID: "offer-order-id",
          },
        },
      })
    })

    it("shows an active offer stepper if the order is an Offer Order", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckOffer Navigate rightCheckShipping Navigate rightCheckPayment Navigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
    })

    it("shows an offer section in the shipping and payment review", () => {
      expect(page.offerSummary.text()).toMatch("Your offer")
      page.offerSummary.find("a").simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith(
        "/orders/offer-order-id/offer"
      )
    })

    it("does not show the offer note section if the offer has no note", () => {
      expect(page.offerSummary.text()).not.toMatch("Your note")
    })

    it("shows an offer note if one exists", async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetailsAndNote,
          },
        },
      })
      expect(page.offerSummary.text()).toMatch("Your noteThis is a note!")
    })

    it("enables the button and routes to the payoff page", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(routes.mockPushRoute).toBeCalledWith(
        "/orders/offer-order-id/status"
      )
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mutations.useResultsOnce(submitOfferOrderWithFailure)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      mutations.useResultsOnce(submitOfferOrderWithVersionMismatchFailure)

      await page.clickSubmit()

      await page.expectAndDismissErrorDialogMatching(
        "Work has been updated",
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      )
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal if there is a payment_method_confirmation_failed", async () => {
      mutations.useResultsOnce(submitOfferOrderFailedConfirmation)

      await page.clickSubmit()

      await page.expectAndDismissErrorDialogMatching(
        "Your card was declined",
        "We couldn't authorize your credit card. Please enter another payment method or contact your bank for more information."
      )
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      mutations.useResultsOnce(submitOfferOrderWithNoInventoryFailure)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
    })

    it("shows SCA modal when required", async () => {
      mutations.useResultsOnce(submitOfferOrderWithActionRequired)

      await page.clickSubmit()
      expect(handleCardSetup).toBeCalledWith("client-secret")
    })
  })
})
