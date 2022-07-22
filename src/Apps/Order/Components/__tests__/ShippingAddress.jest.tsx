import { render } from "enzyme"
import { ShippingAddress } from "../ShippingAddress"

describe("ShippingAddress", () => {
  it("shows the given shipping address", () => {
    const shippingAddress = render(
      <ShippingAddress
        ship={
          {
            name: "Yuki Nishijima",
            addressLine1: "401 Broadway",
            addressLine2: "Suite 25",
            city: "New York",
            postalCode: "10013",
            phoneNumber: "10013",
            region: "NY",
            country: "US",
          } as any
        }
      />
    )

    const text = shippingAddress.text()

    expect(text).toMatch("Yuki Nishijima")
    expect(text).toMatch("401 Broadway, Suite 25")
    expect(text).toMatch("New York, NY 10013")
    expect(text).toMatch("United States")
  })

  it("ignores addressLine2if it is blank or null", () => {
    const shippingAddressWithBlankAddressLine2 = render(
      <ShippingAddress
        ship={
          {
            name: "Yuki Nishijima",
            addressLine1: "401 Broadway",
            addressLine2: " ",
            city: "New York",
            postalCode: "10013",
            phoneNumber: "10013",
            region: "NY",
            country: "US",
          } as any
        }
      />
    )

    expect(shippingAddressWithBlankAddressLine2.text()).toMatch("401 Broadway")
    expect(shippingAddressWithBlankAddressLine2.text()).not.toMatch(
      "401 Broadway, "
    )

    const shippingAddressWithoutAddressLine2 = render(
      <ShippingAddress
        ship={
          {
            name: "Yuki Nishijima",
            addressLine1: "401 Broadway",
            addressLine2: null,
            city: "New York",
            postalCode: "10013",
            phoneNumber: "10013",
            region: "NY",
            country: "US",
          } as any
        }
      />
    )

    expect(shippingAddressWithoutAddressLine2.text()).toMatch("401 Broadway")
    expect(shippingAddressWithoutAddressLine2.text()).not.toMatch(
      "401 Broadway, "
    )
  })
})
