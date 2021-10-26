import React from "react"
import { UserRegistrationAuctions } from "../UserRegistrationAuctions"
import { mount } from "enzyme"

const data = {
  edges: [
    {
      node: {
        sale: {
          name: "mockSaleName",
          href: "/mockSaleHref",
          id: "1234",
          isClosed: false,
          startAt: "yyy",
        },
      },
    },
  ],
}

describe("UserRegistrationAuctions component", () => {
  let wrapper = mount(
    <UserRegistrationAuctions saleRegistrationsConnection={data} />
  )

  afterAll(() => {
    wrapper.unmount()
  })

  it("renders correctly", () => {
    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders Registration for Upcoming Auctions title", () => {
    expect(wrapper.find("Text").first().html()).toContain(
      "Registration for Upcoming Auctions"
    )
  })

  it("renders correct link for sale", () => {
    expect(wrapper.find("RouterLink").props().to).toEqual(
      data.edges[0].node.sale.href
    )
  })

  it("renders nothing message when no data found", () => {
    wrapper = mount(
      <UserRegistrationAuctions saleRegistrationsConnection={{ edges: [] }} />
    )
    expect(wrapper.html()).toContain("Nothing to Show")
  })
})
