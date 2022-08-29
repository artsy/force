import { render } from "@testing-library/react"
import { BuyOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { useSystemContext } from "System"
import { useTracking } from "react-tracking"
import { PaymentTestQueryRawResponse } from "__generated__/PaymentTestQuery.graphql"
import { BankDebitForm } from "../BankDebitForm"

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

const testOrder: PaymentTestQueryRawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
}
const trackEvent = jest.fn()

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

describe("BankDebitForm", () => {
  it("tracks a `complete` event from the onChange handler", () => {
    mockEvent = { complete: true, empty: true }

    render(
      <BankDebitForm
        order={testOrder}
        bankAccountHasInsufficientFunds={false}
        onSetBankAccountHasInsufficientFunds={jest.fn()}
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
          bankAccountHasInsufficientFunds={true}
          onSetBankAccountHasInsufficientFunds={jest.fn()}
          onSetIsSavingPayment={jest.fn()}
          onSetIsPaymentElementLoading={jest.fn()}
        />
      )

      expect(
        screen.queryByText("This bank account doesn’t have enough funds.")
      ).toBeInTheDocument()
    })
  })
})
