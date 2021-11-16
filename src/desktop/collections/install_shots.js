/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _InstallShots
const _ = require("underscore")
const Backbone = require("backbone")
const InstallShot = require("../models/install_shot")
const { Fetch } = require("@artsy/backbone-mixins")
const { API_URL } = require("sharify").data

export default _InstallShots = (function () {
  _InstallShots = class InstallShots extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = InstallShot
    }

    parse(response) {
      return _.filter(response, (
        obj // filter out images without versions
      ) => (obj.image_versions != null ? obj.image_versions.length : undefined))
    }

    hasCaptions() {
      return _.any(_.map(this.pluck("caption"), _.negate(_.isEmpty)))
    }
  }
  _InstallShots.initClass()
  return _InstallShots
})()
export const InstallShots = _InstallShots
