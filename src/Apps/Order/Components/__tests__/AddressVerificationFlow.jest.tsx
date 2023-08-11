import { screen } from "@testing-library/react"
import { AddressVerificationFlowFragmentContainer } from "Apps/Order/Components/AddressVerificationFlow"
import { AddressVerificationFlow_Test_Query } from "__generated__/AddressVerificationFlow_Test_Query.graphql"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { AddressVerificationFlow_verifyAddress$data } from "__generated__/AddressVerificationFlow_verifyAddress.graphql"
import { useTracking } from "react-tracking"

const mockOnChosenAddress = jest.fn()
const mockOnClose = jest.fn()
const mockInputAddress = {
  addressLine1: "401 Broadway",
  addressLine2: "Suite 25",
  city: "New York",
  region: "NY",
  postalCode: "10013",
  country: "US",
}
const componentProps = {
  verificationInput: mockInputAddress,
  onClose: mockOnClose,
  onChosenAddress: mockOnChosenAddress,
}

jest.unmock("react-relay")

jest.mock("react-tracking")

const { renderWithRelay } = setupTestWrapperTL<
  AddressVerificationFlow_Test_Query
>({
  Component: AddressVerificationFlowFragmentContainer,
  query: graphql`
    query AddressVerificationFlow_Test_Query($address: VerifyAddressInput!)
      @relay_test_operation {
      verifyAddress(input: $address) {
        ...AddressVerificationFlow_verifyAddress
      }
    }
  `,
  variables: { address: mockInputAddress },
})

type SuccessType = Extract<
  AddressVerificationFlow_verifyAddress$data["verifyAddressOrError"],
  { __typename: "VerifyAddressType" }
>

let defaultResult: SuccessType

