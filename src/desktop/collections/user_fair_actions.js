/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _UserFairActions
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const UserFairAction = require("../models/user_fair_action")

export default _UserFairActions = (function () {
  _UserFairActions = class UserFairActions extends Backbone.Collection {
    static initClass() {
      this.prototype.model = UserFairAction

      this.prototype.url = `${API_URL}/api/v1/me/user_fair_actions`
    }

    attendFair(fair) {
      return this.add({
        action: "Attendee",
        fair_id: fair.id,
      })
    }

    isAttending(fair) {
      return this.findWhere({ fair_id: fair.id }) != null
    }
  }
  _UserFairActions.initClass()
  return _UserFairActions
})()
export const UserFairActions = _UserFairActions
