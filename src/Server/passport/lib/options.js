module.exports = {
  // Social auth
  applePath: "/users/auth/apple",
  appleCallbackPath: "/users/auth/apple/callback",
  facebookPath: "/users/auth/facebook",
  facebookCallbackPath: "/users/auth/facebook/callback",
  googlePath: "/users/auth/google",
  googleCallbackPath: "/users/auth/google/callback",

  // Landing pages
  loginPagePath: "/log_in",
  signupPagePath: "/sign_up",
  settingsPagePath: "/settings",
  afterSignupPagePath: "/",

  // Misc
  logoutPath: "/users/sign_out",
  userKeys: [
    "collector_level",
    "default_profile_id",
    "email",
    "has_partner_access",
    "id",
    "lab_features",
    "length_unit_preference",
    "name",
    "phone",
    "recaptcha_token",
    "roles",
    "type",
  ],
}
