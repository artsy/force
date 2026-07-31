import { fireEvent, screen, waitFor } from "@testing-library/react"
import { Order2RespondForm } from "Apps/Order2/Routes/Respond/Components/Order2RespondForm"
import { Order2RespondSummary } from "Apps/Order2/Routes/Respond/Components/Order2RespondSummary"
import { useOrder2AcceptOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2AcceptOfferMutation"
import { useOrder2CreateCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2CreateCounterOfferMutation"
import { useOrder2DeclineOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2DeclineOfferMutation"
import { useOrder2SubmitCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2SubmitCounterOfferMutation"
import { Order2RespondContextProvider } from "Apps/Order2/Routes/Respond/RespondContext/Order2RespondContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2RespondSummaryTestQuery } from "__generated__/Order2RespondSummaryTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

const mockHandleNextAction = jest.fn()
jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: () => ({ handleNextAction: mockHandleNextAction }),
}))

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    router: { push: mockRouterPush, replace: mockRouterReplace },
  }),
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "order-id",
    contextPageOwnerSlug: "page-owner-slug",
    contextPageOwnerType: "orders-respond",
  })),
}))

jest.mock(
  "Apps/Order2/Routes/Respond/Mutations/useOrder2CreateCounterOfferMutation",
)
jest.mock(
  "Apps/Order2/Routes/Respond/Mutations/useOrder2SubmitCounterOfferMutation",
)
jest.mock("Apps/Order2/Routes/Respond/Mutations/useOrder2AcceptOfferMutation")
jest.mock("Apps/Order2/Routes/Respond/Mutations/useOrder2DeclineOfferMutation")

const mockCreateCounterOffer = jest.fn()
const mockSubmitCounterOffer = jest.fn()
const mockAcceptOffer = jest.fn()
const mockDeclineOffer = jest.fn()

beforeEach(() => {
  mockRouterPush.mockReset()
  mockRouterReplace.mockReset()
  mockHandleNextAction.mockReset().mockResolvedValue({})
  mockCreateCounterOffer.mockReset().mockResolvedValue({
    createBuyerOffer: {
      offerOrError: {
        __typename: "OfferMutationSuccess",
        offer: { internalID: "counteroffer-id" },
      },
    },
  })
  mockSubmitCounterOffer.mockReset().mockResolvedValue({
    submitBuyerOffer: {
      offerOrError: {
        __typename: "OfferMutationSuccess",
        offer: { internalID: "counteroffer-id" },
      },
    },
  })
  mockAcceptOffer.mockReset().mockResolvedValue({
    acceptSellerOffer: {
      orderOrError: { __typename: "OrderMutationSuccess" },
    },
  })
  mockDeclineOffer.mockReset().mockResolvedValue({
    rejectSellerOffer: {
      orderOrError: { __typename: "OrderMutationSuccess" },
    },
  })
  ;(useOrder2CreateCounterOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockCreateCounterOffer,
  })
  ;(useOrder2SubmitCounterOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockSubmitCounterOffer,
  })
  ;(useOrder2AcceptOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockAcceptOffer,
  })
  ;(useOrder2DeclineOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockDeclineOffer,
  })
})

const { renderWithRelay } = setupTestWrapperTL<Order2RespondSummaryTestQuery>({
  Component: (props: any) => {
    const order = props.me?.order

    if (!order) {
      return null
    }

    return (
      <Order2RespondContextProvider order={order}>
        <Order2RespondForm order={order} />
        <Order2RespondSummary order={order} />
      </Order2RespondContextProvider>
    )
  },
  query: graphql`
    query Order2RespondSummaryTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2RespondContext_order
          ...Order2RespondForm_order
          ...Order2RespondSummary_order
        }
      }
    }
  `,
})

const defaultResolvers = {
  Order: () => ({ mode: "OFFER" }),
  Money: () => ({ display: "$1,000.00" }),
}

const continueButton = () =>
  screen.getByRole("button", { name: "Continue to Review" })

