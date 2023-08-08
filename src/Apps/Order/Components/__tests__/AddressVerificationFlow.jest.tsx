import { screen, waitFor } from "@testing-library/react"
import { AddressVerificationFlowFragmentContainer } from "Apps/Order/Components/AddressVerificationFlow"
import { AddressVerificationFlow_Test_Query } from "__generated__/AddressVerificationFlow_Test_Query.graphql"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { AddressVerificationFlow_verifyAddress$data } from "__generated__/AddressVerificationFlow_verifyAddress.graphql"
import { useTracking } from "react-tracking"

// const mockOnChosenAddress = jest.fn()
// const mockOnClose = jest.fn()
const mockInputAddress = {
  addressLine1: "401 Broadway",
  addressLine2: "Suite 25",
  city: "New York",
  region: "NY",
  postalCode: "10013",
  country: "US",
}

jest.unmock("react-relay")

jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL<
  AddressVerificationFlow_Test_Query
>({
  Component: AddressVerificationFlowFragmentContainer,
  query: graphql`
    query AddressVerificationFlow_Test_Query($address: AddressInput!)
      @relay_test_operation {
      verifyAddress(address: $address) {
        ...AddressVerificationFlow_verifyAddress
      }
    }
  `,
  variables: { address: mockInputAddress },
})

let defaultResult: Omit<
  AddressVerificationFlow_verifyAddress$data,
  " $fragmentType"
>

beforeEach(() => {
  defaultResult = {
    verificationStatus: "NOT_FOUND",
    suggestedAddresses: [],
    inputAddress: {
      lines: ["401 Broadway", "Suite 25", "New York, NY 10013", "USA"],
      address: mockInputAddress,
    },
  }
})

const trackEvent = jest.fn()
beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => {
    return {
      trackEvent,
    }
  })
})

describe("AddressVerificationFlow", () => {
  describe("when the verification status is NOT_FOUND", () => {
    const verificationStatus = "NOT_FOUND"

    it("displays the correct content", async () => {
      renderWithRelay({
        VerifyAddressType: () => ({
          ...defaultResult,
          verificationStatus,
          inputAddress: {
            lines: ["401 Broadway", "Suite 25", "New York, NY 10013", "USA"],
            address: {
              addressLine1: "401 Broadway",
              addressLine2: "Suite 25",
              city: "New York",
              region: "NY",
              postalCode: "10013",
              country: "US",
            },
          },
          suggestedAddresses: [],
        }),
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
          VerifyAddressType: () => ({ ...defaultResult, verificationStatus }),
        },
        undefined,
        {
          onChosenAddress: mockOnChosenAddress,
        }
      )

      await screen.findByTestId("emptyAddressVerification")
      await waitFor(() => {
        expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
        expect(mockOnChosenAddress).toHaveBeenCalledWith(
          "ARTSY",
          mockInputAddress,
          true
        )
      })
    })
  })

  describe("when the verification status is VERIFIED_WITH_CHANGES", () => {
    it("displays the correct content", async () => {
      const mockResolver = {
        ...defaultResult,
        verificationStatus: "VERIFIED_WITH_CHANGES",
        suggestedAddresses: [
          {
            lines: ["401 Broadway Suite 25", "New York, NY 10013", "USA"],
            address: {
              addressLine1: "401 Broadway Suite 25",
              city: "New York",
              region: "NY",
              postalCode: "10013",
              country: "US",
            },
          },
        ],
      }
      renderWithRelay({
        VerifyAddressType: () => mockResolver,
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
})
