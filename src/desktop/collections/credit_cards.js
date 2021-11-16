/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _CreditCards
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const CreditCard = require("../models/credit_card")

export default _CreditCards = (function () {
  _CreditCards = class CreditCards extends Backbone.Collection {
    static initClass() {
      this.prototype.model = CreditCard

      this.prototype.url = `${API_URL}/api/v1/me/credit_cards`
    }
  }
  _CreditCards.initClass()
  return _CreditCards
})()
export const CreditCards = _CreditCards
