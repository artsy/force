import { BellIcon, EnvelopeIcon, SoloIcon } from "@artsy/palette"
import { SystemContextProvider } from "System"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import { NavBar } from "Components/NavBar/NavBar"
import { NavBarMobileMenuNotificationsIndicatorQueryRenderer as NavBarMobileMenuNotificationsIndicator } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"
import { mediator } from "Server/mediator"

jest.mock("Components/Search/SearchBar", () => {
  return {
    SearchBarQueryRenderer: () => <div />,
  }
})

jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("Server/isServer", () => ({
  isServer: true,
}))

jest.mock("Components/NavBar/NavBarMobileMenu/NavBarMobileSubMenu", () => ({
  NavBarMobileSubMenu: () => <></>,
}))

jest.mock("react-dom", () => ({
  createPortal: children => children,
}))

describe("NavBar", () => {
  const trackEvent = jest.fn()

  const getWrapper = ({ user = null, isEigen = false } = {}) => {
    return mount(
      <SystemContextProvider user={user} isEigen={isEigen}>
        <NavBar />
      </SystemContextProvider>
    )
  }

  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  beforeAll(() => {
    jest.spyOn(mediator, "trigger")
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders Artsy Logo and SearchBar", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ArtsyMarkBlackIcon").length).toEqual(1)
    expect(wrapper.find("SearchBarQueryRenderer").length).toEqual(1)
  })

  describe("desktop", () => {
    it("renders logged out items", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("Log In")
      expect(wrapper.html()).toContain("Sign Up")
      expect(wrapper.find(BellIcon).length).toEqual(0)
      expect(wrapper.find(SoloIcon).length).toEqual(0)
    })

    it("renders logged in items", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const wrapper = getWrapper({ user: true })
      expect(wrapper.html()).not.toContain("Log In")
      expect(wrapper.html()).not.toContain("Sign Up")
      expect(wrapper.find(BellIcon).length).toEqual(1)
      expect(wrapper.find(SoloIcon).length).toEqual(1)
    })

    describe("lab features", () => {
      it("shows inquiries icon if lab feature enabled", () => {
        const wrapper = getWrapper({
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          user: { type: "NotAdmin", lab_features: ["User Conversations View"] },
        })
        expect(wrapper.find(EnvelopeIcon).length).toEqual(1)
      })
    })

    it("includes the sub-menus when rendering", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("View All Artists")
      expect(wrapper.html()).toContain("View All Artworks")
    })

    it("renders menu item price database", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("Price Database")
    })
  })

  describe("mediator actions", () => {
    it("calls login auth action on login button click", () => {
      const wrapper = getWrapper()
      wrapper.find("button").at(0).simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        copy: "Log in to collect art by the world’s leading artists",
        intent: "login",
        mode: "login",
      })
    })

    it("calls signup auth action on signup button click", () => {
      const wrapper = getWrapper()
      wrapper.find("button").at(1).simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        copy: "Sign up to collect art by the world’s leading artists",
        intent: "signup",
        mode: "signup",
        redirectTo: "http://localhost/",
      })
    })
  })

  describe("mobile", () => {
    it("toggles menu", () => {
      const wrapper = getWrapper()

      expect(wrapper.find("NavBarMobileMenuIcon").length).toEqual(1)

      const toggle = () =>
        wrapper
          .find("button")
          .findWhere(node => {
            return node.text() === "Menu" || node.text() === "Close"
          })
          .first()
          .simulate("click")

      expect(wrapper.find("NavBarMobileMenu").length).toEqual(0)
      toggle()
      expect(wrapper.find("NavBarMobileMenu").length).toEqual(1)
      toggle()
      expect(wrapper.find("NavBarMobileMenu").length).toEqual(0)
    })

    it("shows the unread notifications indicator", () => {
      const wrapper = getWrapper({
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        user: { type: "NotAdmin" },
      })
      expect(wrapper.find(NavBarMobileMenuNotificationsIndicator).length).toBe(
        1
      )
    })
  })

  describe("eigen", () => {
    it("renders null", () => {
      expect(
        getWrapper({ isEigen: false }).find(NavBar).isEmptyRender()
      ).toBeFalsy()
      expect(
        getWrapper({ isEigen: true }).find(NavBar).isEmptyRender()
      ).toBeTruthy()
    })
  })
})
