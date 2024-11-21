import { mount } from "enzyme"
import { AddressForm } from "Apps/Auction/Components/Form/AddressForm"

// TODO: Migrate these tests to new Components/Address/AddressFormFields.jest.tsx file
jest.mock("Apps/Auction/Hooks/useAuctionFormContext", () => ({
  useAuctionFormContext: () => {
    return {
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      values: {
        address: {},
      },
      touched: {},
    }
  },
}))

describe("AddressForm", () => {
  const getWrapper = () => {
    return mount(<AddressForm />)
  }

  it("renders the correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("CountrySelect")).toHaveLength(1)

    const text = wrapper.text()

    ;[
      "Full Name",
      "Country",
      "ZIP/Postal code",
      "Street address",
      "Apt, floor, suite, etc. (optional)",
      "City",
      "State, region or province",
      "Phone number",
    ].forEach(label => {
      expect(text).toContain(label)
    })
  })
})
