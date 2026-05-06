import passport from "passport"
import AppleStrategy from "passport-apple"
import { Strategy as FacebookStrategy } from "passport-facebook"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { GoogleOneTapStrategy } from "passport-google-one-tap"
import opts from "../options"
import { apple, facebook, google, googleOneTap, local } from "./callbacks"
import { deserialize, serialize } from "./serializers"

const LocalWithOtpStrategy =
  require("Server/passport-local-with-otp/lib").Strategy

//
// Runs Passport.js setup code including mounting strategies, serializers, etc.
//
const setupPassport = () => {
  passport.serializeUser(serialize)
  passport.deserializeUser(deserialize)
  passport.use(
    new LocalWithOtpStrategy(
      {
        usernameField: "email",
        otpField: "otp_attempt",
        passReqToCallback: true,
      },
      local,
    ),
  )

  if (opts.FACEBOOK_ID && opts.FACEBOOK_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          state: true,
          clientID: opts.FACEBOOK_ID,
          clientSecret: opts.FACEBOOK_SECRET,
          passReqToCallback: true,
          callbackURL: `${opts.APP_URL}${opts.facebookCallbackPath}`,
        },
        facebook,
      ),
    )
  }

  if (opts.GOOGLE_CLIENT_ID && opts.GOOGLE_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          state: true,
          clientID: opts.GOOGLE_CLIENT_ID,
          clientSecret: opts.GOOGLE_SECRET,
          passReqToCallback: true,
          callbackURL: `${opts.APP_URL}${opts.googleCallbackPath}`,
          scope: ["profile", "email"],
        },
        google,
      ),
    )
    passport.use(
      new GoogleOneTapStrategy(
        {
          clientID: opts.GOOGLE_CLIENT_ID,
          clientSecret: opts.GOOGLE_SECRET,
          verifyCsrfToken: false,
          passReqToCallback: true,
        },
        googleOneTap,
      ),
    )
  }

  if (
    opts.APPLE_CLIENT_ID &&
    opts.APPLE_TEAM_ID &&
    opts.APPLE_KEY_ID &&
    opts.APPLE_PRIVATE_KEY
  ) {
    passport.use(
      new AppleStrategy(
        {
          clientID: opts.APPLE_CLIENT_ID,
          teamID: opts.APPLE_TEAM_ID,
          keyID: opts.APPLE_KEY_ID,
          privateKeyString: opts.APPLE_PRIVATE_KEY,
          passReqToCallback: true,
          callbackURL: `${opts.APP_URL}${opts.appleCallbackPath}`,
          scope: ["name", "email"],
        },
        apple,
      ),
    )
  }
}

export default setupPassport

module.exports = setupPassport
