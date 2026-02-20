import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2ReviewStepTestQuery } from "__generated__/Order2ReviewStepTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2ReviewStep } from "../Order2ReviewStep"

jest.unmock("react-relay")

const mockStripe = {
  handleNextAction: jest.fn(),
}

jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: jest.fn(() => mockStripe),
}))

const mockSubmitOrderMutation = {
  submitMutation: jest.fn(),
}

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SubmitOrderMutation",
  () => ({
    useOrder2SubmitOrderMutation: () => mockSubmitOrderMutation,
  }),
)

const mockCheckoutContext = {
  steps: [
    {
      name: "CONFIRMATION",
      state: "ACTIVE",
    },
  ],
  savePaymentMethod: false,
  redirectToOrderDetails: jest.fn(),
  checkoutTracking: {
    clickedOrderProgression: jest.fn(),
    submittedOrder: jest.fn(),
    clickedBuyerProtection: jest.fn(),
  },
  artworkPath: "/artwork/test-artwork",
}

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

const mockCheckoutModal = {
  showCheckoutErrorModal: jest.fn(),
  dismissCheckoutErrorModal: jest.fn(),
}

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal", () => ({
  useCheckoutModal: () => mockCheckoutModal,
}))

const { renderWithRelay } = setupTestWrapperTL<Order2ReviewStepTestQuery>({
  Component: (props: any) => <Order2ReviewStep order={props.me.order} />,
  query: graphql`
    query Order2ReviewStepTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          __typename
          ... on Order {
            ...Order2ReviewStep_order
          }
        }
      }
    }
  `,
})

const baseOrderData = {
  __typename: "Order" as const,
  internalID: "order-id",
  buyerTotal: { display: "$100" },
  itemsTotal: { display: "$90" },
  shippingTotal: { display: "$5" },
  taxTotal: { display: "$5" },
  lineItems: [
    {
      artworkOrEditionSet: {
        __typename: "Artwork" as const,
        price: "$90",
        dimensions: { in: "10 x 10", cm: "25 x 25" },
      },
      artworkVersion: {
        title: "Test Artwork",
        artistNames: "Test Artist",
        date: "2024",
        attributionClass: {
          shortDescription: "Original",
        },
        image: {
          resized: {
            url: "https://test.com/image.jpg",
          },
        },
      },
    },
  ],
}

const createBuyOrder = (overrides = {}) => ({
  ...baseOrderData,
  mode: "BUY" as const,
  stripeConfirmationToken: "test-token",
  pendingOffer: null,
  ...overrides,
})

const createOfferOrder = (overrides = {}) => ({
  ...baseOrderData,
  mode: "OFFER" as const,
  stripeConfirmationToken: "ctoken_123",
  pendingOffer: {
    internalID: "offer-id",
  },
  ...overrides,
})

import { CheckoutModalError } from "../CheckoutModal"

