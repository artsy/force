/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _User;
const _ = require('underscore');
const Backbone = require('backbone');
const { SESSION_ID } = require('sharify').data;
const { Geo } = require('./mixins/geo');
const { UserRelations } = require('./mixins/relations/user');

// Base User model for shared functionality between
// CurrentUser and LoggedOutUser
export default (_User = (function() {
  _User = class User extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Geo);
      _.extend(this.prototype, UserRelations);

      this.prototype.priceBuckets = [
        { display: 'Under $500', value: '-1:500' },
        { display: 'Under $2,500', value: '-1:2500' },
        { display: 'Under $5,000', value: '-1:5000' },
        { display: 'Under $10,000', value: '-1:10000' },
        { display: 'Under $25,000', value: '-1:25000' },
        { display: 'Under $50,000', value: '-1:50000' },
        { display: 'Under $100,000', value: '-1:100000' },
        { display: 'No budget in mind', value: '-1:1000000000000' }
      ];
    }

    // This refreshes the user data in the session so that saved data
    // will stay in sync on reloads
    refresh(options) {
      if (options == null) { options = {}; }
      return this.fetch(_.extend({url: '/user/refresh'}, options));
    }

    isCollector() {
      return (this.get('collector_level') >= 3) ||
      this.related().collectorProfile.isCollector();
    }

    isCommercial() {
      return (this.get('collector_level') >= 2) ||
      this.related().collectorProfile.isCommercial();
    }

    isAttending(fair) {
      return this.related().collectorProfile
        .related().userFairActions.isAttending(fair);
    }

    isLoggedIn() {
      return this.__isLoggedIn__;
    }

    isLoggedOut() {
      return !this.isLoggedIn();
    }

    isWithAnonymousSession() {
      return (this.id != null) && !this.isLoggedIn();
    }

    isRecentlyRegistered() {
      return this.__isRecentlyRegistered__;
    }

    // Be sure to fetch this before calling
    isWithAccount() {
      return (this.related().account.id != null);
    }

    static instantiate(attributes) {
      if (attributes == null) { attributes = {}; }
      const CurrentUser = require('./current_user');
      const { LoggedOutUser } = require('./logged_out_user');

      return CurrentUser.orNull() ||
      new LoggedOutUser(attributes);
    }

    prepareForInquiry() {
      return this.findOrCreate({silent: true})
        .then(() => {
          return Promise.all([
            new Promise(resolve => {
              if (this.isLoggedIn()) {
                return resolve();
              } else {
                return this.related().account.fetch({
                  silent: true,
                  success: resolve,
                  error: resolve
                });
              }
            }),

            this.related().collectorProfile.findOrCreate({silent: true})
          ]);
      });
    }
  };
  _User.initClass();
  return _User;
})());
export const User = _User
