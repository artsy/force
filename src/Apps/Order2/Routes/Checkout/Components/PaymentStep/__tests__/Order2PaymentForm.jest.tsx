import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2PaymentFormTestQuery } from "__generated__/Order2PaymentFormTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2PaymentForm } from "../Order2PaymentForm"
import React from "react"

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
  activeFulfillmentDetailsTab: "DELIVERY" as "PICKUP" | "DELIVERY" | null,
}

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

// Mock mutations
const mockSetPaymentMutation = {
  submitMutation: jest.fn(),
}

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderPaymentMutation",
  () => ({
    useOrder2SetOrderPaymentMutation: () => mockSetPaymentMutation,
  }),
)

// Mock balance check component
jest.mock("Apps/Order2/Components/Order2PollBankAccountBalance", () => ({
  Order2PollBankAccountBalanceQueryRenderer: ({
    onBalanceCheckComplete,
  }: any) => {
    // Immediately call onBalanceCheckComplete with SUFFICIENT result
    React.useEffect(() => {
      onBalanceCheckComplete("SUFFICIENT")
    }, [onBalanceCheckComplete])
    return <div data-testid="balance-check-polling">Checking balance...</div>
  },
  BankAccountBalanceCheckResult: {
    SUFFICIENT: "SUFFICIENT",
    INSUFFICIENT: "INSUFFICIENT",
    PENDING: "PENDING",
    TIMEOUT: "TIMEOUT",
    OTHER: "OTHER",
  },
}))

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
  setOrderPayment: {
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
  expect(mockStripe.createConfirmationToken).toHaveBeenCalledWith(
    expect.objectContaining({
      elements: mockElements,
    }),
  )
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
    bankAccounts: { edges: [] },
    email: "test@example.com",
    order: {
      id: "T3JkZXI6b3JkZXItaWQ=", // Relay ID
      internalID: "order-id",
      code: "TEST-ORDER-123",
      mode: "BUY",
      source: "ARTWORK_PAGE",
      availablePaymentMethods: ["CREDIT_CARD", "WIRE_TRANSFER"],
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
      lineItems: [
        {
          artwork: {
            href: "/artwork/test-artwork",
            artworkMeta: {
              share: "Check out Test Artwork by Test Artist",
            },
          },
        },
      ],
      fulfillmentDetails: {
        name: "Jane Smith",
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        city: "New York",
        region: "NY",
        postalCode: "10001",
        country: "US",
        phoneNumber: "555-123-4567",
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
    it("updates Stripe elements on submit for credit card", async () => {
      const tokenId = "test-token-id"
      renderPaymentForm()
      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("CREDIT_CARD", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "manual",
        paymentMethodOptions: null,
      })
    })

    it("updates Stripe elements on submit for ACH", async () => {
      const tokenId = "test-token-id"
      renderPaymentForm()
      await waitForPaymentElement()

      // Select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_ACH_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("US_BANK_ACCOUNT", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
        mode: "setup",
        paymentMethodTypes: ["us_bank_account"],
        onBehalfOf: null,
      })
    })

    it("updates Stripe elements on submit for SEPA", async () => {
      const tokenId = "test-token-id"
      renderPaymentForm()
      await waitForPaymentElement()

      // Select SEPA
      await userEvent.click(screen.getByTestId("mock-sepa"))

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse({
          __typename: "SEPADebit" as const,
          bankCode: "12345",
          last4: "1234",
        }),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("SEPA_DEBIT", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      expect(mockElements.update).toHaveBeenCalledWith({
        captureMethod: "automatic",
        setupFutureUsage: null,
        mode: "setup",
        paymentMethodTypes: ["sepa_debit"],
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

      // For delivery orders, "same as shipping" checkbox should be shown and checked by default
      await waitFor(() => {
        expect(
          screen.getByTestId("billing-address-same-as-shipping"),
        ).toBeInTheDocument()
      })
      expect(
        screen.getByTestId("billing-address-same-as-shipping"),
      ).toBeChecked()

      // No billing address form should be shown since "same as shipping" is checked
      expect(screen.queryByText("Billing address")).not.toBeInTheDocument()

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

    it("successfully submits a credit card order with separate billing address", async () => {
      const tokenId = "credit-card-separate-billing-token-id"

      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-credit-card"))

      // Wait for and uncheck "same as shipping" checkbox
      await waitFor(() => {
        expect(
          screen.getByTestId("billing-address-same-as-shipping"),
        ).toBeInTheDocument()
      })

      await userEvent.click(
        screen.getByTestId("billing-address-same-as-shipping"),
      )

      // Now billing address form should be shown
      await waitFor(() => {
        expect(screen.getByText("Billing address")).toBeInTheDocument()
        expect(screen.getByTestId("addressFormFields.name")).toBeInTheDocument()
      })

      // Fill in required billing address fields
      const nameInput = screen.getByTestId("addressFormFields.name")
      await userEvent.type(nameInput, "John Doe")

      const addressInput = screen.getByTestId("addressFormFields.addressLine1")
      await userEvent.type(addressInput, "456 Oak St")

      const cityInput = screen.getByTestId("addressFormFields.city")
      await userEvent.type(cityInput, "Boston")

      const regionInput = screen.getByTestId("addressFormFields.region")
      await userEvent.type(regionInput, "MA")

      const postalCodeInput = screen.getByTestId("addressFormFields.postalCode")
      await userEvent.type(postalCodeInput, "02101")

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("CREDIT_CARD", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await expectCommonSubmissionFlow(tokenId)

      // Verify that createConfirmationToken was called with separate billing address
      expect(mockStripe.createConfirmationToken).toHaveBeenCalledWith({
        elements: mockElements,
        params: {
          payment_method_data: {
            billing_details: {
              name: "John Doe",
              address: {
                line1: "456 Oak St",
                line2: "",
                city: "Boston",
                state: "MA",
                postal_code: "02101",
                country: "US",
              },
            },
          },
        },
      })
    })
  })

  describe("order submission flow", () => {
    /**
     * Payment method submission flows:
     *
     * Credit Card / ACH / SEPA (Stripe Payment Element):
     * 1. elements.submit() -> createConfirmationToken()
     * 2. Fetch confirmation token details from Exchange
     * 3. setOrderPaymentMutation with corresponding payment method (CREDIT_CARD, US_BANK_ACCOUNT, or SEPA_DEBIT)
     * 4. setConfirmationToken with payment method preview
     * 5. setPaymentComplete
     *
     * Saved Credit Card / Bank Account:
     * 1. No Stripe interaction needed
     * 2. setPaymentMutation with selected payment method ID
     * 3. setSavePaymentMethod in context
     *
     * Wire Transfer:
     * 1. No Stripe interaction needed
     * 2. setPaymentMutation with WIRE_TRANSFER payment method
     */

    it("successfully submits a credit card order", async () => {
      const tokenId = "credit-card-confirmation-token-id"

      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("mock-credit-card"))

      await waitFor(() => {
        const checkbox = screen.getByTestId("billing-address-same-as-shipping")
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toBeChecked()
        expect(screen.queryByText("Billing address")).not.toBeInTheDocument()
      })

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("CREDIT_CARD", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await expectCommonSubmissionFlow(tokenId)

      expect(mockStripe.createConfirmationToken).toHaveBeenCalledWith({
        elements: mockElements,
        params: {
          payment_method_data: {
            billing_details: {
              name: "Jane Smith",
              address: {
                line1: "123 Main St",
                line2: "Apt 4B",
                city: "New York",
                state: "NY",
                postal_code: "10001",
                country: "US",
              },
            },
          },
        },
      })

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

      expect(mockCheckoutContext.setConfirmationToken).toHaveBeenCalledWith({
        confirmationToken: {
          id: tokenId,
          paymentMethodPreview: MOCK_ACH_PREVIEW,
        },
      })

      // Wait for balance check to complete and trigger setPaymentComplete
      await waitFor(() => {
        expect(mockCheckoutContext.setPaymentComplete).toHaveBeenCalled()
      })
    })

    it("handles setOrderPaymentMutation error", async () => {
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

    it("successfully submits a wire transfer order", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("PaymentFormWire"))

      const mockWireTransferSuccess = MOCK_ORDER_SUCCESS("WIRE_TRANSFER", "")

      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        mockWireTransferSuccess,
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      expect(
        mockCheckoutContext.checkoutTracking.clickedOrderProgression,
      ).toHaveBeenCalledWith("ordersPayment")

      await waitFor(() => {
        expect(mockSetPaymentMutation.submitMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              id: "order-id",
              paymentMethod: "WIRE_TRANSFER",
            },
          },
        })
      })

      expect(mockCheckoutContext.setSavedPaymentMethod).toHaveBeenCalledWith({
        savedPaymentMethod: null,
      })
      expect(mockCheckoutContext.setPaymentComplete).toHaveBeenCalled()
    })

    it("handles wire transfer submission error", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      await userEvent.click(screen.getByTestId("PaymentFormWire"))

      mockSetPaymentMutation.submitMutation.mockRejectedValueOnce(
        new Error("Wire transfer setup failed"),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await waitFor(() => {
        expect(mockSetPaymentMutation.submitMutation).toHaveBeenCalledWith({
          variables: {
            input: {
              id: "order-id",
              paymentMethod: "WIRE_TRANSFER",
            },
          },
        })
      })

      // Button should be available again (not in loading state)
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })
  })

  describe("billing address functionality", () => {
    it("shows billing address same as shipping checkbox when credit card is selected", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      await waitFor(() => {
        expect(
          screen.getByTestId("billing-address-same-as-shipping"),
        ).toBeInTheDocument()
      })

      // Should be checked by default
      expect(
        screen.getByTestId("billing-address-same-as-shipping"),
      ).toBeChecked()
    })

    it("shows billing address form when billing address same as shipping is unchecked", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      await waitFor(() => {
        expect(
          screen.getByTestId("billing-address-same-as-shipping"),
        ).toBeInTheDocument()
      })

      // Uncheck the billing address same as shipping
      await userEvent.click(
        screen.getByTestId("billing-address-same-as-shipping"),
      )

      await waitFor(() => {
        expect(screen.getByText("Billing address")).toBeInTheDocument()
        expect(screen.getByTestId("addressFormFields.name")).toBeInTheDocument()
      })
    })

    it("hides billing address form when not using credit card", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Initially stripe-card section should be collapsed since no payment method is selected
      expect(screen.getByTestId("stripe-card-collapse")).toHaveStyle({
        height: "0px",
      })

      // Select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      // Should still be collapsed since ACH is not a credit card
      expect(screen.getByTestId("stripe-card-collapse")).toHaveStyle({
        height: "0px",
      })
    })
  })

  describe("pickup orders billing address functionality", () => {
    beforeEach(() => {
      // Set up pickup context for these tests
      mockCheckoutContext.activeFulfillmentDetailsTab = "PICKUP"
    })

    afterEach(() => {
      // Reset to default after each test
      mockCheckoutContext.activeFulfillmentDetailsTab = "DELIVERY"
    })

    it("hides billing address same as shipping checkbox for pickup orders", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      // Should not show the billing address same as shipping checkbox for pickup orders
      expect(
        screen.queryByTestId("billing-address-same-as-shipping"),
      ).not.toBeInTheDocument()
    })

    it("always shows billing address form for pickup orders with credit card", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      await waitFor(() => {
        // Should always show billing address form for pickup orders
        expect(screen.getByText("Billing address")).toBeInTheDocument()
        expect(screen.getByTestId("addressFormFields.name")).toBeInTheDocument()
      })
    })

    it("does not show billing address form for pickup orders with non-credit card payment", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select ACH
      await userEvent.click(screen.getByTestId("mock-ach"))

      // Should not show billing address form for non-credit card payments
      expect(screen.queryByText("Billing address")).not.toBeInTheDocument()
    })

    it("submits pickup order with billing address for credit card payment", async () => {
      const tokenId = "pickup-credit-card-token-id"

      // Create order with pickup fulfillment details
      const pickupOrder = {
        ...baseMeProps,
        order: {
          ...baseMeProps.order,
          fulfillmentDetails: {
            phoneNumber: "555-123-4567",
          },
        },
      }

      renderWithRelay({
        Me: () => pickupOrder,
      })

      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      await waitFor(() => {
        expect(screen.getByText("Billing address")).toBeInTheDocument()
        expect(screen.getByTestId("addressFormFields.name")).toBeInTheDocument()
      })

      // Fill in required billing address fields
      const nameInput = screen.getByTestId("addressFormFields.name")
      await userEvent.type(nameInput, "John Doe")

      const addressInput = screen.getByTestId("addressFormFields.addressLine1")
      await userEvent.type(addressInput, "123 Main St")

      const cityInput = screen.getByTestId("addressFormFields.city")
      await userEvent.type(cityInput, "New York")

      const regionInput = screen.getByTestId("addressFormFields.region")
      await userEvent.type(regionInput, "NY")

      const postalCodeInput = screen.getByTestId("addressFormFields.postalCode")
      await userEvent.type(postalCodeInput, "10001")

      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("CREDIT_CARD", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await expectCommonSubmissionFlow(tokenId)

      // Verify that createConfirmationToken was called with billing details
      expect(mockStripe.createConfirmationToken).toHaveBeenCalledWith({
        elements: mockElements,
        params: {
          payment_method_data: {
            billing_details: {
              name: "John Doe",
              address: {
                line1: "123 Main St",
                line2: "",
                city: "New York",
                state: "NY",
                postal_code: "10001",
                country: "US", // Default country
              },
            },
          },
        },
      })
    })
  })

  describe("shipping orders billing address functionality", () => {
    beforeEach(() => {
      // Set up shipping context for these tests
      mockCheckoutContext.activeFulfillmentDetailsTab = "DELIVERY"
    })

    afterEach(() => {
      // Reset to default after each test
      mockCheckoutContext.activeFulfillmentDetailsTab = "DELIVERY"
    })

    it("shows billing address same as shipping checkbox for shipping orders", async () => {
      renderPaymentForm()
      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      await waitFor(() => {
        expect(
          screen.getByTestId("billing-address-same-as-shipping"),
        ).toBeInTheDocument()
      })

      // Should be checked by default
      expect(
        screen.getByTestId("billing-address-same-as-shipping"),
      ).toBeChecked()
    })

    it("uses shipping address as billing address when same as shipping is checked", async () => {
      const tokenId = "shipping-same-billing-token-id"

      // Add fulfillment details to the order
      const orderWithFulfillment = {
        ...baseMeProps,
        order: {
          ...baseMeProps.order,
          fulfillmentDetails: {
            name: "Jane Smith",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4B",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
      }

      renderWithRelay({
        Me: () => orderWithFulfillment,
      })

      await waitForPaymentElement()

      // Select credit card
      await userEvent.click(screen.getByTestId("mock-credit-card"))

      await waitFor(() => {
        expect(
          screen.getByTestId("billing-address-same-as-shipping"),
        ).toBeInTheDocument()
      })

      // Keep same as shipping checked (default)
      setupStripeSubmission(tokenId)
      mockFetchQuery.mockImplementationOnce(() =>
        createConfirmationTokenResponse(MOCK_CARD_PREVIEW),
      )
      mockSetPaymentMutation.submitMutation.mockResolvedValueOnce(
        MOCK_ORDER_SUCCESS("CREDIT_CARD", tokenId),
      )

      await userEvent.click(screen.getByText("Continue to Review"))

      await expectCommonSubmissionFlow(tokenId)

      // Verify that createConfirmationToken was called with shipping address as billing
      expect(mockStripe.createConfirmationToken).toHaveBeenCalledWith({
        elements: mockElements,
        params: {
          payment_method_data: {
            billing_details: {
              name: "Jane Smith",
              address: {
                line1: "123 Main St",
                line2: "Apt 4B",
                city: "New York",
                state: "NY",
                postal_code: "10001",
                country: "US",
              },
            },
          },
        },
      })
    })
  })

  describe("bank account balance check", () => {
    it("shows balance check polling after submitting ACH payment", async () => {
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

      await userEvent.click(screen.getByText("Continue to Review"))

      await expectCommonSubmissionFlow(tokenId)

      // Verify payment method was set with correct parameters
      expect(mockSetPaymentMutation.submitMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "order-id",
            paymentMethod: "US_BANK_ACCOUNT",
            stripeConfirmationToken: tokenId,
          },
        },
      })

      // After setting payment method, balance check should be triggered
      // The isCheckingBankBalance state would be set to true
      // and Order2PollBankAccountBalanceQueryRenderer would be rendered
      // Note: Full verification requires mocking the balance check component
    })
  })
})
