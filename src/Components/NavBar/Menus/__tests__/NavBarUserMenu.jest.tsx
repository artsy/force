import { NavBarUserMenu } from "Components/NavBar/Menus/NavBarUserMenu"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { logout } from "Utils/auth"
import { mount } from "enzyme"

jest.mock("react-tracking", () => ({
  useTracking: () => ({
    trackEvent: jest.fn(),
  }),
}))

jest.mock("Utils/auth", () => ({ logout: jest.fn() }))

jest.mock("Components/NavBar/Menus/NavBarUserMenuAvatar", () => ({
  NavBarUserMenuAvatar: () => <div />,
}))

describe("NavBarUserMenu", () => {
  const mockLogout = logout as jest.Mock

  afterEach(() => {
    mockLogout.mockReset()
  })

  const getWrapper = (props = {}) => {
    return mount(
      <SystemContextProvider user={{}} {...props}>
        <NavBarUserMenu />
      </SystemContextProvider>
    )
  }

  it("renders correct menu items", () => {
    const wrapper = getWrapper()
    const links = wrapper.find("a")

    expect(links.map(a => [a.prop("href"), a.text().trim()])).toEqual([
      ["/collector-profile/my-collection", "View profile"],
      ["/collector-profile/my-collection", "Artworks"],
      ["/collector-profile/artists", "Artists"],
      ["/collector-profile/insights", "Insights"],
      ["/favorites/saves", "Saves"],
      ["/favorites/follows", "Follows"],
      ["/favorites/alerts", "Alerts"],
      ["/settings/edit-profile", "Settings"],
      ["/settings/purchases", "Order History"],
    ])

    expect(wrapper.find("button").last().text()).toContain("Log out")
  })

  it("calls logout auth action on logout menu click", () => {
    mockLogout.mockImplementationOnce(() =>
      jest.fn().mockResolvedValue(Promise.resolve())
    )

    const wrapper = getWrapper()

    wrapper.find("button").last().simulate("click")

    expect(mockLogout).toHaveBeenCalledTimes(1)
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
