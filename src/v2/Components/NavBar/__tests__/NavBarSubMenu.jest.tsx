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
    expect(linkMenuItems.at(0).text()).toContain("Trove")
    expect(linkMenuItems.at(0).prop("href")).toEqual("/gene/trove")

    expect(linkMenuItems.at(1).text()).toContain(
      "Highlights at Auction This Week"
    )
    expect(linkMenuItems.at(1).prop("href")).toEqual(
      "/collection/auction-highlights"
    )

    expect(linkMenuItems.at(2).text()).toContain(
      "Highlights at Fairs This Week"
    )
    expect(linkMenuItems.at(2).prop("href")).toEqual(
      "/collection/art-fair-highlights"
    )

    expect(linkMenuItems.at(3).text()).toContain("New in Figurative Painting")
    expect(linkMenuItems.at(3).prop("href")).toEqual(
      "/collection/emerging-figurative-painting"
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
