import { login, resetPassword, signUp } from "../auth"

jest.mock("sharify", () => ({
  data: {
    API_URL: "https://api.artsy.net",
    APP_URL: "https://www.artsy.net",
    SESSION_ID: "session_id",
    ARTSY_XAPP_TOKEN: "artsy_xapp_token",
    AP: { loginPagePath: "/login", signupPagePath: "/signup" },
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
        '{"email":"example@example.com","password":"secret","otp_attempt":"code","session_id":"session_id"}',
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

    const res = await resetPassword({ email: "example@example" })

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
    })

    expect(mockFetch).toBeCalledWith("https://www.artsy.net/signup", {
      body:
        '{"name":"Example Example","email":"example@example.com","password":"secret","session_id":"session_id","accepted_terms_of_service":true}',
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
})
