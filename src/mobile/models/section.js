/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Section;
const sd = require('sharify').data;
const Backbone = require('backbone');

export default (_Section = (function() {
  _Section = class Section extends Backbone.Model {
    static initClass() {

      this.prototype.urlRoot = `${sd.POSITRON_URL}/api/sections`;
    }
  };
  _Section.initClass();
  return _Section;
})());
export const Section = _Section
