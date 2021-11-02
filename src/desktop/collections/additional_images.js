/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _AdditionalImages
const _ = require("underscore")
const Backbone = require("backbone")
const AdditionalImage = require("../models/additional_image")

export default _AdditionalImages = (function () {
  _AdditionalImages = class AdditionalImages extends Backbone.Collection {
    static initClass() {
      this.prototype.model = AdditionalImage

      this.prototype.comparator = "position"
    }

    parse(response) {
      // Sometimes default aren't in the first position
      __guard__(
        _.findWhere(response, { is_default: true }) || _.first(response),
        x => (x.position = 0)
      )
      return response
    }

    default() {
      return this.findWhere({ is_default: true }) || this.first()
    }

    active() {
      return this.findWhere({ is_active: true }) || this.default()
    }

    setActive(id) {
      this.invoke("set", { is_active: false })
      return this.get(id).set({ is_active: true })
    }
  }
  _AdditionalImages.initClass()
  return _AdditionalImages
})()

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
export const AdditionalImages = _AdditionalImages
