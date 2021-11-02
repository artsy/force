/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Profiles
const _ = require("underscore")
const Backbone = require("backbone")
const Profile = require("../models/profile")
const { API_URL } = require("sharify").data
const { Fetch, AToZ } = require("@artsy/backbone-mixins")

export default _Profiles = (function () {
  _Profiles = class Profiles extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, AToZ)
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = Profile
    }
  }
  _Profiles.initClass()
  return _Profiles
})()
export const Profiles = _Profiles
