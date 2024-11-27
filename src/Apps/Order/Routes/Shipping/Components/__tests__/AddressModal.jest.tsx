import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { graphql } from "react-relay"
import {
  AddressModal,
  AddressModalProps,
} from "Apps/Order/Routes/Shipping/Components/AddressModal"
import { validAddress } from "Components/__tests__/Utils/addressForm2"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SavedAddressType } from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { createMockEnvironment } from "relay-test-utils"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { AddressModalTestQuery } from "__generated__/AddressModalTestQuery.graphql"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping/ShippingContext"
import { DeepPartial } from "Utils/typeSupport"
import {
  fillAddressFormFields,
  hasCorrectAddressFormFields,
} from "Components/Address/__tests__/utils"
import { post } from "superagent"
/*
Some tests queue up promises that bleed into subsequent tests
on the first flushPromiseQueue call.
*/
jest.setTimeout(10000)

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
const mockUseSystemContext = useSystemContext as jest.Mock

const errorBoxQuery = "Banner[data-testid='form-banner-error']"

const mockSavedAddress: SavedAddressType = {
  ...validAddress,
  phoneNumber: "8475937743",
  id: "id",
  internalID: "internal-id",
  addressLine3: null,
  isDefault: false,
}

let testAddressModalProps: AddressModalProps

let mockRelayEnv: ReturnType<typeof createMockEnvironment>

let mockShippingcontext: DeepPartial<ShippingContextProps> = {
  state: {},
  orderData: {
    shipsFrom: "US",
  },
  actions: {
    setIsPerformingOperation: jest.fn(),
  },
}

jest.mock("Apps/Order/Routes/Shipping/Hooks/useShippingContext", () => ({
  useShippingContext: () => mockShippingcontext,
}))

const { renderWithRelay } = setupTestWrapperTL<AddressModalTestQuery>({
  Component: (props: unknown) => {
    return <AddressModal {...(props as AddressModalProps)} />
  },
  query: graphql`
    query AddressModalTestQuery @relay_test_operation {
      _unused: artist(id: "whocare") {
        name
      }
    }
  `,
})

// let globalWrapper: ReturnType<typeof renderWithRelay>
// const getWrapper = ({
//   mockResolvers = {},
//   componentProps = testAddressModalProps,
//   relayEnvironment = mockRelayEnv,
// } = {}) => {
//   const result = renderWithRelay(
//     mockResolvers,
//     componentProps,
//     relayEnvironment
//   )
//   return result
// }

