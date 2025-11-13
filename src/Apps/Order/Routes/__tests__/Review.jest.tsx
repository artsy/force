import {
  BuyOrderWithBankDebitDetails,
  BuyOrderWithShippingDetails,
  BuyOrderWithWireTransferDetails,
  OfferOrderWithMissingMetadata,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  PrivateSaleOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import {
  submitOfferOrderFailedConfirmation,
  submitOfferOrderSuccess,
  submitOfferOrderSuccessInReview,
  submitOfferOrderWithActionRequired,
  submitOfferOrderWithFailure,
} from "Apps/Order/Routes/__fixtures__/MutationResults/submitOfferOrder"
import {
  submitOrderSuccess,
  submitOrderWithActionRequired,
  submitOrderWithFailure,
  submitOrderWithFailureCardDeclined,
  submitOrderWithFailureCurrencyNotSupported,
  submitOrderWithFailureInsufficientFunds,
  submitOrderWithMissingInfo,
  submitOrderWithNoInventoryFailure,
  submitOrderWithVersionMismatchFailure,
} from "Apps/Order/Routes/__fixtures__/MutationResults/submitOrder"
import { ReviewFragmentContainer } from "Apps/Order/Routes/Review"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import { MockBoot } from "DevTools/MockBoot"
import { mockLocation } from "DevTools/mockLocation"
import { mockStripe } from "DevTools/mockStripe"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen, waitFor } from "@testing-library/react"
import type { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import type { ReviewTestEQuery$rawResponse } from "__generated__/ReviewTestEQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { OrderAppTestPageRTL } from "./Utils/OrderAppTestPageRTL"

jest.unmock("react-relay")

jest.mock("react-tracking")
jest.mock("@stripe/stripe-js", () => {
  let mock: any = null
  return {
    loadStripe: jest.fn(() => {
      if (mock === null) {
        mock = mockStripe()
      }
      return mock
    }),
    _mockStripe: () => mock,
    _mockReset: () => {
      mock = mockStripe()
      return mock
    },
  }
})
const { loadStripe, _mockStripe } = require("@stripe/stripe-js")

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

const testOrder: ReviewTestEQuery$rawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
  impulseConversationId: null,
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

  const { renderWithRelay } = setupTestWrapperTL({
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
      query ReviewTestEQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Review_order
        }
      }
    `,
  })

  describe("buy-mode orders", () => {
    it("enables the button and routes to the payoff page", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderSuccess)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/orders/1234/details")
    })

    it("disables the submit button when props.stripe is not present", () => {
      loadStripe.mockReturnValueOnce(null)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      expect(page.submitButton).toBeDisabled()
    })

    it("shows buyer guarantee text", () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })

      expect(screen.getByText(/buyer.+guarantee/i)).toBeInTheDocument()
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithFailure)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows a modal that redirects to the artwork page if there is an artwork_version_mismatch", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOrderWithVersionMismatchFailure
      )
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
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
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Missing information",
        message:
          "Please review and update your shipping and/or payment details and try again.",
      })
    })

    it("shows a modal with a helpful error message if the user's card is declined", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithFailureCardDeclined)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Charge failed",
          message: expect.stringContaining(
            "Payment has been declined. Please contact your card provider or bank institution, then press"
          ),
        })
      )
    })

    it("shows a modal with a helpful error message if the user's card is declined due to insufficient funds", async () => {
      mockCommitMutation.mockResolvedValue(
        submitOrderWithFailureInsufficientFunds
      )
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
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
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
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
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Not available",
        message: "Sorry, the work is no longer available.",
      })

      expect(pushMock).toHaveBeenCalledWith("/artwork/artworkId")
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

      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })

      const page = new OrderAppTestPageRTL(screen, user)
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

      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })

      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Unable to process card",
        message:
          "This card is inactive or no longer available. Please confirm with your card issuer if this card is active, try another payment method, or contact orders@artsy.net.",
      })
    })

    it("shows SCA modal when required", async () => {
      mockCommitMutation.mockResolvedValue(submitOrderWithActionRequired)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(_mockStripe().handleCardAction).toBeCalledWith("client-secret")
    })

    describe("isEigen", () => {
      beforeEach(() => {
        isEigen = true
      })

      it("dispatches message given Eigen when the order is submitted", async () => {
        mockCommitMutation.mockResolvedValue(submitOrderSuccess)
        const { user } = renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new OrderAppTestPageRTL(screen, user)
        await page.clickSubmit()

        await waitFor(() => {
          expect(window.ReactNativeWebView?.postMessage).toHaveBeenCalledWith(
            JSON.stringify({
              key: "orderSubmitted",
              orderId: "1234",
              isPurchase: true,
            })
          )
        })

        await waitFor(() =>
          expect(pushMock).toHaveBeenCalledWith("/orders/1234/details")
        )
      })
    })
  })

  describe("Offer-mode orders", () => {
    const testOffer = {
      ...OfferOrderWithShippingDetails,
      internalID: "offer-order-id",
      impulseConversationId: null,
    }

    it("shows offer-related content", () => {
      renderWithRelay({
        CommerceOrder: () => testOffer,
      })

      const offerElements = screen.getAllByText(/Your offer/i)
      expect(offerElements.length).toBeGreaterThan(0)
      expect(offerElements[0]).toBeInTheDocument()
    })

    it("enables the button and routes to the artwork page", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOffer,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/orders/offer-order-id/details")
    })

    it("shows an offer note if one exists", async () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...OfferOrderWithShippingDetailsAndNote,
          impulseConversationId: null,
        }),
      })

      expect(screen.getByText(/Your note/i)).toBeInTheDocument()
      expect(screen.getByText("This is a note!")).toBeInTheDocument()
    })

    it("shows an error modal when there is an error in submitOrderPayload", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderWithFailure)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOffer,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows a modal if there is a payment_method_confirmation_failed", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderFailedConfirmation)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOffer,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Your card was declined",
        message:
          "We couldn't authorize your credit card. Please enter another payment method or contact your bank for more information.",
      })
    })

    it("shows SCA modal when required", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderWithActionRequired)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOffer,
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(_mockStripe().confirmCardSetup).toBeCalledWith("client-secret")
    })

    describe("isEigen", () => {
      beforeEach(() => {
        isEigen = true
      })

      it("dispatches message given Eigen when the offer is submitted", async () => {
        mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
        const { user } = renderWithRelay({
          CommerceOrder: () => testOffer,
        })
        const page = new OrderAppTestPageRTL(screen, user)
        await page.clickSubmit()

        await waitFor(() => {
          expect(window.ReactNativeWebView?.postMessage).toHaveBeenCalledWith(
            JSON.stringify({
              key: "orderSubmitted",
              orderId: "offer-order-id",
              isPurchase: false,
            })
          )
        })

        await waitFor(() =>
          expect(pushMock).toHaveBeenCalledWith(
            "/orders/offer-order-id/details"
          )
        )
      })
    })
  })

  describe("Inquiry offer orders", () => {
    it("renders with inquiry extra information", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...OfferOrderWithMissingMetadata,
          impulseConversationId: "5665",
        }),
      })

      const waitingTexts = screen.getAllByText("Waiting for final costs")
      expect(waitingTexts.length).toBeGreaterThan(0)
      expect(waitingTexts[0]).toBeInTheDocument()

      const shippingTexts = screen.getAllByText(
        /Shipping costs to be confirmed by gallery/
      )
      expect(shippingTexts.length).toBeGreaterThan(0)
      expect(shippingTexts[0]).toBeInTheDocument()
    })

    it("enables the button and routes to the conversation", async () => {
      mockCommitMutation.mockResolvedValue(submitOfferOrderSuccess)
      const { user } = renderWithRelay({
        CommerceOrder: () => ({
          ...OfferOrderWithMissingMetadata,
          impulseConversationId: "5665",
        }),
      })
      const page = new OrderAppTestPageRTL(screen, user)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(pushMock).toBeCalledWith("/user/conversations/5665")
    })
  })

  describe("Bank debit orders", () => {
    it("shows bank transfer as payment method", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...BuyOrderWithBankDebitDetails,
          impulseConversationId: null,
        }),
      })

      expect(screen.getByText("Bank transfer •••• 1234")).toBeInTheDocument()
    })
  })

  describe("Wire transfer orders", () => {
    it("shows wire transfer as payment method", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...BuyOrderWithWireTransferDetails,
          impulseConversationId: null,
        }),
      })

      expect(screen.getByText("Wire transfer")).toBeInTheDocument()
    })
  })

  describe("private sale orders", () => {
    const privateSaleOrderWithWire = {
      ...PrivateSaleOrderWithShippingDetails,
      availablePaymentMethods: ["WIRE_TRANSFER"] as CommercePaymentMethodEnum[],
    }

    it("renders 'Complete Purchase' for submit button", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(screen.getByText("Complete Purchase")).toBeInTheDocument()
    })

    it("renders Artsy Private Sales conditions text", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(
        screen.getByText(/Artsy Private Sales LLC Conditions of Sale/)
      ).toBeInTheDocument()
    })

    it("displays additional artwork details from order", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(screen.getByText("Artwork Description")).toBeInTheDocument()
      expect(
        screen.getByText("additional artwork details provided by admin")
      ).toBeInTheDocument()
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

      it("routes to the details page", async () => {
        mockCommitMutation.mockResolvedValue(submitOfferOrderSuccessInReview)
        const { user } = renderWithRelay({
          CommerceOrder: () => OfferOrderInReviewFromArtworkPage,
        })
        const page = new OrderAppTestPageRTL(screen, user)
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
        expect(pushMock).toBeCalledWith("/orders/offer-order-id/details")
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
        const { user } = renderWithRelay({
          CommerceOrder: () => OfferOrderInReviewFromInquiry,
        })
        const page = new OrderAppTestPageRTL(screen, user)
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
        expect(pushMock).toBeCalledWith(
          "/user/conversations/impulse-conversation-id"
        )
      })
    })
  })
})
