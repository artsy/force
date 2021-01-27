import { graphql } from "react-relay"
import { SavedAddressesFragmentContainer } from "../SavedAddresses"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

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

const { getWrapper } = setupTestWrapper({
  Component: SavedAddressesFragmentContainer,
  query: graphql`
    query SavedAddresses_Test_Query {
      me {
        ...SavedAddresses_me
      }
    }
  `,
})

describe("SavedAddress", () => {
  let wrapper
  beforeEach(() => {
    wrapper = getWrapper({
      Me: () => ({
        addressConnection: mockAddressConnection,
      }),
    })
  })
  it("renders radio buttons with addresses", () => {
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
  // FIXME:
  it.skip("calls change selection function when radio buttons clicked", async () => {
    const radios = wrapper.find("Radio")
    const handleClickMock = jest.fn()
    wrapper.props("handleClickEdit", handleClickMock)
    radios.at(0).simulate("click")
    await wrapper.update()
    expect(radios.map(radio => radio.props().selected)).toEqual([
      true,
      false,
      false,
    ])
    expect(handleClickMock).toHaveBeenCalledWith("aaa")
  })
})
