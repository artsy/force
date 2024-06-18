import { ReviewTestQuery$rawResponse } from "__generated__/ReviewTestQuery.graphql"
import {
  PrivateSaleOrderWithShippingDetails,
  BuyOrderWithArtaShippingDetails,
  BuyOrderWithBankDebitDetails,
  BuyOrderWithShippingDetails,
  BuyOrderWithWireTransferDetails,
  OfferOrderWithMissingMetadata,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
} from "Apps/__tests__/Fixtures/Order"
import { OfferSummaryItemFragmentContainer } from "Apps/Order/Components/OfferSummaryItem"
import { expectOne } from "DevTools/RootTestPage"
import { graphql } from "react-relay"
import { ReviewFragmentContainer } from "Apps/Order/Routes/Review"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { mockLocation } from "DevTools/mockLocation"
import { mockStripe } from "DevTools/mockStripe"
import { TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { PaymentMethodSummaryItem } from "Apps/Order/Components/PaymentMethodSummaryItem"
import { cloneDeep } from "lodash"
import { useTracking } from "react-tracking"
import { waitFor } from "@testing-library/react"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import {
  submitOfferOrderSuccess,
  submitOfferOrderWithFailure,
  submitOfferOrderWithVersionMismatchFailure,
  submitOfferOrderFailedConfirmation,
  submitOfferOrderWithNoInventoryFailure,
  submitOfferOrderWithActionRequired,
  submitOfferOrderSuccessInReview,
} from "Apps/Order/Routes/__fixtures__/MutationResults/submitOfferOrder"
import {
  submitOrderSuccess,
  submitOrderWithFailure,
  submitOrderWithVersionMismatchFailure,
  submitOrderWithMissingInfo,
  submitOrderWithFailureCardDeclined,
  submitOrderWithFailureInsufficientFunds,
  submitOrderWithNoInventoryFailure,
  submitOrderWithActionRequired,
  submitOrderWithFailureCurrencyNotSupported,
} from "Apps/Order/Routes/__fixtures__/MutationResults/submitOrder"
import { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { RouterLink } from "System/Components/RouterLink"

jest.unmock("react-relay")

jest.mock("react-tracking")
jest.mock("@stripe/stripe-js", () => {
  let mock = null
  return {
    loadStripe: jest.fn(() => {
      if (mock === null) {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        mock = mockStripe()
      }
      return mock
    }),
    _mockStripe: () => mock,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    _mockReset: () => (mock = mockStripe()),
  }
})
const { loadStripe, _mockStripe } = require("@stripe/stripe-js")
jest.mock("System/Hooks/useFeatureFlag")

const mockShowErrorDialog = jest.fn()
jest.mock("Apps/Order/Dialogs", () => ({
  ...jest.requireActual("../../Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const mockCommitMutation = jest.fn()
jest.mock("Apps/Order/Utils/commitMutation", () => ({
  ...jest.requireActual("../../Utils/commitMutation"),
  injectCommitMutation: Component => props => (
    <Component {...props} commitMutation={mockCommitMutation} />
  ),
}))

const testOrder: ReviewTestQuery$rawResponse["order"] = {
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
  let isEigen
  const pushMock = jest.fn()

  beforeAll(() => {
    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
    window.ReactNativeWebView = { postMessage: jest.fn() }
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  beforeEach(() => {
    isEigen = false
    jest.clearAllMocks()
    mockLocation()
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot context={{ isEigen }}>
        <ReviewFragmentContainer
          {...props}
          router={{ push: pushMock } as any}
          route={{ onTransition: jest.fn() }}
        />
      </MockBoot>
    ),
    query: graphql`
      query ReviewTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Review_order
        }
      }
    `,
  })

  describe("buy-mode orders", () => {
    it("enables the button and routes to the payoff page", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderSuccess)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/orders/1234/status")
    })

    it("disables the submit button when props.stripe is not present", () => {
      loadStripe.mockReturnValueOnce(null)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      expect(page.submitButton.props().disabled).toBeTruthy()
    })

    it("takes the user back to the /shipping view", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      page.shippingSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")

      expect(pushMock).toBeCalledWith("/orders/1234/shipping")
    })

    it("takes the user back to the /payment view", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      page.paymentSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")

      expect(pushMock).toBeCalledWith("/orders/1234/payment")
    })

    it("shows buyer guarentee", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.buyerGuarantee.length).toBe(1)
    })

    it("shows the conditions of sale disclaimer", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
        "By clicking Submit, I agree to Artsy’s Conditions of Sale."
      )
      expect(
        page.conditionsOfSaleDisclaimer.find(RouterLink).props().to
      ).toEqual("/conditions-of-sale")
    })

    describe("when the new disclaimer is enabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(
          (f: string) => f === "diamond_new-terms-and-conditions"
        )
      })

      afterAll(() => {
        ;(useFeatureFlag as jest.Mock).mockReset()
      })

      it("renders the new disclaimer", () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new ReviewTestPage(wrapper)

        expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
          "By clicking Submit, I agree to Artsy’s General Terms and Conditions of Sale."
        )
        expect(
          page.conditionsOfSaleDisclaimer.find(RouterLink).props().to
        ).toEqual("/terms")
      })
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithFailure)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOrderWithVersionMismatchFailure
      )
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Work has been updated",
        message:
          "Something about the work changed since you started checkout. Please review the work before submitting your order.",
      })
      expect(pushMock).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal with a helpful error message if a user has not entered shipping and payment information", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithMissingInfo)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Missing information",
        message:
          "Please review and update your shipping and/or payment details and try again.",
      })
    })

    it("shows a modal with a helpful error message if the user's card is declined", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithFailureCardDeclined)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Charge failed",
        message:
          "Payment has been declined. Please contact your card provider or bank institution, then press “Submit” again. Alternatively, use another payment method.",
      })
    })

    it("shows a modal with a helpful error message if the user's card is declined due to insufficient funds", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOrderWithFailureInsufficientFunds
      )
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Insufficient funds",
        message:
          "There aren't enough funds available on the payment methods you provided. Please contact your card provider or try another card.",
      })
    })

    it("shows a modal with a helpful error message if the user's card is declined due to currency not supported", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOrderWithFailureCurrencyNotSupported
      )
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      const {
        title: expectedTitle,
        formattedMessage: expectedFormattedMessage,
      } = getErrorDialogCopy(ErrorDialogs.CurrencyNotSupported)

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: expectedTitle,
        message: expectedFormattedMessage,
      })
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithNoInventoryFailure)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Not available",
        message: "Sorry, the work is no longer available.",
      })

      expect(pushMock).toHaveBeenCalledWith(`/artwork/artworkId`)
    })

    it("shows a modal when the seller's Stripe Connect account is inactive", async () => {
      mockCommitMutation.mockResolvedValue({
        commerceSubmitOrder: {
          orderOrError: {
            error: {
              code: "stripe_account_inactive",
            },
          },
        },
      })

      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })

      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "An error occurred",
        message:
          "Your payment could not be processed. Please contact orders@artsy.net for assistance.",
      })
    })

    it("shows a modal when the buyer's credit card is deactivated", async () => {
      mockCommitMutation.mockResolvedValue({
        commerceSubmitOrder: {
          orderOrError: {
            error: {
              code: "credit_card_deactivated",
            },
          },
        },
      })

      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })

      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Unable to process card",
        message:
          "This card is inactive or no longer available. Please confirm with your card issuer if this card is active, try another payment method, or contact orders@artsy.net.",
      })
    })

    it("shows SCA modal when required", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithActionRequired)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(_mockStripe().handleCardAction).toBeCalledWith("client-secret")
    })
  })

  describe("Offer-mode orders", () => {
    const testOffer = {
      ...OfferOrderWithShippingDetails,
      internalID: "offer-order-id",
      impulseConversationId: null,
    }

    it("shows an active offer stepper if the order is an Offer Order", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"OfferShippingPaymentReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
      expect(page.offerSummary.text()).not.toMatch("Your note")
    })

    it("shows an offer section in the shipping and payment review", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.offerSummary.text()).toMatch("Your offer")
      page.offerSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")
      expect(pushMock).toBeCalledWith("/orders/offer-order-id/offer")
    })

    it("shows an offer note if one exists", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...OfferOrderWithShippingDetailsAndNote,
          impulseConversationId: null,
        }),
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.offerSummary.text()).toMatch("Your noteThis is a note!")
    })

    it("enables the button and routes to the artwork page", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith(
        "/artwork/artworkId?order-submitted=offer-order-id"
      )
    })

    it("shows the conditions of sale disclaimer", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
        "By clicking Submit, I agree to Artsy’s Conditions of Sale."
      )
    })

    describe("when the new disclaimer is enabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(
          (f: string) => f === "diamond_new-terms-and-conditions"
        )
      })

      afterAll(() => {
        ;(useFeatureFlag as jest.Mock).mockReset()
      })

      it("renders the new disclaimer", () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new ReviewTestPage(wrapper)

        expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
          "By clicking Submit, I agree to Artsy’s General Terms and Conditions of Sale."
        )
        expect(
          page.conditionsOfSaleDisclaimer.find(RouterLink).props().to
        ).toEqual("/terms")
      })
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderWithFailure)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOfferOrderWithVersionMismatchFailure
      )
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Work has been updated",
        message:
          "Something about the work changed since you started checkout. Please review the work before submitting your order.",
      })

      expect(pushMock).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal if there is a payment_method_confirmation_failed", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderFailedConfirmation)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Your card was declined",
        message:
          "We couldn't authorize your credit card. Please enter another payment method or contact your bank for more information.",
      })
    })

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOfferOrderWithNoInventoryFailure
      )
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Not available",
        message: "Sorry, the work is no longer available.",
      })
    })

    it("shows SCA modal when required", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderWithActionRequired)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(_mockStripe().confirmCardSetup).toBeCalledWith("client-secret")
    })

    describe("isEigen", () => {
      const testOffer = {
        ...OfferOrderWithShippingDetails,
        internalID: "offer-order-id",
        impulseConversationId: null,
      }

      beforeEach(async () => {
        isEigen = true
      })

      it("dispatches message given Eigen when the offer is submitted", async () => {
        mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOffer,
        })
        const page = new ReviewTestPage(wrapper)
        await page.clickSubmit()

        expect(window.ReactNativeWebView?.postMessage).toHaveBeenCalledWith(
          JSON.stringify({
            key: "goToInboxOnMakeOfferSubmission",
            orderCode: "abcdefg",
            message:
              "The seller will respond to your offer by Jan 15. Keep in mind making an offer doesn’t guarantee you the work.",
          })
        )

        await waitFor(() =>
          expect(pushMock).toHaveBeenCalledWith("/orders/offer-order-id/status")
        )
      })
    })
  })

  describe("Arta shipping", () => {
    const buyOrderWithArtaShippingDetails = cloneDeep(
      BuyOrderWithArtaShippingDetails
    ) as any
    buyOrderWithArtaShippingDetails.lineItems.edges[0].node.selectedShippingQuote =
      buyOrderWithArtaShippingDetails.lineItems.edges[0].node.shippingQuoteOptions.edges[0].node
    const testOrder = {
      ...buyOrderWithArtaShippingDetails,
      internalID: "1234",
      impulseConversationId: null,
    }

    it("takes the user back to the /shipping view", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      page.shippingArtaSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")

      expect(pushMock).toBeCalledWith("/orders/1234/shipping")
    })

    it("renders shipping information", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)

      const shippingArtaSummary = page.shippingArtaSummary.text()
      expect(shippingArtaSummary).toContain("Shipping")
      expect(shippingArtaSummary).toContain("Standard delivery")
      expect(shippingArtaSummary).toContain("($1.00)")

      const shippingSummary = page.shippingSummary.text()
      expect(shippingSummary).toContain("401 Broadway")
      expect(shippingSummary).toContain("Suite 25")
      expect(shippingSummary).toContain("New York")
      expect(shippingSummary).toContain("United States")
      expect(shippingSummary).toContain("Joelle Van Dyne")
      expect(shippingSummary).toContain("10013")
      expect(shippingSummary).toContain("NY")
      expect(shippingSummary).toContain("120938120983")
    })
  })

  describe("Inquiry offer orders", () => {
    it("renders with inquiry extra information", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...OfferOrderWithMissingMetadata,
          impulseConversationId: "5665",
        }),
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.root.find(TransactionDetailsSummaryItem).text()).toMatch(
        "Waiting for final costs"
      )
      expect(page.text()).toMatch(
        "*Shipping costs to be confirmed by gallery. You will be able to review the total price before payment."
      )
    })

    it("does not show message about shipping and tax confirmation for buy now orders", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...BuyOrderWithShippingDetails,
          impulseConversationId: null,
        }),
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.text()).not.toMatch(
        "*Shipping and taxes to be confirmed by gallery"
      )
    })

    it("enables the button and routes to the conversation", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...OfferOrderWithMissingMetadata,
          impulseConversationId: "5665",
        }),
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/user/conversations/5665")
    })
  })

  describe("Inquiry buy-mode orders", () => {
    it("enables the button and routes to the conversation", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...BuyOrderWithShippingDetails,
          source: "inquiry",
          impulseConversationId: "5665",
        }),
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/user/conversations/5665")
    })
  })

  describe("Bank debit orders", () => {
    it("shows bank transfer as payment method", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...BuyOrderWithBankDebitDetails,
          impulseConversationId: null,
        }),
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.root.find(PaymentMethodSummaryItem).text()).toMatch(
        "Bank transfer •••• 1234"
      )
    })
  })

  describe("Wire transfer orders", () => {
    it("shows bank transfer as payment method", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...BuyOrderWithWireTransferDetails,
          impulseConversationId: null,
        }),
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.root.find(PaymentMethodSummaryItem).text()).toMatch(
        "Wire transfer"
      )
    })
  })

  describe("private sale orders", () => {
    let page

    const privateSaleOrderWithWire = {
      ...PrivateSaleOrderWithShippingDetails,
      availablePaymentMethods: ["WIRE_TRANSFER"] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => privateSaleOrderWithWire,
      })
      page = new ReviewTestPage(wrapper)
    })

    it("does not allow the user go back to /shipping", () => {
      const changeShippingButton = page.find(`[data-test="change-link"]`)
      expect(changeShippingButton).toMatchObject({})
    })

    it("renders 'Complete Purchase' for submit button", () => {
      const button = page
        .find(`[data-test="review-step-submit-button"]`)
        .first()
      expect(button.text()).toContain("Complete Purchase")
    })

    it("renders Artsy Private Sales conditions complete message", () => {
      expect(page.text()).toContain(
        "Artsy Private Sales LLC Conditions of Sale"
      )
      expect(page.text()).toContain(
        "and any Additional Conditions of Sale specified on this page and in the order confirmation email."
      )
    })

    it("displays additional artwork details from order", () => {
      expect(page.text()).toContain("Artwork Description")
      expect(page.text()).toContain(
        "additional artwork details provided by admin"
      )
    })

    it("displays artwork provenance", () => {
      expect(page.text()).toContain("Artwork Description")
      expect(page.text()).toContain(
        "Provenance: Artwork acquired via an auction in 2000"
      )
    })

    it("displays artwork condition description", () => {
      expect(page.text()).toContain("Artwork Description")
      expect(page.text()).toContain(
        "Condition: Artwork is in perfect condition"
      )
    })
  })

  describe("in-review offers", () => {
    const OfferOrderToSubmit = {
      ...OfferOrderWithShippingDetails,
      state: "PENDING",
      internalID: "offer-order-id",
      impulseConversationId: null,
    }

    describe("from an artwork page", () => {
      const OfferOrderInReviewFromArtworkPage = {
        ...OfferOrderToSubmit,
        source: "artwork_page",
      }

      it("routes to the status page", async () => {
        mockCommitMutation.mockResolvedValue(submitOfferOrderSuccessInReview)
        const { wrapper } = getWrapper({
          CommerceOrder: () => OfferOrderInReviewFromArtworkPage,
        })
        const page = new ReviewTestPage(wrapper)
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
        expect(pushMock).toBeCalledWith("/orders/offer-order-id/status")
      })
    })

    describe("from an inquiry", () => {
      const OfferOrderInReviewFromInquiry = {
        ...OfferOrderToSubmit,
        source: "inquiry",
        impulseConversationId: "impulse-conversation-id",
      }

      it("routes to the conversation", async () => {
        mockCommitMutation.mockResolvedValue(submitOfferOrderSuccessInReview)
        const { wrapper } = getWrapper({
          CommerceOrder: () => OfferOrderInReviewFromInquiry,
        })
        const page = new ReviewTestPage(wrapper)
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
        expect(pushMock).toBeCalledWith(
          "/user/conversations/impulse-conversation-id"
        )
      })
    })

    describe("isEigen", () => {
      beforeEach(async () => {
        isEigen = true
      })

      describe("from an artwork page", () => {
        const OfferOrderInReviewFromArtworkPage = {
          ...OfferOrderToSubmit,
          source: "artwork_page",
        }

        it("dispatches message and routes to status page", async () => {
          mockCommitMutation.mockResolvedValue(submitOfferOrderSuccessInReview)
          const { wrapper } = getWrapper({
            CommerceOrder: () => OfferOrderInReviewFromArtworkPage,
          })
          const page = new ReviewTestPage(wrapper)
          await page.clickSubmit()

          expect(window.ReactNativeWebView?.postMessage).toHaveBeenCalledWith(
            JSON.stringify({
              key: "orderSuccessful",
              orderCode: "abcdefg",
            })
          )

          await waitFor(() =>
            expect(pushMock).toHaveBeenCalledWith(
              "/orders/offer-order-id/status"
            )
          )
        })
      })

      describe("from an inquiry", () => {
        const OfferOrderInReviewFromInquiry = {
          ...OfferOrderToSubmit,
          source: "inquiry",
        }

        it("doesn't dispatch a message and routes to status page", async () => {
          mockCommitMutation.mockResolvedValue(submitOfferOrderSuccessInReview)
          const { wrapper } = getWrapper({
            CommerceOrder: () => OfferOrderInReviewFromInquiry,
          })
          const page = new ReviewTestPage(wrapper)
          await page.clickSubmit()

          expect(window.ReactNativeWebView?.postMessage).not.toHaveBeenCalled()

          await waitFor(() =>
            expect(pushMock).toHaveBeenCalledWith(
              "/orders/offer-order-id/status"
            )
          )
        })
      })
    })
  })
})
