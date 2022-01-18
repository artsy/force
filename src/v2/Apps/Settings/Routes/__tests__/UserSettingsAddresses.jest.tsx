import { UserSettingsAddressesFragmentContainer } from "../Shipping/Components/UserSettingsAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { commitMutation as _commitMutation, graphql } from "relay-runtime"
import ToastComponent from "v2/Components/Toast/ToastComponent"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
import { useTracking } from "v2/System"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("v2/Apps/Order/Mutations/DeleteUserAddress")

describe("ToastComponent", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <UserSettingsAddressesFragmentContainer me={props.me} />
    },
    query: graphql`
      query UserSettingsAddresses_test_Query @relay_test_operation {
        me {
          ...UserSettingsAddresses_me
        }
      }
    `,
  })
  const mockDeleteUserAddress = deleteUserAddress as jest.Mock

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })
  it("renders ToastComponent when address was deleted", () => {
    return new Promise<void>(done => {
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
      wrapper.update()
      const toast = wrapper.find(ToastComponent)
      setTimeout(() => {
        expect(toast.text()).toContain("Address Successfully Deleted")
        done()
      }, 1000)
    })
  })
})

const mockAddressConnection = {
  edges: [
    {
      cursor: "aaaabbbb",
      node: {
        id: "VXNlckFkZHJlc3M6NjUwOQ==",
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
