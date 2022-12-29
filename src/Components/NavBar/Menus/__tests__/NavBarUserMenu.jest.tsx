import { mount } from "enzyme"
import { mediator } from "Server/mediator"
import { SystemContextProvider, useSystemContext } from "System"
import { NavBarUserMenu } from "Components/NavBar/Menus/NavBarUserMenu"

jest.mock("react-tracking", () => ({
  useTracking: () => ({
    trackEvent: jest.fn(),
  }),
}))
jest.mock("System/useSystemContext")

describe("NavBarUserMenu", () => {
  jest.spyOn(mediator, "trigger")

  const getWrapper = (props = {}) => {
    return mount(
      <SystemContextProvider user={{}} {...props}>
        <NavBarUserMenu />
      </SystemContextProvider>
    )
  }

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "cx-collector-profile": { flagEnabled: false },
      },
    }))
  })

  it("renders correct menu items", () => {
    const wrapper = getWrapper()
    const links = wrapper.find("a")

    expect(links.map(a => [a.prop("href"), a.text()])).toEqual([
      // Label also includes SVG image title
      ["/settings/purchases", "Pending Order History"],
      ["/settings/alerts", "Watch lot Alerts"],
      ["/settings/saves", "Save Saves & Follows"],
      ["/settings/edit-profile", "User Collector Profile"],
      ["/settings/my-collection", "Artwork My Collection"],
      ["/settings/insights", "View dashboard Insights"],
      ["/settings/edit-settings", "Settings Settings"],
    ])

    expect(wrapper.find("button").last().text()).toContain("Log out")
  })

  it("calls logout auth action on logout menu click", () => {
    const wrapper = getWrapper()
    wrapper.find("button").last().simulate("click")
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

describe("NavBarUserMenu with collector profile enabled", () => {
  jest.spyOn(mediator, "trigger")

  const getWrapper = (props = {}) => {
    return mount(
      <SystemContextProvider user={{}} {...props}>
        <NavBarUserMenu />
      </SystemContextProvider>
    )
  }

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "cx-collector-profile": { flagEnabled: true },
      },
    }))
  })

  it("renders correct menu items", () => {
    const wrapper = getWrapper()
    const links = wrapper.find("a")

    expect(links.map(a => [a.prop("href"), a.text()])).toEqual([
      // Label also includes SVG image title
      ["/collector-profile/my-collection", "Artwork My Collection"],
      ["/collector-profile/insights", "View dashboard Insights"],
      ["/collector-profile/saves", "Save Saves & Follows"],
      ["/settings/edit-settings", "Settings Settings"],
    ])

    expect(wrapper.find("button").last().text()).toContain("Log out")
  })

  it("calls logout auth action on logout menu click", () => {
    const wrapper = getWrapper()
    wrapper.find("button").last().simulate("click")
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
