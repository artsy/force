/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artist;
const Backbone = require('backbone');
const sd = require('sharify').data;
const { Artworks } = require('../collections/artworks');
const { FilterArtworks } = require('../collections/filter_artworks');
const { Artists } = require('../collections/artists');
const _ = require('underscore');
const { Markdown } = require('@artsy/backbone-mixins');

export default (_Artist = (function() {
  _Artist = class Artist extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Markdown);
    }

    urlRoot() { return `${sd.API_URL}/api/v1/artist`; }

    href() { return `/artist/${this.get('id')}`; }

    imageUrl(version) {
      if (version == null) { version = 'medium'; }
      return __guard__(this.get('image_url'), x => x.replace(':version', version));
    }

    defaultImageUrl() {
      if (this.hasImage('tall')) { return this.imageUrl('tall'); }
      if (this.hasImage('four_thirds')) { return this.imageUrl('four_thirds'); }
      return this.imageUrl();
    }

    hasImage(size) {
      let needle;
      if (size == null) { size = 'tall'; }
      return (needle = size, Array.from((this.get('image_versions') || [])).includes(needle));
    }

    maybeFetchAndSetFeaturedBio(cb) {
      if (cb == null) { cb = function() {}; }
      if (this.get('blurb')) { return cb(); }
      const partner_artists = new Backbone.Collection();
      partner_artists.url = `${sd.API_URL}/api/v1/artist/${this.get('id')}/partner_artists?size=1&featured=true`;
      return partner_artists.fetch({
        success: featured => {
          if (!featured.length || !featured.models[0].has('biography')) { return cb(); }
          this.set('blurb', featured.models[0].get('biography'));
          return cb();
        }
      });
    }

    fetchArtworks(options) {
      if (options == null) { options = {}; }
      const artworks = new Artworks;
      artworks.url = this.url() + '/artworks';
      return artworks.fetch(options);
    }

    fetchFilteredArtworks(options) {
      if (options == null) { options = {}; }
      const artworks = new FilterArtworks;
      return artworks.fetch(options);
    }

    fetchRelatedArtists(options) {
      if (options == null) { options = {}; }
      const artists = new Artists;
      artists.url = `${sd.API_URL}/api/v1/related/layer/main/artists`;
      return artists.fetch(_.extend(options, { data: {
        exclude_artists_without_artworks: true,
        'artist[]': this.get('id')
      }
    }
      )
      );
    }

    fetchAuctionResults(options) {
      if (options == null) { options = {}; }
      return new Backbone.Collection().fetch(_.extend(options,
        {url: `${sd.API_URL}/api/v1/artist/${this.get('id')}/auction_lots?total_count=1`})
      );
    }
  };
  _Artist.initClass();
  return _Artist;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Artist = _Artist
