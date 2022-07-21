import { mount } from "enzyme"
import { AddressForm } from "../AddressForm"

jest.mock("Apps/Auction/Hooks/useFormContext", () => ({
  useFormContext: () => {
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
      "Postal Code",
      "Address Line 1",
      "Address Line 2",
      "City",
      "State, Province, or Region",
      "Phone Number",
    ].forEach(label => {
      expect(text).toContain(label)
    })
  })
})
