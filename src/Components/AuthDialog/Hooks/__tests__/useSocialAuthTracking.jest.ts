import { renderHook } from "@testing-library/react-hooks"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { useSocialAuthTracking } from "Components/AuthDialog/Hooks/useSocialAuthTracking"
import { useRouter } from "System/Hooks/useRouter"
import Cookies from "cookies-js"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest
    .fn()
    .mockImplementation(() => ({ match: { location: { pathname: "/" } } })),
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

  it("calls loggedIn with the correct data and expires the cookie", () => {
    const loggedIn = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({
      loggedIn,
      signedUp: jest.fn(),
    }))
    mockCookiesExpire.mockImplementation(jest.fn())

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({
        action: "loggedIn",
        service: "google",
        analytics: {
          contextModule: "header",
        },
      }),
    )

    renderHook(useSocialAuthTracking)

    expect(loggedIn).toBeCalledWith({
      contextModule: "header",
      service: "google",
      userId: "example",
    })

    expect(mockCookiesExpire).toBeCalledWith("useSocialAuthTracking")
  })

  it("calls signedUp with onboarding=true when the URL param is present", () => {
    const signedUp = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({
      loggedIn: jest.fn(),
      signedUp,
    }))

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({
        action: "signedUp",
        service: "google",
        analytics: {
          contextModule: "header",
          intent: "signup",
        },
      }),
    )

    mockUseRouter.mockImplementation(() => ({
      match: { location: { pathname: "/", search: "?onboarding=true" } },
    }))

    renderHook(useSocialAuthTracking)

    expect(signedUp).toBeCalledWith({
      contextModule: "header",
      intent: "signup",
      onboarding: true,
      service: "google",
      userId: "example",
    })
  })

  it("calls signedUp with onboarding=false when the URL param is absent", () => {
    const signedUp = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({
      loggedIn: jest.fn(),
      signedUp,
    }))

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({
        action: "signedUp",
        service: "google",
      }),
    )

    mockUseRouter.mockImplementation(() => ({
      match: { location: { pathname: "/" } },
    }))

    renderHook(useSocialAuthTracking)

    expect(signedUp).toBeCalledWith({
      onboarding: false,
      service: "google",
      userId: "example",
    })
  })

  it("passes method to the tracking function when present", () => {
    const loggedIn = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({ loggedIn }))

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({
        action: "loggedIn",
        service: "google",
        method: "one-tap",
      }),
    )

    renderHook(useSocialAuthTracking)

    expect(loggedIn).toBeCalledWith({
      method: "one-tap",
      service: "google",
      userId: "example",
    })
  })

  it("does not call the tracking function if the cookie is invalid and expires the cookie", () => {
    const loggedIn = jest.fn()
    mockUseAuthDialogTracking.mockImplementation(() => ({ loggedIn }))
    mockCookiesExpire.mockImplementation(jest.fn())

    mockCookiesGet.mockImplementation(() =>
      JSON.stringify({ action: "invalid" }),
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
      }),
    )

    mockUseRouter.mockImplementation(() => ({
      match: { location: { pathname: "/login" } },
    }))

    renderHook(useSocialAuthTracking)

    expect(loggedIn).not.toBeCalled()
    expect(mockCookiesExpire).toBeCalledWith("useSocialAuthTracking")
  })
})
