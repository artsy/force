import React from "react"
import { UserSettingsAddressesFragmentContainer } from "../UserSettingsAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import ToastComponent from "v2/Components/Toast/ToastComponent"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
jest.unmock("react-relay")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))
jest.mock("v2/Apps/Order/Mutations/DeleteUserAddress")

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
  const wrapper = getWrapper({
    Me: () => ({
      id: "someid",
      internalID: "someid",
      addressConnection: mockAddressConnection,
    }),
  })

  it("renders ToastComponent when address was saved", async () => {
    const toast = wrapper.find(ToastComponent)
    expect(toast.props().showNotification).toBe(false)

    const deleteButton = wrapper
      .find(`[data-test="deleteAddressInProfile"]`)
      .first()
    mockDeleteUserAddress.mockResolvedValue(mockDeleteAddressSuccessResponse)
    deleteButton.simulate("click")
    await wrapper.update()
    const toast2 = wrapper.find(ToastComponent)
    // I run here onShowToast func, but I can't get updating tree
    //I tried to use setTimeout, but it doesn't work
    setTimeout(() => {
      console.log(toast2.text())
      expect(toast2.props().showNotification).toBe(true)
    }, 0)
  })
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

const mockDeleteAddressSuccessResponse = {
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
