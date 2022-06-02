import { ReviewTestQueryRawResponse } from "v2/__generated__/ReviewTestQuery.graphql"
import {
  BuyOrderWithArtaShippingDetails,
  BuyOrderWithBankDebitDetails,
  BuyOrderWithShippingDetails,
  OfferOrderWithMissingMetadata,
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
import { mockLocation } from "v2/DevTools/mockLocation"
import { mockStripe } from "v2/DevTools/mockStripe"
import { TransactionDetailsSummaryItem } from "../../Components/TransactionDetailsSummaryItem"
import { PaymentMethodSummaryItem } from "../../Components/PaymentMethodSummaryItem"
import { cloneDeep } from "lodash"
import { useTracking } from "v2/System"

jest.unmock("react-relay")

jest.mock("v2/System/Analytics/useTracking")
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

const testOrder: ReviewTestQueryRawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
  impulseConversationId: null,
}

class ReviewTestPage extends OrderAppTestPage {
  get offerSummary() {
    return expectOne(this.root.find(OfferSummaryItemFragmentContainer))
  }
}

describe("Review", () => {
  beforeAll(() => {
    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  beforeEach(() => {
    mockLocation()
  })

  const { buildPage, mutations, routes, ...hooks } = createTestEnv({
    Component: ReviewFragmentContainer,
    defaultData: {
      order: testOrder,
    },
    defaultMutationResults: {
      ...submitOrderSuccess,
      ...submitOfferOrderSuccess,
    },
    query: graphql`
      query ReviewTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Review_order
        }
      }
    `,
    TestPage: ReviewTestPage,
  })

  beforeEach(hooks.clearErrors)

  afterEach(hooks.clearMocksAndErrors)

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
      page.shippingSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/shipping")
    })

    it("takes the user back to the /payment view", () => {
      page.paymentSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/payment")
    })

    it("shows buyer guarentee", () => {
      expect(page.buyerGuarantee.length).toBe(1)
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
      expect(_mockStripe().handleCardAction).toBeCalledWith("client-secret")
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
            impulseConversationId: null,
          },
        },
      })
    })

    it("shows an active offer stepper if the order is an Offer Order", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckOfferNavigate rightCheckShippingNavigate rightCheckPaymentNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
    })

    it("shows an offer section in the shipping and payment review", () => {
      expect(page.offerSummary.text()).toMatch("Your offer")
      page.offerSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")
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
            impulseConversationId: null,
          },
        },
      })
      expect(page.offerSummary.text()).toMatch("Your noteThis is a note!")
    })

    it("enables the button and routes to the artwork page", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(routes.mockPushRoute).toBeCalledWith(
        "/artwork/artworkId?order-submitted=true"
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
      expect(_mockStripe().confirmCardSetup).toBeCalledWith("client-secret")
    })
  })

  describe("Arta shipping", () => {
    let page: ReviewTestPage
    beforeEach(async () => {
      const buyOrderWithArtaShippingDetails = cloneDeep(
        BuyOrderWithArtaShippingDetails
      ) as any
      buyOrderWithArtaShippingDetails.lineItems.edges[0].node.selectedShippingQuote =
        buyOrderWithArtaShippingDetails.lineItems.edges[0].node.shippingQuoteOptions.edges[0].node

      page = await buildPage({
        mockData: {
          order: {
            ...buyOrderWithArtaShippingDetails,
            internalID: "1234",
            impulseConversationId: null,
          },
        },
      })
    })

    it("takes the user back to the /shipping view", () => {
      page.shippingArtaSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")
      expect(routes.mockPushRoute).toBeCalledWith("/orders/1234/shipping")
    })

    it("contains correct Arta shipping infirmation", () => {
      const text = page.shippingArtaSummary.text()

      expect(text).toContain("Shipping")
      expect(text).toContain("Standard delivery")
      expect(text).toContain("($1.00)")
    })

    it("ship to section contains shipping address", () => {
      const text = page.shippingSummary.text()

      expect(text).toContain("401 Broadway")
      expect(text).toContain("Suite 25")
      expect(text).toContain("New York")
      expect(text).toContain("United States")
      expect(text).toContain("Joelle Van Dyne")
      expect(text).toContain("10013")
      expect(text).toContain("NY")
      expect(text).toContain("120938120983")
    })
  })

  describe("Inquiry offer orders", () => {
    let page: ReviewTestPage
    beforeEach(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...OfferOrderWithMissingMetadata,
            impulseConversationId: "5665",
          },
        },
      })
    })

    it("shows a placeholder override for inquiry offers with missing metadata", () => {
      expect(page.root.find(TransactionDetailsSummaryItem).text()).toMatch(
        "Waiting for final costs"
      )
    })

    it("shows message about shipping and tax confirmation for inquiry offers with missing metadata", () => {
      expect(page.text()).toMatch(
        "*Shipping costs to be confirmed by gallery. You will be able to review the total price before payment."
      )
    })

    it("does not show message about shipping and tax confirmation for buy now orders", async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...BuyOrderWithShippingDetails,
            impulseConversationId: null,
          },
        },
      })
      expect(page.text()).not.toMatch(
        "*Shipping and taxes to be confirmed by gallery"
      )
    })

    it("enables the button and routes to the conversation", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(routes.mockPushRoute).toBeCalledWith("/user/conversations/5665")
    })
  })

  describe("Inquiry buy-mode orders", () => {
    let page: ReviewTestPage
    beforeEach(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...BuyOrderWithShippingDetails,
            source: "inquiry",
            impulseConversationId: "5665",
          },
        },
      })
    })

    // TODO: Unskip test when "conversational-buy-now" feature flag is removed
    it.skip("enables the button and routes to the conversation", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(routes.mockPushRoute).toBeCalledWith("/user/conversations/5665")
    })
  })

  describe("Bank debit orders", () => {
    let page: ReviewTestPage

    beforeEach(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...BuyOrderWithBankDebitDetails,
            impulseConversationId: null,
          },
        },
      })
    })

    // TODO: Unskip test when stripe-ACH feature flag is removed
    it.skip("shows bank transfer as payment method", () => {
      expect(page.root.find(PaymentMethodSummaryItem).text()).toMatch(
        "Bank transfer"
      )
    })
  })
})
