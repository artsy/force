import { mount } from "enzyme"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { ConfirmPasswordModal } from "Components/ConfirmPasswordModal"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("Components/ConfirmPasswordModal/Mutations/ConfirmPassword", () => ({
  ConfirmPassword: jest.fn(),
}))

const ConfirmPassword = require("Components/ConfirmPasswordModal/Mutations/ConfirmPassword")
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
    mount(
      <MockBoot>
        <ConfirmPasswordModal onCancel={onCancel} onConfirm={onConfirm} show />
      </MockBoot>
    )

  it("requires password to submit", () => {
    const wrapper = getWrapper()
    const button = wrapper.find("button[type='submit']")
    button.simulate("submit")
    expect(button.props().disabled).toBeTruthy()
    expect(ConfirmPassword).not.toBeCalled()
  })

  it("calls onCancel when closing", () => {
    const wrapper = getWrapper()
    wrapper.find("button").first().simulate("click")
    expect(onCancel).toBeCalled()
  })

  it("calls ConfirmPassword and onConfirm on submit", async () => {
    const wrapper = getWrapper()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    wrapper
      .find("input[type='password']")
      .props()
      .onChange({
        // @ts-ignore
        currentTarget: { id: "password", value: "mypassword" },
      })
    wrapper.find("button[type='submit']").simulate("submit")
    await flushPromiseQueue()
    expect(ConfirmPassword).toBeCalledWith(expect.anything(), {
      password: "mypassword", // pragma: allowlist secret
    })
    expect(onConfirm).toBeCalled()
  })

  it("displays errors", async () => {
    ConfirmPassword.mockRejectedValue({ error: "Invalid password." })
    const wrapper = getWrapper()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    wrapper
      .find("input[type='password']")
      .props()
      .onChange({
        // @ts-ignore
        currentTarget: { id: "password", value: "mypassword" },
      })
    wrapper.find("button[type='submit']").simulate("submit")
    await flushPromiseQueue()
    expect(ConfirmPassword).toBeCalledWith(expect.anything(), {
      password: "mypassword", // pragma: allowlist secret
    })
    expect(onConfirm).not.toBeCalled()
    expect(wrapper.text()).toContain("Invalid password.")
  })
})
