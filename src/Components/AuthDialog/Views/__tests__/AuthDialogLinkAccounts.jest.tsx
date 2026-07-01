import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogLinkAccounts } from "Components/AuthDialog/Views/AuthDialogLinkAccounts"
import { login } from "Utils/auth"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: {
      location: {
        query: {
          email: "user@example.com",
          provider: "google",
          existing_providers: "email",
        },
      },
    },
  })),
}))

jest.mock("Utils/auth", () => ({
  login: jest.fn(),
}))

jest.mock("Components/AuthDialog/Hooks/useAfterAuthentication", () => ({
  useAfterAuthentication: jest.fn().mockReturnValue({
    runAfterAuthentication: jest.fn(),
  }),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockReturnValue({
    applePath: "/users/auth/apple",
    facebookPath: "/users/auth/facebook",
    googlePath: "/users/auth/google",
  }),
}))

jest.mock("Components/AuthDialog/AuthDialogContext", () => ({
  useAuthDialogContext: jest.fn(),
}))

describe("AuthDialogLinkAccounts", () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    mockDispatch.mockClear()
    ;(useAuthDialogContext as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
      state: { values: {}, options: {} },
    })
  })

  it("renders the password form when only email provider is available", () => {
    render(<AuthDialogLinkAccounts />)

    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument()
    expect(screen.getByText("Yes, Link Accounts")).toBeInTheDocument()
  })

  it("submits the password and calls login", async () => {
    render(<AuthDialogLinkAccounts />)

    const loginMock = jest
      .fn()
      .mockResolvedValue({ user: { accessToken: "token" } })
    ;(login as jest.Mock).mockImplementationOnce(loginMock)

    const passwordInput = screen.getByPlaceholderText("Enter your password")
    fireEvent.change(passwordInput, { target: { value: "secret" } })

    // eslint-disable-next-line testing-library/no-node-access
    const button = screen.getByText("Yes, Link Accounts").parentNode!
    fireEvent.click(button)

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "secret",
        authenticationCode: "",
      })
    })
  })

  it("shows a 2FA-disabled error and Go Back button when the account has two-factor authentication enabled", async () => {
    render(<AuthDialogLinkAccounts />)
    ;(login as jest.Mock).mockRejectedValueOnce(
      new Error("missing two-factor authentication code"),
    )

    const passwordInput = screen.getByPlaceholderText("Enter your password")
    fireEvent.change(passwordInput, { target: { value: "secret" } })

    // eslint-disable-next-line testing-library/no-node-access
    const button = screen.getByText("Yes, Link Accounts").parentNode!
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(
          "Social account linking is not available while two-factor authentication is enabled on your Artsy account.",
        ),
      ).toBeInTheDocument()
    })

    expect(screen.queryByText("Yes, Link Accounts")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Go Back"))

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "MODE",
      payload: { mode: "Login" },
    })
  })

  it("shows a 2FA-disabled error when the account requires on-demand authentication", async () => {
    render(<AuthDialogLinkAccounts />)
    ;(login as jest.Mock).mockRejectedValueOnce(
      new Error("missing on-demand authentication code"),
    )

    const passwordInput = screen.getByPlaceholderText("Enter your password")
    fireEvent.change(passwordInput, { target: { value: "secret" } })

    // eslint-disable-next-line testing-library/no-node-access
    const button = screen.getByText("Yes, Link Accounts").parentNode!
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText("Go Back")).toBeInTheDocument()
    })
  })
})
