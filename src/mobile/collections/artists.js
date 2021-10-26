/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Artists
const _ = require("underscore")
const { toSentence } = require("underscore.string")
const sd = require("sharify").data
const Backbone = require("backbone")
const { AToZ, Fetch } = require("@artsy/backbone-mixins")

module.exports = Artists = (function () {
  Artists = class Artists extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, AToZ)
      _.extend(this.prototype, Fetch(sd.API_URL))
    }

    initialize() {
      return (this.model = require("../models/artist"))
    }

    toSentence() {
      return toSentence(this.pluck("name"))
    }
  }
  Artists.initClass()
  return Artists
})()
