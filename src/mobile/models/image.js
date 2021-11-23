/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Image;
const _ = require('underscore');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { DeepZoom } = require('../components/deep_zoom/mixin');

export default (_Image = (function() {
  _Image = class Image extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, DeepZoom(sd.SECURE_IMAGES_URL));
    }

    imageUrl(version) {
        if (version == null) { version = 'small'; }
        if (this.has('image_url')) { return this.get('image_url').replace(':version', version); }
      }
  };
  _Image.initClass();
  return _Image;
})());
export const Image = _Image
