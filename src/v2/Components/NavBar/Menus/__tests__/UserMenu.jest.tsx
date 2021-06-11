import { SystemContextProvider } from "v2/System"
import { mount } from "enzyme"
import React from "react"
import { UserMenu } from "../UserMenu"
import { mediator } from "lib/mediator"

jest.mock("v2/System/Analytics/useTracking", () => {
  return {
    useTracking: () => ({
      trackEvent: jest.fn(),
    }),
  }
})

describe("UserMenu", () => {
  jest.spyOn(mediator, "trigger")

  const getWrapper = (props = {}) => {
    return mount(
      <SystemContextProvider user={{}} {...props}>
        <UserMenu />
      </SystemContextProvider>
    )
  }

  // Label also includes SVG image title
  const defaultLinks = [
    ["/user/purchases", "Pending Order History"],
    ["/user/saves", "Save Saves & Follows"],
    ["/profile/edit", "User Collector Profile"],
    ["/user/edit", "Settings Settings"],
  ]

  it("renders correct menu items", () => {
    const wrapper = getWrapper()
    const links = wrapper.find("MenuItem")

    defaultLinks.forEach(([href, linkLabel], index) => {
      const navLink = links.at(index)
      expect(href).toEqual(navLink.prop("href"))
      expect(linkLabel).toEqual(navLink.text())
    })

    expect(wrapper.find("MenuItem").last().text()).toContain("Log out")
  })

  it("calls logout auth action on logout menu click", () => {
    const wrapper = getWrapper()
    wrapper.find("MenuItem").last().simulate("click")
    expect(mediator.trigger).toBeCalledWith("auth:logout")
  })

  describe("admin features", () => {
    it("hides admin button if not admin", () => {
      const wrapper = getWrapper({ user: { type: "NotAdmin" } })
      expect(wrapper.html()).not.toContain("Admin")
    })

    it("shows admin button if admin", () => {
      const wrapper = getWrapper({ user: { type: "Admin" } })
      expect(wrapper.html()).toContain("Admin")
    })

    it("shows order history button if admin", () => {
      const wrapper = getWrapper({ user: { type: "Admin" } })
      expect(wrapper.html()).toContain("Order History")
    })

    it("shows CMS button if admin", () => {
      const wrapper = getWrapper({ user: { type: "Admin" } })
      expect(wrapper.html()).toContain("CMS")
    })

    it("does not show CMS button if no partner access and not admin", () => {
      const wrapper = getWrapper({ user: { has_partner_access: false } })
      expect(wrapper.html()).not.toContain("CMS")
    })

    it("shows CMS button if has partner access and not admin", () => {
      const wrapper = getWrapper({ user: { has_partner_access: true } })
      expect(wrapper.html()).toContain("CMS")
    })
  })
})
