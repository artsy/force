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
  describe("when the verification status is VERIFIED_WITH_CHANGES", () => {
    const verificationStatus = "VERIFIED_WITH_CHANGES"
    it("displays the correct content", async () => {
      renderWithRelay({
        VerifyAddressType: () => ({ verificationStatus }),
      })

      await screen.findByText("Confirm your delivery address")

      const body =
        "To ensure prompt and accurate delivery, we suggest a modified shipping address."
      expect(screen.getByText(body)).toBeInTheDocument()
      expect(screen.getByText("Recommended")).toBeInTheDocument()
      expect(screen.getByText("What you entered")).toBeInTheDocument()
      expect(screen.getByText("Use This Address")).toBeInTheDocument()
      expect(screen.getByText("Back to Edit")).toBeInTheDocument()
    })
  })

  describe("when the verification status is NOT_FOUND", () => {
    const verificationStatus = "NOT_FOUND"

    it("displays the correct content", async () => {
      renderWithRelay({
        VerifyAddressType: () => ({ verificationStatus }),
      })

      await screen.findByText("Check your delivery address")

      const body =
        "The address you entered may be incorrect or incomplete. Please check it and make any changes necessary."
      expect(screen.getByText(body)).toBeInTheDocument()
      expect(screen.getByText("What you entered")).toBeInTheDocument()
      expect(screen.getByText("Use This Address")).toBeInTheDocument()
      expect(screen.getByText("Edit Address")).toBeInTheDocument()
    })
  })

  describe("when the verification status is VERIFIED_NO_CHANGE", () => {
    const verificationStatus = "VERIFIED_NO_CHANGE"

    it("calls onChosenAddress without displaying a modal", async () => {
      const mockOnChosenAddress = jest.fn()

      renderWithRelay(
        {
          VerifyAddressType: () => ({ verificationStatus }),
        },
        undefined,
        {
          onChosenAddress: mockOnChosenAddress,
        }
      )

      await screen.findByTestId("emptyAddressVerification")

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
    })
  })
})
