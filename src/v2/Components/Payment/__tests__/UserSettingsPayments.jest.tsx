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
import { GlobalData } from "sharify"

jest.mock("react-stripe-elements", () => ({
  CardElement: () => jest.fn(),
  Elements: ({ children }) => children,
  StripeProvider: () => <div />,
  injectStripe: () => jest.fn(),
}))

const mockMe: UserSettingsPayments_me = {
  " $refType": null,
  creditCards: { edges: [] },
  id: "abcd1234",
  internalID: "1234",
}

const mockCard: CreditCardType = {
  " $refType": null,
  __typename: "CreditCard",
  brand: "Visa",
  expirationMonth: 2,
  expirationYear: 2040,
  id: "abc123",
  internalID: "123",
  lastDigits: "3456",
}

const mockMeWithCards: UserSettingsPayments_me = {
  " $refType": null,
  creditCards: {
    edges: [{ node: { ...mockCard } }, { node: { ...mockCard } }],
  },
  id: "abcd1234",
  internalID: "1234",
}

describe("UserSettingsPayments", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}

    window.sd = { STRIPE_PUBLISHABLE_KEY: "" } as GlobalData
  })

  it("shows only the payment form if there are no saved credit cards", () => {
    const testProps = {
      me: mockMe,
      relay: { environment: {} } as RelayProp,
      stripe: jest.fn(),
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
      stripe: jest.fn(),
    }
    const paymentWrapper = mount(<UserSettingsPayments {...testProps} />)
    expect(paymentWrapper.find(SavedCreditCards).length).toBe(1)
    expect(paymentWrapper.find(CreditCard).length).toBe(2)
    expect(paymentWrapper.find(PaymentFormWrapper).length).toBe(1)
    expect(paymentWrapper.text()).toContain("Add new card")
  })
})
