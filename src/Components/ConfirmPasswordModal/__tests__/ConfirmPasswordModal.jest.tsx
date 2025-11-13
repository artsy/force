import { ConfirmPasswordModal } from "Components/ConfirmPasswordModal"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { MockBoot } from "DevTools/MockBoot"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("Components/ConfirmPasswordModal/Mutations/ConfirmPassword", () => ({
  ConfirmPassword: jest.fn(),
}))

const ConfirmPassword =
  require("Components/ConfirmPasswordModal/Mutations/ConfirmPassword")
    .ConfirmPassword as jest.Mock

describe("ConfirmPasswordModal", () => {
  let onCancel
  let onConfirm

  beforeEach(() => {
    onCancel = jest.fn()
    onConfirm = jest.fn()
    ConfirmPassword.mockClear()
    ConfirmPassword.mockResolvedValue({
      confirmPassword: {
        valid: true,
      },
    })
  })

  const getWrapper = () =>
    render(
      <MockBoot>
        <ConfirmPasswordModal onCancel={onCancel} onConfirm={onConfirm} show />
      </MockBoot>
    )

  it("requires password to submit", () => {
    getWrapper()
    const button = screen.getByRole("button", { name: "Confirm" })
    fireEvent.submit(button)
    expect(button).toBeDisabled()
    expect(ConfirmPassword).not.toBeCalled()
  })

  it("calls onCancel when closing", () => {
    getWrapper()
    const buttons = screen.getAllByRole("button")
    fireEvent.click(buttons[0])
    expect(onCancel).toBeCalled()
  })

  it("calls ConfirmPassword and onConfirm on submit", async () => {
    getWrapper()

    const passwordInput = screen.getByPlaceholderText("Enter your password")
    fireEvent.change(passwordInput, { target: { value: "mypassword" } })

    const submitButton = screen.getByRole("button", { name: "Confirm" })
    fireEvent.submit(submitButton)

    await flushPromiseQueue()

    expect(ConfirmPassword).toBeCalledWith(expect.anything(), {
      password: "mypassword", // pragma: allowlist secret
    })
    expect(onConfirm).toBeCalled()
  })

  it("displays errors", async () => {
    ConfirmPassword.mockRejectedValue({ error: "Invalid password." })
    getWrapper()

    const passwordInput = screen.getByPlaceholderText("Enter your password")
    fireEvent.change(passwordInput, { target: { value: "mypassword" } })

    const submitButton = screen.getByRole("button", { name: "Confirm" })
    fireEvent.submit(submitButton)

    await flushPromiseQueue()

    expect(ConfirmPassword).toBeCalledWith(expect.anything(), {
      password: "mypassword", // pragma: allowlist secret
    })
    expect(onConfirm).not.toBeCalled()
    expect(screen.getByText("Invalid password.")).toBeInTheDocument()
  })
})
