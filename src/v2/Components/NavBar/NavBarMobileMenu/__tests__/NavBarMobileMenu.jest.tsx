import { SystemContextProvider } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { mount } from "enzyme"
import { NavBarMobileMenu } from "../NavBarMobileMenu"
import { mediator } from "lib/mediator"
import { NavBarMobileMenuTransition } from "../NavBarMobileMenuTransition"
import { NavBarMobileSubMenuBack } from "../NavBarMobileSubMenu"

jest.mock("v2/System/Analytics/useTracking")
jest.mock("lib/isServer", () => ({
  isServer: true,
}))

describe("NavBarMobileMenu", () => {
  jest.spyOn(mediator, "trigger")
  const trackEvent = jest.fn()
  const noop = () => {}
  const getWrapper = props => {
    return mount(
      <SystemContextProvider user={props.user}>
        <NavBarMobileMenu isOpen onClose={noop} />
      </SystemContextProvider>
    )
  }

  const getMobileMenuLinkContainer = (
    userType: string | null = null,
    lab_features: string[] = []
  ) =>
    getWrapper({ user: userType ? { userType, lab_features } : null })
      .find(NavBarMobileMenuTransition)
      .findWhere(element => element.props().isOpen)

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("calls logout auth action on logout menu click", () => {
    const wrapper = getWrapper({ user: { type: "NotAdmin" } })

    const links = wrapper.find("a")
    const length = links.length

    wrapper
      .find("a")
      .at(length - 2)
      .simulate("click")

    expect(mediator.trigger).toBeCalledWith("auth:logout")
  })

  describe("nav structure", () => {
    it("renders the correct items when logged out", () => {
      const defaultMobileMenuLinks = [
        ["/collect", "Buy"],
        ["/auctions", "Auctions"],
        ["/viewing-rooms", "Viewing Rooms"],
        ["/galleries", "Galleries"],
        ["/fairs", "Fairs"],
        ["/shows", "Shows"],
        ["/institutions", "Museums"],
        ["https://nft.artsy.net", "NFTs"],
        ["/consign", "Sell"],
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
      linkContainer.find("a").first().simulate("click")

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
