import { mount } from "enzyme"
import React from "react"

import { AnalyticsSchema, SystemContextProvider } from "v2/System"

import { useTracking } from "v2/System/Analytics/useTracking"
import { MoreNavMenu, UserMenu } from "../Menus"
import { NavBar } from "../NavBar"
import { NavItem } from "../NavItem"

jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({ sm: false }),
}))

jest.mock("lib/isServer", () => ({
  isServer: true,
}))

describe("NavBarTracking", () => {
  const trackEvent = jest.fn()

  const Wrapper = ({ children, user = { id: "foo" } }) => {
    return <SystemContextProvider user={user}>{children}</SystemContextProvider>
  }

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("NavBar", () => {
    it("tracks NavBar notification badge clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <NavBar />
        </Wrapper>
      )

      wrapper
        .find("a")
        .find({ href: "/works-for-you" })
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: AnalyticsSchema.Subject.NotificationBell,
        destination_path: "/works-for-you",
        new_notification_count: 0,
      })
    })
  })

  describe("MoreNavMenu", () => {
    it("tracks MoreNavMenu clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <MoreNavMenu />
        </Wrapper>
      )
      const menuItems = wrapper.find("MenuItem")
      menuItems.first().simulate("click", {
        target: {
          context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
          parentNode: {
            parentNode: {
              getAttribute: () => "/galleries",
            },
          },
        },
      })
      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
        destination_path: "/galleries",
      })
    })
  })

  describe("UserMenu", () => {
    it("tracks UserMenu clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <UserMenu />
        </Wrapper>
      )

      const menuItems = wrapper.find("MenuItem")

      menuItems.first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        context_module: AnalyticsSchema.ContextModule.HeaderUserDropdown,
        destination_path: "/user/purchases",
      })
    })
  })

  describe("NavItem", () => {
    it("tracks NavItem item clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <NavItem href="/art-fairs">Fairs</NavItem>
        </Wrapper>
      )

      wrapper.find("a").simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: "Fairs",
        destination_path: "/art-fairs",
      })
    })
  })

  describe("Mobile", () => {
    it("tracks show mobile menu hamburger button clicks", () => {
      const wrapper = mount(
        // @ts-expect-error STRICT_NULL_CHECK
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>
      )
      wrapper.find(".mobileHamburgerButton").find("a").first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
      })
    })
  })
})
