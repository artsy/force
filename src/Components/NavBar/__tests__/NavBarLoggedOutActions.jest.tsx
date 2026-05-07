import { ContextModule, Intent } from "@artsy/cohesion"
import { fireEvent, render, screen } from "@testing-library/react"
import { useAuthDialog } from "Components/AuthDialog"
import { NavBarLoggedOutActions } from "Components/NavBar/NavBarLoggedOutActions"
import { useFlag } from "@unleash/proxy-client-react"
import { getENV } from "Utils/getENV"

const mockCaptureException = jest.fn()

jest.mock("@sentry/browser", () => ({
  captureException: (...args: unknown[]) => mockCaptureException(...args),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(),
}))

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { location: { pathname: "/collect" } },
  })),
}))

jest.mock("System/Components/RouterLink", () => ({
  RouterLink: ({ to, children, ...rest }: any) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}))

jest.mock("Components/AuthDialog/useAuthDialog", () => ({
  useAuthDialog: jest.fn().mockReturnValue({ showAuthDialog: jest.fn() }),
}))

describe("NavBarLoggedOutActions", () => {
  const mockUseFlag = useFlag as jest.Mock
  const mockGetENV = getENV as jest.Mock
  const mockUseAuthDialog = useAuthDialog as jest.Mock

  beforeEach(() => {
    mockUseFlag.mockReturnValue(false)
    mockGetENV.mockReturnValue(null)
    mockCaptureException.mockClear()
  })

  it("renders Log In and Sign Up buttons", () => {
    render(<NavBarLoggedOutActions />)
    expect(screen.getByText("Log In")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })

  it("Sign Up button links to /signup with encoded current path", () => {
    render(<NavBarLoggedOutActions />)
    expect(screen.getByText("Sign Up").closest("a")).toHaveAttribute(
      "href",
      "/signup?redirectTo=%2Fcollect",
    )
  })

  it("opens auth dialog with correct analytics when Log In is clicked", () => {
    const showAuthDialog = jest.fn()
    mockUseAuthDialog.mockReturnValue({ showAuthDialog })

    render(<NavBarLoggedOutActions />)
    fireEvent.click(screen.getByText("Log In"))

    expect(showAuthDialog).toHaveBeenCalledWith({
      analytics: {
        contextModule: ContextModule.header,
        intent: Intent.login,
      },
    })
  })

  describe("Google One Tap", () => {
    const enableOneTap = () => {
      mockUseFlag.mockReturnValue(true)
      mockGetENV.mockImplementation((key: string) => {
        if (key === "GOOGLE_CLIENT_ID") return "test-client-id"
        if (key === "APP_URL") return "https://artsy.net"
        return null
      })
    }

    describe("g_id_onload div", () => {
      it("renders when feature flag is on and GOOGLE_CLIENT_ID is set", () => {
        enableOneTap()
        render(<NavBarLoggedOutActions />)
        expect(document.getElementById("g_id_onload")).toBeInTheDocument()
        expect(document.getElementById("g_id_onload")).toHaveAttribute(
          "data-client_id",
          "test-client-id",
        )
      })

      it("does not render when feature flag is off", () => {
        mockUseFlag.mockReturnValue(false)
        mockGetENV.mockReturnValue("test-client-id")
        render(<NavBarLoggedOutActions />)
        expect(document.getElementById("g_id_onload")).not.toBeInTheDocument()
      })

      it("does not render when GOOGLE_CLIENT_ID is not set", () => {
        mockUseFlag.mockReturnValue(true)
        mockGetENV.mockReturnValue(null)
        render(<NavBarLoggedOutActions />)
        expect(document.getElementById("g_id_onload")).not.toBeInTheDocument()
      })
    })

    describe("GSI script injection", () => {
      const gsiScript = () =>
        document.body.querySelector(
          "script[src='https://accounts.google.com/gsi/client']",
        ) as HTMLScriptElement | null

      it("appends script to body when feature flag is on and GOOGLE_CLIENT_ID is set", () => {
        enableOneTap()
        render(<NavBarLoggedOutActions />)
        expect(gsiScript()).toBeInTheDocument()
      })

      it("does not append script when feature flag is off", () => {
        mockUseFlag.mockReturnValue(false)
        mockGetENV.mockReturnValue("test-client-id")
        render(<NavBarLoggedOutActions />)
        expect(gsiScript()).not.toBeInTheDocument()
      })

      it("does not append script when GOOGLE_CLIENT_ID is not set", () => {
        mockUseFlag.mockReturnValue(true)
        mockGetENV.mockReturnValue(null)
        render(<NavBarLoggedOutActions />)
        expect(gsiScript()).not.toBeInTheDocument()
      })

      it("removes script from body on unmount", () => {
        enableOneTap()
        const { unmount } = render(<NavBarLoggedOutActions />)
        unmount()
        expect(gsiScript()).not.toBeInTheDocument()
      })

      it("calls captureException when the GSI script fails to load", () => {
        enableOneTap()
        render(<NavBarLoggedOutActions />)
        gsiScript()!.onerror!(new Event("error"))
        expect(mockCaptureException).toHaveBeenCalledWith(
          new Error("Google One Tap script failed to load"),
        )
      })
    })
  })
})
