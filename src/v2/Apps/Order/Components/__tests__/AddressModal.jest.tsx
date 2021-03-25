import React from "react"
import { commitMutation as _commitMutation } from "react-relay"
import { AddressModal, Props, GENERIC_FAIL_MESSAGE } from "../AddressModal"
import { mount } from "enzyme"
import { validAddress } from "v2/Components/__tests__/Utils/addressForm"
import {
  updateAddressSuccess,
  updateAddressFailure,
} from "v2/Apps/Order/Routes/__fixtures__/MutationResults"
import { SavedAddressType } from "../../Utils/shippingAddressUtils"

const errorBoxQuery = "Text[data-test='credit-card-error']"

// needed for modal contentAnimation
const tick = () => new Promise(resolve => setTimeout(resolve, 0))

const commitMutation = _commitMutation as jest.Mock<any>

const savedAddress: SavedAddressType = {
  ...validAddress,
  id: "id",
  internalID: "internal-id",
  addressLine3: null,
  isDefault: false,
}

const testAddressModalProps: Props = {
  show: true,
  address: savedAddress,
  onSuccess: jest.fn(),
  onError: jest.fn(),
  modalDetails: {
    addressModalTitle: "Modal title",
    addressModalAction: "editUserAddress",
  },
  me: {
    id: "1234",
    addressConnection: {
      edges: [],
    },
    " $refType": "SavedAddresses_me",
  },
  closeModal: jest.fn(),
}

function getWrapper(props: Props) {
  return mount(<AddressModal {...props} />)
}

describe("AddressModal", () => {
  beforeEach(() => {
    commitMutation.mockReset()
  })
  it("renders Modal with the title and input fields", () => {
    const wrapper = getWrapper(testAddressModalProps)
    expect(wrapper.text()).toContain("Modal title")
    expect(wrapper.find("input").length).toBe(7)
    expect(wrapper.find("select").length).toBe(1)
  })
  describe("update mode", () => {
    it("creates address when form is submitted with valid values", async () => {
      const wrapper = getWrapper(testAddressModalProps)

      commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
        onCompleted(updateAddressSuccess)
      })

      const formik = wrapper.find("Formik").first()
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
      formik.props().onSubmit(validAddress as any)

      await wrapper.update()

      await tick()

      expect(wrapper.find(errorBoxQuery).text()).toContain(GENERIC_FAIL_MESSAGE)
    })
  })
  it("sets formik error when mutation returns phone validation error", async () => {
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
