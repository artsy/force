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
const _s = require('underscore.string');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { Artworks } = require('../collections/artworks');
const { Image, Markdown } = require('@artsy/backbone-mixins');
const { Artist } = require('./artist');
const { GeneRelations } = require('./mixins/relations/gene');

const SUBJECT_MATTER_MATCHES = [
  "content", "medium", "concrete contemporary",
  "abstract contemporary", "concept", "technique", "appearance genes"
];

export default (_Gene = (function() {
  let metaOverrides = undefined;
  _Gene = class Gene extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, GeneRelations);
      _.extend(this.prototype, Image(sd.SECURE_IMAGES_URL));
      _.extend(this.prototype, Markdown);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/gene`;

      // support custom gene titles + descriptions
      metaOverrides = model => ({
        'western-europe': {
          description: 'Discover Western European artists from pre-history to present, and browse works by size, prize and medium.'
        },

        'latin-america-and-the-caribbean': {
          description: 'Discover artists from Latin America and the Caribbean from pre-history to present, and browse works by size, prize and medium.'
        },

        'africa': {
          description: 'Explore the art of Africa, including traditional Sub-Saharan art, modern photography, and contemporary art.'
        },

        'middle-east': {
          description: 'Discover Middle Eastern artists and explore art from the region from pre-history to present (Mesopotamian art, ancient Egyptian art, Islamic art, and contemporary Middle Eastern artists).'
        }
      });
    }

    href() { return `/gene/${this.get('id')}`; }

    displayName() { return this.get('display_name') || this.get('name'); }

    familyName() { return this.related().family.get('name'); }

    alphaSortKey() { return this.get('id'); }

    toPageTitle() {
      let title;
      if ((title = this.metaOverrides('title'))) {
        return title;
      } else {
        return `${this.displayName()} | Artsy`;
      }
    }

    // Trim whitespace and newlines
    toPageDescription() {
      let description;
      if ((description = this.metaOverrides('description'))) {
        return description;
      } else if (this.isGeographic()) {
        return `Explore art by artists who are from, or who have lived in, ${this.get('name')}. Browse works by size, price, and medium.`;
      } else {
        return _s.clean(this.mdToHtmlToText('description'));
      }
    }

    initialize() {
      this.relatedArtists = new Backbone.Collection([], {model: Artist});
      this.relatedArtists.url = `${sd.API_URL}/api/v1/gene/${this.id}/artists?exclude_artists_without_artworks=true`;
      this.trendingArtists = new Backbone.Collection([], {model: Artist});
      return this.trendingArtists.url = `${sd.API_URL}/api/v1/artists/trending?gene=${this.id}`;
    }

    fetchArtists(type, options) {
      if (options == null) { options = {}; }
      return this[`${type}Artists`].fetch(options);
    }

    fetchArtworks(options) {
      const artworks = new Artworks;
      artworks.url = `${this.url()}/artworks`;
      return artworks.fetch(options);
    }

    isGeographic() {
      return __guard__(__guard__(this.get('type'), x1 => x1.name), x => x.includes('Geographical Regions and Countries'));
    }

    isSubjectMatter() {
      return __guard__(__guard__(this.get('type'), x1 => x1.name), x => x.match(new RegExp(SUBJECT_MATTER_MATCHES.join('|'), 'i')));
    }

    mode() {
      if (this.isSubjectMatter()) { return 'artworks'; } else { return 'artist'; }
    }

    fetchFilterSuggest(params, options) {
      return new Backbone.Model().fetch(_.extend({
        data: params,
        url: `${sd.API_URL}/api/v1/search/filtered/gene/${this.get('id')}/suggest`
      }
      , options)
      );
    }

    metaOverrides(tag) {
      return __guard__(metaOverrides(this)[this.id], x => x[tag]);
    }
  };
  _Gene.initClass();
  return _Gene;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Gene = _Gene
