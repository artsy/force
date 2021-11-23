/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Images
const Backbone = require("backbone")
const { Image } = require("../models/image")

export default _Images = (function () {
  _Images = class Images extends Backbone.Collection {
    static initClass() {
      this.prototype.model = Image
    }
  }
  _Images.initClass()
  return _Images
})()
export const Images = _Images
