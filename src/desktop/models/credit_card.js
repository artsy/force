/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _CreditCard;
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;

export default (_CreditCard = class CreditCard extends Backbone.Model {
  urlRoot() {
    if (this.id != null) {
      return `${API_URL}/api/v1/me/credit_card`;
    } else {
      return `${API_URL}/api/v1/me/credit_cards`;
    }
  }
});
export const CreditCard = _CreditCard
