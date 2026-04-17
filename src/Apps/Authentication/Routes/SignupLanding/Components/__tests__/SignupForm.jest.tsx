import { fireEvent, render, screen, waitFor } from "@testing-library/react"
// import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SignupForm } from "../SignupForm"
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
      AUTHENTICATION_REFERER: "https://www.artsy.net",
    }[key]
  }),
}))

jest.mock("Utils/auth", () => ({
  signUp: jest.fn(),
}))

jest.mock("Utils/EnableRecaptcha", () => ({
  useRecaptcha: jest.fn(),
}))

jest.mock("Components/AuthDialog/Hooks/useAfterAuthentication", () => ({
  useAfterAuthentication: jest.fn().mockReturnValue({
    runAfterAuthentication: jest.fn(),
  }),
}))

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({
    user: null,
  }),
}))

describe("SignupForm", () => {
  it("renders form fields", () => {
    render(<SignupForm />)

    expect(screen.getByPlaceholderText("Your full name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Create a password")).toBeInTheDocument()
    expect(screen.getByText("Create Account")).toBeInTheDocument()
  })

  it("renders social auth buttons", () => {
    render(<SignupForm />)

    expect(screen.getByText("Google")).toBeInTheDocument()
    expect(screen.getByText("Facebook")).toBeInTheDocument()
    expect(screen.getByText("Apple")).toBeInTheDocument()
  })

  it("shows validation errors", async () => {
    render(<SignupForm />)

    const nameInput = screen.getByPlaceholderText("Your full name")
    fireEvent.blur(nameInput)

    await waitFor(() => {
      expect(screen.getByText("Name is required.")).toBeInTheDocument()
    })
  })

  it("validates password requires uppercase, lowercase, and digit", async () => {
    render(<SignupForm />)

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

  it("validates email format", async () => {
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

  it("submits form with valid data", async () => {
    const mockSignUp = signUp as jest.Mock
    const mockRunAfterAuth = jest.fn()

    require("Components/AuthDialog/Hooks/useAfterAuthentication").useAfterAuthentication.mockReturnValue(
      {
        runAfterAuthentication: mockRunAfterAuth,
      },
    )

    mockSignUp.mockResolvedValue({
      user: { accessToken: "test-token" },
    })

    render(<SignupForm />)

    fireEvent.change(screen.getByPlaceholderText("Your full name"), {
      target: { value: "Test User" },
    })
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
      target: { value: "test@example.com" },
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

  it("displays error message on signup failure", async () => {
    const mockSignUp = signUp as jest.Mock
    mockSignUp.mockRejectedValue(new Error("User already exists"))

    render(<SignupForm />)

    fireEvent.change(screen.getByPlaceholderText("Your full name"), {
      target: { value: "Test User" },
    })
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
      target: { value: "test@example.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "Password123" }, // pragma: allowlist secret
    })

    fireEvent.click(screen.getByText("Create Account"))

    await waitFor(() => {
      expect(screen.getByText("User already exists")).toBeInTheDocument()
    })
  })

  it("shows message when user is already logged in", () => {
    require("System/Hooks/useSystemContext").useSystemContext.mockReturnValue({
      user: { id: "user-123" },
    })

    render(<SignupForm />)

    expect(screen.getByText("You're already signed in!")).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Your full name"),
    ).not.toBeInTheDocument()
  })
})
