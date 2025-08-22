import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
        <button
          type="button"
          data-testid="mock-sepa"
          onClick={() => {
            const changeEvent = {
              elementType: "payment",
              collapsed: false,
              value: { type: "sepa_debit" },
            }
            onChange(changeEvent)
          }}
        >
          Mock SEPA
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

// Mock fetchQuery for the confirmation token query
const mockFetchQuery = jest.fn()

jest.mock("react-relay", () => {
  const originalModule = jest.requireActual("react-relay")
  return {
    ...originalModule,
    fetchQuery: (...args) => mockFetchQuery(...args),
  }
})

const mockCheckoutContext = {
  setConfirmationToken: jest.fn(),
  setSavePaymentMethod: jest.fn(),
  setSavedPaymentMethod: jest.fn(),
  setPaymentComplete: jest.fn(),
  savePaymentMethod: false,
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
const mockSetPaymentMutation = {
  submitMutation: jest.fn(),
}

const mockCreateBankDebitSetupForOrder = {
  submitMutation: jest.fn(),
}

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderPaymentMutation",
  () => ({
    useOrder2SetOrderPaymentMutation: () => mockSetPaymentMutation,
  }),
)

const mockLegacySetPaymentMutation = {
  submitMutation: jest.fn(),
}

jest.mock("Apps/Order/Mutations/useSetPayment", () => ({
  useSetPayment: () => mockLegacySetPaymentMutation,
}))

jest.mock(
  "Components/BankDebitForm/Mutations/CreateBankDebitSetupForOrder",
  () => ({
    CreateBankDebitSetupForOrder: () => mockCreateBankDebitSetupForOrder,
  }),
)

// Mock response factories
const createConfirmationTokenResponse = paymentMethodPreview => ({
  toPromise: () =>
    Promise.resolve({
      me: {
        confirmationToken: {
          paymentMethodPreview,
        },
      },
    }),
})

const MOCK_CARD_PREVIEW = {
  __typename: "Card" as const,
  displayBrand: "Visa",
  last4: "1234",
}

const MOCK_ACH_PREVIEW = {
  __typename: "USBankAccount" as const,
  bankName: "Test Bank",
  last4: "5678",
}

const MOCK_ORDER_SUCCESS = (paymentMethod: string, tokenId: string) => ({
  updateOrder: {
    orderOrError: {
      __typename: "OrderMutationSuccess",
      order: {
        paymentMethod,
        stripeConfirmationToken: tokenId,
      },
    },
  },
})

// Test helpers
const setupStripeSubmission = (tokenId: string) => {
  mockElements.submit.mockResolvedValueOnce({ error: null })
  mockStripe.createConfirmationToken.mockResolvedValueOnce({
    error: null,
    confirmationToken: { id: tokenId },
  })
}

const expectCommonSubmissionFlow = async (tokenId: string) => {
  expect(mockElements.submit).toHaveBeenCalled()
  expect(mockStripe.createConfirmationToken).toHaveBeenCalledWith({
    elements: mockElements,
  })
  expect(
    mockCheckoutContext.checkoutTracking.clickedOrderProgression,
  ).toHaveBeenCalledWith("ordersPayment")

  await waitFor(() => {
    expect(mockFetchQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      { id: tokenId },
      { fetchPolicy: "store-or-network" },
    )
  })
}

const waitForPaymentElement = async () => {
  await waitFor(() => {
    expect(screen.getByTestId("payment-element")).toBeInTheDocument()
  })
}

beforeEach(() => {
  jest.clearAllMocks()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: jest.fn(),
  }))

  // Set up default mock response for confirmation token query
  mockFetchQuery.mockImplementation(() =>
    createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
  )
})

const { renderWithRelay } = setupTestWrapperTL<Order2PaymentFormTestQuery>({
  Component: (props: any) => (
    <Order2PaymentForm order={props.me.order} me={props.me} />
  ),
  query: graphql`
    query Order2PaymentFormTestQuery @relay_test_operation {
      me {
        ...Order2PaymentForm_me
        order(id: "order-id") {
          ...Order2PaymentForm_order
        }
      }
    }
  `,
})