beforeEach(() => {
  jest.clearAllMocks()
  defaultResult = {
    __typename: "VerifyAddressType",
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
  describe("when the verification result is an error", () => {
    const mockError = {
      __typename: "VerifyAddressFailureType",
      mutationError: {
        detail: "Something went wrong",
        error: "ERROR",
        message: "Something went wrong",
        statusCode: 500,
        type: "error",
        fieldErrors: [{ message: "oh no", name: "Errorik" }],
      },
    }

    it("displays the 'check your address modal similar to NOT_FOUND'", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockError,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Check your delivery address")
      const body =
        "The address you entered may be incorrect or incomplete. Please check it and make any changes necessary."
      expect(screen.getByText(body)).toBeInTheDocument()
      expect(screen.getByText("What you entered")).toBeInTheDocument()
      expect(screen.getByText("Use This Address")).toBeInTheDocument()
      expect(screen.getByText("Edit Address")).toBeInTheDocument()

      // These values come from the input address, not the verification result
      // and are constructed locally
      expect(screen.getByText("401 Broadway")).toBeInTheDocument()
      expect(screen.getByText("Suite 25")).toBeInTheDocument()
      expect(screen.getByText("New York, NY 10013")).toBeInTheDocument()
      expect(screen.getByText("US")).toBeInTheDocument()

      await screen.findByText("Check your delivery address")

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "validationAddressViewed",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        flow: "user adding shipping address",
        option: "review and confirm",
        subject: "Check your delivery address",
        user_id: undefined,
      })
    })

    it("can be selected similar to NOT_FOUND", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockError,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Check your delivery address")

      const button = screen.getByText("Use This Address")
      button.click()

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "USER",
        mockInputAddress,
        false
      )

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action_type: "clickedValidationAddress",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        label: "Use This Address",
        subject: "Check your delivery address",
        user_id: undefined,
      })
    })
  })

  describe("when the verification status is NOT_FOUND", () => {
    const mockResult = {
      ...defaultResult,
      verificationStatus: "NOT_FOUND",
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
    }

    it("displays the correct content", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Check your delivery address")

      const body =
        "The address you entered may be incorrect or incomplete. Please check it and make any changes necessary."
      expect(screen.getByText(body)).toBeInTheDocument()
      expect(screen.getByText("What you entered")).toBeInTheDocument()
      expect(screen.getByText("Use This Address")).toBeInTheDocument()
      expect(screen.getByText("Edit Address")).toBeInTheDocument()
    })

    it("tracks that the validation modal was seen", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )
      await screen.findByText("Check your delivery address")

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "validationAddressViewed",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        flow: "user adding shipping address",
        option: "review and confirm",
        subject: "Check your delivery address",
        user_id: undefined,
      })
    })

    it('calls onChosenAddress and tracks the click with the suggested address when "Use This Address" is clicked', async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Check your delivery address")

      const button = screen.getByText("Use This Address")
      button.click()

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "USER",
        mockResult.inputAddress.address,
        false
      )

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action_type: "clickedValidationAddress",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        label: "Use This Address",
        subject: "Check your delivery address",
        user_id: undefined,
      })
    })
  })

  describe("when the verification status is VERIFIED_NO_CHANGE", () => {
    const verificationStatus = "VERIFIED_NO_CHANGE"

    it("calls onChosenAddress without displaying a modal", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => ({
            ...defaultResult,
            verificationStatus,
          }),
        },
        undefined,
        componentProps
      )

      await screen.findByTestId("emptyAddressVerification")
      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "ARTSY",
        mockInputAddress,
        true
      )
      expect(trackEvent).not.toHaveBeenCalled()
    })
  })

  describe("when the verification status is VERIFIED_WITH_CHANGES", () => {
    let mockResult
    beforeEach(() => {
      mockResult = {
        ...defaultResult,
        verificationStatus: "VERIFIED_WITH_CHANGES",
        suggestedAddresses: [
          {
            lines: ["401 Broadway Suite 25", "New York, NY 10013", "USA"],
            address: {
              addressLine1: "401 Broadway Suite 25",
              addressLine2: null,
              city: "New York",
              region: "NY",
              postalCode: "10013",
              country: "US",
            },
          },
        ],
      }
    })

    it("displays the correct content", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Confirm your delivery address")

      const body =
        "To ensure prompt and accurate delivery, we suggest a modified shipping address."
      expect(screen.getByText(body)).toBeInTheDocument()
      expect(screen.getByText("Recommended")).toBeInTheDocument()
      expect(screen.getByText("What you entered")).toBeInTheDocument()
      expect(screen.getByText("Use This Address")).toBeInTheDocument()
      expect(screen.getByText("Back to Edit")).toBeInTheDocument()
    })

    it("tracks that the validation modal was seen", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )
      await screen.findByText("Confirm your delivery address")

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "validationAddressViewed",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        flow: "user adding shipping address",
        option: "suggestions",
        subject: "Confirm your delivery address",
        user_id: undefined,
      })
    })

    it('calls onChosenAddress and tracks the click with the suggested address when "Use This Address" is clicked', async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Confirm your delivery address")

      const button = screen.getByText("Use This Address")
      button.click()

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action_type: "clickedValidationAddress",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        label: "Use This Address",
        option: "Recommended",
        subject: "Confirm your delivery address",
        user_id: undefined,
      })

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "ARTSY",
        mockResult.suggestedAddresses[0].address,
        false
      )
    })

    it("calls onChosenAddress with the user's input when 'Use This Address' is clicked after selecting 'What you entered'", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Confirm your delivery address")

      const userAddress = screen.getByText("What you entered")
      userAddress.click()
      const button = screen.getByText("Use This Address")
      button.click()

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action_type: "clickedValidationAddress",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        label: "Use This Address",
        option: "What you entered",
        subject: "Confirm your delivery address",
        user_id: undefined,
      })

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "USER",
        mockInputAddress,
        false
      )
    })
    it("calls onClose and tracks the click with the user closes the modal", async () => {
      renderWithRelay(
        {
          VerifyAddressMutationType: () => mockResult,
        },
        undefined,
        componentProps
      )

      await screen.findByText("Confirm your delivery address")

      const button = screen.getByText("Back to Edit")
      button.click()

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action_type: "clickedValidationAddress",
        context_module: "ordersShipping",
        context_page_owner_id: undefined,
        context_page_owner_type: "orders-shipping",
        label: "Back to Edit",
        option: "Recommended",
        subject: "Check your delivery address",
        user_id: undefined,
      })

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })
})
