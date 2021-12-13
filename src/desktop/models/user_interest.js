/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _UserInterest;
const _ = require('underscore');
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;
const { UserInterestRelations } = require('./mixins/relations/user_interest');

export default (_UserInterest = (function() {
  _UserInterest = class UserInterest extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, UserInterestRelations);

      this.prototype.urlRoot = `${API_URL}/api/v1/me/user_interest`;

      this.prototype.defaults =
        {category: 'collected_before'};
    }
  };
  _UserInterest.initClass();
  return _UserInterest;
})());
export const UserInterest = _UserInterest
