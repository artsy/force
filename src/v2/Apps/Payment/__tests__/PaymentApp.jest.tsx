import React from "react"
import { graphql } from "react-relay"
import { PaymentApp_Test_Query } from "v2/__generated__/PaymentApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PaymentAppFragmentContainer } from "../Routes/Payment/PaymentApp"
import { HeadProvider } from "react-head"

jest.mock("react-tracking")
jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<PaymentApp_Test_Query>({
  Component: props => {
    return (
      <HeadProvider>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <PaymentAppFragmentContainer {...props} />
      </HeadProvider>
    )
  },
  query: graphql`
    query PaymentApp_Test_Query {
      me {
        ...PaymentApp_me
      }
    }
  `,
})

describe("PaymentApp", () => {
  it("renders collector name and some menu routes", () => {
    const wrapper = getWrapper({
      Me: () => ({
        name: "Rob Ross",
      }),
    })

    const userSettingsTabs = wrapper.find("UserSettingsTabs")

    expect(userSettingsTabs.text()).toContain("Rob Ross")
    expect(userSettingsTabs.find("RouteTab").length).toBeGreaterThan(1)
  })
  it("renders saved credit cards and form", () => {
    const wrapper = getWrapper({
      Me: () => ({
        name: "Rob Ross",
      }),
    })

    const paymentSection = wrapper.find("PaymentSection")
    const savedCreditCardText = paymentSection.find("SavedCreditCards").text()

    expect(savedCreditCardText).toContain(
      'credit card•••• <mock-value-for-field-"lastDigits">'
    )
    expect(savedCreditCardText).toContain(
      'Exp <mock-value-for-field-"expirationMonth">/">Remove'
    )
  })
})
