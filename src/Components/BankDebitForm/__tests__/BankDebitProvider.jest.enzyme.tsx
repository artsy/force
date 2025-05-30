import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"
import { BankDebitForm } from "Components/BankDebitForm/BankDebitForm"
import { BankDebitProvider } from "Components/BankDebitForm/BankDebitProvider"
import { mount } from "enzyme"

jest.mock("Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext")

jest.mock("../BankDebitForm", () => ({
  BankDebitForm: () => <div />,
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

  const getWrapper = (props: any = {}) =>
    mount(
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
    const wrapper = getWrapper()
    expect(wrapper.find(BankDebitForm).length).toBe(1)
  })

  it("renders error when we fail to retrieve client secret and no bank debit form is rendered", () => {
    reactMock.useState = setHookState({
      bankDebitSetupError: true,
    })
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatch(
      "Bank transfer is not available at the moment",
    )
  })
})
