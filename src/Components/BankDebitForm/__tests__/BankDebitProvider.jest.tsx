import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"
import { BankDebitProvider } from "Components/BankDebitForm/BankDebitProvider"
import { render, screen } from "@testing-library/react"

jest.mock("Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext")

jest.mock("../BankDebitForm", () => ({
  BankDebitForm: () => <div data-testid="bank-debit-form" />,
}))

const setHookState = state =>
  jest.fn().mockImplementation(() => [state, () => {}])

const reactMock = require("react")

describe("BankDebitProvider", () => {
  beforeAll(() => {
    ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
      return {
        selectedPaymentMethod: "US_BANK_ACCOUNT",
        stripeClient: "client-",
        setStripeClient: jest.fn(),
        setIsSavingPayment: jest.fn(),
      }
    })
  })

  const getWrapper = (_props: any = {}) =>
    render(
      <BankDebitProvider
        order={{
          internalID: "1234",
          mode: "BUY",
          bankAccountId: "bank-id-1",
          paymentMethodDetails: null,
          " $fragmentType": "BankAccountPicker_order",
        }}
        onError={jest.fn()}
      />,
    )

  it("renders bank debit form", () => {
    getWrapper()
    expect(screen.getByTestId("bank-debit-form")).toBeInTheDocument()
  })

  it("renders error when we fail to retrieve client secret and no bank debit form is rendered", () => {
    reactMock.useState = setHookState({
      bankDebitSetupError: true,
    })
    getWrapper()
    expect(
      screen.getByText("Bank transfer is not available at the moment"),
    ).toBeInTheDocument()
  })
})
