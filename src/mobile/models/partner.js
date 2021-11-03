/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Partner;
const _ = require('underscore');
const Backbone = require('backbone');
const sd = require('sharify').data;
const { Artist } = require('../models/artist');
const { Icon } = require('../models/icon');
const { Profile } = require('../models/profile');
const { Artists } = require('../collections/artists');
const { PartnerShows } = require('../collections/partner_shows');
const {
  fetchUntilEnd
} = require('@artsy/backbone-mixins').Fetch();
const { PartnerRelations } = require('./mixins/relations/partner');

const INSTITUTION        = 'institution';
const GALLERY_DEFAULT    = 'gallery_default';
const GALLERY_DEPRECATED = 'gallery_deprecated';
const GALLERY_ONE        = 'gallery_one';
const GALLERY_TWO        = 'gallery_two';
const GALLERY_THREE      = 'gallery_three';
const GALLERY_FOUR       = 'gallery_four';
const GALLERY_FIVE       = 'gallery_five';
const GALLERY_SIX        = 'gallery_six';
const GALLERY_SEVEN      = 'gallery_seven';
const GALLERY_EIGHT      = 'gallery_eight';

const ACTIVE_PARTNER_LAYOUTS = [ INSTITUTION, GALLERY_ONE, GALLERY_TWO, GALLERY_THREE, GALLERY_FOUR, GALLERY_FIVE, GALLERY_SIX, GALLERY_SEVEN, GALLERY_EIGHT ];

export default (_Partner = (function() {
  _Partner = class Partner extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, PartnerRelations);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/partner`;
    }

    href() {
      return `/partner/${this.get('id')}`;
    }

    displayName() {
      return this.get('name');
    }

    fetchLocations() {
      return this.related().locations.fetch(...arguments);
    }

    fetchProfile(options) {
      if (options == null) { options = {}; }
      return new Profile({id: this.get('id')}).fetch(options);
    }

    nestedProfileImage() {
      const img = __guard__(this.get('profile'), x => x.bestAvailableImage());
      return ((img != null) ? img : '');
    }

    icon() {
      return new Icon(this.get('icon'), {profileId: this.get('id')});
    }

    // Fetches the partners artists and groups them into represented and unrepresented.
    // The success callback provides (representedArtists, unrepresentedArtists).
    //
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
    fetchArtistGroups(options) {
      if (options == null) { options = {}; }
      const partnerArtists = new Backbone.Collection;
      partnerArtists.url = `${sd.API_URL}/api/v1/partner/${this.get('id')}/partner_artists`;
      return fetchUntilEnd.call(partnerArtists, {
        data: {
          display_on_partner_profile: 1,
          size: 20,
          partner_id: this.get('id'),
          artists: 'artists'
        },
        success: () => {
          // Represented artists are flagged as represented but don't need artworks
          const representedArtists = [];

          // Unrepresented artists have artworks but are not represented
          const unrepresentedArtists = [];

          for (let pa of Array.from(partnerArtists.models)) {
            if (pa.get('represented_by')) {
              representedArtists.push(this.artistFromPartnerArtist(pa));
            } else if (pa.get('published_artworks_count') > 0) {
              unrepresentedArtists.push(this.artistFromPartnerArtist(pa));
            }
          }

          return (typeof options.success === 'function' ? options.success(
            new Artists((representedArtists)),
            new Artists((unrepresentedArtists))
          ) : undefined);
        },
        error: options.error
      }
      );
    }

    // Fetches the partner's shows and returns one as featured.
    //
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
    fetchFeaturedShow(options) {
      if (options == null) { options = {}; }
      const partnerShows = new PartnerShows(null, {partnerId: this.get('id')});
      return fetchUntilEnd.call(partnerShows, {
        data: {
          partner_id: this.get('id'),
          shows: 'shows'
        },
        success() {
          return (typeof options.success === 'function' ? options.success(partnerShows.featuredShow()) : undefined);
        },
        error: options.error
      }
      );
    }

    hasSection(section, profile, articles) {
      switch (section) {
        case 'articles':
          return articles.length > 0;
        case 'artists':
          return profile.isGallery() && (this.get('partner_artists_count') > 0);
        case 'collection':
          return profile.isInstitution() && (this.get('published_not_for_sale_artworks_count') > 0);
        case 'shop':
          return profile.isInstitution() && (this.get('published_for_sale_artworks_count') > 0);
        case 'shows':
          return this.get('displayable_shows_count') > 0;
        default:
          return false;
      }
    }

    setEmailFromLocations(partnerLocations) {
      if (this.get('email')) { return; }
      try {
        return this.set('email', partnerLocations.first().get('email'));
      } catch (error) {}
    }

    getMailTo() {
      if (!this.get('email') || (this.get('type') !== 'Gallery')) { return ""; }
      const subject = encodeURIComponent(`Connecting with ${this.get('name')} via Artsy`);
      return `mailto:${this.get('email')}?subject=${subject}&cc=inquiries@artsy.net`;
    }

    getSimpleWebsite() {
      if (!this.get('website')) { return ""; }
      return this.get('website').replace('http://', '').replace(/\/$/g, '');
    }

    artistFromPartnerArtist(partnerArtist) {
      const artist = new Artist(partnerArtist.get('artist'));
      // Rewrite image_url to use partner's cover image if exists
      if (partnerArtist.has('image_versions') && partnerArtist.has('image_url')) {
        artist.set({'image_url': partnerArtist.get('image_url')});
        artist.set({'image_versions': partnerArtist.get('image_versions')});
      }
      return artist;
    }
  };
  _Partner.initClass();
  return _Partner;
})());

module.exports.INSTITUTION        = INSTITUTION;
module.exports.GALLERY_DEFAULT    = GALLERY_DEFAULT;
module.exports.GALLERY_DEPRECATED = GALLERY_DEPRECATED;
module.exports.GALLERY_ONE        = GALLERY_ONE;
module.exports.GALLERY_TWO        = GALLERY_TWO;
module.exports.GALLERY_THREE      = GALLERY_THREE;
module.exports.GALLERY_FOUR       = GALLERY_FOUR;
module.exports.GALLERY_FIVE       = GALLERY_FIVE;
module.exports.GALLERY_SIX        = GALLERY_SIX;
module.exports.GALLERY_SEVEN      = GALLERY_SEVEN;
module.exports.GALLERY_EIGHT      = GALLERY_EIGHT;

module.exports.ACTIVE_PARTNER_LAYOUTS = ACTIVE_PARTNER_LAYOUTS;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Partner = _Partner
