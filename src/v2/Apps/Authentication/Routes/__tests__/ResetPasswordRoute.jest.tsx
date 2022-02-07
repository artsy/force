import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import React from "react"
import { MockBoot } from "v2/DevTools"
import { mockLocation, resetMockLocation } from "v2/DevTools/mockLocation"
import { useRouter } from "v2/System/Router/useRouter"
import { resetPassword } from "v2/Utils/auth"
import { ResetPasswordRoute } from "../ResetPasswordRoute"
import { getENV } from "v2/Utils/getENV"

jest.mock("v2/System/Router/useRouter")
jest.mock("v2/Utils/auth")
jest.mock("v2/Utils/getENV")

describe("ResetPasswordRoute", () => {
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
        <ResetPasswordRoute />
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
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { name: "password", value: "secretsecret" },
    })

    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { name: "passwordConfirmation", value: "secretsecret" },
    })

    fireEvent.submit(screen.getByText("Change My Password"))

    await waitFor(() => {
      expect(screen.getByText("Password Updated")).toBeInTheDocument()

      expect(mockResetPassword).toBeCalledWith({
        password: "secretsecret",
        passwordConfirmation: "secretsecret",
        resetPasswordToken: "token", // pragma: allowlist secret
      })

      expect(window.location.assign).toBeCalledWith("/login")
    })
  })
})
