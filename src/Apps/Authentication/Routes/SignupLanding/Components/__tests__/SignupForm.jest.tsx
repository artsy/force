import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { SignupForm } from "../SignupForm"
import { login, signUp } from "Utils/auth"
import { recaptcha } from "Utils/recaptcha"
import { fetchQuery } from "react-relay"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(key => {
    return {
      AP: {
        applePath: "/users/auth/apple",
        facebookPath: "/users/auth/facebook",
        googlePath: "/users/auth/google",
      },
      APP_URL: "https://www.artsy.net",
      AUTHENTICATION_REFERER: "https://www.artsy.net",
    }[key]
  }),
}))

jest.mock("Utils/auth", () => ({
  login: jest.fn(),
  signUp: jest.fn(),
}))

jest.mock("Utils/recaptcha", () => ({
  recaptcha: jest.fn(),
}))

jest.mock("Utils/EnableRecaptcha", () => ({
  useRecaptcha: jest.fn(),
}))

jest.mock("Components/AuthDialog/Hooks/useAfterAuthentication", () => ({
  useAfterAuthentication: jest.fn().mockReturnValue({
    runAfterAuthentication: jest.fn(),
  }),
}))

jest.mock("Components/AuthDialog/Hooks/useCountryCode", () => ({
  useCountryCode: jest.fn().mockReturnValue({
    isAutomaticallySubscribed: false,
  }),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({
    relayEnvironment: {},
    user: null,
  }),
}))

describe("SignupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(recaptcha as jest.Mock).mockResolvedValue("recaptcha-token")
  })

  const mockVerifyUser = (exists: boolean) => {
    ;(fetchQuery as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        verifyUser: { exists },
      }),
    })
  }

  const continueWithEmail = async (exists: boolean) => {
    mockVerifyUser(exists)

    render(<SignupForm />)

    fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
      target: { value: "test@example.com" },
    })

    fireEvent.click(screen.getByRole("button", { name: "Continue" }))

    await waitFor(() => {
      expect(fetchQuery).toHaveBeenCalled()
    })
  }

  it("renders the initial sign up or login step", () => {
    render(<SignupForm />)

    expect(screen.getByText("Sign up or log in")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Your full name"),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Create a password"),
    ).not.toBeInTheDocument()
    expect(screen.getByText("Continue")).toBeInTheDocument()
  })

  it("renders social auth buttons on the initial step", () => {
    render(<SignupForm />)

    expect(screen.getByText("Google")).toBeInTheDocument()
    expect(screen.getByText("Facebook")).toBeInTheDocument()
    expect(screen.getByText("Apple")).toBeInTheDocument()
  })

  it("validates email format on the initial step", async () => {
    render(<SignupForm />)

    const emailInput = screen.getByPlaceholderText("your@email.com")

    fireEvent.change(emailInput, { target: { value: "invalid-email" } })
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email."),
      ).toBeInTheDocument()
    })
  })

  it("continues to signup when the email is new", async () => {
    await continueWithEmail(false)

    expect(screen.getByText("Join Artsy today")).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("your@email.com"),
    ).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText("Your full name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Create a password")).toBeInTheDocument()
  })

  it("validates password requires uppercase, lowercase, and digit after continuing to signup", async () => {
    await continueWithEmail(false)

    const passwordInput = screen.getByPlaceholderText("Create a password")

    fireEvent.change(passwordInput, { target: { value: "lowercase123" } })
    fireEvent.blur(passwordInput)

    await waitFor(() => {
      expect(
        screen.getByText(
          "Your password must have at least 1 uppercase letter.",
        ),
      ).toBeInTheDocument()
    })
  })

  it("submits signup with valid data", async () => {
    const mockSignUp = signUp as jest.Mock
    const mockRunAfterAuth = jest.fn()

    require("Components/AuthDialog/Hooks/useAfterAuthentication").useAfterAuthentication.mockReturnValue(
      {
        runAfterAuthentication: mockRunAfterAuth,
      },
    )

    mockSignUp.mockResolvedValue({
      user: { accessToken: "test-token", id: "user-id" },
    })

    await continueWithEmail(false)

    fireEvent.change(screen.getByPlaceholderText("Your full name"), {
      target: { value: "Test User" },
    })
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "Password123" }, // pragma: allowlist secret
    })

    fireEvent.click(screen.getByText("Create Account"))

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "Password123", // pragma: allowlist secret
        agreedToReceiveEmails: false,
      })
      expect(mockRunAfterAuth).toHaveBeenCalledWith({
        accessToken: "test-token",
      })
    })
  })

  it("displays error message on generic signup failure", async () => {
    const mockSignUp = signUp as jest.Mock
    mockSignUp.mockRejectedValue(new Error("Something went wrong"))

    await continueWithEmail(false)

    fireEvent.change(screen.getByPlaceholderText("Your full name"), {
      target: { value: "Test User" },
    })
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "Password123" }, // pragma: allowlist secret
    })

    fireEvent.click(screen.getByText("Create Account"))

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    })
  })

  it("switches to login when signup fails for an email that now exists", async () => {
    const mockSignUp = signUp as jest.Mock
    mockSignUp.mockRejectedValue(new Error("Conflict"))

    await continueWithEmail(false)

    mockVerifyUser(true)

    fireEvent.change(screen.getByPlaceholderText("Your full name"), {
      target: { value: "Test User" },
    })
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "Password123" }, // pragma: allowlist secret
    })

    fireEvent.click(screen.getByText("Create Account"))

    await waitFor(() => {
      expect(screen.getByText("Welcome back")).toBeInTheDocument()
    })

    expect(screen.queryByText("Conflict")).not.toBeInTheDocument()
  })

  it("continues to login when the email already exists", async () => {
    const mockLogin = login as jest.Mock
    const mockRunAfterAuth = jest.fn()

    require("Components/AuthDialog/Hooks/useAfterAuthentication").useAfterAuthentication.mockReturnValue(
      {
        runAfterAuthentication: mockRunAfterAuth,
      },
    )

    mockLogin.mockResolvedValue({
      user: { accessToken: "test-token", id: "user-id" },
    })

    await continueWithEmail(true)

    expect(screen.getByText("Welcome back")).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("your@email.com"),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Your full name"),
    ).not.toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "ExistingPassword123" }, // pragma: allowlist secret
    })

    fireEvent.click(screen.getByRole("button", { name: "Log in" }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "ExistingPassword123", // pragma: allowlist secret
        authenticationCode: "",
      })
      expect(mockRunAfterAuth).toHaveBeenCalledWith({
        accessToken: "test-token",
      })
    })
  })

  it("resets the login form back to the initial step", async () => {
    await continueWithEmail(true)

    fireEvent.click(screen.getByText("Go back."))

    await waitFor(() => {
      expect(screen.getByText("Sign up or log in")).toBeInTheDocument()
    })

    expect(screen.getByPlaceholderText("your@email.com")).not.toBeDisabled()
    expect(screen.getByPlaceholderText("your@email.com")).toHaveValue("")
  })
})
