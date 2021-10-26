import React from "react"
import { UserBidHistory } from "../UserBidHistory"
import { mount } from "enzyme"

const data = {
  closed: [
    {
      sale: {
        name: "mockSaleName",
        href: "/mockSaleHref",
        endAt: "this is the end",
        profile: {
          bio: "my beautiful friend",
        },
      },
    },
  ],
}

describe("UserBidHistory component", () => {
  let wrapper = mount(<UserBidHistory myBids={data} />)

  afterAll(() => {
    wrapper.unmount()
  })

  it("renders correctly", () => {
    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders active bid history", () => {
    expect(wrapper.find("Text").first().html()).toContain("Bid History")
  })

  it("renders correct bid sale link", () => {
    expect(wrapper.find("RouterLink").props().to).toEqual(
      data.closed[0].sale.href
    )
  })

  it("renders nothing message when no data found", () => {
    wrapper = mount(<UserBidHistory myBids={{ closed: [] }} />)
    expect(wrapper.html()).toContain("Nothing to Show")
  })
})
