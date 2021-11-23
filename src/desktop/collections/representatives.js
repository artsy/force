/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Representatives
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const { Representative } = require("../models/representative")

export default _Representatives = (function () {
  _Representatives = class Representatives extends Backbone.Collection {
    static initClass() {
      this.prototype.model = Representative

      this.prototype.url = `${API_URL}/api/v1/admins/available_representatives`
    }
  }
  _Representatives.initClass()
  return _Representatives
})()
export const Representatives = _Representatives
