import { PartnerContactAddress } from "Apps/Partner/Components/PartnerContacts/PartnerContactAddress"
import type { PartnerContactAddress_location$data } from "__generated__/PartnerContactAddress_location.graphql"
import { mount } from "enzyme"

describe("PartnerContactAddress", () => {
  it("displays partner contact address", () => {
    const wrapper = mount(
      <PartnerContactAddress
        location={
          {
            address: "address",
            phone: "123",
          } as PartnerContactAddress_location$data
        }
      />,
    )

    const html = wrapper.html()

    expect(html).toContain("address")
    expect(html).toContain("Tel: 123")
  })

  it("doesn't display partner contact phone number", () => {
    const wrapper = mount(
      <PartnerContactAddress
        location={
          {
            address: "address",
          } as PartnerContactAddress_location$data
        }
      />,
    )

    const html = wrapper.html()

    expect(html).not.toContain("Tel:")
  })
})
