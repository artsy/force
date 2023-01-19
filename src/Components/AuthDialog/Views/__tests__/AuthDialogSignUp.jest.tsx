import { fireEvent, render, screen, waitFor } from "@testing-library/react"
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
    }[key]
  }),
}))

jest.mock("Utils/auth", () => ({
  signUp: jest.fn(),
}))

describe("AuthDialogSignUp", () => {
  it("renders correctly", () => {
    render(<AuthDialogSignUp />)

    expect(screen.getByText("Sign up")).toBeInTheDocument()
  })

  it("renders the social auth buttons", () => {
    render(<AuthDialogSignUp />)

    expect(screen.getByText("Continue with Facebook")).toBeInTheDocument()
    expect(screen.getByText("Continue with Google")).toBeInTheDocument()
    expect(screen.getByText("Continue with Apple")).toBeInTheDocument()
  })

  it("submits the user details", async () => {
    render(<AuthDialogSignUp />)

    const signUpMock = jest.fn().mockReturnValue(Promise.resolve())
    ;(signUp as jest.Mock).mockImplementationOnce(signUpMock)

    const name = screen.getByPlaceholderText("Enter your full name")
    const email = screen.getByPlaceholderText("Enter your email address")
    const password = screen.getByPlaceholderText("Enter your password")

    const submit = screen.getByText("Sign up")

    // eslint-disable-next-line testing-library/no-node-access
    const button = submit.parentNode!

    expect(button).toBeDisabled()

    fireEvent.change(name, { target: { value: "Test User" } })
    fireEvent.change(email, { target: { value: "example@example.com" } })
    fireEvent.change(password, { target: { value: "Secret000" } }) // pragma: allowlist secret

    expect(button).toBeEnabled()

    fireEvent.click(button)

    await waitFor(() => {
      expect(signUpMock).toBeCalledWith({
        name: "Test User",
        email: "example@example.com",
        password: "Secret000", // pragma: allowlist secret
        agreedToReceiveEmails: false,
      })
    })
  })
})
