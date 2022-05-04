import { ContextModule } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { ARTWORKS_SUBMENU_DATA } from "v2/Components/NavBar/menuData"
import { mount } from "enzyme"
import { NavBarSubMenu } from "../Menus/NavBarSubMenu"

jest.mock("v2/System/Analytics/useTracking")

describe("NavBarSubMenu", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    return mount(
      <NavBarSubMenu
        menu={ARTWORKS_SUBMENU_DATA.menu}
        contextModule={ContextModule.HeaderArtworksDropdown}
        onClick={jest.fn()}
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
    const linkMenuItems = wrapper.find("a")

    // expect(linkMenuItems.length).toBe(5)
    expect(linkMenuItems.at(0).text()).toContain("Trove: Editor's Picks")
    expect(linkMenuItems.at(0).prop("href")).toEqual("/gene/trove")

    expect(linkMenuItems.at(1).text()).toContain("Iconic Prints")
    expect(linkMenuItems.at(1).prop("href")).toEqual("/gene/iconic-prints")

    expect(linkMenuItems.at(2).text()).toContain("Finds Under $2500")
    expect(linkMenuItems.at(2).prop("href")).toEqual("/gene/finds-under-2500")

    expect(linkMenuItems.at(3).text()).toContain("The Collectibles Shop")
    expect(linkMenuItems.at(3).prop("href")).toEqual(
      "/gene/the-collectibles-shop"
    )

    expect(linkMenuItems.at(4).text()).toContain("View All Artworks")
    expect(linkMenuItems.at(4).prop("href")).toEqual("/collect")
  })

  it("doesn't render artists letter nav inside artworks dropdown", () => {
    const wrapper = getWrapper()

    expect(wrapper.text()).not.toContain("Browse by name")
  })

  it("renders artists letter nav inside artists dropdown", () => {
    const wrapper = getWrapper({
      contextModule: ContextModule.HeaderArtistsDropdown,
    })

    expect(wrapper.text()).toContain("Browse by name")
  })

  it("tracks analytics click events correctly", () => {
    const wrapper = getWrapper()

    wrapper.find("a").first().simulate("click")

    expect(trackEvent).toBeCalled()
  })

  it("calls onClick prop", () => {
    const spy = jest.fn()
    const wrapper = getWrapper({ onClick: spy })

    wrapper.find("a").first().simulate("click")

    expect(spy).toHaveBeenCalled()
  })
})
