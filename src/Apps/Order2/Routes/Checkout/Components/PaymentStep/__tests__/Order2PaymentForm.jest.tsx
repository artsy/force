import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2PaymentFormTestQuery } from "__generated__/Order2PaymentFormTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2PaymentForm } from "../Order2PaymentForm"

jest.unmock("react-relay")
jest.mock("react-tracking")

const mockStripe = {
  createConfirmationToken: jest.fn(),
}

const mockElements = {
  getElement: jest.fn(() => ({
    collapse: jest.fn(),
  })),
  submit: jest.fn(),
  update: jest.fn(),
}

jest.mock("@stripe/react-stripe-js", () => {
  const originalModule = jest.requireActual("@stripe/react-stripe-js")
  const mockPaymentElement = jest.fn(({ onChange }) => {
    return (
      <div data-testid="payment-element">
        <button
          type="button"
          data-testid="mock-credit-card"
          onClick={() => {
            const changeEvent = {
              elementType: "payment",
              collapsed: false,
              value: { type: "card" },
            }
            onChange(changeEvent)
          }}
        >
          Mock Credit Card
        </button>
        <button
          type="button"
          data-testid="mock-ach"
          onClick={() => {
            const changeEvent = {
              elementType: "payment",
              collapsed: false,
              value: { type: "us_bank_account" },
            }
            onChange(changeEvent)
          }}
        >
          Mock ACH
        </button>
      </div>
    )
  })
  return {
    ...originalModule,
    useStripe: jest.fn(() => mockStripe),
    useElements: jest.fn(() => mockElements),
    PaymentElement: mockPaymentElement,
    Elements: jest.fn(({ children }) => <div>{children}</div>),
  }
})

const mockCheckoutContext = {
  setConfirmationToken: jest.fn(),
  checkoutTracking: {
    clickedPaymentMethod: jest.fn(),
    clickedOrderProgression: jest.fn(),
    savedPaymentMethodViewed: jest.fn(),
  },
  steps: [
    {
      name: "PAYMENT",
      state: "ACTIVE",
    },
  ],
}

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

// Mock mutations
const mockUpdateOrderMutation = {
  submitMutation: jest.fn(),
}

const mockCreateBankDebitSetupForOrder = {
  submitMutation: jest.fn(),
}

jest.mock(
  "Apps/Order/Components/ExpressCheckout/Mutations/useUpdateOrderMutation",
  () => ({
    useUpdateOrderMutation: () => mockUpdateOrderMutation,
  }),
)

jest.mock(
  "Components/BankDebitForm/Mutations/CreateBankDebitSetupForOrder",
  () => ({
    CreateBankDebitSetupForOrder: () => mockCreateBankDebitSetupForOrder,
  }),
)

beforeEach(() => {
  jest.clearAllMocks()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: jest.fn(),
  }))
})

const { renderWithRelay } = setupTestWrapperTL<Order2PaymentFormTestQuery>({
  Component: (props: any) => <Order2PaymentForm order={props.me.order} />,
  query: graphql`
    query Order2PaymentFormTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2PaymentForm_order
        }
      }
    }
  `,
})

