/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Profiles
const _ = require("underscore")
const sd = require("sharify").data
const Backbone = require("backbone")
const { Profile } = require("../models/profile")
const { AToZ, Fetch } = require("@artsy/backbone-mixins")

export default _Profiles = (function () {
  _Profiles = class Profiles extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, AToZ)
      _.extend(this.prototype, Fetch(sd.API_URL))

      this.prototype.model = Profile
    }

    url() {
      return `${sd.API_URL}/api/v1/profiles`
    }
  }
  _Profiles.initClass()
  return _Profiles
})()
export const Profiles = _Profiles
