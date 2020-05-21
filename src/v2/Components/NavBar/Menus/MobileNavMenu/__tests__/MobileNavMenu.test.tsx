import { SystemContextProvider } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { menuData, SimpleLinkData } from "v2/Components/NavBar/menuData"
import { mount } from "enzyme"
import React from "react"
import {
  AnimatingMenuWrapper,
  BackLink,
  MobileNavMenu,
  MobileSubmenuLink,
} from "../../MobileNavMenu/MobileNavMenu"
import { MobileLink } from "../MobileLink"

jest.mock("Artsy/Analytics/useTracking")

describe("MobileNavMenu", () => {
  const mediator = {
    trigger: jest.fn(),
  }
  const trackEvent = jest.fn()
  const getWrapper = props => {
    return mount(
      <SystemContextProvider mediator={mediator} user={props.user}>
        <MobileNavMenu isOpen menuData={menuData} />
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    ; (useTracking as jest.Mock).mockImplementation(() => {
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
      .simulate("click")
    expect(mediator.trigger).toBeCalledWith("auth:logout")
  })

  describe("nav structure", () => {
    it("renders the correct items when logged out", () => {
      const wrapper = getWrapper({ user: null })
      const animatingMenuWrapper = wrapper.find(AnimatingMenuWrapper)

      const openWrapper = animatingMenuWrapper.filterWhere(
        element => element.props().isOpen
      )
      const linkContainer = openWrapper.find("ul").at(0)
      const mobileSubmenuLinks = linkContainer.children(MobileSubmenuLink)

      expect(mobileSubmenuLinks.length).toBe(2)

      let linkText = mobileSubmenuLinks.first().text()
      expect(linkText).toContain("Artworks")
      expect(linkText).not.toContain("New This Week")

      linkText = mobileSubmenuLinks.last().text()
      expect(linkText).toContain("Artists")
      expect(linkText).not.toContain("Career Stages")

      const simpleLinks = linkContainer.children(MobileLink)

      expect(simpleLinks.length).toBe(8)
        ; (menuData.links as SimpleLinkData[])
          .slice(2)
          .map(({ href, text }, index) => {
            const simpleLink = simpleLinks.at(index)
            expect(href).toEqual(simpleLink.prop("href"))
            expect(text).toEqual(simpleLink.text())
          })

      linkText = linkContainer.text()
      expect(linkText).toContain("Sign Up")
      expect(linkText).not.toContain("Works for you")
    })
  })

  describe("lab features", () => {
    it("hides inbox menu option if lab feature not enabled", () => {
      const wrapper = getWrapper({
        user: { type: "NotAdmin", lab_features: [] },
      })
      expect(wrapper.html()).not.toContain("Inbox")
    })

    it("shows inbox menu option if lab feature enabled", () => {
      const wrapper = getWrapper({
        user: { type: "NotAdmin", lab_features: ["User Conversations View"] },
      })
      expect(wrapper.html()).toContain("Inbox")
    })
  })

  describe("Analytics tracking", () => {
    it("tracks back button click", () => {
      const wrapper = mount(
        <SystemContextProvider user={null}>
          <MobileNavMenu isOpen menuData={menuData} />
        </SystemContextProvider>
      )

      const backLink = wrapper.find(BackLink)
      backLink.first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_module: "Header",
        flow: "Header",
        subject: "Back link",
      })
    })

    it("tracks MobileSubmenuLink click", () => {
      const wrapper = mount(
        <SystemContextProvider user={null}>
          <MobileNavMenu isOpen menuData={menuData} />
        </SystemContextProvider>
      )

      const mobileSubmenuLinks = wrapper
        .find(MobileSubmenuLink)
        .first()
        .find("Flex")
      mobileSubmenuLinks.first().simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Header",
        flow: "Header",
        subject: "Artworks",
      })
    })
  })
})
