import { mount } from "enzyme"
import { BankDebitProvider } from "../BankDebitProvider"
import React from "react"
import { BankDebitForm } from "../BankDebitForm"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"

jest.mock("Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext")

const setHookState = state =>
  jest.fn().mockImplementation(() => [state, () => {}])

const reactMock = require("react")

describe("BankDebitProvider", () => {
  beforeAll(() => {
    ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
      return {
        selectedPaymentMethod: "US_BANK_ACCOUNT",
        stripeClientSecret: "client-secret",
        setStripeClientSecret: jest.fn(),
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
          " $refType": "BankAccountPicker_order",
        }}
      />
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
      "Bank transfer is not available at the moment"
    )
  })
})
