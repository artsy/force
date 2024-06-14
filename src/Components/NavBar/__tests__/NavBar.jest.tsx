import { SystemContextProvider } from "System/Contexts/SystemContext"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import { NavBar } from "Components/NavBar/NavBar"
import { NavBarMobileMenuNotificationsIndicatorQueryRenderer as NavBarMobileMenuNotificationsIndicator } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"
import { useAuthDialog } from "Components/AuthDialog"

jest.mock("Components/Search/SearchBar", () => {
  return {
    SearchBar: () => <div />,
  }
})

jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("Server/isServer", () => ({
  isServer: true,
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
  })
)

jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind",
  () => ({
    ProgressiveOnboardingSaveFind: ({ children }) => children,
  })
)

jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertFind",
  () => ({
    ProgressiveOnboardingAlertFind: ({ children }) => children,
  })
)

describe("NavBar", () => {
  const trackEvent = jest.fn()

  const getWrapper = ({ user = null, isEigen = false } = {}) => {
    return mount(
      <SystemContextProvider user={user} isEigen={isEigen}>
        <NavBar />
      </SystemContextProvider>
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
    const wrapper = getWrapper()
    expect(wrapper.find("ArtsyMarkIcon").length).toEqual(1)
    expect(wrapper.find("SearchBar").length).toEqual(1)
  })

  describe("desktop", () => {
    it("renders logged out items", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("Log In")
      expect(wrapper.html()).toContain("Sign Up")
    })

    it("renders logged in items", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const wrapper = getWrapper({ user: true })
      expect(wrapper.html()).not.toContain("Log In")
      expect(wrapper.html()).not.toContain("Sign Up")

      expect(wrapper.find('[aria-label="Conversations"]').length > 0).toBe(true)
      expect(wrapper.find('[aria-label="Notifications"]').length > 0).toBe(true)
    })

    it("includes the sub-menus when rendering", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("View All Artists")
      expect(wrapper.html()).toContain("View All Artworks")
    })

    it("renders menu item price database", () => {
      const wrapper = getWrapper()
      expect(wrapper.html()).toContain("Price Database")
    })
  })

  describe("logged out actions", () => {
    const mockUseAuthDialog = useAuthDialog as jest.Mock

    it("calls login auth action on login button click", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      const wrapper = getWrapper()

      wrapper.find("button").at(0).simulate("click")

      expect(showAuthDialog).toBeCalledWith({
        mode: "Login",
        analytics: {
          contextModule: "header",
          intent: "login",
        },
      })
    })

    it("calls signup auth action on signup button click", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      const wrapper = getWrapper()

      wrapper.find("button").at(1).simulate("click")

      expect(showAuthDialog).toBeCalledWith({
        mode: "SignUp",
        analytics: {
          contextModule: "header",
          intent: "signup",
        },
      })
    })
  })

  describe("mobile", () => {
    it("toggles menu", () => {
      const wrapper = getWrapper()

      expect(wrapper.find("NavBarMobileMenuIcon").length).toEqual(1)

      expect(wrapper.find("NavBarMobileMenu").length).toEqual(0)
      wrapper.find('[aria-label="Menu"]').first().simulate("click")
      expect(wrapper.find("NavBarMobileMenu").length).toEqual(1)
      wrapper.find('[aria-label="Close menu"]').first().simulate("click")
      expect(wrapper.find("NavBarMobileMenu").length).toEqual(0)
    })

    it("shows the unread notifications indicator", () => {
      const wrapper = getWrapper({
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        user: { type: "NotAdmin" },
      })
      expect(wrapper.find(NavBarMobileMenuNotificationsIndicator).length).toBe(
        1
      )
    })
  })

  describe("eigen", () => {
    it("renders null", () => {
      expect(
        getWrapper({ isEigen: false }).find(NavBar).isEmptyRender()
      ).toBeFalsy()
      expect(
        getWrapper({ isEigen: true }).find(NavBar).isEmptyRender()
      ).toBeTruthy()
    })
  })
})
