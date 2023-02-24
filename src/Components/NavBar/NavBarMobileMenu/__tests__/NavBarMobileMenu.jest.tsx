import { SystemContextProvider } from "System/SystemContext"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import { NavBarMobileMenu } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenu"
import { NavBarMobileMenuTransition } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuTransition"
import { NavBarMobileSubMenuBack } from "Components/NavBar/NavBarMobileMenu/NavBarMobileSubMenu"
import { FeatureFlags } from "System/useFeatureFlag"
import { logout } from "Utils/auth"

jest.mock("react-tracking")
jest.mock("Server/isServer", () => ({
  isServer: true,
}))

jest.mock("Utils/auth", () => ({ logout: jest.fn() }))

describe("NavBarMobileMenu", () => {
  const mockLogout = logout as jest.Mock

  const trackEvent = jest.fn()
  const noop = () => {}
  const getWrapper = props => {
    return mount(
      <SystemContextProvider
        user={props.user}
        featureFlags={props.featureFlags}
      >
        <NavBarMobileMenu isOpen onClose={noop} />
      </SystemContextProvider>
    )
  }

  const getMobileMenuLinkContainer = (
    userType: string | null = null,
    lab_features: string[] = [],
    featureFlags?: FeatureFlags
  ) =>
    getWrapper({
      user: userType ? { userType, lab_features } : null,
      featureFlags,
    })
      .find(NavBarMobileMenuTransition)
      .findWhere(element => element.props().isOpen)

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  it("calls logout auth action on logout menu click", () => {
    mockLogout.mockImplementationOnce(() =>
      jest.fn().mockResolvedValue(Promise.resolve())
    )

    const wrapper = getWrapper({ user: { type: "NotAdmin" } })

    const links = wrapper.find("a")
    const length = links.length

    wrapper
      .find("a")
      .at(length - 3)
      .simulate("click")

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  describe("nav structure", () => {
    it("renders the correct items when logged out", () => {
      const defaultMobileMenuLinks = [
        ["/collect", "Buy"],
        ["/auctions", "Auctions"],
        ["/viewing-rooms", "Viewing Rooms"],
        ["/galleries", "Galleries"],
        ["/art-fairs", "Fairs"],
        ["/shows", "Shows"],
        ["/institutions", "Museums"],
        ["/sell", "Sell"],
        ["/price-database", "Price Database"],
        ["/articles", "Editorial"],
        ["/signup?intent=signup&contextModule=header", "Sign Up"],
        ["/login?intent=login&contextModule=header", "Log In"],
      ].map(link => link.join(""))

      const linkContainer = getWrapper({})
      const menuLinks = linkContainer.find("a")

      // Exclude submenu links
      const renderedMobileMenuLinks = menuLinks
        .map(node => node.props().href + node.text())
        .filter(link => defaultMobileMenuLinks.includes(link))

      // Ensure that the mobile menu links at least include the links we expect
      // and that they're in the right relative order
      expect(renderedMobileMenuLinks).toEqual(defaultMobileMenuLinks)

      const subMenuButtons = linkContainer.find("button")
      const subMenuButtonLabels = subMenuButtons
        .map(node => node.text())
        .join("")

      expect(subMenuButtonLabels).toContain("Artists")
      expect(subMenuButtonLabels).toContain("Artworks")

      expect(linkContainer.text()).not.toContain("Works for you")
    })

    it("renders the account subnav when logged in", () => {
      const linkContainer = getMobileMenuLinkContainer("notAdmin")
      const mobileSubmenuLinks = linkContainer.children()
      let linkText = mobileSubmenuLinks.last().text()

      expect(linkText).toContain("Get the app")
    })
  })

  describe("lab features", () => {
    it("shows inbox menu option if lab feature enabled", () => {
      const linkContainer = getMobileMenuLinkContainer("notAdmin", [
        "User Conversations View",
      ])

      expect(linkContainer.html()).toContain("Inbox")
    })

    describe("Activity menu item", () => {
      it("should NOT render activity menu option when logged out", () => {
        const wrapper = getMobileMenuLinkContainer(null)
        const menuLinks = wrapper.find("a").map(node => node.text())
        const hasActivityMenuItem = menuLinks.includes("Activity")

        expect(hasActivityMenuItem).toBe(false)
      })

      it("should render activity menu option", () => {
        const wrapper = getMobileMenuLinkContainer("NotAdmin")
        const menuLinks = wrapper.find("a").map(node => node.text())
        const hasActivityMenuItem = menuLinks.includes("Activity")

        expect(hasActivityMenuItem).toBe(true)
      })
    })
  })

  describe("Analytics tracking", () => {
    it("tracks back button click", () => {
      const linkContainer = getMobileMenuLinkContainer("notAdmin")
      const backLink = linkContainer.find(NavBarMobileSubMenuBack)

      backLink.first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_module: "Header",
        flow: "Header",
        subject: "Back link",
      })
    })

    it("tracks link clicks", () => {
      const linkContainer = getMobileMenuLinkContainer("notAdmin")

      // at(0) - Activity link
      // at(1) - Inbox link
      // at(2) - Buy link
      linkContainer.find("a").at(2).simulate("click")

      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Header",
        flow: "Header",
        subject: "Buy",
        destination_path: "/collect",
      })
    })
  })
})
