/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Icon
const Backbone = require('backbone');
const _ = require('underscore');
const sd = require('sharify').data;
const { Image } = require('@artsy/backbone-mixins');

export default (_Icon = (function() {
  _Icon = class Icon extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));

      this.DefaultUserIconUrl = "/images/user_profile.png";
    }

    url() {
      return `${sd.API_URL}/api/v1/profile/${this.get('profileId') }/icon`;
    }

    // Override the imageUrl for icon unique situations
    // For users:
    //   - render a default icon if there is none instead of "missing_image"
    //   - display an unprocessed original version if the image is waiting on a delayed job
    imageUrl() {
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
  };
  _Icon.initClass();
  return _Icon;
})());
export const Icon = _Icon
