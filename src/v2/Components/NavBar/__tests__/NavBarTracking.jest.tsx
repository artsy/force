import { mount } from "enzyme"
import { AnalyticsSchema, SystemContextProvider } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { NavBarUserMenu } from "../Menus"
import { NavBar } from "../NavBar"

jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({ sm: false }),
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

  describe("NavBarUserMenu", () => {
    it("tracks NavBarUserMenu clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <NavBarUserMenu />
        </Wrapper>
      )

      const menuItems = wrapper.find("a")

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
          <NavBar />
        </Wrapper>
      )

      wrapper.find("a").find({ href: "/fairs" }).first().simulate("click")

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: "Fairs",
        destination_path: "/fairs",
      })

      wrapper
        .find("a")
        .find({ href: "/collect" })
        // Unfocusable anchor
        .findWhere(node => node.text() === "")
        .simulate("click")

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: "Artworks",
        destination_path: "/collect",
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

      wrapper
        .find("button")
        .findWhere(node => node.text() === "Menu")
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.Click,
        subject: AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
      })
    })
  })
})
