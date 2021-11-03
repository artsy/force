/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _InquiryOutcome;
const _ = require('underscore');
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;
const { InquiryOutcomeRelations } = require('./mixins/relations/inquiry_outcome');


export default (_InquiryOutcome = (function() {
  _InquiryOutcome = class InquiryOutcome extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, InquiryOutcomeRelations);

      this.prototype.urlRoot = `${API_URL}/api/v1/inquiry_request`;
    }
  };
  _InquiryOutcome.initClass();
  return _InquiryOutcome;
})());
export const InquiryOutcome = _InquiryOutcome
