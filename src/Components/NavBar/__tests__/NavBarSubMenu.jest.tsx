import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { ARTWORKS_SUBMENU_DATA } from "Components/NavBar/menuData"
import { mount } from "enzyme"
import { NavBarSubMenu } from "Components/NavBar/Menus/NavBarSubMenu"

jest.mock("react-tracking")

describe("NavBarSubMenu", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    return mount(
      <NavBarSubMenu
        menu={ARTWORKS_SUBMENU_DATA.menu}
        contextModule={
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
        }
        onClick={jest.fn()}
        {...passedProps}
      />
    )
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  it("renders simple links", () => {
    const wrapper = getWrapper()
    const links = wrapper.find("a")

    expect(links.at(0).text()).toContain("Art for Small Spaces")
    expect(links.at(0).prop("href")).toEqual("/collection/art-for-small-spaces")
  })

  it("doesn't render artists letter nav inside artworks dropdown", () => {
    const wrapper = getWrapper()

    expect(wrapper.text()).not.toContain("Browse by name")
  })

  it("renders artists letter nav inside artists dropdown", () => {
    const wrapper = getWrapper({
      contextModule:
        DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown,
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
