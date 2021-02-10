import { SystemContextProvider } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { mount } from "enzyme"
import React from "react"
import {
  AnimatingMenuWrapper,
  BackLink,
  MobileNavMenu,
  MobileSubmenuLink,
} from "../../MobileNavMenu/MobileNavMenu"
import { mediator } from "lib/mediator"

jest.mock("v2/Artsy/Analytics/useTracking")
jest.mock("lib/isServer", () => ({
  isServer: true,
}))

describe("MobileNavMenu", () => {
  jest.spyOn(mediator, "trigger")
  const trackEvent = jest.fn()
  const noop = () => {}
  const getWrapper = props => {
    return mount(
      <SystemContextProvider user={props.user}>
        <MobileNavMenu isOpen onClose={noop} />
      </SystemContextProvider>
    )
  }

  const getMobileMenuLinkContainer = (userType = null, lab_features = []) =>
    getWrapper({ user: userType ? { userType, lab_features } : null })
      .find(AnimatingMenuWrapper)
      .filterWhere(element => element.props().isOpen)
      .find("ul")
      .at(0)

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
    wrapper
      .find("MobileLink")
      .last()
      .props()
      .onClick({
        preventDefault: () => {},
      } as any)
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
        ["/consign", "Sell"],
        ["/articles", "Editorial"],
        ["/sign_up?intent=signup&contextModule=header", "Sign up"],
        ["/log_in?intent=login&contextModule=header", "Log in"],
      ].map(link => link.join(""))

      const linkContainer = getMobileMenuLinkContainer()
      const mobileMenuLinks = linkContainer.find("MobileLink")

      // Exclude submenu links
      const renderedMobileMenuLinks = mobileMenuLinks
        .map(node => node.props().href + node.text())
        .filter(link => defaultMobileMenuLinks.includes(link))

      // Ensure that the mobile menu links at least include the links we expect
      // and that they're in the right relative order
      expect(renderedMobileMenuLinks).toEqual(defaultMobileMenuLinks)

      const mobileSubmenuLinks = linkContainer.children(MobileSubmenuLink)
      expect(mobileSubmenuLinks.length).toBe(2)

      let linkText = mobileSubmenuLinks.first().text()
      expect(linkText).toContain("Artists")

      linkText = mobileSubmenuLinks.last().text()
      expect(linkText).toContain("Artworks")

      // TODO: Not sure these specs make any kind of sense:
      // We don't use the data for rendering these links (why?)
      // const simpleLinks = linkContainer.children(MobileLink)
      // expect(simpleLinks.length).toBe(8)
      // ;(MENU_DATA.links as SimpleLinkData[])
      //   .slice(2)
      //   .map(({ href, text }, index) => {
      //     const simpleLink = simpleLinks.at(index)
      //     expect(href).toEqual(simpleLink.prop("href"))
      //     expect(text).toEqual(simpleLink.text())
      //   })

      linkText = linkContainer.text()
      expect(linkText).not.toContain("Works for you")
    })

    it("renders the account subnav when logged in", () => {
      const linkContainer = getMobileMenuLinkContainer("notAdmin")
      const mobileSubmenuLinks = linkContainer.children()
      let linkText = mobileSubmenuLinks.last().text()
      expect(linkText).toContain("Account")

      expect(linkText).toContain("Works for you")
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

      const backLink = linkContainer.find(BackLink)
      backLink.first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_module: "Header",
        flow: "Header",
        subject: "Back link",
      })
    })

    it("tracks MobileSubmenuLink click", () => {
      const linkContainer = getMobileMenuLinkContainer("notAdmin")
      linkContainer.children().first().find("a").simulate("click")
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
