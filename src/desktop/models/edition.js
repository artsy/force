/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Edition;
const _ = require('underscore');
const Backbone = require('backbone');
const { Dimensions } = require('@artsy/backbone-mixins');

export default (_Edition = (function() {
  _Edition = class Edition extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Dimensions);
    }

    priceDisplay() {
      if (!_.isEmpty(this.get('price'))) {
        return this.get('price');
      } else {
        if (this.get('forsale')) {
          return 'Available';
        } else {
          return 'Not for Sale';
        }
      }
    }
  };
  _Edition.initClass();
  return _Edition;
})());
export const Edition = _Edition
