import { graphql } from "react-relay"
import { SavedAddressesFragmentContainer } from "./../SavedAddresses"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AddressModal } from "Apps/Order/Components/AddressModal"
import { RootTestPage } from "DevTools/RootTestPage"
import { userAddressMutation } from "Apps/__tests__/Fixtures/Order/MutationResults"
import { SavedAddressItem } from "Apps/Order/Components/SavedAddressItem"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

class SavedAddressesTestPage extends RootTestPage {
  async selectEdit() {
    this.find(`[data-test="editAddressInShipping"]`)
      .first()
      .simulate("click", { preventDefault: () => {} })
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

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => <SavedAddressesFragmentContainer {...props} />,
    query: graphql`
      query SavedAddressesMutation_Test_Query @relay_test_operation {
        me {
          ...SavedAddresses_me
        }
      }
    `,
  })

  describe("Saved Addresses mutations", () => {
    it("edits the saved addresses after calling edit address mutation", async () => {
      const { wrapper } = getWrapper({ Me: () => userAddressMutation.me })
      const page = new SavedAddressesTestPage(wrapper)
      page.selectEdit()
      const addresses = page.find(SavedAddressItem).first().text()
      expect(addresses).toBe(
        "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit"
      )
    })
  })

  describe("Saved Addresses", () => {
    it("renders modal when button is clicked", () => {
      const { wrapper } = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const button = wrapper.find("[data-test='shippingButton']").first()
      const modal = wrapper.find(AddressModal)
      expect(modal.props().show).toBe(false)
      button.simulate("click")

      expect(modal).toHaveLength(1)
    })

    it("add address modal with expected props", () => {
      const { wrapper } = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const button = wrapper.find("[data-test='shippingButton']").first()
      expect(wrapper.find(AddressModal).props().show).toBe(false)
      button.simulate("click")

      setTimeout(() => {
        expect(wrapper.find(AddressModal).props().modalDetails).toEqual({
          addressModalTitle: "Add address",
          addressModalAction: "createUserAddress",
        })
      }, 0)
    })

    it("render an add address button", () => {
      const { wrapper } = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      expect(wrapper.find("[data-test='shippingButton']").first()).toHaveLength(
        1
      )
    })

    describe("when clicking on the add address button", () => {
      it("tracks an analytics event", () => {
        const { wrapper } = getWrapper({
          Me: () => ({
            addressConnection: mockAddressConnection,
          }),
        })

        wrapper.find("[data-test='shippingButton']").first().simulate("click")

        expect(trackEvent).toHaveBeenCalled()
        expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
          [
            {
              "action": "clickedAddNewShippingAddress",
              "context_module": "ordersShipping",
              "context_page_owner_type": "orders-shipping",
            },
          ]
        `)
      })
    })

    it("renders radio buttons with addresses", () => {
      const { wrapper } = getWrapper({
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
