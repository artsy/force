/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artists
const _ = require("underscore")
const { toSentence } = require("underscore.string")
const Backbone = require("backbone")
const Artist = require("../models/artist")
const { API_URL } = require("sharify").data
const { Fetch, AToZ } = require("@artsy/backbone-mixins")

export default _Artists = (function () {
  _Artists = class Artists extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, AToZ)
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = Artist

      this.prototype.comparator = "sortable_id"
    }

    toSentence() {
      return toSentence(this.map(model => model.get("name")))
    }
  }
  _Artists.initClass()
  return _Artists
})()
export const Artists = _Artists
