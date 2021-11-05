import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { flushPromiseQueue, MockBoot } from "v2/DevTools"
import { mockLocation, resetMockLocation } from "v2/DevTools/mockLocation"
import { useRouter } from "v2/System/Router/useRouter"
import { resetPassword } from "v2/Utils/auth"
import { ResetPasswordRoute } from "../ResetPasswordRoute"

jest.mock("v2/System/Router/useRouter")
jest.mock("v2/Utils/auth")

describe("ResetPasswordRoute", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockResetPassword = resetPassword as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            reset_password_token: "token", // pragma: allowlist secret
          },
        },
      },
    }))

    mockResetPassword.mockImplementation(() => {
      return Promise.resolve()
    })

    mockLocation()

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
      target: { name: "password", value: "secret" },
    })

    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { name: "passwordConfirmation", value: "secret" },
    })

    fireEvent.submit(screen.getByText("Change My Password"))

    await flushPromiseQueue()

    expect(screen.getByText("Password Updated")).toBeInTheDocument()

    expect(mockResetPassword).toBeCalledWith({
      password: "secret",
      passwordConfirmation: "secret",
      resetPasswordToken: "token", // pragma: allowlist secret
    })

    expect(window.location.assign).toBeCalledWith("/login")
  })
})
