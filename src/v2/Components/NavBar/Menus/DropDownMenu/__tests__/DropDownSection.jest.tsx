import React from "react"
import { DropDownSection } from "../DropDownSection"
import { MenuItem } from "v2/Components/Menu"
import { ARTWORKS_SUBMENU_DATA } from "v2/Components/NavBar/menuData"
import { mount } from "enzyme"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("DropDownMenu", () => {
  const trackEvent = jest.fn()
  const [mediumLinks] = ARTWORKS_SUBMENU_DATA.menu.links.filter(item => {
    return item.text === "Medium"
  })

  const getWrapper = links => {
    return mount(<DropDownSection section={links} />)
  }

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
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
