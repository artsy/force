import React from "react"
import { UserBidHistory } from "../UserBidHistory"
import { mount } from "enzyme"

const data = {
  name: "mockSaleName",
  href: "/mockSaleHref",
}

describe("UserBidHistory component", () => {
  let wrapper = mount(
    <UserBidHistory closedSale={data} shouldDisplayBorderBottom={false} />
  )

  afterAll(() => {
    wrapper.unmount()
  })

  it("renders correctly", () => {
    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders correct sale name", () => {
    expect(wrapper.find("Text").first().html()).toContain("mockSaleName")
  })
})
