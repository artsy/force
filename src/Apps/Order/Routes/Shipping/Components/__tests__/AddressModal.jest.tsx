import {
  AddressModal,
  type AddressModalProps,
} from "Apps/Order/Routes/Shipping/Components/AddressModal"
import type { ShippingContextProps } from "Apps/Order/Routes/Shipping/ShippingContext"
import type { SavedAddressType } from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { validAddress } from "Components/__tests__/Utils/addressForm2"
import {
  fillAddressFormFields,
  hasCorrectAddressFormFields,
} from "Components/Address/__tests__/utils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useUserLocation } from "Utils/Hooks/useUserLocation"
import type { DeepPartial } from "Utils/typeSupport"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { AddressModalTestQuery } from "__generated__/AddressModalTestQuery.graphql"
import { graphql } from "react-relay"
import { createMockEnvironment } from "relay-test-utils"

jest.setTimeout(10000)

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/Hooks/useUserLocation")
const mockUseSystemContext = useSystemContext as jest.Mock
const mockUseUserLocation = useUserLocation as jest.Mock

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

const mockShippingcontext: DeepPartial<ShippingContextProps> = {
  state: {},
  orderData: {
    shipsFrom: "US",
  },
  actions: {
    setIsPerformingOperation: jest.fn(),
  },
  meData: {
    name: "Max",
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

    mockUseUserLocation.mockImplementation(() => {
      return {
        location: null,
        loading: false,
        error: null,
        isLoggedIn: true,
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
    expect(hasCorrectAddressFormFields({ withLegacyPhoneInput: true })).toBe(
      true,
    )
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
      },
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
      },
    )

    await screen.findByText("Add address")

    expect(hasCorrectAddressFormFields({ withLegacyPhoneInput: true })).toBe(
      true,
    )
    const saveAsDefault = screen.getByTestId("setAsDefault")
    expect(saveAsDefault).toBeInTheDocument()
    expect(saveAsDefault).not.toBeChecked()
    expect(screen.queryByText("Delete address")).not.toBeInTheDocument()
  })

  it("address can be deleted via dialog", async () => {
    const { mockResolveLastOperation } = renderWithRelay(
      {},
      testAddressModalProps,
      mockRelayEnv,
    )

    await screen.findByText("Edit address")
    const deleteButton = screen.getByText("Delete address")
    userEvent.click(deleteButton)

    await flushPromiseQueue()
    const dialog = await screen.findByTestId("deleteAddressDialog")

    expect(dialog).toHaveTextContent(
      "This will remove this address from your saved addresses",
    )

    await userEvent.click(screen.getByText("Delete"))

    const { operationName, operationVariables } =
      await mockResolveLastOperation({})

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
        mockRelayEnv,
      )

      await screen.findByText("Edit address")

      await fillAddressFormFields(
        { postalCode: "90210" },
        { clearInputs: true },
      )

      const saveAsDefault = screen.getByTestId("setAsDefault")
      userEvent.click(saveAsDefault)

      userEvent.click(screen.getByText("Save"))
      await flushPromiseQueue()

      const { operationName, operationVariables } = mockResolveLastOperation({
        UpdateUserAddressPayload: () => ({
          userAddressOrErrors: {
            __typename: "UserAddress",
            ...mockSavedAddress,
            postalCode: "90210",
            isDefault: false,
          },
        }),
      })

      expect(operationName).toBe("useUpdateSavedAddressMutation")

      expect(operationVariables).toMatchObject({
        input: {
          userAddressID: "internal-id",
          attributes: expect.objectContaining({
            postalCode: "90210",
          }),
        },
      })

      await flushPromiseQueue()

      const saveAsDefaultOperation = mockResolveLastOperation({
        UpdateUserAddressPayload: () => ({
          userAddressOrErrors: {
            __typename: "UserAddress",
            ...mockSavedAddress,
            postalCode: "90210",
            isDefault: true,
          },
        }),
      })

      expect(saveAsDefaultOperation.operationName).toBe(
        "useUpdateUserDefaultAddressMutation",
      )
      expect(saveAsDefaultOperation.operationVariables).toMatchObject({
        input: {
          userAddressID: "internal-id",
        },
      })

      await flushPromiseQueue()

      expect(testAddressModalProps.onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockSavedAddress,
          postalCode: "90210",
        }),
      )
      expect(testAddressModalProps.closeModal).toHaveBeenCalled()
    })

    it("shows generic error when mutation returns error", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {},
        testAddressModalProps,
        mockRelayEnv,
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
        "Sorry, there has been an issue saving your address. Please try again.",
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("shows generic error when mutation fails", async () => {
      const { mockRejectLastOperation } = renderWithRelay(
        {},
        testAddressModalProps,
        mockRelayEnv,
      )

      await screen.findByText("Edit address")

      await userEvent.click(screen.getByText("Save"))
      await flushPromiseQueue()

      mockRejectLastOperation(new TypeError("Network request failed"))

      const errorMessage = await screen.findByText(
        "Sorry, there has been an issue saving your address. Please try again.",
      )

      expect(errorMessage).toBeInTheDocument()
    })

    it("sets formik error when address mutation returns phone validation error", async () => {
      const { mockResolveLastOperation } = renderWithRelay(
        {},
        testAddressModalProps,
        mockRelayEnv,
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
        await screen.findByText("Please enter a valid phone number"),
      ).toBeInTheDocument()
    })
  })
})
