/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Suggestion;
const _ = require('underscore');
const Backbone = require('backbone');
const { Image } = require('@artsy/backbone-mixins');
const { SECURE_IMAGES_URL } = require('sharify').data;
const { ImageSizes } = require('./mixins/image_sizes');

export default (_Suggestion = (function() {
  _Suggestion = class Suggestion extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
      _.extend(this.prototype, ImageSizes);
    }
  };
  _Suggestion.initClass();
  return _Suggestion;
})());
export const Suggestion = _Suggestion
