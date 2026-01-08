import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarSubMenu } from "Components/NavBar/Menus/NavBarSubMenu"
import { ARTWORKS_SUBMENU_DATA } from "Components/NavBar/menuData"
import { render } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: undefined,
    contextPageOwnerSlug: undefined,
    contextPageOwnerType: "home",
  })),
}))

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useLazyLoadQuery: jest.fn(() => ({ articles: null })),
}))

describe("NavBarSubMenu", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    return render(
      <NavBarSubMenu
        menu={ARTWORKS_SUBMENU_DATA.menu}
        contextModule={
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
        }
        parentNavigationItem="Artworks"
        onClick={jest.fn()}
        {...passedProps}
      />,
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

    expect(links[0].textContent).toContain("Art for Small Spaces")
    expect(links[0].getAttribute("href")).toEqual(
      "/collection/art-for-small-spaces",
    )
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

    expect(trackEvent).toBeCalledWith({
      action: "click",
      flow: "Header",
      context_module:
        DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown,
      context_page_owner_type: "home",
      parent_navigation_item: "Artworks",
      dropdown_group: "The Home Edit",
      subject: "Art for Small Spaces",
      destination_path: "/collection/art-for-small-spaces",
    })
  })

  it("calls onClick prop", () => {
    const spy = jest.fn()
    const { container } = getWrapper({ onClick: spy })

    const firstLink = container.querySelector("a")
    fireEvent.click(firstLink!)

    expect(spy).toHaveBeenCalled()
  })
})
