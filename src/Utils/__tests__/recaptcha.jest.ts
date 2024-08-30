import { recaptcha } from "Utils/recaptcha"
jest.mock("sharify", () => ({ data: jest.fn() }))
const sd = require("sharify").data

describe("repcaptcha", () => {
  beforeEach(() => {
    window.grecaptcha.execute.mockClear()
    window.grecaptcha.ready.mockClear()
    sd.RECAPTCHA_KEY = "recaptcha-api-key"
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

  it("Still calls the callback if firing action fails", async () => {
    window.grecaptcha.execute.mockRejectedValueOnce(new Error("google failed"))
    const action = jest.fn()

    await recaptcha("signup_submit")

    action()
    expect(action).toBeCalled()
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "signup_submit",
    })
  })

  it("Fires the callback but no action if sd.RECAPTCHA_KEY is missing", async () => {
    sd.RECAPTCHA_KEY = ""
    const action = jest.fn()

    await recaptcha("signup_submit")

    action()
    expect(action).toBeCalled()
    expect(window.grecaptcha.ready).not.toBeCalled()
    expect(window.grecaptcha.execute).not.toBeCalled()
  })
})
