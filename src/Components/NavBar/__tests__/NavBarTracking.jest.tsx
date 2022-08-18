import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { mount } from "enzyme"
import { SystemContextProvider } from "System"
import { useTracking } from "react-tracking"
import { NavBarUserMenu } from "../Menus"
import { NavBar } from "../NavBar"

jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({ sm: false }),
}))

jest.mock("Server/isServer", () => ({
  isServer: true,
}))

describe("NavBarTracking", () => {
  const trackEvent = jest.fn()

  const Wrapper = ({ children, user = { id: "foo" } }) => {
    return <SystemContextProvider user={user}>{children}</SystemContextProvider>
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
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
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        context_module:
          DeprecatedAnalyticsSchema.ContextModule.HeaderUserDropdown,
        destination_path: "/settings/purchases",
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

      wrapper.find("a").find({ href: "/art-fairs" }).first().simulate("click")

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: "Fairs",
        destination_path: "/art-fairs",
      })

      wrapper
        .find("a")
        .find({ href: "/collect" })
        // Unfocusable anchor
        .findWhere(node => node.text() === "")
        .simulate("click")

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: "Artworks",
        destination_path: "/collect",
      })
    })
  })

  describe("Mobile", () => {
    it("tracks show mobile menu hamburger button clicks", () => {
      const wrapper = mount(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: DeprecatedAnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
      })
    })
  })
})
