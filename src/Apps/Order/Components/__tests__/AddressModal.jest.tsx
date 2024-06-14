import { commitMutation as _commitMutation } from "react-relay"
import {
  AddressModal,
  Props,
  GENERIC_FAIL_MESSAGE,
} from "Apps/Order/Components/AddressModal"
import { validAddress } from "Components/__tests__/Utils/addressForm"
import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  updateAddressFailure,
  updateAddressSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/saveAddress"
import { mount } from "DevTools/mountWithMockBoot"

jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/user", () => ({
  ...jest.requireActual("Utils/user"),
  userHasLabFeature: jest.fn(),
}))

const errorBoxQuery = "Banner[data-test='credit-card-error']"

// needed for modal contentAnimation
const tick = () => new Promise(resolve => setTimeout(resolve, 0))

const commitMutation = _commitMutation as jest.Mock<any>

const savedAddress: SavedAddressType = {
  ...validAddress,
  phoneNumber: "8475937743",
  id: "id",
  internalID: "internal-id",
  addressLine3: null,
  isDefault: false,
}

let testAddressModalProps: Props

function getWrapper(props: Props) {
  return mount(<AddressModal {...props} />)
}

describe("AddressModal", () => {
  beforeEach(() => {
    testAddressModalProps = {
      show: true,
      address: savedAddress,
      onSuccess: jest.fn(),
      onError: jest.fn(),
      onDeleteAddress: jest.fn(),
      modalDetails: {
        addressModalTitle: "Edit address",
        addressModalAction: "editUserAddress",
      },
      me: {
        id: "1234",
        addressConnection: {
          totalCount: 0,
          edges: [],
        },

        " $fragmentType": "SavedAddresses_me",
      },
      closeModal: jest.fn(),
    }
    commitMutation.mockReset()
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: { lab_features: [] },
        isLoggedIn: true,
        relayEnvironment: {},
      }
    })
  })

  it("renders EditModal with the title, input fields and buttons", () => {
    const wrapper = getWrapper(testAddressModalProps)

    expect(wrapper.text()).toContain("Edit address")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(1)

    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(1)
    expect(wrapper.find("Clickable[data-test='deleteButton']").length).toBe(1)
    expect(wrapper.find("Button[data-test='saveButton']").length).toBe(1)
  })

  it("renders EditModal without checkbox when address is default", () => {
    const wrapper = getWrapper({
      ...testAddressModalProps,
      address: {
        ...savedAddress,
        isDefault: true,
      },
    })
    expect(wrapper.text()).toContain("Edit address")
    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(0)
  })

  it("renders AddModal with the title, input fields, checkbox and button", () => {
    const wrapper = getWrapper({
      ...testAddressModalProps,
      modalDetails: {
        addressModalTitle: "Add address",
        addressModalAction: "createUserAddress",
      },
    })
    expect(wrapper.text()).toContain("Add address")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(1)

    expect(wrapper.find("Checkbox[data-test='setAsDefault']").length).toBe(1)
    expect(wrapper.find("Clickable[data-test='deleteButton']").length).toBe(0)
    expect(wrapper.find("Button[data-test='saveButton']").length).toBe(1)
  })

  it("clicking the delete button spawns a correct dialog", () => {
    const wrapper = getWrapper(testAddressModalProps)
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

  it("when the dialog is confirmed, the delete action happens", () => {
    const wrapper = getWrapper(testAddressModalProps)
    const deleteButton = wrapper.find("Clickable[data-test='deleteButton']")
    deleteButton.simulate("click")
    const dialog = wrapper.find("ModalDialog[data-test='deleteAddressDialog']")
    const dialogDelete = dialog.find("Button").at(1)
    dialogDelete.simulate("click")

    setTimeout(() => {
      expect(wrapper.find(AddressModal).props().onDeleteAddress).toBeCalled()
      expect(wrapper.find(AddressModal).props().closeModal).toBeCalled()
    }, 0)
  })

  it("when the dialog is cancelled, the delete action doesn't happen", () => {
    const wrapper = getWrapper(testAddressModalProps)
    const deleteButton = wrapper.find("Clickable[data-test='deleteButton']")
    deleteButton.simulate("click")
    const dialog = wrapper.find("ModalDialog[data-test='deleteAddressDialog']")
    const dialogCancel = dialog.find("Button").at(0)
    dialogCancel.simulate("click")

    setTimeout(() => {
      expect(
        wrapper.find(AddressModal).props().onDeleteAddress
      ).not.toBeCalled()
      expect(wrapper.find(AddressModal).props().closeModal).not.toBeCalled()
    }, 0)
  })

  describe("update mode", () => {
    it("creates address when form is submitted with valid values", async () => {
      const wrapper = getWrapper(testAddressModalProps)

      commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
        onCompleted(updateAddressSuccess)
      })

      const formik = wrapper.find("Formik").first()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      formik.props().onSubmit(validAddress as any)

      await wrapper.update()

      expect(
        commitMutation.mock.calls[0][1].mutation.default.params.name
      ).toEqual("UpdateUserAddressMutation")

      expect(commitMutation.mock.calls[0][1]).toMatchObject({
        variables: {
          input: {
            attributes: {
              ...validAddress,
            },
          },
        },
      })

      expect(wrapper.find(AddressModal).props().onSuccess).toHaveBeenCalled()
      expect(wrapper.find(AddressModal).props().closeModal).toHaveBeenCalled()
    })

    it("shows generic error when mutation fails", async () => {
      let wrapper = getWrapper(testAddressModalProps)

      commitMutation.mockImplementationOnce((_, { onError }) =>
        onError(new TypeError("Network request failed"))
      )

      const formik = wrapper.find("Formik").first()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      formik.props().onSubmit(validAddress as any)

      await wrapper.update()

      expect(commitMutation.mock.calls[0][1]).toMatchObject({
        variables: {
          input: {
            attributes: {
              ...validAddress,
            },
          },
        },
      })

      await tick()

      expect(wrapper.find(AddressModal).props().onError).toHaveBeenCalled()

      expect(wrapper.find(errorBoxQuery).text()).toContain(GENERIC_FAIL_MESSAGE)
    })
    it("shows generic error when mutation returns error", async () => {
      let wrapper = getWrapper(testAddressModalProps)

      commitMutation.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted(updateAddressFailure)
      )

      const formik = wrapper.find("Formik").first()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      formik.props().onSubmit(validAddress as any)

      await wrapper.update()

      await tick()

      expect(wrapper.find(errorBoxQuery).text()).toContain(GENERIC_FAIL_MESSAGE)
    })

    it("sets formik error when address mutation returns phone validation error", async () => {
      let wrapper = getWrapper(testAddressModalProps)

      commitMutation.mockImplementationOnce((_, { onCompleted }) =>
        onCompleted({
          updateUserAddress: {
            userAddressOrErrors: {
              errors: [
                {
                  message:
                    "Validation failed for phone: not a valid phone number",
                },
              ],
            },
          },
        })
      )

      const formik = wrapper.find("Formik").first()
      const setFieldError = jest.fn()

      const onSubmit = formik.props().onSubmit as any
      onSubmit(validAddress as any, {
        setFieldError: setFieldError,
        setSubmitting: jest.fn(),
      })

      await wrapper.update()

      await tick()

      expect(setFieldError).toHaveBeenCalledWith(
        "phoneNumber",
        "Please enter a valid phone number"
      )
    })
  })
})

describe("AddressModal feature flag", () => {
  beforeEach(() => {
    testAddressModalProps = {
      show: true,
      address: savedAddress,
      onSuccess: jest.fn(),
      onError: jest.fn(),
      onDeleteAddress: jest.fn(),
      modalDetails: {
        addressModalTitle: "Edit address",
        addressModalAction: "editUserAddress",
      },
      me: {
        id: "1234",
        addressConnection: {
          totalCount: 0,
          edges: [],
        },

        " $fragmentType": "SavedAddresses_me",
      },
      closeModal: jest.fn(),
    }
    commitMutation.mockReset()
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: { lab_features: ["Phone Number Validation"] },
        isLoggedIn: true,
        relayEnvironment: {},
      }
    })
  })

  // FIXME: Palette 18.16.1 breaks this spec somehow
  // https://github.com/artsy/palette/pull/1111
  // https://github.com/artsy/palette/pull/1112
  it.skip("renders dropdown phone input field when feat flag present", () => {
    const wrapper = getWrapper(testAddressModalProps)
    expect(
      wrapper.find("Input[data-test='phoneInputWithoutValidationFlag']").length
    ).toBe(0)
  })
})
