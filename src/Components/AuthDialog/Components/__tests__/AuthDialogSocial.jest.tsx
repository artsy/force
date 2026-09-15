import { Intent } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import { AuthDialogSocial } from "Components/AuthDialog/Components/AuthDialogSocial"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(key => {
    return {
      AP: {
        applePath: "/users/auth/apple",
        facebookPath: "/users/auth/facebook",
        googlePath: "/users/auth/google",
      },
    }[key]
  }),
}))

jest.mock("Components/AuthDialog/AuthDialogContext", () => ({
  useAuthDialogContext: jest.fn(),
}))

jest.mock(
  "Components/AuthDialog/Hooks/useAfterAuthenticationRedirectUrl",
  () => ({
    useAfterAuthenticationRedirectUrl: jest
      .fn()
      .mockReturnValue({ redirectUrl: "https://www.artsy.net/" }),
  }),
)

const mockAuthDialogContext = (intent?: Intent) => {
  ;(useAuthDialogContext as jest.Mock).mockReturnValue({
    // The social buttons are always rendered from the Welcome view, so mode
    // is never "SignUp" at this point — the eligibility check must not
    // depend on mode.
    state: {
      mode: "Welcome",
      options: {},
      analytics: { intent },
    },
  })
}

describe("AuthDialogSocial", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("does not skip onboarding without a commercial intent", () => {
    mockAuthDialogContext(undefined)

    render(<AuthDialogSocial />)

    const href = screen.getByTitle("Continue with Google").getAttribute("href")
    expect(href).not.toContain("skip-onboarding")
  })

  it("skips onboarding when there is a commercial intent", () => {
    mockAuthDialogContext(Intent.makeOffer)

    render(<AuthDialogSocial />)

    expect(
      screen.getByTitle("Continue with Apple").getAttribute("href"),
    ).toContain("skip-onboarding=true")
    expect(
      screen.getByTitle("Continue with Google").getAttribute("href"),
    ).toContain("skip-onboarding=true")
    expect(
      screen.getByTitle("Continue with Facebook").getAttribute("href"),
    ).toContain("skip-onboarding=true")
  })
})
