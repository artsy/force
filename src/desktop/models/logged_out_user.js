/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _LoggedOutUser, needle;
const _ = require('underscore');
const Cookies = require('cookies-js');
const Backbone = require('backbone');
const { API_URL, APP_URL, SESSION_ID } = require('sharify').data;
const { User } = require('./user');
const sd = require('sharify').data;
const IS_TEST_ENV = (needle = require('sharify').data.NODE_ENV, !['production', 'staging', 'development'].includes(needle));

const syncWithSessionId = function() {
  if (!Backbone.__SESSION_SYNC_WRAPPED__ && !IS_TEST_ENV) {
    const data = {session_id: SESSION_ID};

    Backbone.__SESSION_SYNC_WRAPPED__ = true;

    return Backbone.sync = _.wrap(Backbone.sync, function(sync, method, model, options) {
      if (options == null) { options = {}; }
      switch (method) {
        case 'read':
          options.data = _.extend(options.data || {}, data);
          break;
        case 'delete':
          options.processData = true;
          options.data = data;
          break;
        default:
          this.set(data, {silent: true});
      }

      return sync(method, model, options);
    });
  }
};

export default (_LoggedOutUser = (function() {
  _LoggedOutUser = class LoggedOutUser extends User {
    static initClass() {
      this.prototype.__isLoggedIn__ = false;
      this.prototype.__isRecentlyRegistered__ = false;

      this.prototype.defaults =
        {_csrf: Cookies && Cookies.get && Cookies.get('CSRF_TOKEN' || undefined)};

      this.prototype.register = this.prototype.signup;
    }

    constructor(...args) {
      super(...args)
    }

    initialize() {
      return syncWithSessionId();
    }

    url() {
      if (this.isLoggedIn()) {
        return `${API_URL}/api/v1/me`;
      } else if (this.id != null) {
        return `${API_URL}/api/v1/me/anonymous_session/${this.id}`;
      } else {
        return `${API_URL}/api/v1/me/anonymous_session`;
      }
    }

    fetch(options) {
      if (options == null) { options = {}; }
      if (this.isLoggedIn() || (this.id != null)) {
        options.data = _.extend(options.data || {}, this.pick('email'));
        return super.fetch(options);
      } else {
        return new Backbone.Collection()
          .fetch(_.extend({}, options, {
            url: `${API_URL}/api/v1/me/anonymous_sessions`,
            data: _.extend(options.data || {}, this.pick('email')),
            success: _.wrap(options.success, (success, ...args) => {
              const collection = args[0];
              if (collection.length) { this.set(collection.first().toJSON()); }
              return (typeof success === 'function' ? success(...Array.from(args || [])) : undefined);
            })
          }
          )
        );
      }
    }

    login(options) {
      if (options == null) { options = {}; }
      return new Backbone.Model()
        .save(this.pick('email', 'password', 'otp_attempt', '_csrf'), _.extend({}, options, {
          url: `${APP_URL}${sd.AP.loginPagePath}`,
          success: _.wrap(options.success, (success, model, response, options) => {
            this.__isLoggedIn__ = true;
            if (options.trigger_login !== false) { this.trigger('login'); }
            this.unset('password'); // Avoid 403 error on subsequent saves
            $.ajaxSettings.headers = _.extend(($.ajaxSettings.headers || {}),
              {'X-ACCESS-TOKEN': response.user.accessToken});
            return (typeof success === 'function' ? success(model, response, options) : undefined);
          })
        }
        )
      );
    }

    signup(options) {
      if (options == null) { options = {}; }
      return new Backbone.Model()
        .save(this.pick(
          'name',
          'email',
          'password',
          '_csrf',
          'signupIntent',
          'signupReferer',
          'accepted_terms_of_service',
          'agreed_to_receive_emails',
          'recaptcha_token'
        ), _.extend({}, options, {
          url: `${APP_URL}${sd.AP.signupPagePath}`,
          success: () => {
            this.__isRecentlyRegistered__ = true;
            this.trigger('signup');
            return this.login(_.pick(options, 'success', 'error', 'trigger_login'));
          }
        }
        )
      );
    }

    forgot(options) {
      if (options == null) { options = {}; }
      const attrs = this.pick('email');
      attrs.reset_password_redirect_to = sd.RESET_PASSWORD_REDIRECT_TO || null;
      attrs.mode = sd.SET_PASSWORD === 'true' ? 'fair_set_password' : sd.SET_PASSWORD || null;

      return new Backbone.Model()
        .save(attrs, _.extend({}, options, {
          url: `${API_URL}/api/v1/users/send_reset_password_instructions`,
          success: _.wrap(options.success, (success, ...args) => typeof success === 'function' ? success(...Array.from(args || [])) : undefined)
        }
        )
      );
    }

    repossess(subsequent_user_id, options) {
      // Only valid for recently logged in LoggedOutUsers
      if (options == null) { options = {}; }
      if (!this.isLoggedIn()) { return Promise.resolve(); }
      const edit = new Backbone.Model(_.extend({ subsequent_user_id }, this.pick('id')));
      return Promise.resolve(edit.save(null, _.extend(options, {url: `${API_URL}/api/v1/me/anonymous_session/${this.id}`})));
    }

    findOrCreate(options) {
      if (options == null) { options = {}; }
      return Promise.resolve(this.save({}, options));
    }
  };
  _LoggedOutUser.initClass();
  return _LoggedOutUser;
})());
export const LoggedOutUser = _LoggedOutUser
