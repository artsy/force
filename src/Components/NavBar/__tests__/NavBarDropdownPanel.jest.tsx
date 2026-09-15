import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarDropdownPanel } from "Components/NavBar/NavBarDropdownPanel"
import { NavBarDropdownProvider } from "Components/NavBar/NavBarDropdownContext"
import { SUPPRESSED_DROPDOWN_HOVER_KEY } from "Components/NavBar/useSuppressedDropdownHover"
import { act, render, screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "owner-id",
    contextPageOwnerSlug: "owner-slug",
    contextPageOwnerType: "Artist",
  })),
}))

jest.mock("System/Hooks/usePrefetchRoute", () => ({
  usePrefetchRoute: jest.fn(() => ({ prefetch: jest.fn() })),
}))

jest.mock("Components/NavBar/Menus/NavBarSubMenu", () => ({
  NavBarSubMenu: () => null,
}))

describe("NavBarDropdownPanel", () => {
  const trackEvent = jest.fn()

  const defaultProps = {
    navigationData: {} as any,
    label: "Artists",
    href: "/artists",
    contextModule:
      DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown,
    menuType: "artists" as const,
  }

  const getWrapper = (passedProps = {}) => {
    return render(
      <NavBarDropdownProvider>
        <NavBarDropdownPanel {...defaultProps} {...passedProps} />
      </NavBarDropdownProvider>,
    )
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  beforeEach(() => {
    trackEvent.mockClear()
    sessionStorage.clear()
  })

  describe("rendering", () => {
    it("renders anchor with correct label and href", () => {
      getWrapper()

      const anchor = screen.getByTestId("navbar-dropdown-button")
      expect(anchor).toHaveTextContent("Artists")

      const link = anchor.querySelector("a")
      expect(link).toHaveAttribute("href", "/artists")
      expect(link).toHaveAttribute("data-label", "Artists")
    })
  })

  describe("callbacks", () => {
    it("calls handleClick when anchor is clicked", () => {
      const handleClick = jest.fn()
      getWrapper({ handleClick })

      const link = screen
        .getByTestId("navbar-dropdown-button")
        .querySelector("a")
      fireEvent.click(link!)

      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe("hover suppression after navigation", () => {
    const getButton = () => screen.getByTestId("navbar-dropdown-button")
    const getLink = () => getButton().querySelector("a")!

    const hoverAndWait = () => {
      act(() => {
        fireEvent.mouseEnter(getButton())
      })
      act(() => {
        jest.advanceTimersByTime(300)
      })
    }

    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it("records the clicked trigger so the next page can suppress its hover", () => {
      getWrapper()

      fireEvent.click(getLink())

      expect(sessionStorage.getItem(SUPPRESSED_DROPDOWN_HOVER_KEY)).toEqual(
        "Artists",
      )
    })

    it("does not record modified clicks, which open a new tab", () => {
      getWrapper()

      fireEvent.click(getLink(), { metaKey: true })

      expect(sessionStorage.getItem(SUPPRESSED_DROPDOWN_HOVER_KEY)).toBeNull()
    })

    it("opens on hover by default", () => {
      getWrapper()

      hoverAndWait()

      expect(getButton()).toHaveAttribute("aria-expanded", "true")
    })

    it("does not reopen on hover when this trigger was just clicked", () => {
      sessionStorage.setItem(SUPPRESSED_DROPDOWN_HOVER_KEY, "Artists")

      getWrapper()

      hoverAndWait()

      expect(getButton()).toHaveAttribute("aria-expanded", "false")
      expect(sessionStorage.getItem(SUPPRESSED_DROPDOWN_HOVER_KEY)).toBeNull()
    })

    it("re-enables hover once the pointer has left the trigger", () => {
      sessionStorage.setItem(SUPPRESSED_DROPDOWN_HOVER_KEY, "Artists")

      getWrapper()

      hoverAndWait()
      expect(getButton()).toHaveAttribute("aria-expanded", "false")

      act(() => {
        fireEvent.mouseLeave(getButton())
      })

      hoverAndWait()
      expect(getButton()).toHaveAttribute("aria-expanded", "true")
    })

    it("re-enables hover once the pointer moves elsewhere on the page", () => {
      sessionStorage.setItem(SUPPRESSED_DROPDOWN_HOVER_KEY, "Artists")

      getWrapper()

      act(() => {
        fireEvent.mouseMove(document.body)
      })

      hoverAndWait()
      expect(getButton()).toHaveAttribute("aria-expanded", "true")
    })

    it("does not suppress hover for a different trigger", () => {
      sessionStorage.setItem(SUPPRESSED_DROPDOWN_HOVER_KEY, "Artworks")

      getWrapper()

      hoverAndWait()

      expect(getButton()).toHaveAttribute("aria-expanded", "true")
      expect(sessionStorage.getItem(SUPPRESSED_DROPDOWN_HOVER_KEY)).toEqual(
        "Artworks",
      )
    })
  })

  describe("analytics", () => {
    it("fires navigationDropdownViewed tracking after 500ms when dropdown is visible", () => {
      jest.useFakeTimers()

      getWrapper()

      act(() => {
        fireEvent.mouseEnter(screen.getByTestId("navbar-dropdown-button"))
      })

      expect(trackEvent).not.toHaveBeenCalled()

      act(() => {
        jest.advanceTimersByTime(100)
      })

      expect(trackEvent).not.toHaveBeenCalled()

      act(() => {
        // Advance 500ms for the tracking timeout
        jest.advanceTimersByTime(500)
      })

      expect(trackEvent).toHaveBeenCalledWith({
        action: "navigationDropdownViewed",
        context_module: "header",
        context_page_owner_type: "Artist",
        context_page_owner_id: "owner-id",
        context_page_owner_slug: "owner-slug",
        navigation_item: "Artists",
        level: 0,
        interaction_type: "hover",
      })

      jest.useRealTimers()
    })
  })
})