describe("Order2PaymentForm", () => {
  const baseOrderProps = {
    id: "T3JkZXI6b3JkZXItaWQ=", // Relay ID
    internalID: "order-id",
    mode: "BUY",
    source: "ARTWORK_PAGE",
    itemsTotal: {
      minor: 100000,
      currencyCode: "USD",
    },
    seller: {
      __typename: "Partner",
      merchantAccount: {
        externalId: "merchant-123",
      },
    },
  }

  it("renders the payment form", async () => {
    renderWithRelay({
      Me: () => ({
        order: baseOrderProps,
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })

    expect(screen.getByTestId("payment-element")).toBeInTheDocument()
  })

  describe("payment method switching behavior", () => {
    it("updates Stripe's captureMethod and setupFutureUsage when selecting credit card", async () => {
      renderWithRelay({
        Me: () => ({
          order: baseOrderProps,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      // Should update elements to manual capture for credit cards
      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "manual",
        setupFutureUsage: "off_session",
      })

      // Should track payment method selection
      expect(
        mockCheckoutContext.checkoutTracking.clickedPaymentMethod,
      ).toHaveBeenCalledWith({
        paymentMethod: "CREDIT_CARD",
        amountMinor: 100000,
        currency: "USD",
      })
    })

    it("updates Stripe's captureMethod and setupFutureUsage when selecting ACH", async () => {
      renderWithRelay({
        Me: () => ({
          order: baseOrderProps,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      // Select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      // Should update elements to automatic capture for ACH
      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
      })
    })

    it("switching from credit card to ACH updates Stripe settings correctly", async () => {
      renderWithRelay({
        Me: () => ({
          order: baseOrderProps,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      // First select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "manual",
        setupFutureUsage: "off_session",
      })

      // Clear the mock to check the next call
      mockElements.update.mockClear()

      // Then select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
      })
    })

    it("switching from ACH to credit card updates Stripe settings correctly", async () => {
      renderWithRelay({
        Me: () => ({
          order: baseOrderProps,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      // First select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
      })

      // Clear the mock to check the next call
      mockElements.update.mockClear()

      // Then select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "manual",
        setupFutureUsage: "off_session",
      })

      // Should track payment method selection for credit card
      expect(
        mockCheckoutContext.checkoutTracking.clickedPaymentMethod,
      ).toHaveBeenCalledWith({
        paymentMethod: "CREDIT_CARD",
        amountMinor: 100000,
        currency: "USD",
      })
    })

    it("tracks initial saved payment method viewed if there are saved cards", async () => {
      const savedCards = [
        {
          id: "card-1",
          brand: "Visa",
          last4: "1234",
        },
      ]

      const { mockResolveLastOperation } = renderWithRelay({
        Me: () => ({
          order: {
            ...baseOrderProps,
          },
          savedCreditCards: savedCards,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      expect(
        mockCheckoutContext.checkoutTracking.savedPaymentMethodViewed,
      ).not.toHaveBeenCalled()

      await waitFor(() => {
        mockResolveLastOperation({
          Me: () => ({
            creditCards: savedCards,
          }),
        })
      })

      await flushPromiseQueue()

      // Should track saved payment method viewed
      expect(
        mockCheckoutContext.checkoutTracking.savedPaymentMethodViewed,
      ).toHaveBeenCalledWith(["CREDIT_CARD"])
    })
  })

  describe("order submission flow", () => {
    /**
     * Payment method submission flows differ based on the payment type:
     *
     * Credit Card:
     * 1. elements.submit() -> createConfirmationToken()
     * 2. Fetch confirmation token details from Gravity
     * 3. updateOrderMutation with CREDIT_CARD payment method
     * 4. setConfirmationToken with saveCreditCard option
     *
     * ACH (US Bank Account):
     * 1. elements.submit() -> createConfirmationToken()
     * 2. createBankDebitSetupForOrder mutation
     * 3. updateOrderMutation with US_BANK_ACCOUNT payment method
     * 4. setConfirmationToken without saveCreditCard option
     *
     * Saved Credit Card:
     * 1. No Stripe interaction needed
     * 2. setPaymentMutation with selected card ID
     * 3. setSavedCreditCard in context
     */
    it("successfully submits an ACH order", async () => {
      renderWithRelay({
        Me: () => ({
          order: baseOrderProps,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByTestId("mock-ach"))

      mockElements.submit.mockResolvedValueOnce({ error: null })
      mockStripe.createConfirmationToken.mockResolvedValueOnce({
        error: null,
        confirmationToken: {
          id: "ach-confirmation-token-id",
        },
      })

      mockCreateBankDebitSetupForOrder.submitMutation.mockResolvedValueOnce({})
      mockUpdateOrderMutation.submitMutation.mockResolvedValueOnce({
        updateOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              ...baseOrderProps,
              paymentMethod: "US_BANK_ACCOUNT",
              stripeConfirmationToken: "ach-confirmation-token-id",
            },
          },
        },
      })

      await userEvent.click(screen.getByText("Continue to Review"))

      expect(mockElements.submit).toHaveBeenCalled()
      expect(mockStripe.createConfirmationToken).toHaveBeenCalledWith({
        elements: mockElements,
      })

      expect(
        mockCheckoutContext.checkoutTracking.clickedOrderProgression,
      ).toHaveBeenCalledWith("ordersPayment")

      await waitFor(() => {
        expect(
          mockCreateBankDebitSetupForOrder.submitMutation,
        ).toHaveBeenCalledWith({
          variables: { input: { id: "order-id" } },
        })
      })

      expect(mockUpdateOrderMutation.submitMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "order-id",
            paymentMethod: "US_BANK_ACCOUNT",
            stripeConfirmationToken: "ach-confirmation-token-id",
          },
        },
      })

      expect(mockCheckoutContext.setConfirmationToken).toHaveBeenCalledWith({
        confirmationToken: { id: "ach-confirmation-token-id" },
        saveCreditCard: false,
      })
    })

    it("handles createBankDebitSetupForOrder error", async () => {
      renderWithRelay({
        Me: () => ({
          order: baseOrderProps,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByTestId("mock-ach"))

      // Mock successful Stripe responses
      mockElements.submit.mockResolvedValueOnce({ error: null })
      mockStripe.createConfirmationToken.mockResolvedValueOnce({
        error: null,
        confirmationToken: {
          id: "ach-confirmation-token-id",
        },
      })

      // Mock bank debit setup failure
      mockCreateBankDebitSetupForOrder.submitMutation.mockRejectedValueOnce(
        new Error("Bank setup failed"),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await waitFor(() => {
        // Should call bank debit setup but it will fail
        expect(
          mockCreateBankDebitSetupForOrder.submitMutation,
        ).toHaveBeenCalled()
      })

      // Should not proceed to set confirmation token when error occurs
      expect(mockCheckoutContext.setConfirmationToken).not.toHaveBeenCalled()

      // Button should be available again (not in loading state)
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })

    it("handles updateOrderMutation error", async () => {
      renderWithRelay({
        Me: () => ({
          order: baseOrderProps,
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByTestId("mock-ach"))

      // Mock successful Stripe responses
      mockElements.submit.mockResolvedValueOnce({ error: null })
      mockStripe.createConfirmationToken.mockResolvedValueOnce({
        error: null,
        confirmationToken: {
          id: "ach-confirmation-token-id",
        },
      })

      // Mock successful bank debit setup but failed order update
      mockCreateBankDebitSetupForOrder.submitMutation.mockResolvedValueOnce({})
      mockUpdateOrderMutation.submitMutation.mockRejectedValueOnce(
        new Error("Order update failed"),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await waitFor(() => {
        // Should call both mutations, second one fails
        expect(
          mockCreateBankDebitSetupForOrder.submitMutation,
        ).toHaveBeenCalled()
        expect(mockUpdateOrderMutation.submitMutation).toHaveBeenCalled()
      })

      // Should not proceed to set confirmation token when error occurs
      expect(mockCheckoutContext.setConfirmationToken).not.toHaveBeenCalled()

      // Button should be available again (not in loading state)
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })
  })
})
