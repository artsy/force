import Cookies from "cookies-js"
import { renderHook } from "@testing-library/react-hooks"
import { useSocialAuthTracking } from "Components/AuthDialog/Hooks/useSocialAuthTracking"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { useRouter } from "System/Hooks/useRouter"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn().mockImplementation(() => ({ match: { location: {} } })),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({ user: { id: "example" } }),
}))

jest.mock("cookies-js", () => ({ get: jest.fn(), expire: jest.fn() }))

jest.mock("Components/AuthDialog/Hooks/useAuthDialogTracking", () => ({
  useAuthDialogTracking: jest.fn().mockImplementation(() => ({
    loggedIn: jest.fn(),
    signedUp: jest.fn(),
  })),
}))

describe("useSocialAuthTracking", () => {
  const mockCookiesGet = Cookies.get as jest.Mock
  const mockCookiesExpire = Cookies.expire as jest.Mock
  const mockUseAuthDialogTracking = useAuthDialogTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("calls the correct tracking function with the correct data and expires the cookie", () => {
    const loggedIn = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({ loggedIn }))
    mockCookiesExpire.mockImplementation(jest.fn())

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({
        action: "loggedIn",
        service: "google",
        analytics: {
          contextModule: "header",
        },
      })
    )

    renderHook(useSocialAuthTracking)

    expect(loggedIn).toBeCalledWith({
      contextModule: "header",
      service: "google",
      userId: "example",
    })

    expect(mockCookiesExpire).toBeCalledWith("useSocialAuthTracking")
  })

  it("does not call the tracking function if the cookie is invalid and expires the cookie", () => {
    const loggedIn = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({ loggedIn }))
    mockCookiesExpire.mockImplementation(jest.fn())

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({ action: "invalid" })
    )

    renderHook(useSocialAuthTracking)

    expect(loggedIn).not.toBeCalled()
    expect(mockCookiesExpire).toBeCalledWith("useSocialAuthTracking")
  })

  it("does not call the tracking function if the user is on an authentication route and expires the cookie", () => {
    const loggedIn = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({ loggedIn }))
    mockCookiesExpire.mockImplementation(jest.fn())

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({
        action: "loggedIn",
        service: "google",
        analytics: {
          contextModule: "header",
        },
      })
    )

    mockUseRouter.mockImplementation(() => ({
      match: { location: { pathname: "/login" } },
    }))

    renderHook(useSocialAuthTracking)

    expect(loggedIn).not.toBeCalled()
    expect(mockCookiesExpire).toBeCalledWith("useSocialAuthTracking")
  })
})
