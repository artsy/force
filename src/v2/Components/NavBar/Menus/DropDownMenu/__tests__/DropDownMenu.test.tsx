import { MenuItem } from "@artsy/palette"
import { ContextModule } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { menuData, MenuLinkData } from "v2/Components/NavBar/menuData"
import { mount } from "enzyme"
import React from "react"
import { DropDownNavMenu, MenuItemContainer } from "../DropDownMenu"
import { DropDownSection } from "../DropDownSection"

jest.mock("Artsy/Analytics/useTracking")

describe("DropDownMenu", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    return mount(
      <DropDownNavMenu
        menu={(menuData.links[0] as MenuLinkData).menu}
        contextModule={ContextModule.HeaderArtworksDropdown}
        {...passedProps}
      />
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

  it("renders simple links", () => {
    const wrapper = getWrapper()
    const menuItemContainers = wrapper.find(MenuItemContainer)

    expect(menuItemContainers.length).toBe(5)
    expect(menuItemContainers.at(0).text()).toContain("New this Week")
    expect(menuItemContainers.at(1).text()).toContain("Trending this Month")
    expect(menuItemContainers.at(2).text()).toContain("Exclusively on Artsy")
    expect(menuItemContainers.at(3).text()).toContain("Closing Soon")
  })

  it("renders correct number of DropDownSection links", () => {
    const wrapper = getWrapper()
    const dropDownSection = wrapper.find(DropDownSection)

    expect(dropDownSection.length).toBe(5)
  })

  it("tracks analytics click events correctly", () => {
    const wrapper = getWrapper()
    const menuItem = wrapper.find(MenuItem).first()
    menuItem.simulate("click")

    expect(trackEvent).toBeCalled()
  })

  it("calls onClick prop", () => {
    const spy = jest.fn()
    const wrapper = getWrapper({ onClick: spy })
    const menuItem = wrapper.find(MenuItem).first()
    menuItem.simulate("click")

    expect(spy).toHaveBeenCalled()
  })
})
