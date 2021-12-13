/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FeaturedLink;
const Backbone = require('backbone');
const sd = require('sharify').data;
const _ = require('underscore');
const _s = require('underscore.string');
const { Markdown, Image } = require('@artsy/backbone-mixins');

export default (_FeaturedLink = (function() {
  _FeaturedLink = class FeaturedLink extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, Image(sd.API_URL));

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/featured_link`;
    }

    miniSubtitle() {
      return _s.trim(this.get('subtitle').split('|')[0]);
    }

    // Converts a featured link into a hash that is useable for the featured items component.
    toFeaturedItem(collectionLength) {
      if (collectionLength == null) { collectionLength = 2; }
      return {
        href: this.get('href'),
        title: this.mdToHtml('title'),
        subtitle: this.mdToHtml('subtitle').split('|')[0].trim(),
        imageUrl: this.hasImage('large_rectangle') ? this.imageUrl('large_rectangle') : null
      };
    }

    layoutStyle(collectionLength) {
      switch (false) {
        case collectionLength !== 1:
          return "full";
        case collectionLength !== 2:
          return "half";
        case collectionLength !== 3:
          return "third";
        case !(collectionLength > 3):
          return "quarter";
      }
    }
  };
  _FeaturedLink.initClass();
  return _FeaturedLink;
})());
export const FeaturedLink = _FeaturedLink
