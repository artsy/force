/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _CoverImage;
const _ = require('underscore');
const Backbone = require('backbone');
const { Image } = require('@artsy/backbone-mixins');
const { SECURE_IMAGES_URL } = require('sharify').data;
const { resize } = require('../../v2/Utils/resizer');

export default (_CoverImage = (function() {
  _CoverImage = class CoverImage extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
    }

    optimizedImageUrl(size) {
      return `${resize(this.imageUrl(size), { width: 1000, height: 708, quality: 50 })}`;
    }
  };
  _CoverImage.initClass();
  return _CoverImage;
})());
export const CoverImage = _CoverImage
