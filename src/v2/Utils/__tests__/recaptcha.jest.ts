import { recaptcha } from "../recaptcha"
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

  it("fires an action with callback", done => {
    const action = jest.fn()
    const callback = jest.fn(token => {
      action(token)
      expect(action).toBeCalledWith("recaptcha-token")
      done()
    })

    recaptcha("signup_submit", callback)
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "signup_submit",
    })
  })

  it("Still calls the callback if firing action fails", done => {
    window.grecaptcha.execute.mockRejectedValueOnce(new Error("google failed"))
    const action = jest.fn()
    const callback = jest.fn(() => {
      action()
      expect(action).toBeCalled()
      done()
    })

    recaptcha("signup_submit", callback)
    expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
      action: "signup_submit",
    })
  })

  it("Fires the callback but no action if sd.RECAPTCHA_KEY is missing", done => {
    sd.RECAPTCHA_KEY = ""
    const action = jest.fn()
    const callback = jest.fn(() => {
      action()
      expect(action).toBeCalled()
      done()
    })

    recaptcha("signup_submit", callback)
    expect(window.grecaptcha.ready).not.toBeCalled()
    expect(window.grecaptcha.execute).not.toBeCalled()
  })
})
