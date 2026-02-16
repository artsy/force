import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarDropdownPanelServer } from "Components/NavBar/NavBarDropdownPanelServer"
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

jest.mock("Components/NavBar/Menus/NavBarSubMenuServer", () => ({
  NavBarSubMenuServer: () => null,
}))

describe("NavBarDropdownPanelServer", () => {
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
      <NavBarDropdownPanelServer {...defaultProps} {...passedProps} />,
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

  describe("rendering", () => {
    it("renders anchor with correct label and href", () => {
      getWrapper()

      const anchor = screen.getByTestId("server-dropdown")
      expect(anchor).toHaveTextContent("Artists")

      const link = anchor.querySelector("a")
      expect(link).toHaveAttribute("href", "/artists")
      expect(link).toHaveAttribute("data-label", "Artists")
    })
  })

  describe("callbacks", () => {
    it("calls onMenuEnter when mouse enters the anchor", () => {
      const onMenuEnter = jest.fn()
      getWrapper({ onMenuEnter })

      fireEvent.mouseEnter(screen.getByTestId("server-dropdown"))

      expect(onMenuEnter).toHaveBeenCalled()
    })

    it("calls handleClick when anchor is clicked", () => {
      const handleClick = jest.fn()
      getWrapper({ handleClick })

      const link = screen.getByTestId("server-dropdown").querySelector("a")
      fireEvent.click(link!)

      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe("analytics", () => {
    it("fires navigationDropdownViewed tracking after 500ms when dropdown is visible", () => {
      jest.useFakeTimers()

      getWrapper()

      act(() => {
        fireEvent.mouseEnter(screen.getByTestId("server-dropdown"))
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
