/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Item;
const _ = require('underscore');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { Image } = require('@artsy/backbone-mixins');

export default (_Item = (function() {
  _Item = class Item extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
    }
  };
  _Item.initClass();
  return _Item;
})());
export const Item = _Item
