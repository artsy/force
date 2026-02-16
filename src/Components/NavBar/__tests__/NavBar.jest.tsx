import { useAuthDialog } from "Components/AuthDialog"
import { NavBar } from "Components/NavBar/NavBar"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { render, screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { getENV } from "Utils/getENV"
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

jest.mock("Components/NavBar/NavBarMobileMenu/NavBarMobileSubMenu", () => ({
  NavBarMobileSubMenu: () => <></>,
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

jest.mock("Utils/getENV")
jest.mock("System/Contexts/NavigationDataContext", () => ({
  useNavigationData: jest.fn(() => null),
  NavigationDataProvider: ({ children }) => children,
}))

describe("NavBar", () => {
  const trackEvent = jest.fn()

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

    it("includes the sub-menus when rendering", () => {
      const { container } = getWrapper()
      expect(container.innerHTML).toContain("Browse by Identity")
      expect(container.innerHTML).toContain("The Home Edit")
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

    it("calls signup auth action on signup button click", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      getWrapper()

      const signupButton = screen.getByText("Sign Up")
      expect(signupButton).toBeDefined()
      fireEvent.click(signupButton)

      expect(showAuthDialog).toBeCalledWith({
        analytics: {
          contextModule: "header",
          intent: "signup",
        },
      })
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

  describe("shouldUseServerNav", () => {
    const mockGetENV = getENV as jest.Mock
    const mockUseNavigationData = useNavigationData as jest.Mock

    beforeEach(() => {
      mockGetENV.mockReset()
      mockUseNavigationData.mockReset()
    })

    describe("conditional render (desktop dropdown)", () => {
      it("renders client NavBarDropdownPanel when ENABLE_SERVER_DRIVEN_NAVIGATION is false", () => {
        mockGetENV.mockImplementation((key: string) =>
          key === "ENABLE_SERVER_DRIVEN_NAVIGATION" ? false : undefined,
        )
        mockUseNavigationData.mockReturnValue(null)

        getWrapper()

        expect(screen.getAllByTestId("static-dropdown").length).toEqual(3)
      })

      it("renders NavBarDropdownPanelServer when ENABLE_SERVER_DRIVEN_NAVIGATION is true", () => {
        mockGetENV.mockImplementation((key: string) =>
          key === "ENABLE_SERVER_DRIVEN_NAVIGATION" ? true : undefined,
        )
        mockUseNavigationData.mockReturnValue({
          whatsNewNavigation: {},
          artistsNavigation: {},
          artworksNavigation: {},
          whatsNewFeaturedLink: null,
          artistsFeaturedLink: null,
          artworksFeaturedLink: null,
        })

        getWrapper()

        expect(screen.getAllByTestId("server-dropdown").length).toEqual(3)
      })
    })

    describe("prop drill to NavBarMobileMenu", () => {
      it("passes shouldUseServerNav=false to NavBarMobileMenu when flag is disabled", () => {
        mockGetENV.mockImplementation((key: string) =>
          key === "ENABLE_SERVER_DRIVEN_NAVIGATION" ? false : undefined,
        )
        mockUseNavigationData.mockReturnValue(null)

        getWrapper()

        fireEvent.click(screen.getByLabelText("Menu"))

        const mobileMenu = screen.getByTestId("NavBarMobileMenu")
        expect(mobileMenu).toHaveAttribute(
          "data-should-use-server-nav",
          "false",
        )
      })

      it("passes shouldUseServerNav=true to NavBarMobileMenu when flag is enabled", () => {
        mockGetENV.mockImplementation((key: string) =>
          key === "ENABLE_SERVER_DRIVEN_NAVIGATION" ? true : undefined,
        )
        mockUseNavigationData.mockReturnValue(null)

        getWrapper()

        fireEvent.click(screen.getByLabelText("Menu"))

        const mobileMenu = screen.getByTestId("NavBarMobileMenu")
        expect(mobileMenu).toHaveAttribute("data-should-use-server-nav", "true")
      })
    })
  })
})
