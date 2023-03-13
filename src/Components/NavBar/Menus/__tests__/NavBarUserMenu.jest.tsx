import { NavBarUserMenu } from "Components/NavBar/Menus/NavBarUserMenu"
import { SystemContextProvider } from "System/SystemContext"
import { logout } from "Utils/auth"
import { mount } from "enzyme"

jest.mock("react-tracking", () => ({
  useTracking: () => ({
    trackEvent: jest.fn(),
  }),
}))

jest.mock("Utils/auth", () => ({ logout: jest.fn() }))

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

    expect(links.map(a => [a.prop("href"), a.text()])).toEqual([
      // Label also includes SVG image title
      ["/collector-profile/my-collection", "Artwork My Collection"],
      ["/collector-profile/insights", "View dashboard Insights"],
      ["/collector-profile/saves", "Save Saves"],
      ["/collector-profile/follows", "Group Follows"],
      ["/settings/edit-profile", "Settings Settings"],
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
