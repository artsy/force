import { mount } from "enzyme"
import React from "react"
import { PartnerContactCard_location } from "v2/__generated__/PartnerContactCard_location.graphql"
import { PartnerContactAddress } from "../../PartnerContacts"

describe("PartnerContactAddress", () => {
  it("displays partner contact address", () => {
    const wrapper = mount(
      <PartnerContactAddress
        location={
          {
            address: "address",
            phone: "123",
          } as PartnerContactCard_location
        }
      />
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
          } as PartnerContactCard_location
        }
      />
    )

    const html = wrapper.html()

    expect(html).not.toContain("Tel:")
  })
})
