/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Sales
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const { Sale } = require("../models/sale")

export default _Sales = (function () {
  _Sales = class Sales extends Backbone.Collection {
    static initClass() {
      this.prototype.model = Sale

      this.prototype.url = `${API_URL}/api/v1/sales`
    }
  }
  _Sales.initClass()
  return _Sales
})()
export const Sales = _Sales
