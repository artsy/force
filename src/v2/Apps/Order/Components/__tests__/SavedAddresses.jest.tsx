import { graphql } from "react-relay"
import { SavedAddressesFragmentContainer } from "../SavedAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { BorderBox } from "@artsy/palette"
import { AddressModal } from "v2/Apps/Order/Components/AddressModal"
import React from "react"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { userAddressMutation } from "v2/Apps/__tests__/Fixtures/Order/MutationResults"
import { SavedAddressItem } from "v2/Apps/Order/Components/SavedAddressItem"

jest.unmock("react-relay")

class SavedAddressesTestPage extends RootTestPage {
  async selectEdit() {
    this.find(`[data-test="addressModal"]`).simulate("click")
    await this.update()
  }
}

describe("Saved Addresses mutations", () => {
  const { mutations, buildPage } = createTestEnv({
    Component: (props: any) => (
      <SavedAddressesFragmentContainer inCollectorProfile {...props} />
    ),
    defaultData: userAddressMutation,
    TestPage: SavedAddressesTestPage,
    query: graphql`
      query SavedAddressesMutation_Test_Query {
        me {
          ...SavedAddresses_me
        }
      }
    `,
  })

  it("edits the saved addresses after calling edit address mutation", async () => {
    const page = await buildPage()
    const editButton = page.find(`[data-test="editAddressInProfile"]`).first()
    // @ts-expect-error STRICT_NULL_CHECK
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
      query SavedAddressesInCollectorProfile_Test_Query {
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

  it("renders addresses", () => {
    const wrapper = getWrapper({
      Me: () => ({
        addressConnection: mockAddressConnection,
      }),
    })
    const addresses = wrapper.find(BorderBox)

    expect(addresses).toHaveLength(2)
    expect(addresses.map(address => address.text())).toEqual([
      "Test Name1 Main StMadrid, Spain, 28001555-555-5555EditSet as DefaultEditDelete",
      "Test NameDefault401 BroadwayFloor 25New York, NY, USA, 10013422-424-4242EditEditDelete",
    ])
  })
})

describe("SavedAddresses outside collector profile", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <SavedAddressesFragmentContainer inCollectorProfile={false} {...props} />
    ),
    query: graphql`
      query SavedAddressesOutsiseCollectorProfile_Test_Query {
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
      "Test NameDefault401 BroadwayFloor 25New York, NY, USA, 10013422-424-4242Edit",
    ])
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
