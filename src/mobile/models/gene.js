/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Gene;
const _ = require('underscore');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { Artists } = require('../collections/artists');
const { FilterSuggest } = require('./filter_suggest');

const { Image, Markdown } = require('@artsy/backbone-mixins');

const SUBJECT_MATTER_MATCHES = [
  "content", "medium", "concrete contemporary",
  "abstract contemporary", "concept", "technique", "appearance genes"
];

export default (_Gene = (function() {
  _Gene = class Gene extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
      _.extend(this.prototype, Markdown);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/gene`;
    }

    initialize() {
      this.trendingArtists = new Artists;
      return this.trendingArtists.url = `${sd.API_URL}/api/v1/artists/trending?gene=${this.get('id')}`;
    }

    href() { return `/gene/${this.get('id')}`; }

    displayName() { return this.get('name'); }

    alphaSortKey() { return this.get('id'); }

    isSubjectMatter() {
      return __guard__(__guard__(this.get('type'), x1 => x1.name), x => x.match(new RegExp(SUBJECT_MATTER_MATCHES.join('|'), 'i')));
    }

    fetchFilterSuggest(params, options) {
      return new FilterSuggest({id: this.get('id'), type: 'gene'}).fetch(_.extend(
        {data: params}
      , options)
      );
    }

    fetchTrendingArtists(options) {
      if (options == null) { options = {}; }
      return this.trendingArtists.fetch(_.extend(options));
    }
  };
  _Gene.initClass();
  return _Gene;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Gene = _Gene