describe("Order2RespondSummary", () => {
  it("does not show the Submit CTA while the respond step is active", () => {
    renderWithRelay(defaultResolvers)

    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument()
  })

  it("shows the Submit CTA once the response is confirmed", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Accept gallery offer"))
    fireEvent.click(continueButton())

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
  })

  it("accepts the gallery offer when Submit is clicked", async () => {
    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        internalID: "order-id",
        lastSubmittedOffer: { internalID: "gallery-offer-id" },
      }),
      Money: () => ({ display: "$1,000.00" }),
    })

    fireEvent.click(screen.getByText("Accept gallery offer"))
    fireEvent.click(continueButton())
    fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

    await waitFor(() => {
      expect(mockAcceptOffer).toHaveBeenCalledWith({
        variables: {
          input: { orderID: "order-id", offerID: "gallery-offer-id" },
        },
      })
    })
  })

  it("declines the gallery offer when Submit is clicked", async () => {
    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        internalID: "order-id",
        lastSubmittedOffer: { internalID: "gallery-offer-id" },
      }),
      Money: () => ({ display: "$1,000.00" }),
    })

    fireEvent.click(screen.getByText("Decline gallery offer"))
    fireEvent.click(continueButton())
    fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

    await waitFor(() => {
      expect(mockDeclineOffer).toHaveBeenCalledWith({
        variables: {
          input: { orderID: "order-id", offerID: "gallery-offer-id" },
        },
      })
    })
  })

  it("submits the pending counteroffer when Submit is clicked", async () => {
    const COUNTEROFFER_PLACEHOLDER = "Enter amount excluding shipping & tax"

    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        internalID: "order-id",
        pendingOffer: {
          internalID: "pending-offer-id",
          amount: { major: 500 },
        },
      }),
      Money: () => ({ display: "$1,000.00" }),
    })

    fireEvent.click(screen.getByText("Send counteroffer"))
    fireEvent.change(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER), {
      target: { value: "500" },
    })
    fireEvent.click(continueButton())

    const submitButton = await screen.findByRole("button", { name: "Submit" })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitCounterOffer).toHaveBeenCalledWith({
        variables: {
          input: { orderID: "order-id", offerID: "pending-offer-id" },
        },
      })
    })
  })

  describe("submission errors", () => {
    const SUBMIT_ERROR_TITLE = "An error occurred"
    const SUBMIT_ERROR_MESSAGE =
      "Something went wrong while submitting your response. Please try again."
    const OFFER_UNAVAILABLE_TITLE = "This offer is no longer available"
    const OFFER_UNAVAILABLE_MESSAGE =
      "The offer has expired or the order is no longer awaiting your response."

    const galleryOfferResolvers = {
      Order: () => ({
        mode: "OFFER",
        internalID: "order-id",
        lastSubmittedOffer: { internalID: "gallery-offer-id" },
      }),
      Money: () => ({ display: "$1,000.00" }),
    }

    it("shows the error modal instead of a banner when accepting fails", async () => {
      mockAcceptOffer.mockResolvedValue({
        acceptSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: { code: "invalid", message: "Cannot accept" },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
      expect(screen.getByText(SUBMIT_ERROR_MESSAGE)).toBeInTheDocument()
    })

    it("shows the error modal when declining fails", async () => {
      mockDeclineOffer.mockResolvedValue({
        rejectSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: { code: "invalid", message: "Cannot decline" },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Decline gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
      expect(screen.getByText(SUBMIT_ERROR_MESSAGE)).toBeInTheDocument()
    })

    it("shows the error modal when submitting the counteroffer fails", async () => {
      mockSubmitCounterOffer.mockResolvedValue({
        submitBuyerOffer: {
          offerOrError: {
            __typename: "OfferMutationError",
            mutationError: { code: "invalid", message: "Offer too low" },
          },
        },
      })

      renderWithRelay({
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          pendingOffer: {
            internalID: "pending-offer-id",
            amount: { major: 500 },
          },
        }),
        Money: () => ({ display: "$1,000.00" }),
      })

      fireEvent.click(screen.getByText("Send counteroffer"))
      fireEvent.change(
        screen.getByPlaceholderText("Enter amount excluding shipping & tax"),
        { target: { value: "500" } },
      )
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
      expect(screen.getByText(SUBMIT_ERROR_MESSAGE)).toBeInTheDocument()
    })

    it("shows the error modal when the request throws", async () => {
      mockAcceptOffer.mockRejectedValue(new Error("Network error"))

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
    })

    it("re-submits the acceptance after 3DS authentication succeeds", async () => {
      mockAcceptOffer
        .mockResolvedValueOnce({
          acceptSellerOffer: {
            orderOrError: {
              __typename: "OrderMutationActionRequired",
              actionData: { clientSecret: "secret" },
            },
          },
        })
        .mockResolvedValueOnce({
          acceptSellerOffer: {
            orderOrError: { __typename: "OrderMutationSuccess" },
          },
        })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      await waitFor(() => {
        expect(mockRouterReplace).toHaveBeenCalledWith(
          "/orders/order-id/details",
        )
      })

      expect(mockHandleNextAction).toHaveBeenCalledWith({
        clientSecret: "secret",
      })
      // The retry hits the same mutation with the same input.
      expect(mockAcceptOffer).toHaveBeenCalledTimes(2)
      expect(mockAcceptOffer).toHaveBeenLastCalledWith({
        variables: {
          input: { orderID: "order-id", offerID: "gallery-offer-id" },
        },
      })
      expect(screen.queryByText(SUBMIT_ERROR_TITLE)).not.toBeInTheDocument()
    })

    it("shows Stripe’s own message when 3DS authentication fails", async () => {
      mockAcceptOffer.mockResolvedValue({
        acceptSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationActionRequired",
            actionData: { clientSecret: "secret" },
          },
        },
      })
      mockHandleNextAction.mockResolvedValue({
        error: { message: "Your card was declined." },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(
        await screen.findByText(
          "An error occurred while processing your payment",
        ),
      ).toBeInTheDocument()
      expect(screen.getByText("Your card was declined.")).toBeInTheDocument()
      expect(screen.queryByText(SUBMIT_ERROR_MESSAGE)).not.toBeInTheDocument()
    })

    it("shows the payment modal for a card failure", async () => {
      mockAcceptOffer.mockResolvedValue({
        acceptSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: {
              code: "capture_failed",
              message: "Exchange: capture failed for charge ch_123",
            },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(
        await screen.findByText(
          "An error occurred while processing your payment",
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "We are unable to authenticate your payment method. Please choose a different payment method and try again.",
        ),
      ).toBeInTheDocument()
      expect(
        screen.queryByText("Exchange: capture failed for charge ch_123"),
      ).not.toBeInTheDocument()
      expect(screen.queryByText(SUBMIT_ERROR_TITLE)).not.toBeInTheDocument()
    })

    it("keeps the generic modal for unrecognized mutation errors", async () => {
      mockAcceptOffer.mockResolvedValue({
        acceptSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: {
              code: "internal_error",
              message: "Something unexpected happened",
            },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
      expect(
        screen.queryByText("An error occurred while processing your payment"),
      ).not.toBeInTheDocument()
    })

    it("sends the buyer to the legacy payment route from the payment modal CTA", async () => {
      mockAcceptOffer.mockResolvedValue({
        acceptSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: {
              code: "capture_failed",
              message: "Your card was declined.",
            },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      fireEvent.click(
        await screen.findByRole("button", { name: "Update payment method" }),
      )

      expect(mockRouterPush).toHaveBeenCalledWith(
        "/orders/order-id/payment/new",
      )
    })

    it("shows the offer unavailable modal when the offer can no longer be accepted", async () => {
      mockAcceptOffer.mockResolvedValue({
        acceptSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: {
              code: "invalid_state",
              message: "Exchange: invalid state",
            },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(
        await screen.findByText(OFFER_UNAVAILABLE_TITLE),
      ).toBeInTheDocument()
      expect(screen.getByText(OFFER_UNAVAILABLE_MESSAGE)).toBeInTheDocument()
      expect(screen.queryByText(SUBMIT_ERROR_TITLE)).not.toBeInTheDocument()
    })

    it("shows the offer unavailable modal when the declined offer has lapsed", async () => {
      mockDeclineOffer.mockResolvedValue({
        rejectSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: {
              code: "invalid_state",
              message: "Exchange: invalid state",
            },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Decline gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(
        await screen.findByText(OFFER_UNAVAILABLE_TITLE),
      ).toBeInTheDocument()
    })

    it("shows the offer unavailable modal when the counteroffer can no longer be submitted", async () => {
      mockSubmitCounterOffer.mockResolvedValue({
        submitBuyerOffer: {
          offerOrError: {
            __typename: "OfferMutationError",
            mutationError: {
              code: "not_last_offer",
              message: "Exchange: not the last offer",
            },
          },
        },
      })

      renderWithRelay({
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          pendingOffer: {
            internalID: "pending-offer-id",
            amount: { major: 500 },
          },
        }),
        Money: () => ({ display: "$1,000.00" }),
      })

      fireEvent.click(screen.getByText("Send counteroffer"))
      fireEvent.change(
        screen.getByPlaceholderText("Enter amount excluding shipping & tax"),
        { target: { value: "500" } },
      )
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(
        await screen.findByText(OFFER_UNAVAILABLE_TITLE),
      ).toBeInTheDocument()
    })

    it("sends the buyer to the order details from the offer unavailable modal CTA", async () => {
      mockAcceptOffer.mockResolvedValue({
        acceptSellerOffer: {
          orderOrError: {
            __typename: "OrderMutationError",
            mutationError: {
              code: "invalid_state",
              message: "Exchange: invalid state",
            },
          },
        },
      })

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(
        await screen.findByText(OFFER_UNAVAILABLE_TITLE),
      ).toBeInTheDocument()

      fireEvent.click(screen.getByRole("button", { name: "Continue" }))

      expect(mockRouterReplace).toHaveBeenCalledWith("/orders/order-id/details")
    })

    it("dismisses the modal and stays on the page via Continue", async () => {
      mockAcceptOffer.mockRejectedValue(new Error("Network error"))

      renderWithRelay(galleryOfferResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()

      fireEvent.click(screen.getByRole("button", { name: "Continue" }))

      await waitFor(() => {
        expect(screen.queryByText(SUBMIT_ERROR_TITLE)).not.toBeInTheDocument()
      })
      // Still on the review step, able to retry.
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    })

    describe("when the offer to act on is missing", () => {
      const noGalleryOfferResolvers = {
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          lastSubmittedOffer: null,
        }),
        Money: () => ({ display: "$1,000.00" }),
      }

      it("shows the error modal without accepting", async () => {
        renderWithRelay(noGalleryOfferResolvers)

        fireEvent.click(screen.getByText("Accept gallery offer"))
        fireEvent.click(continueButton())
        fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

        expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
        expect(mockAcceptOffer).not.toHaveBeenCalled()
      })

      it("shows the error modal without declining", async () => {
        renderWithRelay(noGalleryOfferResolvers)

        fireEvent.click(screen.getByText("Decline gallery offer"))
        fireEvent.click(continueButton())
        fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

        expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
        expect(mockDeclineOffer).not.toHaveBeenCalled()
      })

      it("shows the error modal without submitting the counteroffer when the pending draft is missing", async () => {
        renderWithRelay({
          Order: () => ({
            mode: "OFFER",
            internalID: "order-id",
            lastSubmittedOffer: { internalID: "gallery-offer-id" },
            pendingOffer: null,
          }),
          Money: () => ({ display: "$1,000.00" }),
        })

        fireEvent.click(screen.getByText("Send counteroffer"))
        fireEvent.change(
          screen.getByPlaceholderText("Enter amount excluding shipping & tax"),
          { target: { value: "500" } },
        )
        fireEvent.click(continueButton())
        fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

        expect(await screen.findByText(SUBMIT_ERROR_TITLE)).toBeInTheDocument()
        expect(mockSubmitCounterOffer).not.toHaveBeenCalled()
      })
    })
  })

  describe("analytics", () => {
    const mockTrackEvent = jest.fn()

    beforeAll(() => {
      ;(useTracking as jest.Mock).mockImplementation(() => ({
        trackEvent: mockTrackEvent,
      }))
    })

    afterEach(() => {
      mockTrackEvent.mockReset()
    })

    it("tracks clickedOrderProgression when Submit is clicked", async () => {
      renderWithRelay({
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          lastSubmittedOffer: { internalID: "gallery-offer-id" },
        }),
        Money: () => ({ display: "$1,000.00" }),
      })

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      mockTrackEvent.mockClear()

      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedOrderProgression",
        context_module: "ordersReview",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
        flow: "Make offer",
      })
    })

    it("tracks submittedCounterOffer when the counteroffer is submitted", async () => {
      const COUNTEROFFER_PLACEHOLDER = "Enter amount excluding shipping & tax"

      renderWithRelay({
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          pendingOffer: {
            internalID: "pending-offer-id",
            amount: { major: 500 },
          },
        }),
        Money: () => ({ display: "$1,000.00" }),
      })

      fireEvent.click(screen.getByText("Send counteroffer"))
      fireEvent.change(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER), {
        target: { value: "500" },
      })
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "submittedCounterOffer",
          context_module: "ordersReview",
          context_page_owner_id: "order-id",
          context_page_owner_type: "orders-respond",
        })
      })
    })

    it("tracks errorMessageViewed when the error modal is shown", async () => {
      mockAcceptOffer.mockRejectedValue(new Error("Network error"))

      renderWithRelay({
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          lastSubmittedOffer: { internalID: "gallery-offer-id" },
        }),
        Money: () => ({ display: "$1,000.00" }),
      })

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: "errorMessageViewed",
            error_code: "submit_error",
            title: "An error occurred",
            message:
              "Something went wrong while submitting your response. Please try again.",
          }),
        )
      })
    })

    it("tracks clickedTermsAndConditions when the terms link is clicked", async () => {
      renderWithRelay(defaultResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      mockTrackEvent.mockClear()

      fireEvent.click(
        await screen.findByText("General Terms and Conditions of Sale."),
      )

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedTermsAndConditions",
        context_module: "ordersReview",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
      })
    })
  })

  it("hides the Submit CTA again when the response is edited", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Decline gallery offer"))
    fireEvent.click(continueButton())

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Edit response" }))

    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument()
  })

  it("prices the summary from the pending draft without disturbing the gallery-offer total shown elsewhere", () => {
    renderWithRelay({
      Me: () => ({
        order: {
          mode: "OFFER",
          internalID: "order-id",
          lastSubmittedOffer: {
            internalID: "gallery-offer-id",
            createdAt: "2025-01-01T00:00:00Z",
          },
          pendingOffer: {
            internalID: "pending-offer-id",
            createdAt: "2025-02-01T00:00:00Z", // after the gallery offer => current-round draft
            amount: { major: 200 },
            pricingBreakdownLines: [
              {
                __typename: "TotalLine",
                displayName: "Total",
                amount: { display: "Counteroffer $200" },
              },
            ],
          },
          // Order-level pricing = what accept/decline (priceFromPendingOffer={false})
          // shows. Per verified Exchange behavior, this is genuinely a separate,
          // independently-written value — not something the counteroffer draft
          // could have touched.
          pricingBreakdownLines: [
            {
              __typename: "TotalLine",
              displayName: "Total",
              amount: { display: "Order $100" },
            },
          ],
        },
      }),
    })

    // Selecting COUNTEROFFER flips the summary's priceFromPendingOffer gate on.
    fireEvent.click(screen.getByText("Send counteroffer"))

    expect(screen.getByText("Counteroffer $200")).toBeInTheDocument()
    expect(screen.getByText("Order $100")).toBeInTheDocument()
  })
})
