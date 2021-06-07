import { BellIcon, EnvelopeIcon, SoloIcon } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import { NavBar, NavBarTier } from "../NavBar"
import { InboxNotificationCount } from "../Menus/MobileNavMenu/InboxNotificationCount"
import { mediator } from "lib/mediator"

jest.mock("v2/Components/Search/SearchBar", () => {
  return {
    SearchBarQueryRenderer: () => <div />,
  }
})

jest.mock("v2/Artsy/Analytics/useTracking")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

jest.mock("lib/isServer", () => ({
  isServer: true,
}))

describe("NavBar", () => {
  const trackEvent = jest.fn()

  const getWrapper = ({ user = null, isEigen = false } = {}) => {
    return mount(
      // @ts-expect-error STRICT_NULL_CHECK
      <SystemContextProvider user={user} isEigen={isEigen}>
        <NavBar />
      </SystemContextProvider>
    )
  }

  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders Artsy Logo and SearchBar", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ArtsyMarkBlackIcon").length).toEqual(1)
    expect(wrapper.find("SearchBarQueryRenderer").length).toEqual(1)
  })

  describe("desktop", () => {
    const topNavBarDefaultLinks = [
      ["/collect", "Buy"],
      ["/consign", "Sell"],
      ["/articles", "Editorial"],
    ]

    const bottomNavBarDefaultLinks = [
      ["/artists", "Artists"],
      ["/collect", "Artworks"],
      ["/auctions", "Auctions"],
      ["/viewing-rooms", "Viewing Rooms"],
      ["/galleries", "Galleries"],
      ["/fairs", "Fairs"],
      ["/Shows", "Shows"],
      ["/institutions", "Museums"],
      ["#download-app-banner", "Download App"],
    ]

    it("renders correct nav items above xs", () => {
      const wrapper = getWrapper()

      // Should always be first
      expect(wrapper.find("a").first().text()).toEqual("Skip to Main Content")

      expect(wrapper.find("NavBarPrimaryLogo").find("a").prop("href")).toEqual(
        "/"
      )

      const topNavBarLinks = wrapper.find(NavBarTier).at(0).find("NavItem")
      const bottomNavBarLinks = wrapper.find(NavBarTier).at(1).find("NavItem")

      topNavBarDefaultLinks.forEach(([href, text], index) => {
        const navLink = topNavBarLinks.at(index)
        expect(href).toEqual(navLink.prop("href"))
        expect(text).toEqual(navLink.text())
      })

      bottomNavBarDefaultLinks.forEach(([href], index) => {
        const navLink = bottomNavBarLinks.at(index)
        expect(href).toEqual(navLink.prop("href"))
      })
    })

    it("renders logged out items", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("Log in")
      expect(wrapper.html()).toContain("Sign up")
      expect(wrapper.find(BellIcon).length).toEqual(0)
      expect(wrapper.find(SoloIcon).length).toEqual(0)
    })

    it("renders logged in items", () => {
      // @ts-expect-error STRICT_NULL_CHECK
      const wrapper = getWrapper({ user: true })
      expect(wrapper.html()).not.toContain("Log in")
      expect(wrapper.html()).not.toContain("Sign up")
      expect(wrapper.find(BellIcon).length).toEqual(1)
      expect(wrapper.find(SoloIcon).length).toEqual(2)
    })

    describe("lab features", () => {
      it("shows inquiries icon if lab feature enabled", () => {
        const wrapper = getWrapper({
          // @ts-expect-error STRICT_NULL_CHECK
          user: { type: "NotAdmin", lab_features: ["User Conversations View"] },
        })
        expect(wrapper.find(EnvelopeIcon).length).toEqual(1)
      })
    })

    it("includes the sub-menus when rendering", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("View all artists")
      expect(wrapper.html()).toContain("View all artworks")
    })
  })

  describe("mediator actions", () => {
    it("calls login auth action on login button click", () => {
      const wrapper = getWrapper()
      wrapper.find("Button").at(0).simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        intent: "login",
        mode: "login",
      })
    })

    it("calls signup auth action on signup button click", () => {
      const wrapper = getWrapper()
      wrapper.find("Button").at(1).simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        intent: "signup",
        mode: "signup",
      })
    })
  })

  describe("mobile", () => {
    it("toggles menu", () => {
      const wrapper = getWrapper()

      expect(wrapper.find("MobileToggleIcon").length).toEqual(1)

      const toggle = () =>
        wrapper
          .find(NavBarTier)
          .at(0)
          .find("NavItem")
          .find("a")
          .last()
          .simulate("click")

      toggle()
      expect(wrapper.find("MobileNavMenu").length).toEqual(1)
      toggle()
      expect(wrapper.find("MobileNavMenu").length).toEqual(0)
    })

    it("shows InboxNotificationCount when there are conversations", () => {
      const wrapper = getWrapper({
        // @ts-expect-error STRICT_NULL_CHECK
        user: { type: "NotAdmin", lab_features: ["User Conversations View"] },
      })
      expect(wrapper.find(InboxNotificationCount).length).toBe(1)
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
