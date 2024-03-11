import { screen, render, fireEvent, waitFor } from "@testing-library/react"
import { AuthDialogForgotPassword } from "Components/AuthDialog/Views/AuthDialogForgotPassword"
import { forgotPassword } from "Utils/auth"

jest.mock("Utils/auth", () => ({
  forgotPassword: jest.fn(),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(key => {
    return {
      AP: {},
      APP_URL: "https://www.artsy.net",
    }[key]
  }),
}))

describe("AuthDialogForgotPassword", () => {
  it("renders correctly", () => {
    render(<AuthDialogForgotPassword />)

    expect(screen.getByText("Send me reset instructions")).toBeInTheDocument()
  })

  it("submits the email and displays a success message", async () => {
    render(<AuthDialogForgotPassword />)

    const forgotPasswordMock = jest.fn().mockReturnValue(Promise.resolve())

    ;(forgotPassword as jest.Mock).mockImplementationOnce(forgotPasswordMock)

    const input = screen.getByPlaceholderText("Enter your email address")

    const submit = screen.getByText("Send me reset instructions")

    // eslint-disable-next-line testing-library/no-node-access
    const button = submit.parentElement!

    expect(button).toBeDisabled()

    fireEvent.change(input, { target: { value: "example@example.com" } })

    expect(button).toBeEnabled()

    expect(
      screen.queryByText(
        "We've sent a link to reset your password if an account is associated with this email."
      )
    ).not.toBeInTheDocument()

    fireEvent.click(button)

    await waitFor(() => {
      expect(forgotPasswordMock).toBeCalledWith({
        email: "example@example.com",
      })

      expect(
        screen.getByText(
          "We've sent a link to reset your password if an account is associated with this email."
        )
      ).toBeInTheDocument()
    })
  })

  it('displays an error message when the "forgotPassword" function throws an error', async () => {
    render(<AuthDialogForgotPassword />)

    const forgotPasswordMock = jest
      .fn()
      .mockReturnValue(Promise.reject(new Error("An error occurred")))

    ;(forgotPassword as jest.Mock).mockImplementationOnce(forgotPasswordMock)

    const input = screen.getByPlaceholderText("Enter your email address")

    const submit = screen.getByText("Send me reset instructions")

    // eslint-disable-next-line testing-library/no-node-access
    const button = submit.parentElement!

    fireEvent.change(input, { target: { value: "example@example.com" } })

    fireEvent.click(button)

    await waitFor(() => {
      expect(forgotPasswordMock).toBeCalledWith({
        email: "example@example.com",
      })

      expect(screen.getByText("An error occurred")).toBeInTheDocument()
    })
  })
})
