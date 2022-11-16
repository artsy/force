import { renderHook } from "@testing-library/react-hooks"
import { useAfterAuthenticationRedirect } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirect"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(key => {
    return {
      APP_URL: "https://www.artsy.net",
      API_URL: "https://api.artsy.net",
      AP: {
        loginPagePath: "/login",
        signupPagePath: "/signup",
      },
    }[key]
  }),
}))

jest.mock("Components/AuthDialog/Hooks/useElligibleForOnboarding", () => ({
  useElligibleForOnboarding: jest.fn().mockImplementation(() => ({
    isElligibleForOnboarding: true,
  })),
}))

describe("useAfterAuthenticationRedirect", () => {
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

    const { result } = renderHook(() => useAfterAuthenticationRedirect())

    result.current.runRedirect()

    expect(locationAssignMock).toBeCalledWith(
      "https://www.artsy.net/some/path?onboarding=true"
    )
  })

  it("should redirect back to the default path if we are on the signup path", () => {
    window.location.pathname = "/signup"
    window.location.href = "https://www.artsy.net/signup"

    const { result } = renderHook(() => useAfterAuthenticationRedirect())

    result.current.runRedirect()

    expect(locationAssignMock).toBeCalledWith(
      "https://www.artsy.net/?onboarding=true"
    )
  })

  it("should redirect to gravity when there is a trust token", () => {
    window.location.pathname = "/some/path"
    window.location.href = "https://www.artsy.net/some/path"

    const { result } = renderHook(() => useAfterAuthenticationRedirect())

    result.current.runRedirect("some-token")

    // TODO: Validate that afterAuthActions still execute correctly when they are serialized in the query params like this
    expect(locationAssignMock).toBeCalledWith(
      "https://api.artsy.net/users/sign_in?trust_token=some-token&redirect_uri=https%3A%2F%2Fwww.artsy.net%2Fsome%2Fpath%3Fonboarding%3Dtrue"
    )
  })

  it("does not pass the onboarding flag if the user is not elligible", () => {
    ;(useElligibleForOnboarding as jest.Mock).mockImplementation(() => ({
      isElligibleForOnboarding: false,
    }))

    window.location.pathname = "/some/path"
    window.location.href = "https://www.artsy.net/some/path"

    const { result } = renderHook(() => useAfterAuthenticationRedirect())

    result.current.runRedirect()

    expect(locationAssignMock).toBeCalledWith("https://www.artsy.net/some/path")
  })
})
