/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Images
const Backbone = require("backbone")
const Image = require("../models/image")

module.exports = Images = (function () {
  Images = class Images extends Backbone.Collection {
    static initClass() {
      this.prototype.model = Image
    }
  }
  Images.initClass()
  return Images
})()
