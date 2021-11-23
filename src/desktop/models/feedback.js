/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Feedback;
const Backbone = require('backbone');
const { API_URL } = require('sharify').data;

export default (_Feedback = (function() {
  _Feedback = class Feedback extends Backbone.Model {
    static initClass() {
      this.prototype.url = `${API_URL}/api/v1/feedback`;
    }
  };
  _Feedback.initClass();
  return _Feedback;
})());
export const Feedback = _Feedback
