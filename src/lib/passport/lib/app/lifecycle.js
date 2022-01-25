//
// Middleware functions that help control what happens before and after
// logging in or signing up.
//

const { capitalize } = require('underscore.string');
const forwardedFor = require('./forwarded_for');
// TODO: Remove let added for 'rewire'
let opts = require('../options');
// TODO: Remove let added for 'rewire'
let passport = require('passport');
const redirectBack = require('./redirectback');
// TODO: Remove let added for 'rewire'
let request = require('superagent');
const artsyXapp = require('@artsy/xapp');
const { parse, resolve } = require('url');

module.exports.onLocalLogin = function(req, res, next) {
  if (req.user && !req.xhr) {
    return next();
  }
  passport.authenticate('local-with-otp')(req, res, function(err) {
    if (req.xhr) {
      if (err) {
        return res.status(500).send({ success: false, error: err.message });
      } else {
        return next();
      }
    } else {
      if (err && err.response && err.response.body && err.response.body.error_description === 'invalid email or password') {
        return res.redirect(opts.loginPagePath + '?error=Invalid email or password.');
      } else if (err) {
        return next(err);
      } else {
        return next();
      }
    }
  });
};

module.exports.onLocalSignup = function(req, res, next) {
  req.artsyPassportSignedUp = true;
  request
    .post(opts.ARTSY_URL + '/api/v1/user')
    .set({
      'X-Xapp-Token': artsyXapp.token,
      'X-Forwarded-For': forwardedFor(req),
      'User-Agent': req.get('user-agent'),
      'Referer': req.get('referer')
    })
    .send({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      sign_up_intent: req.body.signupIntent,
      sign_up_referer: req.body.signupReferer,
      accepted_terms_of_service: req.body.accepted_terms_of_service,
      agreed_to_receive_emails: req.body.agreed_to_receive_emails,
      recaptcha_token: req.body.recaptcha_token
    }).end(function(err, sres) {
      let msg;
      if (err && (err.message === 'Email is invalid.')) {
        msg = "Email is invalid.";
        if (req.xhr) {
          return res.status(403).send({ success: false, error: msg });
        } else {
          return res.redirect(opts.signupPagePath + `?error=${msg}`);
        }
      } else if (err && req.xhr) {

        if (err && err.response && err.response.body && err.response.body.error) {
          msg = err.response.body.error
        } else if (err && err.response && err.response.body && err.response.body.message) {
          msg = err.response.body.message
        } else if (err.message) {
          msg = err.message
        }
        return res.status(500).send({ success: false, error: msg });
      } else if (err) {
        return next(new Error(err));
      } else {
        return next();
      }
  });
};

module.exports.beforeSocialAuth = provider => (function(req, res, next) {
  let options;
  req.session.redirectTo = req.query['redirect-to'];
  req.session.skipOnboarding = req.query['skip-onboarding'];
  req.session.sign_up_intent = req.query['signup-intent'];
  req.session.sign_up_referer = req.query['signup-referer'];
  // accepted_terms_of_service and agreed_to_receive_emails use underscores
  req.session.accepted_terms_of_service = req.query['accepted_terms_of_service'];
  req.session.agreed_to_receive_emails = req.query['agreed_to_receive_emails'];

  if (provider === 'apple') {
    options = {};
  } else {
    options = { scope: 'email' };
  }
  passport.authenticate(provider, options)(req, res, next);
});

module.exports.afterSocialAuth = provider => (function(req, res, next) {
  if (req.query.denied) { return next(new Error(`${provider} denied`)); }
  // Determine if we're linking the account and handle any Gravity errors
  // that we can do a better job explaining and redirecting for.
  const providerName = capitalize(provider);
  const linkingAccount = (req.user != null);
  passport.authenticate(provider)(req, res, function(err) {
    let msg;
    if (err && err.response && err.response.body && err.response.body.error === 'User Already Exists') {
      if (req.socialProfileEmail) {
        msg = `A user with the email address ${req.socialProfileEmail} already ` +
              "exists. Log in to Artsy via email and password and link " +
              `${providerName} in your settings instead.`;
      } else {
        msg = `${providerName} account previously linked to Artsy. ` +
              "Log in to your Artsy account via email and password and link " +
              `${providerName} in your settings instead.`;
      }
      return res.redirect(opts.loginPagePath + '?error=' + msg);
    } else if (err && err.response && err.response.body && err.response.body.error === 'Another Account Already Linked') {
      msg = `${providerName} account already linked to another Artsy account. ` +
            `Try logging out and back in with ${providerName}. Then consider ` +
            `deleting that user account and re-linking ${providerName}. `;
      return res.redirect(opts.settingsPagePath + '?error=' + msg);
    } else if (err && err.message && err.message.match('Unauthorized source IP address')) {
      msg = `Your IP address was blocked by ${providerName}.`;
      return res.redirect(opts.loginPagePath + '?error=' + msg);
    } else if (err != null) {
      msg = err.message || (typeof err.toString === 'function' ? err.toString() : undefined);
      return res.redirect(opts.loginPagePath + '?error=' + msg);
    } else if (linkingAccount) {
      return res.redirect(opts.settingsPagePath);
    } else {
      return next();
    }
  });
});

module.exports.ensureLoggedInOnAfterSignupPage = function(req, res, next) {
  const toLogin = `${opts.loginPagePath}?redirect-to=${opts.afterSignupPagePath}`;
  if (req.user == null) {
    res.redirect(toLogin);
  }
  next();
};

module.exports.onError = (err, req, res, next) => next(err);

module.exports.ssoAndRedirectBack = function(req, res, next) {
  if (req.xhr) {
    return res.send({
      success: true,
      user: req.user.toJSON()
    });
  }

  let parsed = parse(redirectBack(req));
  if (!parsed.hostname) {
    parsed = parse(resolve(opts.APP_URL, parsed.path));
  }

  const domain = parsed.hostname != null ? parsed.hostname.split('.').slice(1).join('.') : undefined;
  if (domain !== 'artsy.net') {
    return redirectBack(req, res);
  }
  request
    .post(`${opts.ARTSY_URL}/api/v1/me/trust_token`)
    .set({
      'X-Access-Token': req.user.get('accessToken',
      {'X-Forwarded-For': forwardedFor(req)})
    }).end(function(err, sres) {
      if (err) { return res.redirect(parsed.href); }
      res.redirect(`${opts.ARTSY_URL}/users/sign_in` +
        `?trust_token=${sres.body.trust_token}` +
        `&redirect_uri=${parsed.href}`
      );
  });
};
