import {
  AddressModal,
  Props,
  GENERIC_FAIL_MESSAGE,
  AddressModalActionType,
} from "Apps/Order/Routes/Shipping2/AddressModal2"
import { validAddress } from "Components/__tests__/Utils/addressForm"
import { useSystemContext } from "System/useSystemContext"
import { SavedAddressType } from "Apps/Order/Routes/Shipping2/shippingUtils"
import { createMockEnvironment } from "relay-test-utils"
import { waitFor } from "@testing-library/react"
import {
  ShippingContext,
  useComputeShippingContext,
} from "Apps/Order/Routes/Shipping2/ShippingContext"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { AddressModal2TestQuery } from "__generated__/AddressModal2TestQuery.graphql"

jest.unmock("react-relay")
jest.mock("System/useSystemContext")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/user", () => ({
  userHasLabFeature: jest.fn(),
}))

jest.mock(
  "Apps/Order/Routes/Shipping2/shippingContextHelpers/useParseOrderData",
  () => {
    return {
      useParseOrderData: () => ({
        shipsFrom: "US",
      }),
    }
  }
)

const errorBoxQuery = "Banner[data-testid='form-banner-error']"

const savedAddress: SavedAddressType = {
  ...validAddress,
  phoneNumber: "8475937743",
  id: "id",
  internalID: "internal-id",
  addressLine3: null,
  isDefault: false,
}

let testAddressModalProps: Props

let mockRelayEnv: ReturnType<typeof createMockEnvironment>

beforeEach(() => {
  mockRelayEnv = createMockEnvironment()
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return {
      user: { lab_features: [] },
      isLoggedIn: true,
      relayEnvironment: mockRelayEnv,
    }
  })
})

const { getWrapper } = setupTestWrapper<AddressModal2TestQuery>({
  // Cast props here because we don't actually need the query, just the relay
  // test wrapper. -
  // props must be passed via getWrapper's componentProps arg
  Component: (props: unknown) => {
    return (
      <ShippingContext.Provider value={useComputeShippingContext({} as any)}>
        <AddressModal {...(props as Props)} />
      </ShippingContext.Provider>
    )
  },
  query: graphql`
    query AddressModal2TestQuery @relay_test_operation {
      _unused: artist(id: "whocare") {
        name
      }
    }
  `,
})

