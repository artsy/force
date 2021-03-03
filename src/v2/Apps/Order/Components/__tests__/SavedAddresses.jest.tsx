import { graphql } from "react-relay"
import { SavedAddressesFragmentContainer } from "../SavedAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { Button } from "@artsy/palette"
import { AddressModal } from "v2/Apps/Order/Components/AddressModal"
import React from "react"

jest.unmock("react-relay")

beforeEach(() => {
  afterEach(() => {
    jest.clearAllMocks()
  })
})

describe("SavedAddress button interactions", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <SavedAddressesFragmentContainer inCollectorProfile {...props} />
    ),
    query: graphql`
      query SavedAddressesCollectorProfile_Test_Query {
        me {
          ...SavedAddresses_me
        }
      }
    `,
  })

  const wrapper = getWrapper({
    Me: () => ({
      addressConnection: mockAddressConnection,
    }),
  })

  it("renders modal when button is clicked", () => {
    const button = wrapper.find(Button)
    const modal = wrapper.find(AddressModal)
    expect(modal).toHaveLength(0)
    button.props().onClick({} as any)

    setTimeout(() => {
      expect(modal).toHaveLength(1)
    }, 0)
  })

  it("opens Create Address modal when as expected", () => {
    const button = wrapper.find(Button)
    const modal = wrapper.find(AddressModal)
    expect(modal).toHaveLength(0)
    button.props().onClick({} as any)

    setTimeout(() => {
      expect(modal.props().modalDetails).toBe({
        addressModalTitle: "Add new address",
        addressModalAction: "createUserAddress",
      })
    }, 0)
  })
})

describe("SavedAddress", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => <SavedAddressesFragmentContainer {...props} />,
    query: graphql`
      query SavedAddresses_Test_Query {
        me {
          ...SavedAddresses_me
        }
      }
    `,
  })

  it("does not render an add address button outside the collector profile", () => {
    const wrapper = getWrapper({
      Me: () => ({
        addressConnection: mockAddressConnection,
      }),
    })
    const button = wrapper.find(Button)
    expect(button).toHaveLength(0)
  })

  it("renders radio buttons with addresses", () => {
    const wrapper = getWrapper({
      Me: () => ({
        addressConnection: mockAddressConnection,
      }),
    })
    const radios = wrapper.find("Radio")

    expect(radios.length).toBe(3)
    expect(radios.map(radio => radio.props().value)).toEqual([
      "0",
      "1",
      "NEW_ADDRESS",
    ])
    expect(radios.map(radio => radio.props().selected)).toEqual([
      false,
      true,
      false,
    ])
    expect(radios.map(radio => radio.text())).toEqual([
      "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit",
      "Test Name401 BroadwayFloor 25New York, NY, USA, 10013422-424-4242Edit",
      "Add a new shipping address",
    ])
  })
})

const mockAddressConnection = {
  edges: [
    {
      node: {
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
      node: {
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
