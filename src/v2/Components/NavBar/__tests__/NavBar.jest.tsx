import { BellIcon, EnvelopeIcon, SoloIcon } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import { NavBar } from "../NavBar"
import { InboxNotificationCount } from "../Menus/MobileNavMenu/InboxNotificationCount"

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
  const mediator = {
    trigger: jest.fn(),
  }

  const trackEvent = jest.fn()

  const getWrapper = ({ user = null } = {}) => {
    return mount(
      <SystemContextProvider user={user} mediator={mediator}>
        <NavBar />
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {})
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
    const defaultLinks = [
      [undefined, "Artists"],
      [undefined, "Artworks"],
      ["/auctions", "Auctions"],
      ["/articles", "Editorial"],
    ]

    it("renders correct lg, xl nav items", () => {
      const wrapper = getWrapper()

      // Should always be first
      expect(wrapper.find("a").first().text()).toEqual("Skip to Main Content")

      expect(wrapper.find("NavBarPrimaryLogo").find("a").prop("href")).toEqual(
        "/"
      )

      const links = wrapper.find("NavItem")

      defaultLinks.forEach(([href, linkLabel], index) => {
        const navLink = links.at(index)
        expect(href).toEqual(navLink.prop("href"))
        expect(linkLabel).toEqual(navLink.text())
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
      const wrapper = getWrapper({ user: true })
      expect(wrapper.html()).not.toContain("Log in")
      expect(wrapper.html()).not.toContain("Sign up")
      expect(wrapper.find(BellIcon).length).toEqual(1)
      expect(wrapper.find(SoloIcon).length).toEqual(1)
    })

    describe("lab features", () => {
      it("hides inquiries icon if lab feature not enabled", () => {
        const wrapper = getWrapper({
          user: { type: "NotAdmin", lab_features: [] },
        })
        expect(wrapper.find(EnvelopeIcon).length).toEqual(0)
      })

      it("shows inquiries icon if lab feature enabled", () => {
        const wrapper = getWrapper({
          user: { type: "NotAdmin", lab_features: ["User Conversations View"] },
        })
        expect(wrapper.find(EnvelopeIcon).length).toEqual(1)
      })
    })
  })

  describe("mediator actions", () => {
    afterEach(() => {
      mediator.trigger.mockReset()
    })

    it("calls login auth action on login button click", () => {
      const wrapper = getWrapper()
      wrapper.find("Button").first().simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        intent: "login",
        mode: "login",
      })
    })

    it("calls signup auth action on signup button click", () => {
      const wrapper = getWrapper()
      wrapper.find("Button").last().simulate("click")
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
          .find("NavSection")
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
        user: { type: "NotAdmin", lab_features: ["User Conversations View"] },
      })
      expect(wrapper.find(InboxNotificationCount).length).toBe(1)
    })
  })
})
