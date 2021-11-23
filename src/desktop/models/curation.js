/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Curation;
const sd = require('sharify').data;
const Backbone = require('backbone');

export default (_Curation = (function() {
  _Curation = class Curation extends Backbone.Model {
    static initClass() {

      this.prototype.urlRoot = `${sd.POSITRON_URL}/api/curations`;
    }
  };
  _Curation.initClass();
  return _Curation;
})());
export const Curation = _Curation
