import { screen } from "@testing-library/react"
import { AddressVerificationFlowFragmentContainer } from "Apps/Order/Components/AddressVerificationFlow"
import { AddressVerificationFlow_Test_Query } from "__generated__/AddressVerificationFlow_Test_Query.graphql"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { AddressVerificationFlow_verifyAddress$data } from "__generated__/AddressVerificationFlow_verifyAddress.graphql"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/Hooks/useSystemContext"

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

jest.mock("System/Hooks/useSystemContext")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "example-order-id",
  })),
}))

jest.unmock("react-relay")
jest.mock("react-tracking")

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => ({
    user: {
      id: "example-user-id",
      name: "Logged In",
      email: "loggedin@example.com",
    },
  }))
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent,
  }))
})

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
    addressVerificationId: "id",
    suggestedAddresses: [],
    inputAddress: {
      lines: ["401 Broadway", "Suite 25", "New York, NY 10013", "USA"],
      address: mockInputAddress,
    },
  }
})

describe("AddressVerificationFlow", () => {
  const renderComponentWithResult = result => {
    return renderWithRelay(
      {
        VerifyAddressMutationType: () => result,
      },
      componentProps
    )
  }

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
    it("calls onChosenAddress, verified by USER without displaying a modal or tracking", async () => {
      renderComponentWithResult(mockError)

      await screen.findByTestId("emptyAddressVerification")
      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith("USER", mockInputAddress)
      expect(trackEvent).not.toHaveBeenCalled()
    })
  })

  it("calls onClose and tracks the click when the user closes the modal via the x", async () => {
    renderComponentWithResult(defaultResult)

    await screen.findByText("Check your delivery address")

    const button = screen.getByLabelText("Close")
    button.click()

    expect(trackEvent).toHaveBeenCalledTimes(2)
    expect(trackEvent).toHaveBeenNthCalledWith(2, {
      action: "clickedCloseValidationAddressModal",
      context_module: "ordersShipping",
      context_page_owner_id: "example-order-id",
      context_page_owner_type: "orders-shipping",
      subject: "Check your delivery address",
      label: null,
      option: null,
    })

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  describe("when the verification status is NOT_FOUND", () => {
    const mockResult = {
      ...defaultResult,
      verificationStatus: "NOT_FOUND",
      addressVerificationId: "id",
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
      renderComponentWithResult(mockResult)

      await screen.findByText("Check your delivery address")

      const body =
        "The address you entered may be incorrect or incomplete. Please check it and make any changes necessary."
      expect(screen.getByText(body)).toBeInTheDocument()
      expect(screen.getByText("What you entered")).toBeInTheDocument()
      expect(screen.getByText("Use This Address")).toBeInTheDocument()
      expect(screen.getByText("Edit Address")).toBeInTheDocument()
    })

    it("tracks that the validation modal was seen", async () => {
      renderComponentWithResult(mockResult)

      await screen.findByText("Check your delivery address")

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent).toHaveBeenCalledWith({
        action: "validationAddressViewed",
        context_module: "ordersShipping",
        context_page_owner_id: "example-order-id",
        context_page_owner_type: "orders-shipping",
        flow: "user adding shipping address",
        subject: "Check your delivery address",
        user_id: "example-user-id",
        option: "review and confirm",
      })
    })

    it('calls onChosenAddress and tracks the click with the suggested address when "Use This Address" is clicked', async () => {
      renderComponentWithResult(mockResult)

      await screen.findByText("Check your delivery address")

      const button = screen.getByText("Use This Address")
      button.click()

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "USER",
        mockResult.inputAddress.address
      )

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action: "clickedValidationAddressOptions",
        context_module: "ordersShipping",
        context_page_owner_id: "example-order-id",
        context_page_owner_type: "orders-shipping",
        label: "Use This Address",
        option: "What you entered",
        subject: "Check your delivery address",
        user_id: "example-user-id",
      })
    })
  })

  describe("when the verification status is VERIFIED_NO_CHANGE", () => {
    const verificationStatus = "VERIFIED_NO_CHANGE"

    it("calls onChosenAddress, verified by ARTSY without displaying a modal", async () => {
      renderComponentWithResult({ ...defaultResult, verificationStatus })

      await screen.findByTestId("emptyAddressVerification")
      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "ARTSY",
        mockInputAddress
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
        addressVerificationId: "id",
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
      renderComponentWithResult(mockResult)

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
      renderComponentWithResult(mockResult)

      await screen.findByText("Confirm your delivery address")

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent).toHaveBeenCalledWith({
        action: "validationAddressViewed",
        context_module: "ordersShipping",
        context_page_owner_id: "example-order-id",
        context_page_owner_type: "orders-shipping",
        flow: "user adding shipping address",
        subject: "Confirm your delivery address",
        user_id: "example-user-id",
        option: "suggestions",
      })
    })

    it('calls onChosenAddress and tracks the click with the suggested address when "Use This Address" is clicked', async () => {
      renderComponentWithResult(mockResult)

      await screen.findByText("Confirm your delivery address")

      const button = screen.getByText("Use This Address")
      button.click()

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action: "clickedValidationAddressOptions",
        context_module: "ordersShipping",
        context_page_owner_id: "example-order-id",
        user_id: "example-user-id",
        context_page_owner_type: "orders-shipping",
        subject: "Confirm your delivery address",
        label: "Use This Address",
        option: "Recommended",
      })

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith(
        "ARTSY",
        mockResult.suggestedAddresses[0].address
      )
    })

    it("calls onChosenAddress with the user's input when 'Use This Address' is clicked after selecting 'What you entered'", async () => {
      renderComponentWithResult(mockResult)

      await screen.findByText("Confirm your delivery address")

      const userAddress = screen.getByText("What you entered")
      userAddress.click()
      const button = screen.getByText("Use This Address")
      button.click()

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action: "clickedValidationAddressOptions",
        context_module: "ordersShipping",
        context_page_owner_id: "example-order-id",
        context_page_owner_type: "orders-shipping",
        subject: "Confirm your delivery address",
        label: "Use This Address",
        option: "What you entered",
        user_id: "example-user-id",
      })

      expect(mockOnChosenAddress).toHaveBeenCalledTimes(1)
      expect(mockOnChosenAddress).toHaveBeenCalledWith("USER", mockInputAddress)
    })

    it("calls onClose and tracks the click with the user closes the modal", async () => {
      renderComponentWithResult(mockResult)

      await screen.findByText("Confirm your delivery address")

      const button = screen.getByText("Back to Edit")
      button.click()

      expect(trackEvent).toHaveBeenCalledTimes(2)
      expect(trackEvent).toHaveBeenNthCalledWith(2, {
        action: "clickedCloseValidationAddressModal",
        context_module: "ordersShipping",
        context_page_owner_id: "example-order-id",
        context_page_owner_type: "orders-shipping",
        label: "Back to Edit",
        option: null,
        subject: "Confirm your delivery address",
      })

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })
})
