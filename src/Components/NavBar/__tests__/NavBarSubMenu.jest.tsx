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
  useLazyLoadQuery: jest.fn(() => ({ article: null })),
  useFragment: jest.fn(() => null),
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

  it("renders article component when visual component is specified in menu data", () => {
    const mockArticle = {
      internalID: "test-article-id",
      href: "/article/test-article",
      vertical: "Art Market",
      title: "Test Article Title",
      thumbnailImage: {
        resized: {
          src: "https://example.com/image.jpg",
          srcSet: "https://example.com/image.jpg 1x",
        },
      },
    }

    // Mock the GraphQL query to return article data
    const { useLazyLoadQuery, useFragment } = require("react-relay")
    ;(useLazyLoadQuery as jest.Mock).mockReturnValueOnce({
      article: { __fragmentRef: "mock-ref" },
    })

    // Mock the fragment to return the article data
    ;(useFragment as jest.Mock).mockReturnValueOnce(mockArticle)

    // ARTWORKS_SUBMENU_DATA includes an article visual component
    const { container } = getWrapper()

    // Check that article header text is rendered
    expect(container.textContent).toContain("Get Inspired")

    // Check that article vertical is rendered
    expect(container.textContent).toContain("Art Market")

    // Check that article title is rendered
    expect(container.textContent).toContain("Test Article Title")
  })

  it("does not render article component when no visual component is specified", () => {
    const menuWithoutArticle = {
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
        menu={menuWithoutArticle}
        contextModule={
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
        }
        parentNavigationItem="Test"
        onClick={jest.fn()}
      />,
    )

    // No article header should be present
    expect(container.textContent).not.toContain("Get Inspired")
    expect(container.textContent).not.toContain("What's Next")
    expect(container.textContent).not.toContain("Artists to Discover")
  })
})
