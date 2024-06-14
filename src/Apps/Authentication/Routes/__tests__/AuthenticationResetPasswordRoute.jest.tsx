import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import React from "react"
import { MockBoot } from "DevTools/MockBoot"
import { mockLocation, resetMockLocation } from "DevTools/mockLocation"
import { useRouter } from "System/Hooks/useRouter"
import { resetPassword } from "Utils/auth"
import { AuthenticationResetPasswordRoute } from "Apps/Authentication/Routes/AuthenticationResetPasswordRoute"
import { getENV } from "Utils/getENV"

jest.mock("System/Hooks/useRouter")
jest.mock("Utils/auth")
jest.mock("Utils/getENV")

describe("AuthenticationResetPasswordRoute", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockResetPassword = resetPassword as jest.Mock
  const mockGetENV = getENV as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({ match: {} }))

    mockResetPassword.mockImplementation(() => {
      return Promise.resolve()
    })

    mockLocation()

    mockGetENV.mockImplementation(() => {
      return "token"
    })

    render(
      <MockBoot>
        <AuthenticationResetPasswordRoute />
      </MockBoot>
    )
  })

  afterEach(() => {
    mockUseRouter.mockRestore()
    mockResetPassword.mockRestore()
    resetMockLocation()
  })

  it("renders the form", async () => {
    expect(screen.getByText("Change Your Password")).toBeInTheDocument()
    expect(screen.getByText("Change My Password")).toBeInTheDocument()
  })

  it("resets the password and redirects", async () => {
    fireEvent.change(screen.getByPlaceholderText("New password"), {
      target: { name: "password", value: "Secretsecret1" },
    })

    fireEvent.change(screen.getByPlaceholderText("Confirm new password"), {
      target: { name: "passwordConfirmation", value: "Secretsecret1" },
    })

    fireEvent.submit(screen.getByText("Change My Password"))

    await waitFor(() => {
      expect(screen.getByText("Password Updated")).toBeInTheDocument()

      expect(mockResetPassword).toBeCalledWith({
        password: "Secretsecret1",
        passwordConfirmation: "Secretsecret1",
        resetPasswordToken: "token", // pragma: allowlist secret
      })

      expect(window.location.assign).toBeCalledWith("/login")
    })
  })
})
