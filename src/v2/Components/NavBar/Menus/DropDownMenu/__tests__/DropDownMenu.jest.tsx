import { MenuItem } from "v2/Components/Menu"
import { ContextModule } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { ARTWORKS_SUBMENU_DATA } from "v2/Components/NavBar/menuData"
import { mount } from "enzyme"
import React from "react"
import { DropDownNavMenu } from "../DropDownMenu"
import { DropDownSection } from "../DropDownSection"

jest.mock("v2/System/Analytics/useTracking")

describe("DropDownMenu", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    return mount(
      <DropDownNavMenu
        menu={ARTWORKS_SUBMENU_DATA.menu}
        contextModule={ContextModule.HeaderArtworksDropdown}
        {...passedProps}
      />
    )
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
    const wrapper = getWrapper()
    const linkMenuItems = wrapper.find("LinkMenuItem")
    const viewAllMenuItems = wrapper.find("ViewAllMenuItem")

    expect(linkMenuItems.length).toBe(5)
    expect(linkMenuItems.at(0).text()).toContain("Trove")
    expect(linkMenuItems.at(0).prop("href")).toEqual("/gene/trove")
    expect(linkMenuItems.at(1).text()).toContain("New This Week")
    expect(linkMenuItems.at(1).prop("href")).toEqual(
      "/collection/new-this-week"
    )
    expect(linkMenuItems.at(2).text()).toContain("Trending on Artsy")
    expect(linkMenuItems.at(2).prop("href")).toEqual(
      "/collection/highlights-this-month"
    )
    expect(linkMenuItems.at(3).text()).toContain("Exclusively on Artsy")
    expect(linkMenuItems.at(3).prop("href")).toEqual(
      "/collection/exclusively-on-artsy"
    )
    expect(linkMenuItems.at(4).text()).toContain("Limited Editions")
    expect(linkMenuItems.at(4).prop("href")).toEqual(
      "/collection/limited-edition-works"
    )

    expect(viewAllMenuItems.length).toBe(1)
    expect(viewAllMenuItems.at(0).text()).toContain("View all artworks")
    expect(viewAllMenuItems.at(0).prop("href")).toEqual("/collect")
  })

  it("renders correct number of DropDownSection links", () => {
    const wrapper = getWrapper()
    const dropDownSection = wrapper.find(DropDownSection)

    expect(dropDownSection.length).toBe(5)
  })

  it("doesn't render ArtistsLetterNav inside artworks dropdown", () => {
    const wrapper = getWrapper()
    const artistsLetterNav = wrapper.find("StyledArtistsLetterNav")

    expect(artistsLetterNav.exists()).toBeFalsy()
  })

  it("renders ArtistsLetterNav inside artists dropdown", () => {
    const wrapper = getWrapper({
      contextModule: ContextModule.HeaderArtistsDropdown,
    })
    const artistsLetterNav = wrapper.find("StyledArtistsLetterNav")

    expect(artistsLetterNav.exists()).toBeTruthy()
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
