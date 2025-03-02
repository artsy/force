/**
 * Module dependencies.
 */
const passport = require("passport-strategy"),
  util = require("util"),
  lookup = require("./utils").lookup

/**
 * `Strategy` constructor.
 *
 * The local-with-otp authentication strategy authenticates requests based on the
 * credentials submitted through an HTML-based login form.
 *
 * Applications must supply a `verify` callback which accepts `username`, `password`
 * and `otp` credentials, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurred, `err` should be set.
 *
 * Optionally, `options` can be used to change the fields in which the
 * credentials are found.
 *
 * Options:
 *   - `usernameField`  field name where the username is found, defaults to _username_
 *   - `passwordField`  field name where the password is found, defaults to _password_
 *   - `otpField`      field name where the time-based one-time-password is found, defaults to _otp_
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *     passport.use(new LocalWithOtpStrategy(
 *       function(username, password, otp, done) {
 *         User.findOne({ username: username, password: password, otp: otp }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options == "function") {
    verify = options
    options = {}
  }
  if (!verify) {
    throw new TypeError("LocalWithOtpStrategy requires a verify callback")
  }

  this._usernameField = options.usernameField || "username"
  this._passwordField = options.passwordField || "password"
  this._otpField = options.otpField || "otp"

  passport.Strategy.call(this)
  this.name = "local-with-otp"
  this._verify = verify
  this._passReqToCallback = options.passReqToCallback
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy)

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function (req, options) {
  options = options || {}
  const username =
    lookup(req.body, this._usernameField) ||
    lookup(req.query, this._usernameField)
  const password =
    lookup(req.body, this._passwordField) ||
    lookup(req.query, this._passwordField)
  const otp =
    lookup(req.body, this._otpField) || lookup(req.query, this._otpField)

  if (!username || !password) {
    return this.fail(
      { message: options.badRequestMessage || "Missing credentials" },
      400,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this

  function verified(err, user, info) {
    if (err) {
      return self.error(err)
    }
    if (!user) {
      return self.fail(info)
    }
    self.success(user, info)
  }

  try {
    if (self._passReqToCallback) {
      this._verify(req, username, password, otp, verified)
    } else {
      this._verify(username, password, otp, verified)
    }
  } catch (ex) {
    return self.error(ex)
  }
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy
