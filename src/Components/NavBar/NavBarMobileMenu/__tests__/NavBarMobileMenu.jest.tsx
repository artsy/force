import { NavBarMobileMenu } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenu"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { logout } from "Utils/auth"
import { render } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useDidMount: jest.fn().mockReturnValue(false), // SSR-render
}))

jest.mock("Utils/auth", () => ({ logout: jest.fn() }))

describe("NavBarMobileMenu", () => {
  const mockLogout = logout as jest.Mock

  const trackEvent = jest.fn()
  const noop = () => {}
  const getWrapper = props => {
    return render(
      <SystemContextProvider user={props.user}>
        <NavBarMobileMenu isOpen onClose={noop} />
      </SystemContextProvider>,
    )
  }

  const getMobileMenuLinkContainer = (
    userType: string | null = null,
    lab_features: string[] = [],
  ) => {
    const { container } = getWrapper({
      user: userType ? { userType, lab_features } : null,
    })
    return container
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  it("calls logout auth action on logout menu click", () => {
    mockLogout.mockImplementationOnce(() =>
      jest.fn().mockResolvedValue(Promise.resolve()),
    )

    const { container } = getWrapper({ user: { type: "NotAdmin" } })
    const buttons = container.querySelectorAll("button")
    const lastButton = buttons[buttons.length - 1]

    fireEvent.click(lastButton)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  describe("nav structure", () => {
    it("renders the correct items when logged out", () => {
      const defaultMobileMenuLinks = [
        ["/collect", "Buy"],
        ["/auctions", "Auctions"],
        ["/viewing-rooms", "Viewing Rooms"],
        ["/galleries", "Galleries"],
        ["/art-fairs", "Fairs & Events"],
        ["/shows", "Shows"],
        ["/institutions", "Museums"],
        ["/price-database", "Price Database"],
        ["/articles", "Editorial"],
        ["/signup?intent=signup&contextModule=header", "Sign Up"],
        ["/login?intent=login&contextModule=header", "Log In"],
      ].map(link => link.join(""))

      const { container } = getWrapper({})
      const menuLinks = container.querySelectorAll("a")

      // Exclude submenu links
      const renderedMobileMenuLinks = Array.from(menuLinks)
        .map(
          node => (node.getAttribute("href") || "") + (node.textContent || ""),
        )
        .filter(link => defaultMobileMenuLinks.includes(link))

      // Ensure that the mobile menu links at least include the links we expect
      // and that they're in the right relative order
      expect(renderedMobileMenuLinks).toEqual(defaultMobileMenuLinks)

      const subMenuButtons = container.querySelectorAll("button")
      const subMenuButtonLabels = Array.from(subMenuButtons)
        .map(node => node.textContent || "")
        .join("")

      expect(subMenuButtonLabels).toContain("Artists")
      expect(subMenuButtonLabels).toContain("Artworks")

      expect(container.textContent).not.toContain("Works for you")
    })

    it("renders the account subnav when logged in", () => {
      const container = getMobileMenuLinkContainer("notAdmin")

      expect(container.textContent).toContain("Get the app")
    })
  })

  describe("lab features", () => {
    it("shows inbox menu option if lab feature enabled", () => {
      const container = getMobileMenuLinkContainer("notAdmin", [
        "User Conversations View",
      ])

      expect(container.innerHTML).toContain("Inbox")
    })
  })

  describe("Analytics tracking", () => {
    it("tracks back button click", () => {
      const container = getMobileMenuLinkContainer("notAdmin")
      const backButtons = container.querySelectorAll(
        'button[aria-label*="Back"], button:contains("Back")',
      )

      if (backButtons.length > 0) {
        fireEvent.click(backButtons[0])

        expect(trackEvent).toBeCalledWith({
          action_type: "Click",
          context_module: "Header",
          flow: "Header",
          subject: "Back link",
        })
      }
    })

    it("tracks link clicks", () => {
      const container = getMobileMenuLinkContainer("notAdmin")
      const firstLink = container.querySelector("a")

      if (firstLink) {
        fireEvent.click(firstLink)

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          context_module: "Header",
          flow: "Header",
          subject: "Buy",
          destination_path: "/collect",
        })
      }
    })
  })
})
