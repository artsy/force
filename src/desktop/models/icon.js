/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Icon;
const Backbone = require('backbone');
const _ = require('underscore');
const sd = require('sharify').data;
const { Image } = require('@artsy/backbone-mixins');
const { ImageSizes } = require('./mixins/image_sizes');

export default (_Icon = (function() {
  _Icon = class Icon extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
      _.extend(this.prototype, ImageSizes);

      this.DefaultUserIconUrl = "/images/user_profile.png";

      // Upload validation constraints
      this.prototype.maxFileSize = 3000000; // 3MB
      this.prototype.acceptFileTypes = /(\.|\/)(gif|jpe?g|png|tiff)$/i;

      // Override the imageUrl for icon unique situations
      // For users:
      //   - render a default icon if there is none instead of "missing_image"
      //   - display an unprocessed original version if the image is waiting on a delayed job
      this.prototype.imageUrl = function () {
        if (this.hasImage('square140')) {
          return this.sslUrl(this.get('image_url').replace(':version', 'square140').replace('.jpg', '.png'));
        } else if (this.hasImage('square')) {
          return this.sslUrl(this.get('image_url').replace(':version', 'square').replace('.jpg', '.png'));
        } else if (this.has('image_filename') && _.isNull(this.get('versions'))) {
          return this.sslUrl(this.get('image_url').replace(':version', 'original'));
        } else {
          return Icon.DefaultUserIconUrl;
        }
      }
    }

    url() {
      return `${sd.API_URL}/api/v1/profile/${this.get('profileId') }/icon`;
    }

    // Validates a client uploaded file before posting it
    // See https://github.com/blueimp/jQuery-File-Upload
    validate(attrs, options) {
      if (!attrs.file) { return; }
      if (!this.acceptFileTypes.test(attrs.file.type)) {
        return 'Please upload a png, jpeg, gif, or tiff.';
      }
      if (!(attrs.file.size <= this.maxFileSize)) {
        return 'Please upload an image smaller than 3 MB.';
      }
    }
  };
  _Icon.initClass();
  return _Icon;
})());
export const Icon = _Icon
