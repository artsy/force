import { render } from "@testing-library/react"
import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { PaymentTestQuery$rawResponse } from "__generated__/PaymentTestQuery.graphql"
import { BankDebitForm } from "Components/BankDebitForm/BankDebitForm"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"

// In our stripe PaymentElement mock
// we automatically fire this event if defined
let mockEvent: any

jest.unmock("react-tracking")
jest.mock("@stripe/react-stripe-js", () => {
  const realStripe = jest.requireActual("@stripe/react-stripe-js")
  return {
    ...realStripe,
    useStripe: jest.fn(() => ({})),
    useElements: jest.fn(),
    PaymentElement: ({ onChange }: { onChange: (event: any) => void }) => {
      if (!!mockEvent) {
        onChange(mockEvent)
      }
      return <div />
    },
  }
})
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-tracking")
jest.mock("Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext")

const testOrder: PaymentTestQuery$rawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
}
const trackEvent = jest.fn()

describe("BankDebitForm", () => {
  beforeAll(() => {
    trackEvent.mockClear()
    mockEvent = null
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })

    const mockUseSystemContext = useSystemContext as jest.Mock
    mockUseSystemContext.mockImplementation(() => ({
      user: {},
    }))
  })

  describe("with not enough balance", () => {
    beforeEach(() => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "US_BANK_ACCOUNT",
          bankAccountHasInsufficientFunds: true,
          setBankAccountHasInsufficientFunds: jest.fn(),
          setIsSavingPayment: jest.fn(),
          setIsStripePaymentElementLoading: jest.fn(),
        }
      })
    })

    it("tracks a `complete` event from the onChange handler", () => {
      mockEvent = { complete: true, empty: true }

      render(<BankDebitForm order={testOrder} onError={jest.fn()} />)

      expect(trackEvent).toHaveBeenCalledWith({
        flow: "BUY",
        order_id: "1234",
        subject: "link_account",
        context_page_owner_type: "orders-payment",
        action: "clickedPaymentDetails",
      })
    })

    it("renders correct not enough funds message", () => {
      const screen = render(
        <BankDebitForm order={testOrder} onError={jest.fn()} />
      )

      expect(
        screen.queryByText("This bank account doesn’t have enough funds.")
      ).toBeInTheDocument()
    })
  })

  describe("with SEPA", () => {
    beforeEach(() => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "SEPA_DEBIT",
          bankAccountHasInsufficientFunds: true,
          setBankAccountHasInsufficientFunds: jest.fn(),
          setIsSavingPayment: jest.fn(),
          setIsStripePaymentElementLoading: jest.fn(),
        }
      })
    })

    it("does not render a checkbox to save bank account", () => {
      const screen = render(
        <BankDebitForm order={testOrder} onError={jest.fn()} />
      )

      expect(
        screen.queryByTestId("SaveBankAccountCheckbox")
      ).not.toBeInTheDocument()
    })
  })
})
