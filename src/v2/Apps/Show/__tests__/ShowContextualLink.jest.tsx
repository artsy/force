import React from "react"
import { mount } from "enzyme"
import { ContextualLink } from "../components/ShowContextualLink"
import { Link } from "@artsy/palette"

const SHOW_FIXTURE = {
  name: "Example Show",
  isFairBooth: true,
  fair: {
    name: "Catty Fair",
    href: "/fair/catty-fair",
  },
  partner: {
    isLinkable: true,
    href: "/catty-partner",
    name: "Catty Partner",
  },
  " $refType": null,
}

describe("ShowInstallShots", () => {
  const getWrapper = (data = SHOW_FIXTURE) => {
    return mount(<ContextualLink show={data} />)
  }

  it("renders the fair link when a fair booth", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Part of Catty Fair")
  })

  describe("when not a fair booth", () => {
    let wrapper
    afterEach(() => {
      expect(wrapper.text()).toContain("Presented by Catty Partner")
    })

    it("renders the partner link when the partner is linkable", () => {
      const data = { ...SHOW_FIXTURE, isFairBooth: false }
      wrapper = getWrapper(data)
      expect(wrapper.find(Link).length).toBeTruthy()
      expect(wrapper.find(Link).props().href).toEqual("/catty-partner")
    })

    it("does not render the partner link when the partner is not linkable", () => {
      SHOW_FIXTURE.partner.isLinkable = false
      const data = { ...SHOW_FIXTURE, isFairBooth: false }
      wrapper = getWrapper(data)
      expect(wrapper.find(Link).length).not.toBeTruthy()
    })
  })
})