describe("AddressModal", () => {
  beforeEach(() => {
    testAddressModalProps = {
      onSuccess: jest.fn(),
      modalAction: {
        type: AddressModalActionType.EDIT_USER_ADDRESS,
        address: savedAddress,
      },

      closeModal: jest.fn(),
    }
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: { lab_features: [] },
        isLoggedIn: true,
        relayEnvironment: mockRelayEnv,
      }
    })
  })

  it("renders EditModal with the title, input fields and buttons", () => {
    const { wrapper } = getWrapper({}, testAddressModalProps, mockRelayEnv)

    expect(wrapper.text()).toContain("Edit address")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(1)

    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(1)
    expect(wrapper.find("Clickable[data-test='deleteButton']").length).toBe(1)
    expect(wrapper.find("Button[data-test='saveButton']").length).toBe(1)
  })

  it("renders EditModal without checkbox when address is default", () => {
    const { wrapper } = getWrapper(
      {},
      {
        ...testAddressModalProps,
        modalAction: {
          type: AddressModalActionType.EDIT_USER_ADDRESS,
          address: {
            ...savedAddress,
            isDefault: true,
          },
        },
      },
      mockRelayEnv
    )
    expect(wrapper.text()).toContain("Edit address")
    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(0)
  })

  it("renders AddModal with the title, input fields, checkbox and button", () => {
    const { wrapper } = getWrapper(
      {},
      {
        ...testAddressModalProps,
        modalAction: {
          type: AddressModalActionType.CREATE_USER_ADDRESS,
        },
      },
      mockRelayEnv
    )
    expect(wrapper.text()).toContain("Add address")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(1)

    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(1)
    expect(wrapper.find("Clickable[data-test='deleteButton']").length).toBe(0)
    expect(wrapper.find("Button[data-test='saveButton']").length).toBe(1)
  })

  it("clicking the delete button spawns a correct dialog", () => {
    const { wrapper } = getWrapper({}, testAddressModalProps, mockRelayEnv)
    const deleteButton = wrapper.find("Clickable[data-test='deleteButton']")
    deleteButton.simulate("click")
    const dialog = wrapper.find("ModalDialog[data-test='deleteAddressDialog']")

    setTimeout(() => {
      expect(dialog).toHaveLength(1)
      expect(dialog.text()).toContain("Delete address?")
      expect(dialog.text()).toContain(
        "This will remove this address from your saved addresses"
      )
      const dialogDelete = dialog.find("Button").at(1)
      expect(dialogDelete.text()).toContain("Delete")
      const dialogCancel = dialog.find("Button").at(0)
      expect(dialogCancel.text()).toContain("Cancel")
    }, 0)
  })

  it("when the dialog is confirmed, the delete action happens", async () => {
    const { mockResolveLastOperation, wrapper } = getWrapper(
      {},
      testAddressModalProps,
      mockRelayEnv
    )
    const deleteButton = wrapper.find("Clickable[data-test='deleteButton']")
    deleteButton.simulate("click")
    const dialog = wrapper.find("ModalDialog[data-test='deleteAddressDialog']")
    const dialogDelete = dialog.find("Button").at(1)
    dialogDelete.simulate("click")

    const { operationName, operationVariables } = await waitFor(() =>
      mockResolveLastOperation({})
    )

    expect(operationName).toBe("useDeleteSavedAddressMutation")
    expect(operationVariables).toEqual({
      input: { userAddressID: "internal-id" },
    })

    await waitFor(() => {
      expect(wrapper.find(AddressModal).props().closeModal).toHaveBeenCalled()
    })
  })

  describe("update mode", () => {
    it("creates address when form is submitted with valid values", async () => {
      const { mockResolveLastOperation, wrapper } = getWrapper(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      const formik = wrapper.find("Formik").first()
      formik.props().onSubmit!(validAddress as any)

      const { operationName, operationVariables } = await waitFor(() =>
        mockResolveLastOperation({
          UpdateUserAddressPayload: () => ({
            userAddressOrErrors: {
              __typename: "UserAddress",
              ...savedAddress,
              isDefault: true,
            },
          }),
        })
      )

      expect(operationName).toBe("useUpdateSavedAddressMutation")
      expect(operationVariables).toMatchObject({
        input: {
          userAddressID: "internal-id",
          attributes: {
            addressLine1: "401 Broadway",
            addressLine2: "",
            city: "New York",
            country: "US",
            name: "Erik David",
            phoneNumber: "5555937743",
            postalCode: "15601",
            region: "NY",
          },
        },
      })

      await waitFor(() => {
        expect(wrapper.find(AddressModal).props().onSuccess).toHaveBeenCalled()
        expect(wrapper.find(AddressModal).props().closeModal).toHaveBeenCalled()
      })
    })

    it("shows generic error when mutation fails", async () => {
      const { wrapper, mockRejectLastOperation } = getWrapper(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      const formik = wrapper.find("Formik").first()

      formik.props().onSubmit!(validAddress as any)

      await waitFor(() => {
        mockRejectLastOperation(new TypeError("Network request failed"))
      })

      await waitFor(async () => {
        await wrapper.update()
        expect(wrapper.find(errorBoxQuery).text()).toContain(
          GENERIC_FAIL_MESSAGE
        )
      })
    })
    it("shows generic error when mutation returns error", async () => {
      const { mockResolveLastOperation, wrapper } = getWrapper(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      const formik = wrapper.find("Formik").first()
      formik.props().onSubmit!(validAddress as any)

      await waitFor(() =>
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
      )
      await waitFor(async () => {
        await wrapper.update()
        expect(wrapper.find(errorBoxQuery).text()).toContain(
          GENERIC_FAIL_MESSAGE
        )
      })
    })

    it("sets formik error when address mutation returns phone validation error", async () => {
      const { mockResolveLastOperation, wrapper } = getWrapper(
        {},
        testAddressModalProps,
        mockRelayEnv
      )

      const formik = wrapper.find("Formik").first()
      const setFieldError = jest.fn()

      const onSubmit = formik.props().onSubmit as any
      onSubmit(validAddress as any, {
        setFieldError,
        setSubmitting: jest.fn(),
      })

      await waitFor(() =>
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
      )
      await waitFor(() => {
        expect(setFieldError).toHaveBeenCalledWith(
          "phoneNumber",
          "Please enter a valid phone number"
        )
      })
    })
  })
})
