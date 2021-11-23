/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _AdditionalImage;
const _ = require('underscore');
const Backbone = require('backbone');
const { Image } = require('@artsy/backbone-mixins');
const { ImageSizes } = require('./mixins/image_sizes');
const { DeepZoom } = require('./mixins/deep_zoom');
const { SECURE_IMAGES_URL } = require('sharify').data;

export default (_AdditionalImage = (function() {
  _AdditionalImage = class AdditionalImage extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
      _.extend(this.prototype, ImageSizes);
      _.extend(this.prototype, DeepZoom(SECURE_IMAGES_URL));
    }

    isDownloadable(user) {
      return (this.get('downloadable') && this.hasImage('larger')) || !!(user != null ? user.isTeam() : undefined);
    }
  };
  _AdditionalImage.initClass();
  return _AdditionalImage;
})());
export const AdditionalImage = _AdditionalImage
