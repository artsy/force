import React from "react"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

import { SettingsPaymentsRouteFragmentContainer } from "../Payments/SettingsPaymentsRoute"
import { SettingsPaymentsRoute_Test_Query } from "v2/__generated__/SettingsPaymentsRoute_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<SettingsPaymentsRoute_Test_Query>({
  Component: ({ me }) => {
    return <SettingsPaymentsRouteFragmentContainer me={me!} />
  },
  query: graphql`
    query SettingsPaymentsRoute_Test_Query {
      me {
        ...PaymentSection_me
      }    
    }
  `,
})

describe("SettingsPaymentsRoute", () => {
  beforeEach(() => {})
  it("renders PaymentSection", () => {
    const wrapper = getWrapper({})
    const paymentSection = wrapper.find("No Saved Cards")
    expect(paymentSection).toContain("Please add a payment card for a faster checkout experience in future.")
  })
})