describe("Order2ReviewStep", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset savePaymentMethod to default
    mockCheckoutContext.savePaymentMethod = false
  })

  describe("Submitting an offer order", () => {
    it("passes setupIntent ID correctly for offer orders requiring action", async () => {
      const mockSetupIntentId = "seti_test123"

      // First call returns action required
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationActionRequired",
            actionData: {
              clientSecret: "test-secret",
            },
          },
        },
      })

      // Second call (after action) returns success
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      mockStripe.handleNextAction.mockResolvedValueOnce({
        setupIntent: { id: mockSetupIntentId },
      })

      renderWithRelay({
        Me: () => ({
          order: createOfferOrder(),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(2)
      })

      // First call should not have confirmedSetupIntentId
      const firstCallArgs =
        mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      expect(
        firstCallArgs.variables.input.confirmedSetupIntentId,
      ).toBeUndefined()
      expect(firstCallArgs.variables.input.offerID).toBe("offer-id")

      // Second call should have the setupIntent ID as a string
      const secondCallArgs =
        mockSubmitOrderMutation.submitMutation.mock.calls[1][0]
      expect(secondCallArgs.variables.input.confirmedSetupIntentId).toBe(
        mockSetupIntentId,
      )
      expect(typeof secondCallArgs.variables.input.confirmedSetupIntentId).toBe(
        "string",
      )
      expect(secondCallArgs.variables.input.offerID).toBe("offer-id")
    })

    it("includes oneTimeUse when submitting offer with new payment method", async () => {
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: createOfferOrder(),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(1)
      })

      const callArgs = mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      const input = callArgs.variables.input

      // Verify oneTimeUse is set for new payment methods (has confirmationToken)
      expect(input.oneTimeUse).toBe(true) // savePaymentMethod is false by default
      expect(input.offerID).toBe("offer-id")
    })

    it("omits oneTimeUse when submitting offer with saved payment method", async () => {
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: createOfferOrder({ stripeConfirmationToken: null }),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(1)
      })

      const callArgs = mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      const input = callArgs.variables.input

      // Verify oneTimeUse is NOT set for saved payment methods (no confirmationToken)
      expect(input.oneTimeUse).toBeUndefined()
      expect(input.offerID).toBe("offer-id")
      expect(input.confirmationToken).toBeUndefined()
    })

    it("respects savePaymentMethod setting for offer orders", async () => {
      mockCheckoutContext.savePaymentMethod = true

      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: createOfferOrder(),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(1)
      })

      const callArgs = mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      const input = callArgs.variables.input

      // When savePaymentMethod is true, oneTimeUse should be false
      expect(input.oneTimeUse).toBe(false)
    })
  })

  describe("Submitting a buy order", () => {
    it("includes oneTimeUse when submitting buy order with new payment method", async () => {
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: createBuyOrder(),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(1)
      })

      const callArgs = mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      const input = callArgs.variables.input

      // Verify oneTimeUse is set for new payment methods (has confirmationToken)
      expect(input.oneTimeUse).toBe(true) // savePaymentMethod is false by default
      expect(input.confirmationToken).toBe("test-token")
      expect(input.offerID).toBeUndefined()
    })

    it("omits oneTimeUse when submitting buy order with saved payment method", async () => {
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: createBuyOrder({ stripeConfirmationToken: null }),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(1)
      })

      const callArgs = mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      const input = callArgs.variables.input

      // Verify oneTimeUse is NOT set for saved payment methods (no confirmationToken)
      expect(input.oneTimeUse).toBeUndefined()
      expect(input.confirmationToken).toBeUndefined()
      expect(input.offerID).toBeUndefined()
    })

    it("respects savePaymentMethod setting for buy orders", async () => {
      mockCheckoutContext.savePaymentMethod = true

      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: createBuyOrder(),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(1)
      })

      const callArgs = mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      const input = callArgs.variables.input

      // When savePaymentMethod is true, oneTimeUse should be false
      expect(input.oneTimeUse).toBe(false)
      expect(input.confirmationToken).toBe("test-token")
    })

    it("always sets oneTimeUse to true for SEPA payment method", async () => {
      mockCheckoutContext.savePaymentMethod = true // Even when set to true

      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: createBuyOrder({ paymentMethod: "SEPA_DEBIT" }),
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(1)
      })

      const callArgs = mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      const input = callArgs.variables.input

      // SEPA cannot be saved, so oneTimeUse should always be true
      expect(input.oneTimeUse).toBe(true)
      expect(input.confirmationToken).toBe("test-token")
    })
  })

  describe("Error handling", () => {
    const defaultOrderData = {
      __typename: "Order",
      internalID: "order-id",
      mode: "BUY",
      stripeConfirmationToken: "ctoken_123",
      buyerTotal: { display: "$100" },
      itemsTotal: { display: "$90" },
      shippingTotal: { display: "$5" },
      taxTotal: { display: "$5" },
      lineItems: [
        {
          artworkOrEditionSet: {
            __typename: "Artwork",
            price: "$90",
            dimensions: { in: "10 x 10", cm: "25 x 25" },
          },
          artworkVersion: {
            title: "Test Artwork",
            artistNames: "Test Artist",
            date: "2024",
            attributionClass: {
              shortDescription: "Original",
            },
            image: {
              resized: {
                url: "https://test.com/image.jpg",
              },
            },
          },
        },
      ],
      pendingOffer: null,
    }

    it("sets CHARGE_AUTHORIZATION_FAILED modal error when handleNextAction returns a failure", async () => {
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationActionRequired",
            actionData: {
              clientSecret: "test-secret",
            },
          },
        },
      })

      mockStripe.handleNextAction.mockResolvedValueOnce({
        error: {
          code: "payment_intent_authentication_failure",
          message: "Authentication failed",
        },
      })

      renderWithRelay({
        Me: () => ({
          order: defaultOrderData,
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockCheckoutModal.showCheckoutErrorModal).toHaveBeenCalledWith({
          error: CheckoutModalError.CHARGE_AUTHORIZATION_FAILED,
          description: "Authentication failed",
          onClose: expect.any(Function),
        })
      })
    })

    it("sets ARTWORK_NOT_FOR_SALE modal error when insufficient_inventory error is returned", async () => {
      mockSubmitOrderMutation.submitMutation.mockRejectedValueOnce({
        code: "insufficient_inventory",
        message: "Insufficient inventory",
      })

      renderWithRelay({
        Me: () => ({
          order: defaultOrderData,
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockCheckoutModal.showCheckoutErrorModal).toHaveBeenCalledWith({
          error: CheckoutModalError.ARTWORK_NOT_FOR_SALE,
        })
      })
    })
  })

  describe("Error handling", () => {
    const defaultOrderData = {
      __typename: "Order",
      internalID: "order-id",
      mode: "BUY",
      stripeConfirmationToken: "ctoken_123",
      buyerTotal: { display: "$100" },
      itemsTotal: { display: "$90" },
      shippingTotal: { display: "$5" },
      taxTotal: { display: "$5" },
      lineItems: [
        {
          artworkOrEditionSet: {
            __typename: "Artwork",
            price: "$90",
            dimensions: { in: "10 x 10", cm: "25 x 25" },
          },
          artworkVersion: {
            title: "Test Artwork",
            artistNames: "Test Artist",
            date: "2024",
            attributionClass: {
              shortDescription: "Original",
            },
            image: {
              resized: {
                url: "https://test.com/image.jpg",
              },
            },
          },
        },
      ],
      pendingOffer: null,
    }

    it("sets CHARGE_AUTHORIZATION_FAILED modal error when handleNextAction returns payment_intent_authentication_failure", async () => {
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationActionRequired",
            actionData: {
              clientSecret: "test-secret",
            },
          },
        },
      })

      mockStripe.handleNextAction.mockResolvedValueOnce({
        error: {
          code: "payment_intent_authentication_failure",
          message: "Authentication failed",
        },
      })

      renderWithRelay({
        Me: () => ({
          order: defaultOrderData,
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockCheckoutModal.showCheckoutErrorModal).toHaveBeenCalledWith({
          error: CheckoutModalError.CHARGE_AUTHORIZATION_FAILED,
          description: "Authentication failed",
          onClose: expect.any(Function),
        })
      })
    })

    it("sets CHARGE_AUTHORIZATION_FAILED modal error for other Stripe errors", async () => {
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationActionRequired",
            actionData: {
              clientSecret: "test-secret",
            },
          },
        },
      })

      mockStripe.handleNextAction.mockResolvedValueOnce({
        error: {
          code: "some_other_error",
          message: "Some other error",
        },
      })

      renderWithRelay({
        Me: () => ({
          order: defaultOrderData,
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockCheckoutModal.showCheckoutErrorModal).toHaveBeenCalledWith({
          error: CheckoutModalError.CHARGE_AUTHORIZATION_FAILED,
          description: "Some other error",
          onClose: expect.any(Function),
        })
      })
    })

    it("sets SUBMIT_ERROR modal error for non-Stripe errors", async () => {
      mockSubmitOrderMutation.submitMutation.mockRejectedValueOnce({
        code: "unknown_error",
        message: "Unknown error",
      })

      renderWithRelay({
        Me: () => ({
          order: defaultOrderData,
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockCheckoutModal.showCheckoutErrorModal).toHaveBeenCalledWith({
          error: CheckoutModalError.SUBMIT_ERROR,
        })
      })
    })

    it("sets ARTWORK_NOT_FOR_SALE modal error when insufficient_inventory error is returned", async () => {
      mockSubmitOrderMutation.submitMutation.mockRejectedValueOnce({
        code: "insufficient_inventory",
        message: "Insufficient inventory",
      })

      renderWithRelay({
        Me: () => ({
          order: defaultOrderData,
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockCheckoutModal.showCheckoutErrorModal).toHaveBeenCalledWith({
          error: CheckoutModalError.ARTWORK_NOT_FOR_SALE,
        })
      })
    })
  })
})
