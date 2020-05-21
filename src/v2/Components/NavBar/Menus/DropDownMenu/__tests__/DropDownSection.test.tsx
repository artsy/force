import { MenuItem } from "@artsy/palette"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { menuData, MenuLinkData } from "v2/Components/NavBar/menuData"
import { mount } from "enzyme"
import React from "react"
import { DropDownSection } from "../DropDownSection"

jest.mock("Artsy/Analytics/useTracking")

describe("DropDownMenu", () => {
  const trackEvent = jest.fn()
  const mediumLinks = (menuData.links[0] as MenuLinkData).menu.links.filter(
    item => {
      return item.text === "Medium"
    }
  )[0] as MenuLinkData

  const getWrapper = links => {
    return mount(<DropDownSection section={links} />)
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
    const wrapper = getWrapper(mediumLinks)
    const menuItems = wrapper.find(MenuItem)

    expect(menuItems.length).toBe(8)
    expect(menuItems.first().text()).toContain("Painting")
    expect(menuItems.first().prop("href")).toContain("/collection/painting")
    expect(menuItems.last().text()).toContain("Design")
    expect(menuItems.last().prop("href")).toContain("/collection/design")
  })

  it("does not render DropDownSection when section is undefined", () => {
    const wrapper = getWrapper(undefined)
    const menuItems = wrapper.find(MenuItem)

    expect(menuItems.length).toBe(0)
  })
})
