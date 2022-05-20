import { graphql } from "react-relay"
import { SavedAddressesFragmentContainer } from "../SavedAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { BorderBox } from "@artsy/palette"
import { AddressModal } from "v2/Apps/Order/Components/AddressModal"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { userAddressMutation } from "v2/Apps/__tests__/Fixtures/Order/MutationResults"
import { SavedAddressItem } from "v2/Apps/Order/Components/SavedAddressItem"
import { useTracking } from "v2/System"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

class SavedAddressesTestPage extends RootTestPage {
  async selectEdit() {
    this.find(`[data-test="addressModal"]`).simulate("click")
    await this.update()
  }
}

describe("Saved Addresses", () => {
  const trackEvent = jest.fn()
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  describe("Saved Addresses mutations", () => {
    const { mutations, buildPage } = createTestEnv({
      Component: (props: any) => (
        <SavedAddressesFragmentContainer inCollectorProfile {...props} />
      ),
      defaultData: userAddressMutation,
      TestPage: SavedAddressesTestPage,
      query: graphql`
        query SavedAddressesMutation_Test_Query @relay_test_operation {
          me {
            ...SavedAddresses_me
          }
        }
      `,
    })

    it("edits the saved addresses after calling edit address mutation", async () => {
      const page = await buildPage()
      const editButton = page
        .find(`[data-test="editAddressInProfileClick"]`)
        .first()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      editButton
        .props()
        .onClick(userAddressMutation.me.addressConnection.edges[0].node as any)
      const addresses = page.find(SavedAddressItem).first().text()

      setTimeout(() => {
        expect(mutations.mockFetch).toHaveBeenCalledTimes(1)

        expect(addresses).toBe(
          "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit"
        )
      }, 0)
    })
  })

  describe("SavedAddresses in collector profile", () => {
    const { getWrapper } = setupTestWrapper({
      Component: (props: any) => (
        <SavedAddressesFragmentContainer inCollectorProfile {...props} />
      ),
      query: graphql`
        query SavedAddressesInCollectorProfile_Test_Query
          @relay_test_operation {
          me {
            ...SavedAddresses_me
          }
        }
      `,
    })

    it("renders modal when button is clicked", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const button = wrapper.find("Button[data-test='profileButton']")
      const modal = wrapper.find(AddressModal)
      expect(modal.props().show).toBe(false)
      button.simulate("click")

      setTimeout(() => {
        expect(modal).toHaveLength(1)
      }, 0)
    })

    it("add address modal with expected props", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })

      const button = wrapper.find("Button[data-test='profileButton']")
      const modal = wrapper.find(AddressModal)
      expect(modal.props().show).toBe(false)
      button.simulate("click")

      setTimeout(() => {
        expect(modal.props().modalDetails).toBe({
          addressModalTitle: "Add new address",
          addressModalAction: "createUserAddress",
        })
      }, 0)
    })

    it("edit address modal with expected props", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const button = wrapper.find("Button[data-test='profileButton']")
      const modal = wrapper.find(AddressModal)
      expect(modal.props().show).toBe(false)
      button.simulate("click")
      setTimeout(() => {
        expect(modal.props().modalDetails).toBe({
          addressModalTitle: "Edit address",
          addressModalAction: "editUserAddress",
        })
      }, 0)
    })

    it("render an add address button", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      expect(wrapper.find("Button[data-test='profileButton']")).toHaveLength(1)
    })

    describe("when clicking on the add address button", () => {
      it("does not track an analytics event", () => {
        const wrapper = getWrapper({
          Me: () => ({
            addressConnection: mockAddressConnection,
          }),
        })

        wrapper.find("Button[data-test='profileButton']").simulate("click")

        expect(trackEvent).not.toHaveBeenCalled()
      })
    })

    it("renders addresses", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const addresses = wrapper.find(BorderBox)

      expect(addresses).toHaveLength(2)
      expect(addresses.map(address => address.text())).toEqual([
        "Test Name1 Main StMadrid, Spain, 28001555-555-5555EditEditDelete",
        "Test Name401 BroadwayFloor 25New York, NY, USA, 10013422-424-4242EditDefault AddressEditDelete",
      ])
    })
  })

  describe("SavedAddresses outside collector profile", () => {
    const { getWrapper } = setupTestWrapper({
      Component: (props: any) => (
        <SavedAddressesFragmentContainer
          inCollectorProfile={false}
          {...props}
        />
      ),
      query: graphql`
        query SavedAddressesOutsiseCollectorProfile_Test_Query
          @relay_test_operation {
          me {
            ...SavedAddresses_me
          }
        }
      `,
    })

    it("renders modal when button is clicked", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const button = wrapper.find("Button[data-test='shippingButton']")
      const modal = wrapper.find(AddressModal)
      expect(modal.props().show).toBe(false)
      button.simulate("click")

      setTimeout(() => {
        expect(modal).toHaveLength(1)
      }, 0)
    })

    it("add address modal with expected props", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const button = wrapper.find("Button[data-test='shippingButton']")
      const modal = wrapper.find(AddressModal)
      expect(modal.props().show).toBe(false)
      button.simulate("click")

      setTimeout(() => {
        expect(modal.props().modalDetails).toBe({
          addressModalTitle: "Add address",
          addressModalAction: "createUserAddress",
        })
      }, 0)
    })

    it("render an add address button", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      expect(wrapper.find("Button[data-test='shippingButton']")).toHaveLength(1)
    })

    describe("when clicking on the add address button", () => {
      it("tracks an analytics event", () => {
        const wrapper = getWrapper({
          Me: () => ({
            addressConnection: mockAddressConnection,
          }),
        })

        wrapper.find("Button[data-test='shippingButton']").simulate("click")

        expect(trackEvent).toHaveBeenCalled()
        expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
          Array [
            Object {
              "action": "clickedAddNewShippingAddress",
              "context_module": "ordersShipping",
              "context_page_owner_type": "orders-shipping",
            },
          ]
        `)
      })
    })

    it("renders radio buttons with addresses", () => {
      const wrapper = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const radios = wrapper.find("Radio")

      expect(radios.length).toBe(2)
      expect(radios.map(radio => radio.props().value)).toEqual(["1", "2"])
      expect(radios.map(radio => radio.props().selected)).toEqual([false, true])
      expect(radios.map(radio => radio.text())).toEqual([
        "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit",
        "Test Name401 BroadwayFloor 25New York, NY, USA, 10013422-424-4242Edit",
      ])
    })
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
    {
      cursor: "bbbbbcccc",
      node: {
        internalID: "2",
        addressLine1: "401 Broadway",
        addressLine2: "Floor 25",
        addressLine3: "",
        city: "New York",
        country: "USA",
        isDefault: true,
        name: "Test Name",
        phoneNumber: "422-424-4242",
        postalCode: "10013",
        region: "NY",
      },
    },
  ],
}
