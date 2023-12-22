import {
  AddressModal,
  AddressModalProps,
  GENERIC_FAIL_MESSAGE,
  AddressModalActionType,
} from "Apps/Order/Routes/Shipping2/Components/AddressModal2"
import { validAddress } from "Components/__tests__/Utils/addressForm2"
import { useSystemContext } from "System/useSystemContext"
import { SavedAddressType } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { createMockEnvironment } from "relay-test-utils"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { AddressModal2TestQuery } from "__generated__/AddressModal2TestQuery.graphql"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { DeepPartial } from "Utils/typeSupport"

/*
Some tests queue up promises that bleed into subsequent tests
on the first flushPromiseQueue call.
*/
jest.setTimeout(10000)

jest.unmock("react-relay")
jest.mock("System/useSystemContext")
const mockUseSystemContext = useSystemContext as jest.Mock

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/user", () => ({
  userHasLabFeature: jest.fn(),
}))

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
  orderData: {
    shipsFrom: "US",
  },
  actions: {
    setIsPerformingOperation: jest.fn(),
  },
}

jest.mock("Apps/Order/Routes/Shipping2/Hooks/useShippingContext", () => ({
  useShippingContext: () => mockShippingcontext,
}))

const { getWrapper: _getWrapper } = setupTestWrapper<AddressModal2TestQuery>({
  Component: (props: unknown) => {
    return <AddressModal {...(props as AddressModalProps)} />
  },
  query: graphql`
    query AddressModal2TestQuery @relay_test_operation {
      _unused: artist(id: "whocare") {
        name
      }
    }
  `,
})

let globalWrapper: ReturnType<typeof _getWrapper>["wrapper"]
const getWrapper = ({
  mockResolvers = {},
  componentProps = testAddressModalProps,
  relayEnvironment = mockRelayEnv,
} = {}) => {
  const result = _getWrapper(mockResolvers, componentProps, relayEnvironment)
  globalWrapper = result.wrapper
  return result
}

afterEach(() => {
  globalWrapper?.unmount()
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

    testAddressModalProps = {
      onSuccess: jest.fn(),
      modalAction: {
        type: AddressModalActionType.EDIT_USER_ADDRESS,
        address: mockSavedAddress,
      },

      closeModal: jest.fn(),
    }
  })

  it("renders EditModal with the title, input fields and buttons", () => {
    const { wrapper } = getWrapper()

    expect(wrapper.text()).toContain("Edit address")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(1)

    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(1)
    expect(wrapper.find("Clickable[data-test='deleteButton']").length).toBe(1)
    expect(wrapper.find("Button[data-test='saveButton']").length).toBe(1)
  })

  it("renders EditModal without checkbox when address is default", () => {
    const { wrapper } = getWrapper({
      componentProps: {
        ...testAddressModalProps,
        modalAction: {
          type: AddressModalActionType.EDIT_USER_ADDRESS,
          address: {
            ...mockSavedAddress,
            isDefault: true,
          },
        },
      },
    })
    expect(wrapper.text()).toContain("Edit address")
    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(0)
  })

  it("renders AddModal with the title, input fields, checkbox and button", () => {
    const { wrapper } = getWrapper({
      componentProps: {
        ...testAddressModalProps,
        modalAction: {
          type: AddressModalActionType.CREATE_USER_ADDRESS,
        },
      },
    })
    expect(wrapper.text()).toContain("Add address")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(1)

    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(1)
    expect(wrapper.find("Clickable[data-test='deleteButton']").length).toBe(0)
    expect(wrapper.find("Button[data-test='saveButton']").length).toBe(1)
  })

  it("clicking the delete button spawns a correct dialog", async () => {
    const { wrapper } = getWrapper()
    const deleteButton = wrapper.find("Clickable[data-test='deleteButton']")
    deleteButton.simulate("click")
    await wrapper.update()
    const dialog = wrapper.find("ModalDialog[data-test='deleteAddressDialog']")

    expect(dialog).toHaveLength(1)
    expect(dialog.text()).toContain("Delete address?")
    expect(dialog.text()).toContain(
      "This will remove this address from your saved addresses"
    )
    const dialogDelete = dialog.find("Button").at(1)
    expect(dialogDelete.text()).toContain("Delete")
    const dialogCancel = dialog.find("Button").at(0)
    expect(dialogCancel.text()).toContain("Cancel")
  })

  it("when the dialog is confirmed, the delete action happens", async () => {
    const { mockResolveLastOperation, wrapper } = getWrapper()

    const deleteButton = wrapper.find("Clickable[data-test='deleteButton']")
    deleteButton.simulate("click")
    const dialog = wrapper.find("ModalDialog[data-test='deleteAddressDialog']")
    const dialogDelete = dialog.find("Button").at(1)
    dialogDelete.simulate("click")

    const {
      operationName,
      operationVariables,
    } = await mockResolveLastOperation({})

    expect(operationName).toBe("useDeleteSavedAddressMutation")

    expect(operationVariables).toEqual({
      input: { userAddressID: "internal-id" },
    })

    expect(wrapper.find(AddressModal).props().closeModal).toHaveBeenCalled()
  })

  describe("update mode", () => {
    it("creates address when form is submitted with valid values", async () => {
      const { mockResolveLastOperation, wrapper } = getWrapper()

      const formik = wrapper.find("Formik").first()
      formik.props().onSubmit!(validAddress as any)

      await flushPromiseQueue()
      const {
        operationName,
        operationVariables,
      } = await mockResolveLastOperation({
        UpdateUserAddressPayload: () => ({
          userAddressOrErrors: {
            __typename: "UserAddress",
            ...mockSavedAddress,
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
            postalCode: "10013",
            region: "NY",
          },
        },
      })

      await flushPromiseQueue()
      const addressModal = wrapper.find(AddressModal)
      const { onSuccess, closeModal } = addressModal.props()
      expect(onSuccess).toHaveBeenCalled()
      expect(closeModal).toHaveBeenCalled()
    })

    it("shows generic error when mutation returns error", async () => {
      const { mockResolveLastOperation, wrapper } = getWrapper()

      const formik = wrapper.find("Formik").first()
      formik.props().onSubmit!(validAddress as any)

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
      await flushPromiseQueue()
      await wrapper.update()
      expect(wrapper.find(errorBoxQuery).text()).toContain(GENERIC_FAIL_MESSAGE)
    })

    it("shows generic error when mutation fails", async () => {
      const { wrapper, mockRejectLastOperation } = getWrapper()

      const formik = wrapper.find("Formik").first()
      formik.props().onSubmit!(validAddress as any)
      await flushPromiseQueue()
      mockRejectLastOperation(new TypeError("Network request failed"))
      await flushPromiseQueue()
      await wrapper.update()
      expect(wrapper.find(errorBoxQuery).text()).toContain(GENERIC_FAIL_MESSAGE)
    })

    // FIXME: Flakey test
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("sets formik error when address mutation returns phone validation error", async () => {
      const { mockResolveLastOperation, wrapper } = getWrapper()

      const formik = wrapper.find("Formik").first()
      const setFieldError = jest.fn()

      const onSubmit = formik.props().onSubmit as any
      onSubmit(validAddress as any, {
        setFieldError,
        setSubmitting: jest.fn(),
      })

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

      await flushPromiseQueue()
      expect(setFieldError).toHaveBeenCalledWith(
        "phoneNumber",
        "Please enter a valid phone number"
      )
    })
  })
})
