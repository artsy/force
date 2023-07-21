import { screen } from "@testing-library/react"
import { AddressVerificationFlowFragmentContainer } from "Apps/Order/Components/AddressVerificationFlow"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: AddressVerificationFlowFragmentContainer,
  query: graphql`
    query AddressVerificationFlow_Test_Query($address: AddressInput!)
      @relay_test_operation {
      verifyAddress(address: $address) {
        ...AddressVerificationFlow_verifyAddress
      }
    }
  `,
})

describe("AddressVerificationFlow", () => {
  it(`renders the "Check your delivery address" variant when verificaiton is "NOT_FOUND"`, async () => {
    renderWithRelay({
      VerifyAddressType: () => ({
        verificationStatus: "NOT_FOUND",
      }),
    })

    await screen.findByText("Check your delivery address")

    expect(
      screen.getByText(
        "The address you entered may be incorrect or incomplete. Please check it and make any changes necessary."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Use This Address")).toBeInTheDocument()
    expect(screen.getByText("Edit Address")).toBeInTheDocument()
  })
})