// eslint-disable-next-line jest/no-disabled-tests
describe("AddressModal", () => {
  beforeEach(() => {
    mockRelayEnv = createMockEnvironment()
    mockUseSystemContext.mockImplementation(() => {
      return {
        user: { lab_features: [] },
        isLoggedIn: true,
        relayEnvironment: mockRelayEnv,
      }
    })

    testAddressModalProps = {
      onSuccess: jest.fn(),
      addressModalAction: {
        type: "edit",
        address: mockSavedAddress,
      },

      closeModal: jest.fn(),
    }
  })

  it("renders EditModal with the title, input fields and buttons", async () => {
    renderWithRelay({}, testAddressModalProps)

    await screen.findByText("Edit address")
    expect(hasCorrectAddressFormFields({ withPhoneNumber: true })).toBe(true)
    expect(screen.getByText("Delete address")).toBeInTheDocument()

    const saveAsDefault = screen.getByTestId("setAsDefault")
    expect(saveAsDefault).toBeInTheDocument()
    expect(saveAsDefault).not.toBeChecked()
  })

  it("renders EditModal without checkbox when address is default", async () => {
    renderWithRelay(
      {},
      {
        ...testAddressModalProps,
        addressModalAction: {
          type: "edit",
          address: {
            ...mockSavedAddress,
            isDefault: true,
          },
        },
      }
    )
    await screen.findByText("Edit address")

    expect(screen.queryByTestId("setAsDefault")).not.toBeInTheDocument()
  })

  it("renders AddModal with the title, input fields, checkbox and button", async () => {
    renderWithRelay(
      {},
      {
        ...testAddressModalProps,
        addressModalAction: {
          type: "create",
        },
      }
    )

    await screen.findByText("Add address")

    expect(hasCorrectAddressFormFields({ withPhoneNumber: true })).toBe(true)
    const saveAsDefault = screen.getByTestId("setAsDefault")
    expect(saveAsDefault).toBeInTheDocument()
    expect(saveAsDefault).not.toBeChecked()
    expect(screen.queryByText("Delete address")).not.toBeInTheDocument()
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it("address can be deleted via dialog", async () => {
    const { mockResolveLastOperation } = renderWithRelay(
      {},
      testAddressModalProps,
      mockRelayEnv
    )

    await screen.findByText("Edit address")
    const deleteButton = screen.getByText("Delete address")
    // const deleteButton = screen.getByTestId("deleteButton")
    userEvent.click(deleteButton)

    await flushPromiseQueue()
    const dialog = await screen.findByTestId("deleteAddressDialog")

    expect(dialog).toHaveTextContent(
      "This will remove this address from your saved addresses"
    )

    await userEvent.click(screen.getByText("Delete"))

    const {
      operationName,
      operationVariables,
    } = await mockResolveLastOperation({})

    expect(operationName).toBe("useDeleteSavedAddressMutation")

    expect(operationVariables).toEqual({
      input: { userAddressID: "internal-id" },
    })

    await flushPromiseQueue()
    expect(testAddressModalProps.closeModal).toHaveBeenCalled()
  })

  describe("update mode", () => {
    it("updates address when form is submitted with valid values", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      await screen.findByText("Edit address")

      await fillAddressFormFields(
        { ...validAddress, postalCode: "90210" },
        { clearInputs: true }
      )

      await userEvent.click(screen.getByText("Save"))
      await flushPromiseQueue()

      const {
        operationName,
        operationVariables,
      } = await mockResolveLastOperation({
        UpdateUserAddressPayload: () => ({
          userAddressOrErrors: {
            __typename: "UserAddress",
            ...mockSavedAddress,
            postalCode: "90210",
            isDefault: true,
          },
        }),
      })

      expect(operationName).toBe("useUpdateSavedAddressMutation")

      expect(operationVariables).toMatchObject({
        input: {
          userAddressID: "internal-id",
          attributes: {
            addressLine1: "401 Broadway",
            addressLine2: "Suite 25",
            city: "New York",
            country: "US",
            name: "Joelle Van Dyne",
            phoneNumber: "120938120983",
            postalCode: "90210",
            region: "NY",
          },
        },
      })

      await flushPromiseQueue()
      expect(testAddressModalProps.onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          addressLine1: "401 Broadway",
          addressLine2: "Suite 25",
          city: "New York",
          country: "US",
          id: "id",
          internalID: "internal-id",
          isDefault: true,
          name: "Joelle Van Dyne",
          phoneNumber: "8475937743",
          postalCode: "90210",
          region: "NY",
        })
      )
      expect(testAddressModalProps.closeModal).toHaveBeenCalled()
    })

    it("shows generic error when mutation returns error", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      await screen.findByText("Edit address")

      await userEvent.click(screen.getByText("Save"))
      await flushPromiseQueue()

      mockResolveLastOperation({
        UpdateUserAddressPayload: () => ({
          userAddressOrErrors: {
            __typename: "Errors",
            errors: [
              {
                code: "100",
                message: "Invalid address",
              },
            ],
          },
        }),
      })

      const errorMessage = await screen.findByText(
        "Sorry, there has been an issue saving your address. Please try again."
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("shows generic error when mutation fails", async () => {
      const { mockRejectLastOperation } = renderWithRelay(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      await screen.findByText("Edit address")

      await userEvent.click(screen.getByText("Save"))
      await flushPromiseQueue()

      mockRejectLastOperation(new TypeError("Network request failed"))

      await flushPromiseQueue()

      const errorMessage = screen.getByText(
        "Sorry, there has been an issue saving your address. Please try again."
      )

      expect(errorMessage).toBeInTheDocument()
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it("sets formik error when address mutation returns phone validation error", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      await screen.findByText("Edit address")

      await userEvent.click(screen.getByText("Save"))

      await flushPromiseQueue()
      mockResolveLastOperation({
        UpdateUserAddressPayload: () => ({
          userAddressOrErrors: {
            __typename: "Errors",
            errors: [
              {
                code: "invalid_phone_number",
                message: "Validation failed: Phone not a valid phone number",
                path: "phoneNumber",
              },
            ],
          },
        }),
      })

      expect(
        await screen.findByText("Please enter a valid phone number")
      ).toBeInTheDocument()
    })
  })
})
