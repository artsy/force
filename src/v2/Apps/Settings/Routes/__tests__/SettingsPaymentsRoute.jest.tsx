import React from "react"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

import { SettingsPaymentsRouteFragmentContainer } from "../Payments/SettingsPaymentsRoute"
import { SettingsPaymentsRoute_Test_Query } from "v2/__generated__/SettingsPaymentsRoute_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<SettingsPaymentsRoute_Test_Query>({
  Component: ({ me }) => {
    return <SettingsPaymentsRouteFragmentContainer me={me as any} />
  },
  query: graphql`
    query SettingsPaymentsRoute_Test_Query @relay_test_operation {
      me {
        ...SettingsPaymentsRoute_me
      }
    }
  `,
})

describe("SettingsPaymentsRoute", () => {
  it("renders PaymentSection with no cards", () => {
    const wrapper = getWrapper({})
    expect(wrapper.text()).toContain("No Saved Cards")
    expect(wrapper.text()).toContain(
      "Please add a payment card for a faster checkout experience in future."
    )
  })
})
