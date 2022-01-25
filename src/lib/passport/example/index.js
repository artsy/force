const extend = require('lodash/extend');
const express = require('express');
const Backbone = require('backbone');
const sharify = require('sharify');
const backboneSuperSync = require('backbone-super-sync');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const logger = require('morgan');
const artsyXapp = require('@artsy/xapp');
const artsyPassport = require('../');
const config = require('../config');

// CurrentUser class
class CurrentUser extends Backbone.Model {
  url() {
    return `${config.ARTSY_URL}/api/v1/me`;
  }

  sync(method, model, options) {
    if (options == null) {
      options = {};
    }
    if (options.headers == null) {
      options.headers = {};
    }
    options.headers['X-Access-Token'] = this.get('accessToken');
    return super.sync(...arguments);
  }

  unlink(options) {
    const auth = new Backbone.Model({id: 'foo'});
    auth.url = `${config.ARTSY_URL}/api/v1/me/authentications/${options.provider}`;
    return auth.destroy({
      headers: { 'X-Access-Token': this.get('accessToken') },
      error: options.error,
      success: () => this.fetch(options)
    });
  }
}

sharify.data = config;

const setup = function(app) {

  app.use(sharify);

  Backbone.sync = backboneSuperSync;

  app.set('views', __dirname);
  app.set('view engine', 'jade');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
    secret: 'super-secret',
    key: 'artsy-passport'
  }));
  app.use(logger('dev'));

  app.use(express.static(__dirname + '/public'));

  // Setup Artsy Passport
  app.use(artsyPassport(extend(config, { CurrentUser })));
  const {
    afterSignupPagePath,
    loginPagePath,
    logoutPath,
    settingsPagePath,
  } = artsyPassport.options;

  // App specific routes that render a login/signup form and logged in view
  app.get('(/|/log_in|/sign_up|/user/edit)', function(req, res) {
    if (req.user != null) { return res.render('loggedin'); } else { return res.render('login'); }
  });
  app.get(afterSignupPagePath, (req, res) => res.render('personalize'));

  // Potential candidates to be first class in AP. Delete, unlink account,
  // and reset password handlers
  app.get('/deleteaccount', function(req, res, next) {
    if (req.user == null) { return next(); }
    return req.user.destroy({
      error(m, e) { return next(e); },
      success() { return res.redirect(logoutPath); }
    });
  });

  app.get('/unlink/:provider', (req, res, next) => req.user.unlink({
    provider: req.params.provider,
    error(m, e) { return next(e); },
    success(user, r) {
      return req.login(user, function(err) {
        if (err) { return next(err); }
        return res.redirect(settingsPagePath);
      });
    }
  }));

  app.post('/reset', function(req, res, next) {
    const reset = new Backbone.Model;
    reset.url = `${config.ARTSY_URL}/api/v1/users/send_reset_password_instructions`;
    return reset.save({ email: req.body.email }, {
      headers: { 'X-Xapp-Token': artsyXapp.token },
      error(m, e) { return next(e); },
      success(m, r) { return res.redirect('/newpassword'); }
    });
  });

  app.get('/newpassword', (req, res, next) => res.render('newpassword'));
  app.post('/newpassword', function(req, res, next) {
    const reset = new Backbone.Model({ id: 'foo' });
    reset.url = `${config.ARTSY_URL}/api/v1/users/reset_password`;
    reset.save(req.body, {
      headers: { 'X-Xapp-Token': artsyXapp.token },
      error(m, e) {
        next(e);
      },
      success() {
        res.redirect(loginPagePath);
      }
    });
  });

  app.get('/nocsrf', (req, res) => res.render('nocsrf'));

  // Error handler
  app.use(function(err, req, res, next) {
    console.warn(err.stack);

    let error;
    if (err && err.response && err.response.body && err.response.body.error) {
      error = err.response.body.error
    } else if (err && err.stack) {
      error = err.stack
    }

    res.render('error', { err: error });
  });

  // Start server
  if (module !== require.main) {
    return;
  }

  artsyXapp.on('error', function(e) {
    console.warn(e);
    process.exit(1);
  }).init({
    url: config.ARTSY_URL,
    id: config.ARTSY_ID,
    secret: config.ARTSY_SECRET
  }, () => {
      app.listen(4000, () => console.log(`Example listening on ${4000}`))
  });
};

const app = (module.exports = express());
setup(app);
