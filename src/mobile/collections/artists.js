import Artwork from "v2/Components/Artwork"

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artists
const _ = require("underscore")
const { toSentence } = require("underscore.string")
const sd = require("sharify").data
const Backbone = require("backbone")
const { AToZ, Fetch } = require("@artsy/backbone-mixins")

export default _Artists = (function () {
  _Artists = class Artists extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, AToZ)
      _.extend(this.prototype, Fetch(sd.API_URL))
    }

    initialize() {
      return (this.model = require("../models/artist").default)
    }

    toSentence() {
      return toSentence(this.pluck("name"))
    }
  }
  _Artists.initClass()
  return _Artists
})()

export const Artists = _Artists
