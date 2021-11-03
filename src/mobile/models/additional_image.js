/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _AdditionalImage;
const _ = require('underscore');
const Backbone = require('backbone');
const { Image } = require('@artsy/backbone-mixins');
const { ImageSizes } = require('./mixins/image_sizes');
const { SECURE_IMAGES_URL } = require('sharify').data;

export default (_AdditionalImage = (function() {
  _AdditionalImage = class AdditionalImage extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
      _.extend(this.prototype, ImageSizes);
    }
  };
  _AdditionalImage.initClass();
  return _AdditionalImage;
})());
export const AdditionalImage = _AdditionalImage
