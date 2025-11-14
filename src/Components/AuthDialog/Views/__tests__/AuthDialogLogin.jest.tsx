import { AuthDialogLogin } from "Components/AuthDialog/Views/AuthDialogLogin"
import { login } from "Utils/auth"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

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
  login: jest.fn(),
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

describe("AuthDialogLogin", () => {
  it("renders correctly", () => {
    render(<AuthDialogLogin />)

    expect(screen.getByText("Log in")).toBeInTheDocument()
  })

  it("submits the password", async () => {
    render(<AuthDialogLogin />)

    const loginMock = jest.fn().mockReturnValue(Promise.resolve())
    ;(login as jest.Mock).mockImplementationOnce(loginMock)

    const password = screen.getByPlaceholderText("Enter your password")
    const submit = screen.getByText("Log in")

    // eslint-disable-next-line testing-library/no-node-access
    const button = submit.parentNode!

    expect(button).toBeDisabled()

    fireEvent.change(password, { target: { value: "secret" } })

    expect(button).toBeEnabled()

    fireEvent.click(button)

    await waitFor(() => {
      expect(loginMock).toBeCalledWith({
        authenticationCode: "",
        email: "example@example.com",
        password: "secret",
      })
    })
  })

  it('displays the auth code field when "missing on-demand authentication code" error is thrown', async () => {
    render(<AuthDialogLogin />)

    const loginMock = jest
      .fn()
      .mockReturnValue(
        Promise.reject(new Error("missing on-demand authentication code")),
      )
    ;(login as jest.Mock).mockImplementationOnce(loginMock)

    const password = screen.getByPlaceholderText("Enter your password")
    const submit = screen.getByText("Log in")

    // eslint-disable-next-line testing-library/no-node-access
    const button = submit.parentNode!

    expect(button).toBeDisabled()

    fireEvent.change(password, { target: { value: "secret" } })

    fireEvent.click(button)

    expect(button).toBeEnabled()

    await waitFor(() => {
      expect(loginMock).toBeCalledWith({
        authenticationCode: "",
        email: "example@example.com",
        password: "secret",
      })
    })

    expect(
      screen.getByText(
        "Your safety and security are important to us. Please check your email for a one-time authentication code to complete your login.",
      ),
    ).toBeInTheDocument()

    // TODO: Should be disabled
    // expect(button).toBeDisabled()

    const authCode = screen.getByPlaceholderText("Enter an authentication code")

    fireEvent.change(authCode, { target: { value: "123456" } })

    // TODO: Button is stale, unable to re-submit
  })

  it('displays the auth code field when "missing two-factor authentication code" error is thrown', async () => {
    render(<AuthDialogLogin />)

    const loginMock = jest
      .fn()
      .mockReturnValue(
        Promise.reject(new Error("missing two-factor authentication code")),
      )
    ;(login as jest.Mock).mockImplementationOnce(loginMock)

    const password = screen.getByPlaceholderText("Enter your password")
    const submit = screen.getByText("Log in")

    // eslint-disable-next-line testing-library/no-node-access
    const button = submit.parentNode!

    expect(button).toBeDisabled()

    fireEvent.change(password, { target: { value: "secret" } })

    fireEvent.click(button)

    expect(button).toBeEnabled()

    await waitFor(() => {
      expect(loginMock).toBeCalledWith({
        authenticationCode: "",
        email: "example@example.com",
        password: "secret",
      })
    })

    // TODO: Should be disabled
    // expect(button).toBeDisabled()

    const authCode = screen.getByPlaceholderText("Enter an authentication code")

    fireEvent.change(authCode, { target: { value: "123456" } })

    // TODO: Button is stale, unable to re-submit
  })
})
