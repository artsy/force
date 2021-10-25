import React from "react"
import { UserRegistrationAuctions } from "../UserRegistrationAuctions"
import { mount } from "enzyme"

const data = {
  name: "mockSaleName",
  href: "/mockSaleHref",
  id: "1234",
  isClosed: false,
  startAt: "yyy",
}

describe("UserRegistrationAuctions component", () => {
  let wrapper = mount(
    <UserRegistrationAuctions sale={data} shouldDisplayBorderBottom={false} />
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
