import { UserSettingsPayments_me } from "v2/__generated__/UserSettingsPayments_me.graphql"
import { PaymentFormWrapper } from "v2/Components/Payment/PaymentFormWrapper"
import {
  CreditCard,
  SavedCreditCards,
} from "v2/Components/Payment/SavedCreditCards"
import {
  CreditCardType,
  UserSettingsPayments,
} from "v2/Components/Payment/UserSettingsPayments"
import { mount } from "enzyme"
import React from "react"
import { RelayProp } from "react-relay"

jest.mock("sharify", () => ({
  data: {
    STRIPE_PUBLISHABLE_KEY: "",
  },
}))

const mockMe: UserSettingsPayments_me = {
  " $refType": null,
  internalID: "1234",
  id: "abcd1234",
  creditCards: { edges: [] },
}

const mockCard: CreditCardType = {
  " $refType": null,
  id: "abc123",
  internalID: "123",
  lastDigits: "3456",
  expirationMonth: 2,
  expirationYear: 2040,
  brand: "Visa",
  __typename: "CreditCard",
}

const mockMeWithCards: UserSettingsPayments_me = {
  " $refType": null,
  internalID: "1234",
  id: "abcd1234",
  creditCards: {
    edges: [{ node: { ...mockCard } }, { node: { ...mockCard } }],
  },
}

describe("UserSettingsPayments", () => {
  it("shows only the payment form if there are no saved credit cards", () => {
    const testProps = {
      me: mockMe,
      relay: { environment: {} } as RelayProp,
    }
    const paymentWrapper = mount(<UserSettingsPayments {...testProps} />)
    expect(paymentWrapper.find(SavedCreditCards).length).toBe(0)
    expect(paymentWrapper.find(PaymentFormWrapper).length).toBe(1)
    expect(paymentWrapper.text()).not.toContain("Add new card")
  })

  it("shows saved credit cards + form if there are any", () => {
    const testProps = {
      me: mockMeWithCards,
      relay: { environment: {} } as RelayProp,
    }
    const paymentWrapper = mount(<UserSettingsPayments {...testProps} />)
    expect(paymentWrapper.find(SavedCreditCards).length).toBe(1)
    expect(paymentWrapper.find(CreditCard).length).toBe(2)
    expect(paymentWrapper.find(PaymentFormWrapper).length).toBe(1)
    expect(paymentWrapper.text()).toContain("Add new card")
  })
})
