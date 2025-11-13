import { getENV } from "Utils/getENV"
import { recaptcha } from "Utils/recaptcha"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(() => "recaptcha-api-key"),
}))

describe("repcaptcha", () => {
  beforeEach(() => {
    window.grecaptcha.execute.mockClear()
    window.grecaptcha.ready.mockClear()
  })

  it("fires an action", () => {
    recaptcha("login_submit")
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "login_submit",
    })
  })

  it("fires an action with callback", async () => {
    const action = jest.fn()

    const token = await recaptcha("signup_submit")

    action(token)
    expect(action).toBeCalledWith("recaptcha-token")
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "signup_submit",
    })
  })

  it("rejects if sd.RECAPTCHA_KEY is missing", async () => {
    ;(getENV as jest.Mock).mockImplementation(() => undefined)

    const action = jest.fn()

    try {
      await recaptcha("signup_submit")
    } catch (_err) {
      action()
    }

    expect(action).toBeCalled()
    expect(window.grecaptcha.ready).not.toBeCalled()
    expect(window.grecaptcha.execute).not.toBeCalled()
  })
})
