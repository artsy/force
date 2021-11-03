/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Tag;
const _ = require('underscore');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { FilterSuggest } = require('./filter_suggest');
const { Image, Markdown } = require('@artsy/backbone-mixins');

export default (_Tag = (function() {
  _Tag = class Tag extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
      _.extend(this.prototype, Markdown);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/tag`;
    }

    href() { return `/tag/${this.get('id')}`; }

    displayName() { return this.get('name'); }

    alphaSortKey() { return this.get('id'); }

    fetchFilterSuggest(params, options) {
      return new FilterSuggest({id: this.get('id'), type: 'tag'}).fetch(_.extend(
        {data: params}
      , options)
      );
    }
  };
  _Tag.initClass();
  return _Tag;
})());
export const Tag = _Tag