describe("Order2PaymentForm", () => {
  const baseMeProps = {
    creditCards: { edges: [] },
    order: {
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
    },
  }

  const renderPaymentForm = () => {
    return renderWithRelay({
      Me: () => ({
        ...baseMeProps,
      }),
    })
  }

  it("renders the payment form", async () => {
    renderPaymentForm()

    await waitFor(() => {
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })

    expect(screen.getByTestId("payment-element")).toBeInTheDocument()
  })

  describe("payment method switching behavior", () => {
    it("updates Stripe's captureMethod and setupFutureUsage when selecting credit card", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      // Should update elements to manual capture for credit cards
      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "manual",
        setupFutureUsage: "off_session",
        mode: "payment",
      })
    })

    it("updates Stripe's captureMethod and setupFutureUsage when selecting ACH", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      // Should update elements to automatic capture for ACH
      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
        mode: "setup",
        payment_method_types: ["us_bank_account"],
      })
    })

    it("switching from credit card to ACH updates Stripe settings correctly", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // First select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "manual",
        setupFutureUsage: "off_session",
        mode: "payment",
      })

      // Clear the mock to check the next call
      mockElements.update.mockClear()

      // Then select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
        mode: "setup",
        payment_method_types: ["us_bank_account"],
      })
    })

    it("switching from ACH to credit card updates Stripe settings correctly", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // First select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
        mode: "setup",
        payment_method_types: ["us_bank_account"],
      })

      // Clear the mock to check the next call
      mockElements.update.mockClear()

      // Then select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "manual",
        setupFutureUsage: "off_session",
        mode: "payment",
      })
    })
  })

  describe("payment method tracking", () => {
    it("tracks payment method selection for credit card", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-credit-card"))

      expect(
        mockCheckoutContext.checkoutTracking.clickedPaymentMethod,
      ).toHaveBeenCalledWith({
        paymentMethod: "CREDIT_CARD",
        amountMinor: 100000,
        currency: "USD",
      })
    })

    it("tracks payment method selection for ACH", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-ach"))

      expect(
        mockCheckoutContext.checkoutTracking.clickedPaymentMethod,
      ).toHaveBeenCalledWith({
        paymentMethod: "US_BANK_ACCOUNT",
        amountMinor: 100000,
        currency: "USD",
      })
    })

    it("tracks payment method selection for wire transfer", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("PaymentFormWire"))

      expect(
        mockCheckoutContext.checkoutTracking.clickedPaymentMethod,
      ).toHaveBeenCalledWith({
        paymentMethod: "WIRE_TRANSFER",
        amountMinor: 100000,
        currency: "USD",
      })
    })

    it("tracks payment method selection for SEPA", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-sepa"))

      expect(
        mockCheckoutContext.checkoutTracking.clickedPaymentMethod,
      ).toHaveBeenCalledWith({
        paymentMethod: "SEPA_DEBIT",
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

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          creditCards: { edges: savedCards.map(card => ({ node: card })) },
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      // Should track saved payment method viewed
      expect(
        mockCheckoutContext.checkoutTracking.savedPaymentMethodViewed,
      ).toHaveBeenCalledWith(["CREDIT_CARD"])
    })

    it("tracks payment method selection for saved credit card", async () => {
      const savedCards = [
        {
          id: "card-1",
          internalID: "card-1",
          brand: "Visa",
          last4: "1234",
          lastDigits: "1234",
        },
      ]

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          creditCards: { edges: savedCards.map(card => ({ node: card })) },
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      const savedPaymentsText = screen.getByText("Saved payments")
      await userEvent.click(savedPaymentsText)

      expect(
        mockCheckoutContext.checkoutTracking.clickedPaymentMethod,
      ).toHaveBeenCalledWith({
        paymentMethod: "SAVED_CREDIT_CARD",
        amountMinor: 100000,
        currency: "USD",
      })
    })

    it("tracks initial saved payment method viewed with both credit cards and bank accounts", async () => {
      const savedCards = [
        {
          id: "card-1",
          brand: "Visa",
          last4: "1234",
        },
      ]

      const savedBankAccounts = [
        {
          id: "bank-1",
          last4: "5678",
          bankName: "Test Bank",
        },
      ]

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          creditCards: { edges: savedCards.map(card => ({ node: card })) },
          bankAccounts: {
            edges: savedBankAccounts.map(bank => ({ node: bank })),
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByTestId("payment-element")).toBeInTheDocument()
      })

      expect(
        mockCheckoutContext.checkoutTracking.savedPaymentMethodViewed,
      ).toHaveBeenCalledWith(["CREDIT_CARD"])
    })

    it("tracks order progression when submitting payment", async () => {
      const tokenId = "test-token-id"

      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-credit-card"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("CREDIT_CARD", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      expect(
        mockCheckoutContext.checkoutTracking.clickedOrderProgression,
      ).toHaveBeenCalledWith("ordersPayment")
    })
  })

  describe("order submission flow", () => {
    /**
     * Payment method submission flows differ based on the payment type:
     *
     * Credit Card:
     * 1. elements.submit() -> createConfirmationToken()
     * 2. Fetch confirmation token details from Exchange
     * 3. updateOrderMutation with CREDIT_CARD payment method
     * 4. setConfirmationToken with saveCreditCard option
     *
     * ACH (US Bank Account):
     * 1. elements.submit() -> createConfirmationToken()
     * 2. Fetch confirmation token details from Exchange
     * 3. createBankDebitSetupForOrder mutation
     * 4. updateOrderMutation with US_BANK_ACCOUNT payment method
     * 5. setConfirmationToken without saveCreditCard option
     *
     * Saved Credit Card:
     * 1. No Stripe interaction needed
     * 2. setPaymentMutation with selected card ID
     * 3. setSavePaymentMethod in context
     */

    it("successfully submits a credit card order", async () => {
      const tokenId = "credit-card-confirmation-token-id"

      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-credit-card"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("CREDIT_CARD", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await expectCommonSubmissionFlow(tokenId)

      expect(mockSetPaymentMutation.submitMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "order-id",
            paymentMethod: "CREDIT_CARD",
            stripeConfirmationToken: tokenId,
          },
        },
      })

      expect(mockCheckoutContext.setConfirmationToken).toHaveBeenCalledWith({
        confirmationToken: {
          id: tokenId,
          paymentMethodPreview: MOCK_CARD_PREVIEW,
        },
      })
    })
    it("successfully submits an ACH order", async () => {
      const tokenId = "ach-confirmation-token-id"

      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-ach"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_ACH_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("US_BANK_ACCOUNT", tokenId),
      )
      mockCreateBankDebitSetupForOrder.submitMutation.mockResolvedValueOnce({})

      await userEvent.click(screen.getByText("Continue to Review"))

      await expectCommonSubmissionFlow(tokenId)

      expect(mockSetPaymentMutation.submitMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "order-id",
            paymentMethod: "US_BANK_ACCOUNT",
            stripeConfirmationToken: tokenId,
          },
        },
      })

      await waitFor(() => {
        expect(
          mockCreateBankDebitSetupForOrder.submitMutation,
        ).toHaveBeenCalledWith({
          variables: { input: { id: "order-id" } },
        })
      })

      expect(mockCheckoutContext.setConfirmationToken).toHaveBeenCalledWith({
        confirmationToken: {
          id: tokenId,
          paymentMethodPreview: MOCK_ACH_PREVIEW,
        },
      })
    })

    it("handles createBankDebitSetupForOrder error", async () => {
      const tokenId = "ach-confirmation-token-id"

      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-ach"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_ACH_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("US_BANK_ACCOUNT", tokenId),
      )
      mockCreateBankDebitSetupForOrder.submitMutation.mockRejectedValueOnce(
        new Error("Bank setup failed"),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await waitFor(() => {
        expect(mockFetchQuery).toHaveBeenCalled()
      })

      await waitFor(() => {
        expect(mockSetPaymentMutation.submitMutation).toHaveBeenCalled()
        expect(
          mockCreateBankDebitSetupForOrder.submitMutation,
        ).toHaveBeenCalled()
      })

      // setConfirmationToken should still be called since it happens before mutations
      expect(mockCheckoutContext.setConfirmationToken).toHaveBeenCalledWith({
        confirmationToken: {
          id: tokenId,
          paymentMethodPreview: MOCK_ACH_PREVIEW,
        },
      })

      // Button should be available again (not in loading state)
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })

    it("handles updateOrderMutation error", async () => {
      const tokenId = "ach-confirmation-token-id"

      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-ach"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_ACH_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockRejectedValueOnce(
        new Error("Order update failed"),
      )
      mockCreateBankDebitSetupForOrder.submitMutation.mockResolvedValueOnce({})

      await userEvent.click(screen.getByText("Continue to Review"))

      await waitFor(() => {
        expect(mockFetchQuery).toHaveBeenCalled()
      })

      await waitFor(() => {
        expect(mockSetPaymentMutation.submitMutation).toHaveBeenCalled()
      })

      // setConfirmationToken should still be called since it happens before mutations
      expect(mockCheckoutContext.setConfirmationToken).toHaveBeenCalledWith({
        confirmationToken: {
          id: tokenId,
          paymentMethodPreview: MOCK_ACH_PREVIEW,
        },
      })

      // Button should be available again (not in loading state)
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })
  })
})
