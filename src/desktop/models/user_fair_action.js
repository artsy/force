/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _UserFairAction;
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;

export default (_UserFairAction = (function() {
  _UserFairAction = class UserFairAction extends Backbone.Model {
    static initClass() {
      this.prototype.urlRoot = `${API_URL}/api/v1/me/user_fair_action`;

      this.prototype.defaults =
        {action: 'Attendee'};
    }
  };
  _UserFairAction.initClass();
  return _UserFairAction;
})());
export const UserFairAction = _UserFairAction
