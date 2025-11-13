import { NavBarSubMenu } from "Components/NavBar/Menus/NavBarSubMenu"
import { ARTWORKS_SUBMENU_DATA } from "Components/NavBar/menuData"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { fireEvent, render } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("NavBarSubMenu", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    return render(
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
    const { container } = getWrapper()
    const links = container.querySelectorAll("a")

    expect(links[0].textContent).toContain("Small (under 16in)")
    expect(links[0].getAttribute("href")).toEqual("/collect?sizes%5B0%5D=SMALL")
  })

  it("doesn't render artists letter nav inside artworks dropdown", () => {
    const { container } = getWrapper()

    expect(container.textContent).not.toContain("Browse by name")
  })

  it("renders artists letter nav inside artists dropdown", () => {
    const { container } = getWrapper({
      contextModule:
        DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown,
    })

    expect(container.textContent).toContain("Browse by name")
  })

  it("tracks analytics click events correctly", () => {
    const { container } = getWrapper()

    const firstLink = container.querySelector("a")
    fireEvent.click(firstLink!)

    expect(trackEvent).toBeCalled()
  })

  it("calls onClick prop", () => {
    const spy = jest.fn()
    const { container } = getWrapper({ onClick: spy })

    const firstLink = container.querySelector("a")
    fireEvent.click(firstLink!)

    expect(spy).toHaveBeenCalled()
  })
})
