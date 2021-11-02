/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _UserInterests
const _ = require("underscore")
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const UserInterest = require("../models/user_interest")

export default _UserInterests = (function () {
  _UserInterests = class UserInterests extends Backbone.Collection {
    static initClass() {
      this.prototype.model = UserInterest

      this.prototype.interestType = "Artist"

      this.prototype.url = `${API_URL}/api/v1/me/user_interests`
    }

    parse(response) {
      return _.filter(response, obj => !_.isEmpty(obj.interest))
    }

    fetch(options) {
      if (options == null) {
        options = {}
      }
      options.data = _.extend(options.data || {}, {
        interest_type: this.interestType,
      })
      return super.fetch(options)
    }

    interests() {
      return this.map(userInterest => userInterest.related().interest)
    }

    comparator(userInterest) {
      return Date.parse(userInterest.get("updated_at"))
    }

    findByInterestId(id) {
      return this.find(
        userInterest => userInterest.related().interest.id === id
      )
    }

    alreadyInterested(interest) {
      return this.findByInterestId(interest.id) != null
    }

    addInterest(interest) {
      if (this.alreadyInterested(interest)) {
        return
      }

      return this.add({
        interest_type: this.interestType,
        interest_id: interest.id,
        interest: interest.attributes,
      })
    }
  }
  _UserInterests.initClass()
  return _UserInterests
})()
export const UserInterests = _UserInterests
