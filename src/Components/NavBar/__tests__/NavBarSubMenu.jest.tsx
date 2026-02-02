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

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => false),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(() => ({
    relayEnvironment: null,
  })),
}))

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useFragment: jest.fn(() => null),
}))

jest.mock("System/Relay/SystemQueryRenderer", () => ({
  SystemQueryRenderer: jest.fn(({ render }) =>
    render({ error: null, props: { orderedSets: [] }, retry: null }),
  ),
}))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useDidMount: jest.fn().mockReturnValue(false), // SSR-render by default
}))

jest.mock("Components/NavBar/Menus/NavBarMenuItemFeaturedLink", () => ({
  NavBarMenuItemFeaturedLinkWithColumn: jest.fn(() => null),
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

  it("renders featured link component when visual component is specified in menu data", () => {
    // Mock useDidMount to return true (component is mounted)
    const { useDidMount } = require("@artsy/palette")
    ;(useDidMount as jest.Mock).mockReturnValue(true)

    // Mock feature flag to be enabled
    const { useFlag } = require("@unleash/proxy-client-react")
    ;(useFlag as jest.Mock).mockReturnValue(true)

    // Mock NavBarMenuItemFeaturedLinkWithColumn to call onDataLoaded and render content
    const {
      NavBarMenuItemFeaturedLinkWithColumn,
    } = require("Components/NavBar/Menus/NavBarMenuItemFeaturedLink")
    ;(NavBarMenuItemFeaturedLinkWithColumn as jest.Mock).mockImplementation(
      ({ onDataLoaded, headerText }) => {
        // Call onDataLoaded immediately to simulate successful data load
        if (onDataLoaded) {
          onDataLoaded(true)
        }
        // Return mock content
        return (
          <div>
            <div>{headerText}</div>
            <div>Art Market</div>
            <div>Test Featured Link Title</div>
          </div>
        )
      },
    )

    // ARTWORKS_SUBMENU_DATA includes a featured link visual component
    const { container } = getWrapper()

    // Check that featured link header text is rendered
    expect(container.textContent).toContain("Get Inspired")

    // Check that featured link subtitle is rendered
    expect(container.textContent).toContain("Art Market")

    // Check that featured link title is rendered
    expect(container.textContent).toContain("Test Featured Link Title")
  })

  it("does not render featured link component when no visual component is specified", () => {
    const menuWithoutFeaturedLink = {
      title: "Test Menu",
      links: [
        {
          text: "Category",
          menu: {
            title: "Category",
            links: [
              { text: "Link 1", href: "/link-1" },
              { text: "Link 2", href: "/link-2" },
            ],
          },
        },
        { text: "View All", href: "/all" },
      ],
    }

    const { container } = render(
      <NavBarSubMenu
        menu={menuWithoutFeaturedLink}
        contextModule={
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
        }
        parentNavigationItem="Test"
        onClick={jest.fn()}
      />,
    )

    // No featured link header should be present
    expect(container.textContent).not.toContain("Get Inspired")
    expect(container.textContent).not.toContain("What's Next")
    expect(container.textContent).not.toContain("Artists to Discover")
  })

  it("does not render featured link component when feature flag is disabled", () => {
    // Mock feature flag to be disabled
    const { useFlag } = require("@unleash/proxy-client-react")
    ;(useFlag as jest.Mock).mockReturnValueOnce(false)

    // ARTWORKS_SUBMENU_DATA includes a featured link visual component
    const { container } = getWrapper()

    // Featured link should not be rendered when flag is disabled
    expect(container.textContent).not.toContain("Get Inspired")
  })
})
