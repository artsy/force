import { render } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { GoogleOneTapContainer } from "Utils/GoogleOneTapContainer"
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

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

describe("GoogleOneTapContainer", () => {
  const mockUseFlag = useFlag as jest.Mock
  const mockGetENV = getENV as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock

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

    it("calls captureException when the GSI script fails to load", () => {
      enableOneTap()
      render(<GoogleOneTapContainer />)
      gsiScript()!.onerror!(new Event("error"))
      expect(mockCaptureException).toHaveBeenCalledWith(
        new Error("Google One Tap script failed to load"),
      )
    })
  })
})
