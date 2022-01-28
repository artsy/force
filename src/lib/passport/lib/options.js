module.exports = {
  // Social auth
  applePath: "/users/auth/apple",
  appleCallbackPath: "/users/auth/apple/callback",
  facebookPath: "/users/auth/facebook",
  facebookCallbackPath: "/users/auth/facebook/callback",

  // Landing pages
  loginPagePath: "/log_in",
  signupPagePath: "/sign_up",
  settingsPagePath: "/user/edit",
  afterSignupPagePath: "/personalize",

  // Misc
  logoutPath: "/users/sign_out",
  userKeys: [
    "id",
    "type",
    "name",
    "email",
    "phone",
    "lab_features",
    "default_profile_id",
    "has_partner_access",
    "collector_level",
    "recaptcha_token",
    "roles",
  ],
}
