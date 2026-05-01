import { useAuthDialog } from "Components/AuthDialog"
import { NavBar } from "Components/NavBar/NavBar"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { render, screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import type * as React from "react"
import { useTracking } from "react-tracking"
import { useNavigationData } from "System/Contexts/NavigationDataContext"

jest.mock("Components/Search/SearchBar", () => {
  return {
    SearchBar: () => <div />,
  }
})

jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
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

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => false),
  useVariant: jest.fn(() => ({ name: "disabled", enabled: false })),
}))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useDidMount: jest.fn().mockReturnValue(false), // SSR-render
}))

// Keep button semantics because the real mobile submenu is an interactive trigger.
jest.mock("Components/NavBar/NavBarMobileMenu/NavBarMobileSubMenu", () => ({
  NavBarMobileSubMenu: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
}))

jest.mock("Components/NavBar/Menus/NavBarSubMenu", () => ({
  NavBarSubMenu: () => null,
}))

jest.mock("react-dom", () => ({
  createPortal: children => children,
}))

jest.mock("Components/AuthDialog/useAuthDialog", () => ({
  useAuthDialog: jest.fn().mockReturnValue({ showAuthDialog: jest.fn() }),
}))

jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind",
  () => ({
    ProgressiveOnboardingFollowFind: ({ children }) => children,
  }),
)

jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind",
  () => ({
    ProgressiveOnboardingSaveFind: ({ children }) => children,
  }),
)

jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertFind",
  () => ({
    ProgressiveOnboardingAlertFind: ({ children }) => children,
  }),
)

jest.mock("System/Contexts/NavigationDataContext", () => ({
  useNavigationData: jest.fn(() => null),
  NavigationDataProvider: ({ children }) => children,
}))

describe("NavBar", () => {
  const trackEvent = jest.fn()
  const mockUseNavigationData = useNavigationData as jest.Mock
  const navigationData = {
    whatsNewNavigation: {},
    artistsNavigation: {},
    artworksNavigation: {},
  }

  const getWrapper = ({ user = null, isEigen = false } = {}) => {
    return render(
      <SystemContextProvider user={user} isEigen={isEigen}>
        <NavBar />
      </SystemContextProvider>,
    )
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  beforeEach(() => {
    mockUseNavigationData.mockReturnValue(navigationData)
  })

  it("renders Artsy Logo and SearchBar", () => {
    const { container } = getWrapper()
    // SearchBar is mocked to return <div />
    expect(container.querySelector("div")).toBeInTheDocument()
    // Check for logo presence via svg
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  describe("desktop", () => {
    it("renders logged out items", () => {
      const { container } = getWrapper()
      expect(container.innerHTML).toContain("Log In")
      expect(container.innerHTML).toContain("Sign Up")
    })

    it("renders logged in items", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const { container } = getWrapper({ user: true })
      expect(container.innerHTML).not.toContain("Log In")
      expect(container.innerHTML).not.toContain("Sign Up")

      expect(screen.getAllByLabelText("Conversations")).toHaveLength(1)
      expect(
        screen.getAllByLabelText("Notifications").length,
      ).toBeGreaterThanOrEqual(1)
    })

    it("renders server-driven dropdowns when navigation data is available", () => {
      getWrapper()

      expect(screen.getAllByTestId("navbar-dropdown-button")).toHaveLength(3)
      expect(screen.getByText("What’s New")).toBeInTheDocument()
      expect(screen.getByText("Artists")).toBeInTheDocument()
      expect(screen.getByText("Artworks")).toBeInTheDocument()
    })

    it("renders menu item price database", () => {
      const { container } = getWrapper()
      expect(container.innerHTML).toContain("Price Database")
    })
  })

  describe("logged out actions", () => {
    const mockUseAuthDialog = useAuthDialog as jest.Mock

    it("calls login auth action on login button click", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      getWrapper()

      const loginButton = screen.getByText("Log In")
      expect(loginButton).toBeDefined()
      fireEvent.click(loginButton)

      expect(showAuthDialog).toBeCalledWith({
        analytics: {
          contextModule: "header",
          intent: "login",
        },
      })
    })

    it("navigates to signup page on signup button click", () => {
      getWrapper()

      const signupButton = screen.getByText("Sign Up")
      expect(signupButton).toBeDefined()

      expect(signupButton.closest("a")).toHaveAttribute("href")
      expect(signupButton.closest("a")?.getAttribute("href")).toMatch(
        /^\/signup\?redirectTo=/,
      )
    })
  })

  describe("mobile", () => {
    it("toggles menu", () => {
      const { container } = getWrapper()

      // Check menu icon exists
      expect(container.innerHTML).toContain("Menu")

      // Check menu is initially closed
      expect(container.innerHTML).not.toContain("NavBarMobileMenu")
      const menuButton = screen.getByLabelText("Menu")
      fireEvent.click(menuButton)
      // Check menu opens
      expect(container.innerHTML).toContain("NavBarMobileMenu")
      const closeButton = screen.getByLabelText("Close menu")
      fireEvent.click(closeButton)
      // Check menu closes
      expect(container.innerHTML).not.toContain("NavBarMobileMenu")
    })

    it("shows the unread notifications indicator", () => {
      const { container } = getWrapper({
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        user: { type: "NotAdmin" },
      })
      // Check notifications indicator is present
      expect(container.innerHTML).toContain("Notifications")
    })
  })

  describe("eigen", () => {
    it("renders null", () => {
      const { container: nonEigenContainer } = getWrapper({ isEigen: false })
      expect(nonEigenContainer.firstChild).not.toBeNull()

      const { container: eigenContainer } = getWrapper({ isEigen: true })
      expect(eigenContainer.firstChild).toBeNull()
    })
  })

  describe("server-driven navigation", () => {
    it("passes navigation data into the mobile menu", () => {
      getWrapper()

      fireEvent.click(screen.getByLabelText("Menu"))

      expect(screen.getByTestId("NavBarMobileMenu")).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "What’s New" }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Artists" }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Artworks" }),
      ).toBeInTheDocument()
    })
  })
})
