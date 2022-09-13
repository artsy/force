import { render } from "@testing-library/react"
import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { useSystemContext } from "System"
import { useTracking } from "react-tracking"
import { PaymentTestQueryRawResponse } from "__generated__/PaymentTestQuery.graphql"
import { BankDebitForm } from "../BankDebitForm"
import { useOrderPaymentContext } from "../../../Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"

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
jest.mock("System/useSystemContext")
jest.mock("react-tracking")
jest.mock(
  "../../../Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"
)

const testOrder: PaymentTestQueryRawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
}
const trackEvent = jest.fn()

beforeAll(() => {
  ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
    return {
      bankAccountHasInsufficientFunds: true,
      setBankAccountHasInsufficientFunds: jest.fn(),
    }
  })

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

describe("BankDebitForm", () => {
  it("tracks a `complete` event from the onChange handler", () => {
    mockEvent = { complete: true, empty: true }

    render(
      <BankDebitForm
        order={testOrder}
        paymentMethod="US_BANK_ACCOUNT"
        onSetIsSavingPayment={jest.fn()}
        onSetIsPaymentElementLoading={jest.fn()}
      />
    )

    expect(trackEvent).toHaveBeenCalledWith({
      flow: "BUY",
      order_id: "1234",
      subject: "link_account",
      context_page_owner_type: "orders-payment",
      action: "clickedPaymentDetails",
    })
  })

  describe("with not enough balance", () => {
    it("renders correct not enough funds message", () => {
      const screen = render(
        <BankDebitForm
          order={testOrder}
          paymentMethod="US_BANK_ACCOUNT"
          onSetIsSavingPayment={jest.fn()}
          onSetIsPaymentElementLoading={jest.fn()}
        />
      )

      expect(
        screen.queryByText("This bank account doesn’t have enough funds.")
      ).toBeInTheDocument()
    })
  })

  describe("with SEPA", () => {
    it("does not render a checkbox to save bank account", () => {
      const screen = render(
        <BankDebitForm
          order={testOrder}
          paymentMethod="SEPA_DEBIT"
          onSetIsSavingPayment={jest.fn()}
          onSetIsPaymentElementLoading={jest.fn()}
        />
      )

      expect(
        screen.queryByTestId("SaveBankAccountCheckbox")
      ).not.toBeInTheDocument()
    })
  })
})
