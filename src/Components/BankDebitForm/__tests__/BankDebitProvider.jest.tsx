import { mount } from "enzyme"
import { BankDebitProvider } from "../BankDebitProvider"
import React from "react"
import { BankDebitForm } from "../BankDebitForm"

const setHookState = state =>
  jest.fn().mockImplementation(() => [state, () => {}])

const reactMock = require("react")

describe("BankDebitProvider", () => {
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
        paymentMethod="US_BANK_ACCOUNT"
        bankAccountHasInsufficientFunds={false}
        onSetBankAccountHasInsufficientFunds={jest.fn()}
        onSetIsSavingPayment={jest.fn()}
        onSetClientSecret={jest.fn()}
        clientSecret={"client-secret"}
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
