/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _EditionSet;
const _ = require('underscore');
const Backbone = require('backbone');
const { Dimensions } = require('@artsy/backbone-mixins');

export default (_EditionSet = (function() {
  _EditionSet = class EditionSet extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Dimensions);
    }
  };
  _EditionSet.initClass();
  return _EditionSet;
})());
export const EditionSet = _EditionSet
