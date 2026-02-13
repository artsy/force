import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { AuthDialogSignUp } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { signUp } from "Utils/auth"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(key => {
    return {
      AP: {
        applePath: "/users/auth/apple",
        facebookPath: "/users/auth/facebook",
        googlePath: "/users/auth/google",
      },
      APP_URL: "https://www.artsy.net",
    }[key]
  }),
}))

jest.mock("Utils/auth", () => ({
  signUp: jest.fn(),
}))

jest.mock("Components/AuthDialog/AuthDialogContext", () => ({
  useAuthDialogContext: jest.fn().mockReturnValue({
    state: {
      analytics: {},
      options: {},
      values: {
        email: "example@example.com",
      },
    },
  }),
}))

// mocks the module that tells us if the user is on a touch device
let mockIsTouch = false
jest.mock("Utils/device", () => ({
  get isTouch() {
    return mockIsTouch
  },
}))

jest.mock("Components/AuthDialog/Hooks/useCountryCode")

describe("AuthDialogSignUp", () => {
  beforeAll(() => {
    ;(useCountryCode as jest.Mock).mockImplementation(() => ({
      loading: false,
      isAutomaticallySubscribed: true,
    }))
  })

  it("renders correctly", () => {
    render(<AuthDialogSignUp />)

    expect(screen.getByText("Sign up")).toBeInTheDocument()
  })

  it("renders a disclaimer", () => {
    render(<AuthDialogSignUp />)

    expect(screen.getByTestId("disclaimer")).toHaveTextContent(
      "By clicking Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsy’s Terms and Conditions and Privacy Policy and to receiving emails from Artsy.",
    )
    expect(
      screen.getByRole("link", { name: "Terms and Conditions" }),
    ).toHaveAttribute("href", "/terms")
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy")
  })

  describe("when the user is on a touch device", () => {
    beforeEach(() => {
      mockIsTouch = true
    })

    afterEach(() => {
      mockIsTouch = false
    })

    it("renders a disclaimer with 'tapping' instead of 'clicking'", () => {
      render(<AuthDialogSignUp />)

      expect(screen.getByTestId("disclaimer")).toHaveTextContent(
        "By tapping Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsy’s Terms and Conditions and Privacy Policy and to receiving emails from Artsy.",
      )
    })
  })

  describe("when the user is in a GDPR country", () => {
    beforeAll(() => {
      ;(useCountryCode as jest.Mock).mockImplementation(() => ({
        loading: false,
        isAutomaticallySubscribed: false,
      }))
    })

    afterAll(() => {
      ;(useCountryCode as jest.Mock).mockImplementation(() => ({
        loading: false,
        isAutomaticallySubscribed: true,
      }))
    })

    it("renders a disclaimer without the bit about receiving emails", () => {
      render(<AuthDialogSignUp />)

      expect(screen.getByTestId("disclaimer")).toHaveTextContent(
        "By clicking Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsy’s Terms and Conditions and Privacy Policy.",
      )
    })
  })

  describe("when the country code is loading", () => {
    beforeAll(() => {
      ;(useCountryCode as jest.Mock).mockImplementation(() => ({
        loading: true,
        isAutomaticallySubscribed: true,
      }))
    })

    afterAll(() => {
      ;(useCountryCode as jest.Mock).mockImplementation(() => ({
        loading: false,
        isAutomaticallySubscribed: true,
      }))
    })

    it("renders a skeleton disclaimer", () => {
      render(<AuthDialogSignUp />)

      expect(screen.getByTestId("skeleton-disclaimer")).toHaveTextContent(
        "██ ████████ ████ ██ ██ ████████ ████ ██████ ██████ ███████ ██ █████████ ███ █████ ██ ███████ █████ ███ ██████████ ███ ███████ ██████ ███ ██ █████████ ██████ ████ ██████",
      )
    })
  })

  it("submits the user details", async () => {
    render(<AuthDialogSignUp />)

    const signUpMock = jest.fn().mockReturnValue(Promise.resolve())
    ;(signUp as jest.Mock).mockImplementationOnce(signUpMock)

    const name = screen.getByPlaceholderText("Enter your full name")
    const password = screen.getByPlaceholderText("Enter your password")

    const submit = screen.getByText("Sign up")

    // eslint-disable-next-line testing-library/no-node-access
    const button = submit.parentNode!

    expect(button).toBeDisabled()

    fireEvent.change(name, { target: { value: "Test User" } })
    fireEvent.change(password, { target: { value: "Secret000" } }) // pragma: allowlist secret

    expect(button).toBeEnabled()

    fireEvent.click(button)

    await waitFor(() => {
      expect(signUpMock).toBeCalledWith({
        name: "Test User",
        email: "example@example.com",
        password: "Secret000", // pragma: allowlist secret
        agreedToReceiveEmails: true,
        signupValidator: "",
      })
    })
  })
})
