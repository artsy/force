describe("passport setup", () => {
  const loadSetup = (options: Record<string, string | undefined> = {}) => {
    jest.resetModules()

    const passport = {
      deserializeUser: jest.fn(),
      serializeUser: jest.fn(),
      use: jest.fn(),
    }
    const FacebookStrategy = jest.fn()
    const GoogleStrategy = jest.fn()
    const AppleStrategy = jest.fn()
    const LocalWithOtpStrategy = jest.fn()
    const callbacks = {
      apple: jest.fn(),
      facebook: jest.fn(),
      google: jest.fn(),
      local: jest.fn(),
    }
    const serializers = {
      deserialize: jest.fn(),
      serialize: jest.fn(),
    }

    jest.doMock("passport", () => passport)
    jest.doMock("passport-facebook", () => ({ Strategy: FacebookStrategy }))
    jest.doMock("passport-google-oauth20", () => ({
      Strategy: GoogleStrategy,
    }))
    jest.doMock("passport-apple", () => AppleStrategy)
    jest.doMock("Server/passport-local-with-otp/lib", () => ({
      Strategy: LocalWithOtpStrategy,
    }))
    jest.doMock("../callbacks", () => callbacks)
    jest.doMock("../serializers", () => serializers)
    jest.doMock("../../options", () => ({
      APP_URL: "https://www.artsy.net",
      appleCallbackPath: "/users/auth/apple/callback",
      facebookCallbackPath: "/users/auth/facebook/callback",
      googleCallbackPath: "/users/auth/google/callback",
      ...options,
    }))

    const setupPassport = require("../index")

    return {
      AppleStrategy,
      FacebookStrategy,
      GoogleStrategy,
      LocalWithOtpStrategy,
      callbacks,
      passport,
      serializers,
      setupPassport,
    }
  }

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it("always registers local auth and serializers", () => {
    const {
      callbacks,
      LocalWithOtpStrategy,
      passport,
      serializers,
      setupPassport,
    } = loadSetup()

    setupPassport()

    expect(passport.serializeUser).toHaveBeenCalledWith(serializers.serialize)
    expect(passport.deserializeUser).toHaveBeenCalledWith(
      serializers.deserialize,
    )
    expect(LocalWithOtpStrategy).toHaveBeenCalledWith(
      {
        otpField: "otp_attempt",
        passReqToCallback: true,
        usernameField: "email",
      },
      callbacks.local,
    )
    expect(passport.use).toHaveBeenCalledTimes(1)
  })

  it("registers social strategies when their required options are present", () => {
    const {
      AppleStrategy,
      callbacks,
      FacebookStrategy,
      GoogleStrategy,
      passport,
      setupPassport,
    } = loadSetup({
      APPLE_CLIENT_ID: "apple-client-id",
      APPLE_KEY_ID: "apple-key-id",
      APPLE_PRIVATE_KEY: "apple-private-key", // pragma: allowlist secret
      APPLE_TEAM_ID: "apple-team-id",
      FACEBOOK_ID: "facebook-id",
      FACEBOOK_SECRET: "facebook-secret",
      GOOGLE_CLIENT_ID: "google-client-id",
      GOOGLE_SECRET: "google-secret",
    })

    setupPassport()

    expect(FacebookStrategy).toHaveBeenCalledWith(
      {
        callbackURL: "https://www.artsy.net/users/auth/facebook/callback",
        clientID: "facebook-id",
        clientSecret: "facebook-secret",
        passReqToCallback: true,
        state: true,
      },
      callbacks.facebook,
    )
    expect(GoogleStrategy).toHaveBeenCalledWith(
      {
        callbackURL: "https://www.artsy.net/users/auth/google/callback",
        clientID: "google-client-id",
        clientSecret: "google-secret",
        passReqToCallback: true,
        scope: ["profile", "email"],
        state: true,
      },
      callbacks.google,
    )
    expect(AppleStrategy).toHaveBeenCalledWith(
      {
        callbackURL: "https://www.artsy.net/users/auth/apple/callback",
        clientID: "apple-client-id",
        keyID: "apple-key-id",
        passReqToCallback: true,
        privateKeyString: "apple-private-key", // pragma: allowlist secret
        scope: ["name", "email"],
        teamID: "apple-team-id",
      },
      callbacks.apple,
    )
    expect(passport.use).toHaveBeenCalledTimes(4)
  })
})
