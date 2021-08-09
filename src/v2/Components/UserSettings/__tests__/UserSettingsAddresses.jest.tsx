import React from "react"
import { UserSettingsAddressesFragmentContainer } from "../UserSettingsAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import ToastComponent from "v2/Components/Toast/ToastComponent"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
import { createUserAddress } from "v2/Apps/Order/Mutations/CreateUserAddress"
import { AddressModal } from "v2/Apps/Order/Components/AddressModal"
import { Formik } from "formik"
import { Modal } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))
jest.mock("v2/Apps/Order/Mutations/DeleteUserAddress")
jest.mock("v2/Apps/Order/Mutations/CreateUserAddress")

describe("ToastComponent", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <UserSettingsAddressesFragmentContainer me={props.me} />
    },
    query: graphql`
      query UserSettingsAddresses_test_Query {
        me {
          ...UserSettingsAddresses_me
        }
      }
    `,
  })
  const mockDeleteUserAddress = deleteUserAddress as jest.Mock
  const mockCreateUserAddress = createUserAddress as jest.Mock

  it("renders ToastComponent when address was deleted", async () => {
    const wrapper = getWrapper({
      Me: () => ({
        id: "someid",
        internalID: "someid",
        addressConnection: mockAddressConnection,
      }),
    })

    const deleteButton = wrapper
      .find(`[data-test="deleteAddressInProfile"]`)
      .first()
    mockDeleteUserAddress.mockResolvedValue(
      mockCreateDeleteAddressSuccessResponse
    )
    deleteButton.simulate("click")
    await wrapper.update()
    const toast = wrapper.find(ToastComponent)
    setTimeout(() => {
      expect(toast.text()).toContain("Address Successfully Deleted")
      // done()
    }, 1000)
  })

  // it("renders ToastComponent when address was saved", async () => {
  //   const wrapper = getWrapper({
  //     Me: () => ({
  //       id: "someid",
  //       internalID: "someid",
  //       addressConnection: mockAddressConnection,
  //     }),
  //   })

  //   const toast = wrapper.find(ToastComponent)
  //   expect(toast.props().showNotification).toBe(false)
  //   const button = wrapper.find("Button[data-test='saveButton']")
  //   const modal = wrapper.find(AddressModal)
  //   const formik = wrapper.find("form").first()
  //   console.log(formik.props())
  // })
})

const mockAddressConnection = {
  edges: [
    {
      cursor: "aaaabbbb",
      node: {
        internalID: "1",
        addressLine1: "1 Main St",
        addressLine2: "",
        addressLine3: "",
        city: "Madrid",
        country: "Spain",
        isDefault: false,
        name: "Test Name",
        phoneNumber: "555-555-5555",
        postalCode: "28001",
        region: "",
      },
    },
  ],
}

const mockCreateDeleteAddressSuccessResponse = {
  deleteUserAddress: {
    userAddressOrErrors: {
      addressLine1: "line1",
      addressLine2: "line2",
      city: "Mycity",
      country: "GB",
      id: "VXNlckFkZHJlc3M6NjUwOQ==",
      internalID: "6509",
      isDefault: true,
      name: "name",
      phoneNumber: "34534534",
      postalCode: "2789",
      region: "MC",
    },
  },
}
