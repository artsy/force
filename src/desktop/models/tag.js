/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Tag;
const _ = require('underscore');
const _s = require('underscore.string');
const { API_URL } = require('sharify').data;
const Backbone = require('backbone');

const { Markdown } = require('@artsy/backbone-mixins');

export default (_Tag = (function() {
  _Tag = class Tag extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Markdown);

      this.prototype.urlRoot = `${API_URL}/api/v1/tag`;
    }

    href() { return `/tag/${this.get('id')}`; }

    fetchFilterSuggest(params, options) {
      return new Backbone.Model().fetch(_.extend({
        data: params,
        url: `${API_URL}/api/v1/search/filtered/tag/${this.get('id')}/suggest`
      }
      , options)
      );
    }

    toPageTitle() { return `${this.get('name')} | Artsy`; }

    toPageDescription() {
      if (this.get('description')) {
        return _s.clean(this.mdToHtmlToText('description'));
      } else {
        return `Browse all artworks with the ${this.get('name')} tag on Artsy. Artsy has the largest collection of art on the Web; browse art by subject matter, medium, size and price.`;
      }
    }
  };
  _Tag.initClass();
  return _Tag;
})());
export const Tag = _Tag
