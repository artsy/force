import React from "react"
import { UserSettingsAddressesFragmentContainer } from "../UserSettingsAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
import ToastComponent from "v2/Components/Toast/ToastComponent"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { createTestEnv } from "v2/DevTools/createTestEnv"
jest.mock("v2/Apps/Order/Mutations/DeleteUserAddress")
class SavedAddressesTestPage extends RootTestPage {
  async selectEdit() {
    this.find(`[data-test="addressModal"]`).simulate("click")
    await this.update()
  }
}
jest.unmock("react-relay")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))
// jest.mock("v2/Apps/Order/Mutations/DeleteUserAddress.ts")

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

  it("renders ToastComponent when address was saved", async () => {
    const wrapper = getWrapper({
      Me: () => ({
        id: "someid",
        internalID: "someid",
        addressConnection: mockAddressConnection,
      }),
    })
    // button.simulate("click")
    const modal = wrapper.find(ToastComponent)

    expect(modal.props().showNotification).toBe(false)

    const modal1 = wrapper.find(`[data-test="deleteAddressInProfile"]`).first()

    modal1.simulate("click")
    expect(modal.props().showNotification).toBe(true)
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
