import { renderHook } from "@testing-library/react-hooks"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useAfterAuthenticationRedirectUrl } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirectUrl"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(key => {
    return {
      APP_URL: "https://www.artsy.net",
      API_URL: "https://api.artsy.net",
    }[key]
  }),
}))

jest.mock("Components/AuthDialog/Hooks/useElligibleForOnboarding", () => ({
  useElligibleForOnboarding: jest.fn().mockImplementation(() => ({
    isElligibleForOnboarding: true,
  })),
}))

jest.mock("Components/AuthDialog/AuthDialogContext", () => ({
  useAuthDialogContext: jest.fn().mockImplementation(() => ({
    state: {
      options: {},
    },
  })),
}))

describe("useAfterAuthenticationRedirectUrl", () => {
  const locationAssignMock = jest.fn()

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { assign: locationAssignMock },
    })
  })

  afterEach(() => {
    locationAssignMock.mockReset()
  })

  it("should redirect back to the current URL", () => {
    window.location.pathname = "/some/path"
    window.location.href = "https://www.artsy.net/some/path"

    const { result } = renderHook(() => useAfterAuthenticationRedirectUrl())

    expect(result.current.redirectUrl).toEqual(
      "https://www.artsy.net/some/path?onboarding=true"
    )
  })

  it("should redirect back to the current URL and include any query params", () => {
    window.location.pathname = "/some/path"
    window.location.href = "https://www.artsy.net/some/path"
    window.location.search = "?foo=bar"

    const { result } = renderHook(() => useAfterAuthenticationRedirectUrl())

    expect(result.current.redirectUrl).toEqual(
      "https://www.artsy.net/some/path?foo=bar&onboarding=true"
    )
  })

  it("should redirect back to the default path if we are on the signup path", () => {
    window.location.pathname = "/signup"
    window.location.href = "https://www.artsy.net/signup"

    const { result } = renderHook(() => useAfterAuthenticationRedirectUrl())

    expect(result.current.redirectUrl).toEqual(
      "https://www.artsy.net/?onboarding=true"
    )
  })

  it("does not pass the onboarding flag if the user is not elligible", () => {
    ;(useElligibleForOnboarding as jest.Mock).mockImplementation(() => ({
      isElligibleForOnboarding: false,
    }))

    window.location.pathname = "/some/path"
    window.location.href = "https://www.artsy.net/some/path"

    const { result } = renderHook(() => useAfterAuthenticationRedirectUrl())

    expect(result.current.redirectUrl).toEqual(
      "https://www.artsy.net/some/path"
    )
  })

  it("should redirect to a valid redirectTo internal path", () => {
    ;(useAuthDialogContext as jest.Mock).mockImplementation(() => ({
      state: {
        options: {
          redirectTo: "/foo/bar",
        },
      },
    }))

    const { result } = renderHook(() => useAfterAuthenticationRedirectUrl())

    expect(result.current.redirectUrl).toEqual("https://www.artsy.net/foo/bar")
  })

  it("should redirect to a valid redirectTo api path", () => {
    ;(useAuthDialogContext as jest.Mock).mockImplementation(() => ({
      state: {
        options: {
          redirectTo: "https://api.artsy.net/foo/bar",
        },
      },
    }))

    const { result } = renderHook(() => useAfterAuthenticationRedirectUrl())

    expect(result.current.redirectUrl).toEqual("https://api.artsy.net/foo/bar")
  })

  it("should redirect to the default path if the redirectTo is not a valid artsy.net url", () => {
    ;(useAuthDialogContext as jest.Mock).mockImplementation(() => ({
      state: {
        options: {
          redirectTo: "https://www.google.com",
        },
      },
    }))

    const { result } = renderHook(() => useAfterAuthenticationRedirectUrl())

    expect(result.current.redirectUrl).toEqual("/")
  })
})
