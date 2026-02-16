import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarMobileSubMenuServer } from "Components/NavBar/NavBarMobileMenu/NavBarMobileSubMenuServer"
import { NavBarMobileMenuNavigationProvider } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuNavigation"
import { render } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "owner-id",
    contextPageOwnerSlug: "owner-slug",
    contextPageOwnerType: "home",
  })),
}))

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useFragment: jest.fn(),
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

describe("NavBarMobileSubMenuServer", () => {
  const trackEvent = jest.fn()

  const getWrapper = (passedProps = {}) => {
    const { useFragment } = require("react-relay")
    ;(useFragment as jest.Mock).mockReturnValue(MOCK_NAVIGATION_VERSION)

    return render(
      <NavBarMobileMenuNavigationProvider>
        <NavBarMobileSubMenuServer
          navigationVersion={{} as any}
          menuType="artworks"
          {...passedProps}
        >
          Artworks
        </NavBarMobileSubMenuServer>
      </NavBarMobileMenuNavigationProvider>,
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

  describe("null state", () => {
    it("returns null when useFragment returns null", () => {
      const { useFragment } = require("react-relay")
      ;(useFragment as jest.Mock).mockReturnValue(null)

      const { container } = render(
        <NavBarMobileMenuNavigationProvider>
          <NavBarMobileSubMenuServer
            navigationVersion={{} as any}
            menuType="artworks"
          >
            Artworks
          </NavBarMobileSubMenuServer>
        </NavBarMobileMenuNavigationProvider>,
      )

      expect(container.textContent).toBe("")
    })

    it("returns null when items is undefined", () => {
      const { useFragment } = require("react-relay")
      ;(useFragment as jest.Mock).mockReturnValue({})

      const { container } = render(
        <NavBarMobileMenuNavigationProvider>
          <NavBarMobileSubMenuServer
            navigationVersion={{} as any}
            menuType="artworks"
          >
            Artworks
          </NavBarMobileSubMenuServer>
        </NavBarMobileMenuNavigationProvider>,
      )

      expect(container.textContent).toBe("")
    })
  })

  describe("rendering", () => {
    it("renders the trigger button with title", () => {
      const { getByRole } = getWrapper()
      expect(getByRole("button", { name: /Artworks/ })).toBeInTheDocument()
    })

    it("renders section links after opening drilldown", () => {
      const { container, getByRole } = getWrapper()

      fireEvent.click(getByRole("button", { name: /Artworks/ }))
      fireEvent.click(getByRole("button", { name: /The Home Edit/ }))

      const links = container.querySelectorAll("a")
      const artForSmallSpaces = Array.from(links).find(
        a => a.getAttribute("href") === "/collection/art-for-small-spaces",
      )
      expect(artForSmallSpaces).toHaveTextContent("Art for Small Spaces")
    })

    it("renders View All Artists when menuType is artists", () => {
      const { useFragment } = require("react-relay")
      ;(useFragment as jest.Mock).mockReturnValue(MOCK_NAVIGATION_VERSION)

      const { container } = render(
        <NavBarMobileMenuNavigationProvider>
          <NavBarMobileSubMenuServer
            navigationVersion={{} as any}
            menuType="artists"
          >
            Artists
          </NavBarMobileSubMenuServer>
        </NavBarMobileMenuNavigationProvider>,
      )

      const viewAllLink = Array.from(container.querySelectorAll("a")).find(
        a =>
          a.getAttribute("href") === "/artists" &&
          a.textContent?.trim() === "View All Artists",
      )
      expect(viewAllLink).toBeInTheDocument()
    })

    it("renders View All Artworks when menuType is artworks", () => {
      const { container } = getWrapper({ menuType: "artworks" })

      const viewAllLink = Array.from(container.querySelectorAll("a")).find(
        a =>
          a.getAttribute("href") === "/collect" &&
          a.textContent?.trim() === "View All Artworks",
      )
      expect(viewAllLink).toBeInTheDocument()
    })

    it("renders A-Z letters when menuType is artists", () => {
      const { container } = getWrapper({ menuType: "artists" })

      expect(container.textContent).toContain("A")
      expect(container.textContent).toContain("B")
      expect(container.textContent).toContain("C")
      expect(container.textContent).toContain("X")
      expect(container.textContent).toContain("Y")
      expect(container.textContent).toContain("Z")
    })

    it("renders Back button in panel header", () => {
      const { getAllByLabelText } = getWrapper()
      expect(getAllByLabelText("Back").length).toBeGreaterThanOrEqual(1)
    })
  })

  describe("analytics", () => {
    it("tracks trigger button click", () => {
      const { getByRole } = getWrapper()

      fireEvent.click(getByRole("button", { name: /Artworks/ }))

      expect(trackEvent).toHaveBeenCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        context_module: DeprecatedAnalyticsSchema.ContextModule.Header,
        flow: "Header",
        subject: "Artworks",
      })
    })

    it("tracks link click with correct payload", () => {
      const { container, getByRole } = getWrapper()

      fireEvent.click(getByRole("button", { name: /Artworks/ }))
      fireEvent.click(getByRole("button", { name: /The Home Edit/ }))

      const links = container.querySelectorAll("a")
      const artLink = Array.from(links).find(
        a => a.getAttribute("href") === "/collection/art-for-small-spaces",
      )
      expect(artLink).toBeInTheDocument()

      fireEvent.click(artLink!)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "click",
        flow: "Header",
        context_module:
          DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown,
        context_page_owner_type: "home",
        context_page_owner_id: "owner-id",
        context_page_owner_slug: "owner-slug",
        parent_navigation_item: "The Home Edit",
        subject: "Art for Small Spaces",
        destination_path: "/collection/art-for-small-spaces",
        dropdown_group: "",
      })
    })

    it("tracks drilldown viewed after 500ms when panel opens", () => {
      jest.useFakeTimers()
      const { getByRole } = getWrapper()

      fireEvent.click(getByRole("button", { name: /Artworks/ }))

      jest.advanceTimersByTime(500)

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "navigationDropdownViewed",
          navigation_item: "Artworks",
          level: 0,
          interaction_type: "drilldown",
        }),
      )

      jest.useRealTimers()
    })
  })
})
