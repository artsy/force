/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artist;
const _ = require('underscore');
const _s = require('underscore.string');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { Markdown, Image, Fetch } = require('@artsy/backbone-mixins');
const { smartTruncate } = require('../components/util/string.coffee');
const { SECURE_IMAGES_URL, API_URL } = require('sharify').data;
const { compactObject } = require('./mixins/compact_object');
const { ArtistRelations } = require('./mixins/relations/artist');
const { MetaOverrides } = require('./mixins/meta_overrides');
const { ImageSizes } = require('./mixins/image_sizes');

export default (_Artist = (function() {
  _Artist = class Artist extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
      _.extend(this.prototype, ArtistRelations);
      _.extend(this.prototype, MetaOverrides);
      _.extend(this.prototype, Fetch(API_URL));
      _.extend(this.prototype, ImageSizes);
    }

    defaultMetaTitle() {
      return `${this.metaName()} - ${this.pageTitleArtworksCount()}, Bio & Shows on Artsy`;
    }

    urlRoot() {
      return `${sd.API_URL}/api/v1/artist`;
    }

    href() {
      return `/artist/${this.get('id')}`;
    }

    displayName() {
      return this.get('name');
    }

    metaName() {
      if (this.get('name')) { return this.htmlToText('name'); } else { return 'Unnamed Artist'; }
    }

    fetchArtworks(options) {
      if (options == null) { options = {}; }
      return this.related().artworks.fetch(options);
    }

    hasNoContent() {
      return (this.get('published_artworks_count') === 0) && (this.get('biography') === '');
    }

    fetchRelatedArtists(type, options) {
      if (options == null) { options = {}; }
      return this.related()[type.toLowerCase()].fetch(_.extend({
        remove: false,
        data: _.defaults((options.data != null ? options.data : {}), {size: 5})
      }
      , options)
      );
    }

    fetchPosterArtwork() {
      return this.fetchArtworks({
        data: { page: 1, size: 1
      },
        success: artworks => {
          return this.set({poster_artwork: artworks.models[0]});
        }});
    }

    // Helper for A/B test artist page titles / descriptions
    inFirstArtistTestGroup() { return /[a-h]/.exec(this.id[0]); }

    genderPronoun() {
      switch (this.get('gender')) {
        case 'male': return 'his';
        case 'female': return 'her';
        default:
          return 'their';
      }
    }

    alternateNames() {
      let alts;
      if ((alts = this.get('alternate_names'))) { return alts.join('; '); } else { return ''; }
    }

    pageTitleArtworksCount(threshold) {
      if (threshold == null) { threshold = 1; }
      const count = this.get('published_artworks_count');
      if ((count <= threshold) || (count == null)) { return 'Artworks'; } else { return `${count} Artworks`; }
    }

    defaultMetaDescription(length) {
      if (length == null) { length = 200; }
      if (this.inFirstArtistTestGroup()) {
        return smartTruncate(_.compact([
         `Find the latest shows, biography, and artworks for sale by ${this.displayName()}`,
         (__guard__(this.get('blurb'), x => x.length) > 0 ? this.mdToHtmlToText('blurb') : undefined)
        ]).join(". "), length);
      } else {
        return `Browse the best of ${this.displayName()}, including artwork for sale, ${this.genderPronoun()} latest shows & events, biography, and exclusive ${this.displayName()} articles.`;
      }
    }

    toAuctionResultsPageTitle() {
      return `Auction Results for ${this.metaName()} on Artsy`;
    }

    toAuctionResultsPageDescription() {
      return `See details of ${this.metaName()} auction results from recent, past, and upcoming sales. Let Artsy be your price guide to ${this.metaName()}.`;
    }

    isFollowed(followArtistCollection) {
      return followArtistCollection && followArtistCollection.isFollowed(this);
    }

    // Returns a string in the form of 'N available works & N reference works'
    //
    // @return {String}
    displayAvailableWorks() {
      const work = function(n) { if (n > 1) { return 'works'; } else { return 'work'; } };
      const string = function(n, kind) { if (n) { return `${n} ${kind} ${work(n)}`; } };

      return _.compact([
        string(this.get('forsale_artworks_count'), 'available'),
        string((this.get('published_artworks_count') - this.get('forsale_artworks_count')), 'reference')
      ]).join(' & ');
    }

    displayNationalityAndBirthdate() {
      return _.compact([
        this.get('nationality'),
        this.get('years')
      ]).join(', ');
    }

    displayFollowers() {
      let c;
      if (c = this.get('follow_count')) {
        return `${_s.numberFormat(c)} Follower${c === 1 ? '' : 's'}`;
      }
    }

    toJSONLDShort() {
      return compactObject({
        "@type": "Person",
        image: this.imageUrl('large'),
        name: this.displayName(),
        sameAs: `${sd.APP_URL}${this.href()}`
      });
    }

    toJSONLD() {
      return compactObject({
        "@context": "http://schema.org",
        "@type": "Person",
        image: this.imageUrl('large'),
        name: this.displayName(),
        url: `${sd.APP_URL}${this.href()}`,
        gender: this.get('gender'),
        birthDate: this.get('birthday'),
        deathDate: this.get('deathday'),
        additionalType: 'Artist',
        datePublished: this.get('createdAt'),
        dateModified: this.get('lastModified')
      });
    }
  };
  _Artist.initClass();
  return _Artist;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Artist = _Artist
