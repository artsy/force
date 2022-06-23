import { ReviewTestQueryRawResponse } from "v2/__generated__/ReviewTestQuery.graphql"
import {
  BuyOrderWithArtaShippingDetails,
  BuyOrderWithBankDebitDetails,
  BuyOrderWithShippingDetails,
  BuyOrderWithWireTransferDetails,
  OfferOrderWithMissingMetadata,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
} from "v2/Apps/__tests__/Fixtures/Order"
import { OfferSummaryItemFragmentContainer } from "v2/Apps/Order/Components/OfferSummaryItem"
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
import { waitFor } from "@testing-library/react"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"

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

const mockShowErrorDialog = jest.fn()
jest.mock("v2/Apps/Order/Dialogs", () => ({
  ...jest.requireActual("../../Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const mockCommitMutation = jest.fn()
jest.mock("v2/Apps/Order/Utils/commitMutation", () => ({
  ...jest.requireActual("../../Utils/commitMutation"),
  injectCommitMutation: Component => props => (
    <Component {...props} commitMutation={mockCommitMutation} />
  ),
}))

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

  // beforeEach(hooks.clearErrors)

  // afterEach(hooks.clearMocksAndErrors)

  describe("buy-mode orders", () => {
    it("enables the button and routes to the payoff page", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderSuccess)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/orders/1234/status")
    })

    it("takes the user back to the /shipping view", () => {
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      page.shippingSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")

      expect(pushMock).toBeCalledWith("/orders/1234/shipping")
    })

    it("takes the user back to the /payment view", () => {
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      page.paymentSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")

      expect(pushMock).toBeCalledWith("/orders/1234/payment")
    })

    it("shows buyer guarentee", () => {
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.buyerGuarantee.length).toBe(1)
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithFailure)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Work has been updated",
        message:
          "Something about the work changed since you started checkout. Please review the work before submitting your order.",
      })
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal with a helpful error message if a user has not entered shipping and payment information", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithMissingInfo)
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Charge failed",
        message:
          "Payment authorization has been declined. Please contact your card provider and try again.",
      })
    })

    it("shows a modal with a helpful error message if the user's card is declined due to insufficient funds", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOrderWithFailureInsufficientFunds
      )
      const wrapper = getWrapper({
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

    it("shows a modal that redirects to the artist page if there is an insufficient inventory", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithNoInventoryFailure)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Not available",
        message: "Sorry, the work is no longer available.",
      })
      expect(window.location.assign).toBeCalledWith("/artist/artistId")
    })

    it("shows SCA modal when required", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithActionRequired)
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)

      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckOfferNavigate rightCheckShippingNavigate rightCheckPaymentNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
      expect(page.offerSummary.text()).not.toMatch("Your note")
    })

    it("shows an offer section in the shipping and payment review", () => {
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/artwork/artworkId?order-submitted=true")
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderWithFailure)
      const wrapper = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
        CommerceOrder: () => testOffer,
      })
      const page = new ReviewTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Work has been updated",
        message:
          "Something about the work changed since you started checkout. Please review the work before submitting your order.",
      })
      expect(window.location.assign).toBeCalledWith("/artwork/artworkId")
    })

    it("shows a modal if there is a payment_method_confirmation_failed", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderFailedConfirmation)
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new ReviewTestPage(wrapper)
      page.shippingArtaSummary
        .find("Clickable[data-test='change-link']")
        .simulate("click")

      expect(pushMock).toBeCalledWith("/orders/1234/shipping")
    })

    it("renders shipping information", () => {
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
    // TODO: Unskip test when "conversational-buy-now" feature flag is removed
    it.skip("enables the button and routes to the conversation", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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
})
