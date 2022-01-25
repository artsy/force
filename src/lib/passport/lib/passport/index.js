//
// Runs Passport.js setup code including mounting strategies, serializers, etc.
//

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const AppleStrategy = require('passport-apple');
const LocalWithOtpStrategy = require('@artsy/passport-local-with-otp').Strategy;
const callbacks = require('./callbacks');
const { serialize, deserialize } = require('./serializers');
const opts = require('../options');

module.exports = function() {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalWithOtpStrategy(
    {
      usernameField: 'email',
      otpField: 'otp_attempt',
      passReqToCallback: true
    },
    callbacks.local
    )
  );

  if (opts.FACEBOOK_ID && opts.FACEBOOK_SECRET) {
    passport.use(new FacebookStrategy(
      {
        state: true,
        clientID: opts.FACEBOOK_ID,
        clientSecret: opts.FACEBOOK_SECRET,
        passReqToCallback: true,
        callbackURL: `${opts.APP_URL}${opts.facebookCallbackPath}`
      },
      callbacks.facebook
    )
    );
  }

  if (opts.APPLE_CLIENT_ID && opts.APPLE_TEAM_ID &&
     opts.APPLE_KEY_ID && opts.APPLE_PRIVATE_KEY) {
    passport.use(new AppleStrategy(
      {
        clientID: opts.APPLE_CLIENT_ID,
        teamID: opts.APPLE_TEAM_ID,
        keyID: opts.APPLE_KEY_ID,
        privateKeyString: opts.APPLE_PRIVATE_KEY,
        passReqToCallback: true,
        callbackURL: `${opts.APP_URL}${opts.appleCallbackPath}`,
        scope: ['name', 'email']
      },
      callbacks.apple
    ));
  }
};
