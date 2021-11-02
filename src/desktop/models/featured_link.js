/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FeaturedLink;
const _ = require('underscore');
const Backbone = require('backbone');
const { LayoutSyle } = require('./mixins/layout_style');
const { Image, Markdown } = require('@artsy/backbone-mixins');
const { SECURE_IMAGES_URL } = require('sharify').data;
const { ImageSizes } = require('./mixins/image_sizes');

export default (_FeaturedLink = (function() {
  _FeaturedLink = class FeaturedLink extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
      _.extend(this.prototype, ImageSizes);
      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, LayoutSyle);
    }

    imageUrlForLayout(collectionLength) {
      return this.imageUrl(this.imageSizeForLayout(collectionLength));
    }

    hasImageForLayout(collectionLength) {
      return this.hasImage(this.imageSizeForLayout(collectionLength));
    }

    imageUrlForMaxSize() {
      return __guard__(this.get('image_urls'), x => x.large_rectangle);
    }
  };
  _FeaturedLink.initClass();
  return _FeaturedLink;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const FeaturedLink = _FeaturedLink
