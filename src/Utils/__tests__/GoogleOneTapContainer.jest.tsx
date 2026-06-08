import { render } from "@testing-library/react"
import { useToasts } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { GoogleOneTapContainer } from "Utils/GoogleOneTapContainer"
import { getENV } from "Utils/getENV"

const mockCaptureException = jest.fn()
const mockSendToast = jest.fn()

jest.mock("@sentry/browser", () => ({
  captureException: (...args: unknown[]) => mockCaptureException(...args),
}))

jest.mock("@artsy/palette", () => ({
  useToasts: jest.fn(),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

describe("GoogleOneTapContainer", () => {
  const mockUseFlag = useFlag as jest.Mock
  const mockGetENV = getENV as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  const mockUseToasts = useToasts as jest.Mock

  const enableOneTap = () => {
    mockUseFlag.mockReturnValue(true)
    mockUseSystemContext.mockReturnValue({ isLoggedIn: false })
    mockGetENV.mockImplementation((key: string) => {
      if (key === "GOOGLE_CLIENT_ID") return "test-client-id"
      if (key === "APP_URL") return "https://artsy.net"
      return null
    })
  }

  beforeEach(() => {
    mockUseFlag.mockReturnValue(false)
    mockUseSystemContext.mockReturnValue({ isLoggedIn: false })
    mockGetENV.mockReturnValue(null)
    mockCaptureException.mockClear()
    mockSendToast.mockClear()
    mockUseToasts.mockReturnValue({ sendToast: mockSendToast })
  })

  afterEach(() => {
    document.getElementById("google-one-tap-script")?.remove()
  })

  const gsiScript = () =>
    document.body.querySelector(
      "script[src='https://accounts.google.com/gsi/client']",
    ) as HTMLScriptElement | null

  describe("g_id_onload div", () => {
    it("renders when feature flag is on, GOOGLE_CLIENT_ID is set, and user is logged out", () => {
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(document.getElementById("g_id_onload")).toBeInTheDocument()
      expect(document.getElementById("g_id_onload")).toHaveAttribute(
        "data-client_id",
        "test-client-id",
      )
      expect(document.getElementById("g_id_onload")).toHaveAttribute(
        "data-login_uri",
        "https://artsy.net/users/auth/google/one_tap/callback",
      )
    })

    it("does not render when feature flag is off", () => {
      mockUseFlag.mockReturnValue(false)
      mockUseSystemContext.mockReturnValue({ isLoggedIn: false })
      mockGetENV.mockReturnValue("test-client-id")
      render(<GoogleOneTapContainer />)
      expect(document.getElementById("g_id_onload")).not.toBeInTheDocument()
    })

    it("does not render when GOOGLE_CLIENT_ID is not set", () => {
      mockUseFlag.mockReturnValue(true)
      mockUseSystemContext.mockReturnValue({ isLoggedIn: false })
      mockGetENV.mockReturnValue(null)
      render(<GoogleOneTapContainer />)
      expect(document.getElementById("g_id_onload")).not.toBeInTheDocument()
    })

    it("does not render when user is logged in", () => {
      mockUseFlag.mockReturnValue(true)
      mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
      mockGetENV.mockReturnValue("test-client-id")
      render(<GoogleOneTapContainer />)
      expect(document.getElementById("g_id_onload")).not.toBeInTheDocument()
    })

    describe("on auth paths", () => {
      const originalPathname = window.location.pathname

      afterEach(() => {
        Object.defineProperty(window, "location", {
          value: { ...window.location, pathname: originalPathname },
          writable: true,
        })
      })

      it.each([
        "/log_in",
        "/sign_up",
        "/login",
        "/signup",
        "/forgot",
        "/reset_password",
        "/auth-redirect",
      ])("does not render on %s", path => {
        enableOneTap()
        Object.defineProperty(window, "location", {
          value: { ...window.location, pathname: path },
          writable: true,
        })
        render(<GoogleOneTapContainer />)
        expect(document.getElementById("g_id_onload")).not.toBeInTheDocument()
      })
    })
  })

  describe("GSI script injection", () => {
    it("appends script to body when feature flag is on and user is logged out", () => {
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(gsiScript()).toBeInTheDocument()
    })

    it("does not append script when feature flag is off", () => {
      mockUseFlag.mockReturnValue(false)
      mockUseSystemContext.mockReturnValue({ isLoggedIn: false })
      mockGetENV.mockReturnValue("test-client-id")
      render(<GoogleOneTapContainer />)
      expect(gsiScript()).not.toBeInTheDocument()
    })

    it("does not append script when GOOGLE_CLIENT_ID is not set", () => {
      mockUseFlag.mockReturnValue(true)
      mockUseSystemContext.mockReturnValue({ isLoggedIn: false })
      mockGetENV.mockReturnValue(null)
      render(<GoogleOneTapContainer />)
      expect(gsiScript()).not.toBeInTheDocument()
    })

    it("does not append script when user is logged in", () => {
      mockUseFlag.mockReturnValue(true)
      mockUseSystemContext.mockReturnValue({ isLoggedIn: true })
      mockGetENV.mockReturnValue("test-client-id")
      render(<GoogleOneTapContainer />)
      expect(gsiScript()).not.toBeInTheDocument()
    })
  })

  describe("inline error toasts", () => {
    const originalLocation = window.location

    afterEach(() => {
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      })
    })

    const setLocation = (search: string) => {
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/artist/andy-warhol",
          search,
          href: `http://localhost/artist/andy-warhol${search}`,
        },
        writable: true,
      })
    }

    it("shows a toast for IP_BLOCKED", () => {
      setLocation("?g_one_tap_error=IP_BLOCKED")
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(mockSendToast).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Your IP address was blocked by Google.",
          variant: "error",
        }),
      )
    })

    it("shows a toast for TWO_FACTOR_AUTHENTICATION_REQUIRED", () => {
      setLocation("?g_one_tap_error=TWO_FACTOR_AUTHENTICATION_REQUIRED")
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(mockSendToast).toHaveBeenCalledWith(
        expect.objectContaining({
          message:
            "Please log in with email and password to use two-factor authentication.",
          variant: "error",
        }),
      )
    })

    it("shows a generic toast for UNKNOWN", () => {
      setLocation("?g_one_tap_error=UNKNOWN")
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(mockSendToast).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "An unknown error occurred. Please try again.",
          variant: "error",
        }),
      )
    })

    it("falls back to the generic message for unrecognized error codes", () => {
      setLocation("?g_one_tap_error=SOMETHING_NEW")
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(mockSendToast).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "An unknown error occurred. Please try again.",
          variant: "error",
        }),
      )
    })

    it("cleans up error params from the URL after showing the toast", () => {
      setLocation("?g_one_tap_error=IP_BLOCKED")
      const replaceStateSpy = jest
        .spyOn(window.history, "replaceState")
        .mockImplementation(() => {})
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(replaceStateSpy).toHaveBeenCalledWith(
        {},
        "",
        "http://localhost/artist/andy-warhol",
      )
      replaceStateSpy.mockRestore()
    })

    it("does not show a toast when no error params are present", () => {
      setLocation("")
      enableOneTap()
      render(<GoogleOneTapContainer />)
      expect(mockSendToast).not.toHaveBeenCalled()
    })
  })
})
