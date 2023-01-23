import {
  login,
  forgotPassword,
  signUp,
  resetPassword,
  logout,
} from "Utils/auth"

jest.mock("sharify", () => ({
  data: {
    API_URL: "https://api.artsy.net",
    APP_URL: "https://www.artsy.net",
    SESSION_ID: "session_id",
    ARTSY_XAPP_TOKEN: "artsy_xapp_token",
    AP: {
      loginPagePath: "/login",
      signupPagePath: "/signup",
      logoutPath: "/users/sign_out",
    },
  },
}))

describe("login", () => {
  it("makes the correct request", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, user: { id: "example" } }),
      })
    )

    // @ts-ignore
    global.fetch = mockFetch

    const res = await login({
      email: "example@example.com",
      password: "secret",
      authenticationCode: "code",
    })

    expect(mockFetch).toBeCalledWith("https://www.artsy.net/login", {
      body:
        '{"email":"example@example.com","password":"secret","otp_attempt":"code","otpRequired":true,"session_id":"session_id"}',
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "POST",
    })

    expect(res).toEqual({ success: true, user: { id: "example" } })
  })
})

describe("forgotPassword", () => {
  it("makes the correct request", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    )

    // @ts-ignore
    global.fetch = mockFetch

    const res = await forgotPassword({ email: "example@example" })

    expect(mockFetch).toBeCalledWith(
      "https://api.artsy.net/api/v1/users/send_reset_password_instructions",
      {
        body: '{"email":"example@example","session_id":"session_id"}',
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XAPP-TOKEN": "artsy_xapp_token",
        },
        method: "POST",
      }
    )

    expect(res).toEqual({ success: true })
  })

  it("parses the error JSON and rejects with the message", () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve(JSON.stringify({ error: "error message" })),
      })
    )

    // @ts-ignore
    global.fetch = mockFetch

    return expect(forgotPassword({ email: "example@example" })).rejects.toEqual(
      new Error("error message")
    )
  })
})

describe("resetPassword", () => {
  it("makes the correct request", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    )

    // @ts-ignore
    global.fetch = mockFetch

    const res = await resetPassword({
      password: "secret", // pragma: allowlist secret
      passwordConfirmation: "secret", // pragma: allowlist secret
      resetPasswordToken: "token", // pragma: allowlist secret
    })

    expect(mockFetch).toBeCalledWith(
      "https://api.artsy.net/api/v1/users/reset_password",
      {
        body:
          '{"password":"secret","password_confirmation":"secret","reset_password_token":"token"}',
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XAPP-TOKEN": "artsy_xapp_token",
        },
        method: "PUT",
      }
    )

    expect(res).toEqual({ success: true })
  })
})

describe("signUp", () => {
  it("makes the correct request", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    )

    // @ts-ignore
    global.fetch = mockFetch

    const res = await signUp({
      name: "Example Example",
      email: "example@example.com",
      password: "secret",
      agreedToReceiveEmails: true,
    })

    expect(mockFetch).toBeCalledWith("https://www.artsy.net/signup", {
      body:
        '{"agreed_to_receive_emails":true,"accepted_terms_of_service":true,"email":"example@example.com","name":"Example Example","password":"secret","session_id":"session_id"}',
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "POST",
    })

    expect(res).toEqual({ success: true })
  })

  describe("logout", () => {
    it("makes the correct request", async () => {
      const mockFetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ msg: "success" }),
        })
      )

      // @ts-ignore
      global.fetch = mockFetch

      await logout()

      expect(mockFetch).toBeCalledWith("https://www.artsy.net/users/sign_out", {
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "DELETE",
      })
    })
  })
})
