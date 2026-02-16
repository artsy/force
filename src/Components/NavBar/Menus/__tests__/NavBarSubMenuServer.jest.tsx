import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarSubMenuServer } from "Components/NavBar/Menus/NavBarSubMenuServer"
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
  useFragment: jest.fn(),
}))

jest.mock("Components/NavBar/Menus/NavBarMenuItemFeaturedLinkColumn", () => ({
  NavBarMenuItemFeaturedLinkColumn: ({
    headerText,
  }: {
    headerText: string
  }) => <div data-testid="featured-link-column">{headerText}</div>,
}))

const MOCK_NAVIGATION_VERSION = {
  items: [
    {
      title: "The Home Edit",
      position: 0,
      children: [
        {
          title: "Art for Small Spaces",
          href: "/collection/art-for-small-spaces",
          position: 0,
        },
      ],
    },
  ],
}

describe("NavBarSubMenuServer", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    const { useFragment } = require("react-relay")
    ;(useFragment as jest.Mock).mockReturnValue(MOCK_NAVIGATION_VERSION)

    return render(
      <NavBarSubMenuServer
        navigationVersion={{} as any}
        label="Artworks"
        menuType="artworks"
        contextModule={
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
        }
        {...passedProps}
      />,
    )
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  beforeEach(() => {
    trackEvent.mockClear()
  })

  it("renders simple links", () => {
    const { container } = getWrapper()
    const links = container.querySelectorAll("a")

    expect(links[0].textContent).toContain("Art for Small Spaces")
    expect(links[0].getAttribute("href")).toEqual(
      "/collection/art-for-small-spaces",
    )
  })

  it("renders artists letter nav inside artists dropdown", () => {
    const { container } = getWrapper({
      menuType: "artists",
      contextModule:
        DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown,
    })

    expect(container.textContent).toContain("Browse by name")
  })

  it("tracks analytics click events correctly", () => {
    const { container } = getWrapper()

    const firstLink = container.querySelector("a")
    fireEvent.click(firstLink!)

    expect(trackEvent).toHaveBeenCalledWith({
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

  it("renders featured link when featuredLinkData is provided", () => {
    const { container } = getWrapper({
      featuredLinkData: [{} as any],
    })

    expect(container.textContent).toContain("Get Inspired")
  })

  it("does not render featured link when no featuredLinkData", () => {
    const { container } = getWrapper({ featuredLinkData: null })

    expect(container.textContent).not.toContain("Get Inspired")
    expect(container.textContent).not.toContain("What's Next")
    expect(container.textContent).not.toContain("Artists to Discover")
  })

  it("renders View All Artists when menuType is artists", () => {
    const { container } = getWrapper({
      menuType: "artists",
      contextModule:
        DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown,
    })

    const viewAllLink = Array.from(container.querySelectorAll("a")).find(
      a =>
        a.getAttribute("href") === "/artists" &&
        a.textContent?.trim() === "View All Artists",
    )
    expect(viewAllLink).toBeInTheDocument()
  })

  it("renders View All Artworks when menuType is artworks", () => {
    const { container } = getWrapper()

    const viewAllLink = Array.from(container.querySelectorAll("a")).find(
      a =>
        a.getAttribute("href") === "/collect" &&
        a.textContent?.trim() === "View All Artworks",
    )
    expect(viewAllLink).toBeInTheDocument()
  })

  it("uses correct featured link header text per menuType", () => {
    const { getByTestId } = getWrapper({
      menuType: "whatsNew",
      featuredLinkData: [{} as any],
    })
    expect(getByTestId("featured-link-column")).toHaveTextContent("What’s Next")
  })

  it("uses Artists to Discover header when menuType is artists", () => {
    const { getByTestId } = getWrapper({
      menuType: "artists",
      featuredLinkData: [{} as any],
    })
    expect(getByTestId("featured-link-column")).toHaveTextContent(
      "Artists to Discover",
    )
  })

  it("uses Get Inspired header when menuType is artworks", () => {
    const { getByTestId } = getWrapper({
      menuType: "artworks",
      featuredLinkData: [{} as any],
    })
    expect(getByTestId("featured-link-column")).toHaveTextContent(
      "Get Inspired",
    )
  })
})
