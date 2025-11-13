import { NavBarUserMenu } from "Components/NavBar/Menus/NavBarUserMenu"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { logout } from "Utils/auth"
import { fireEvent, render } from "@testing-library/react"

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
    return render(
      <SystemContextProvider user={{}} {...props}>
        <NavBarUserMenu />
      </SystemContextProvider>
    )
  }

  it("renders correct menu items", () => {
    const { container } = getWrapper()
    const links = container.querySelectorAll("a")
    const buttons = container.querySelectorAll("button")

    const linkData = Array.from(links).map(a => [
      a.getAttribute("href"),
      a.textContent?.trim(),
    ])
    expect(linkData).toEqual([
      ["/collector-profile/my-collection", "View profile"],
      ["/collector-profile/my-collection", "Artworks"],
      ["/collector-profile/artists", "Artists"],
      ["/collector-profile/insights", "Insights"],
      ["/favorites/saves", "Saves"],
      ["/favorites/follows", "Follows"],
      ["/favorites/alerts", "Alerts"],
      ["/settings/edit-profile", "Settings"],
      ["/settings/orders", "Order History"],
    ])

    const lastButton = buttons[buttons.length - 1]
    expect(lastButton.textContent).toContain("Log out")
  })

  it("calls logout auth action on logout menu click", () => {
    mockLogout.mockImplementationOnce(() =>
      jest.fn().mockResolvedValue(Promise.resolve())
    )

    const { container } = getWrapper()
    const buttons = container.querySelectorAll("button")
    const lastButton = buttons[buttons.length - 1]

    fireEvent.click(lastButton)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  describe("admin features", () => {
    it("hides admin button if not admin", () => {
      const { container } = getWrapper({ user: { type: "NotAdmin" } })
      expect(container.innerHTML).not.toContain("Admin")
    })

    it("shows admin button if admin", () => {
      const { container } = getWrapper({ user: { type: "Admin" } })
      expect(container.innerHTML).toContain("Admin")
    })

    it("shows order history button if admin", () => {
      const { container } = getWrapper({ user: { type: "Admin" } })
      expect(container.innerHTML).toContain("Order History")
    })

    it("shows CMS button if admin", () => {
      const { container } = getWrapper({ user: { type: "Admin" } })
      expect(container.innerHTML).toContain("CMS")
    })

    it("does not show CMS button if no partner access and not admin", () => {
      const { container } = getWrapper({ user: { has_partner_access: false } })
      expect(container.innerHTML).not.toContain("CMS")
    })

    it("shows CMS button if has partner access and not admin", () => {
      const { container } = getWrapper({ user: { has_partner_access: true } })
      expect(container.innerHTML).toContain("CMS")
    })
  })
})
