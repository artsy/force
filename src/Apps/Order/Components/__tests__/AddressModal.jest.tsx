import { commitMutation as _commitMutation } from "react-relay"
import { AddressModal, Props } from "Apps/Order/Components/AddressModal"
import { mount } from "enzyme"
import { validAddress } from "Components/__tests__/Utils/addressForm"

import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { useSystemContext } from "System/useSystemContext"
jest.mock("System/useSystemContext")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/user", () => ({
  userHasLabFeature: jest.fn(),
}))

const savedAddress: SavedAddressType = {
  ...validAddress,
  phoneNumber: "8475937743",
  phoneNumberCountryCode: "us",
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
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        user: { lab_features: [] },
        isLoggedIn: true,
        relayEnvironment: {},
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
          ready: jest.fn(),
          trigger: jest.fn(),
        },
      }
    })
  })

  it("renders EditModal with the title, input fields and buttons", () => {
    const wrapper = getWrapper(testAddressModalProps)

    expect(wrapper.text()).toContain("Edit address")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(2)

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
    expect(wrapper.find("select").length).toBe(2)

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
})
