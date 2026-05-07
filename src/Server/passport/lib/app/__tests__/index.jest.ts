describe("passport app setup", () => {
  const loadSetup = () => {
    jest.resetModules()

    const app = {
      delete: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
      use: jest.fn(),
    }
    const csrfMiddleware = jest.fn()
    const csrf = jest.fn(() => csrfMiddleware)
    const passport = {
      initialize: jest.fn(() => jest.fn()),
      session: jest.fn(() => jest.fn()),
    }

    jest.doMock("express", () => jest.fn(() => app))
    jest.doMock("passport", () => passport)
    jest.doMock("csurf", () => csrf)
    jest.doMock("../../options", () => ({
      appleCallbackPath: "/users/auth/apple/callback",
      applePath: "/users/auth/apple",
      facebookCallbackPath: "/users/auth/facebook/callback",
      facebookPath: "/users/auth/facebook",
      googleCallbackPath: "/users/auth/google/callback",
      googleOneTapCallbackPath: "/users/auth/google_one_tap/callback",
      googlePath: "/users/auth/google",
      loginPagePath: "/log_in",
      logoutPath: "/users/sign_out",
      signupPagePath: "/sign_up",
    }))
    jest.doMock("../analytics", () => ({
      setCampaign: jest.fn(),
      trackLogin: jest.fn(),
      trackSignup: jest.fn(() => jest.fn()),
    }))
    jest.doMock("../lifecycle", () => ({
      afterSocialAuth: jest.fn(() => jest.fn()),
      beforeSocialAuth: jest.fn(() => jest.fn()),
      onError: jest.fn(),
      onLocalLogin: jest.fn(),
      onLocalSignup: jest.fn(),
      ssoAndRedirectBack: jest.fn(),
    }))
    jest.doMock("../locals", () => jest.fn())
    jest.doMock("../logout", () => ({
      denyBadLogoutLinks: jest.fn(),
      logout: jest.fn(),
    }))
    jest.doMock("../token_login", () => ({
      headerLogin: jest.fn(),
      trustTokenLogin: jest.fn(),
    }))

    const setupApp = require("../index")

    return { app, csrf, csrfMiddleware, setupApp }
  }

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it("requires csrf verification for signup posts", () => {
    const { app, csrf, csrfMiddleware, setupApp } = loadSetup()

    setupApp()

    const signupPost = app.post.mock.calls.find(([path]) => path === "/sign_up")

    expect(signupPost).toBeDefined()
    expect(signupPost[1]).toBe(csrfMiddleware)
    expect(csrf).toHaveBeenCalledWith({ cookie: true })
  })

  it("registers the google one tap callback route", () => {
    const { app, setupApp } = loadSetup()

    setupApp()

    const oneTapPost = app.post.mock.calls.find(
      ([path]) => path === "/users/auth/google_one_tap/callback",
    )

    expect(oneTapPost).toBeDefined()
  })
})
