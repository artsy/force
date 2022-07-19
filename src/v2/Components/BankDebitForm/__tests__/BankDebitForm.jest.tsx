import { render } from "@testing-library/react"
import { BuyOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"
import { useSystemContext, useTracking } from "v2/System"
import { PaymentTestQueryRawResponse } from "v2/__generated__/PaymentTestQuery.graphql"
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
jest.mock("v2/System/useSystemContext")
jest.mock("v2/System/Analytics/useTracking")

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
        returnURL={""}
        bankAccountHasInsufficientFunds={false}
      />
    )

    expect(trackEvent).toHaveBeenCalledWith({
      flow: "BUY",
      order_id: "1234",
      subject: "bank_account_selected",
    })
  })

  describe("with not enough balance", () => {
    it("renders correct not enough funds message", () => {
      const screen = render(
        <BankDebitForm
          order={testOrder}
          returnURL={""}
          bankAccountHasInsufficientFunds={true}
        />
      )

      expect(
        screen.queryByText("This bank account doesn’t have enough funds.")
      ).toBeInTheDocument()
    })
  })
})
