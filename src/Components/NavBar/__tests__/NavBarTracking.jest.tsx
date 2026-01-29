import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { NavBarUserMenu } from "Components/NavBar/Menus"
import { NavBar } from "Components/NavBar/NavBar"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { render, screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({ sm: false }),
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
  useDidMount: jest.fn().mockReturnValue(false), // SSR-render
}))

jest.mock("Components/NavBar/Menus/NavBarUserMenuAvatar", () => ({
  NavBarUserMenuAvatar: () => <div />,
}))

describe("NavBarTracking", () => {
  const trackEvent = jest.fn()

  const Wrapper = ({ children, user = { id: "foo" } }) => {
    return <SystemContextProvider user={user}>{children}</SystemContextProvider>
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("NavBarUserMenu", () => {
    it("tracks NavBarUserMenu clicks", () => {
      const { container } = render(
        <Wrapper>
          <NavBarUserMenu />
        </Wrapper>,
      )

      const firstLink = container.querySelector("a")
      fireEvent.click(firstLink!)

      expect(trackEvent).toBeCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        context_module:
          DeprecatedAnalyticsSchema.ContextModule.HeaderUserDropdown,
        destination_path: "/collector-profile/my-collection",
      })
    })
  })

  describe("NavItem", () => {
    it("tracks NavItem item clicks", () => {
      const { container } = render(
        <Wrapper>
          <NavBar />
        </Wrapper>,
      )

      const fairsLink = container.querySelector('a[href="/art-fairs"]')
      fireEvent.click(fairsLink!)

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: "Fairs & Events",
        destination_path: "/art-fairs",
      })

      const collectLinks = container.querySelectorAll('a[href="/collect"]')
      const emptyCollectLink = Array.from(collectLinks).find(
        link => link.textContent === "",
      )
      if (emptyCollectLink) {
        fireEvent.click(emptyCollectLink)
      }

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: "Artworks",
        destination_path: "/collect",
      })
    })
  })

  describe("Mobile", () => {
    it("tracks show mobile menu hamburger button clicks", () => {
      render(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>,
      )

      const menuButton = screen.getByLabelText("Menu")
      fireEvent.click(menuButton)

      expect(trackEvent).toBeCalledWith({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: DeprecatedAnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
      })
    })
  })
})
