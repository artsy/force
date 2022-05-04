import { fireEvent, render } from "@testing-library/react"
import { BuyOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"
import { useSystemContext, useTracking } from "v2/System"
import { PaymentTestQueryRawResponse } from "v2/__generated__/PaymentTestQuery.graphql"
import { BankDebitForm } from "../BankDebitForm"

let mockEvent: any

// const MockPaymentElement = ({
//   onChange,
// }: {
//   onChange: (event: any) => void
// }) => {
//   useEffect(() => {
//     if (!!event) {
//       onChange(event)
//     }
//   }, [onChange])
//   return <div />
// }

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

beforeEach(() => {
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

    render(<BankDebitForm order={testOrder} />)

    expect(trackEvent).toHaveBeenCalledWith({
      flow: "BUY",
      order_id: "1234",
      subject: "bank_account_selected",
    })
  })

  it("tracks a non-`empty` event from the onChange handler", () => {
    mockEvent = { empty: false }

    render(<BankDebitForm order={testOrder} />)

    expect(trackEvent).toHaveBeenCalledWith({
      flow: "BUY",
      order_id: "1234",
      subject: "TODO:_not_empty_thing",
    })
  })
  it("tracks a both complete and non-empty events if both apply", () => {
    mockEvent = { complete: true, empty: false }

    render(<BankDebitForm order={testOrder} />)

    expect(trackEvent).toHaveBeenCalledWith({
      flow: "BUY",
      order_id: "1234",
      subject: "bank_account_selected",
    })

    expect(trackEvent).toHaveBeenCalledWith({
      flow: "BUY",
      order_id: "1234",
      subject: "TODO:_not_empty_thing",
    })
  })

  it("tracks a click on the continue button", () => {
    const screen = render(<BankDebitForm order={testOrder} />)

    fireEvent.click(screen.getByText("Save and Continue"))
    expect(trackEvent).toHaveBeenCalledWith({
      flow: "BUY",
      order_id: "1234",
      subject: "TODO:_clicked_save_and_continue",
    })
  })
})
