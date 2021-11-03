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
let _Fair;
const _ = require('underscore');
const Backbone = require('backbone');
const sd = require('sharify').data;
const moment = require('moment');
const { Date } = require('./mixins/date');
const { SetItems } = require('./mixins/set_items');
const { ShowsFeed } = require('../collections/shows_feed');
const { Partners } = require('../collections/partners');
const { PartnerLocation } = require('./partner_location');
const { Markdown } = require('@artsy/backbone-mixins');
const { Artworks } = require('../collections/artworks');
const { FairRelations } = require('./mixins/relations/fair');
const { DateHelpers } = require('../components/util/date_helpers');

export default (_Fair = (function() {
  _Fair = class Fair extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, FairRelations);
      _.extend(this.prototype, Date);
      _.extend(this.prototype, SetItems('Fair'));
      _.extend(this.prototype, Markdown);
    }

    urlRoot() { return `${sd.API_URL}/api/v1/fair`; }

    href() {
      return `/fair/${this.get('id')}`;
    }

    initialize() {
      this.showsFeed = new ShowsFeed;
      this.showsFeed.url = `${sd.API_URL}/api/v1/fair/${this.get('id')}/shows`;
      this.artworks = new Artworks;
      return this.artworks.url = `${sd.API_URL}/api/v1/search/filtered/fair/${this.get('id')}`;
    }

    imageUrl(version) {
      let left, needle;
      if (version == null) { version = 'square'; }
      version = (needle = version, Array.from(((left = this.get('image_versions')) != null ? left : [])).includes(needle)) ?
        version
      :
        __guard__(this.get('image_versions'), x => x[0]);
      return __guard__(this.get('image_url'), x1 => x1.replace(':version', version));
    }

    location() {
      return new PartnerLocation(this.get('location'));
    }

    hasOpened() {
      return moment().isAfter(this.get('start_at'));
    }

    formatDates() {
      return DateHelpers.timespanInWords(this.get('start_at'), this.get('end_at'));
    }

    formatYear() {
      return moment(this.get('start_at')).year();
    }

    small() {
      return this.get('layout') === 'small_fair';
    }

    title() {
      if (this.small()) { return this.get('organizer').name; } else { return this.get('name'); }
    }

    subtitle() {
      if (this.small()) {
        return this.get('summary');
      } else {
        return `${this.formattedDateRange()} ${this.location().cityState()}`;
      }
    }

    fetchSections(options) {
      if (options == null) { options = {}; }
      return new Backbone.Collection().fetch(_.extend(options,
        {url: `${sd.API_URL}/api/v1/fair/${this.get('id')}/sections`})
      );
    }

    fetchShows(options) {
      if (options == null) { options = {}; }
      return this.showsFeed.fetch(_.extend(options,
        {data: _.extend({ size: 3, artworks: true, sort: '-featured' }, options.data)})
      );
    }

    fetchShowForPartner(partnerId, options) {
      if (options == null) { options = {}; }
      const shows = new Backbone.Collection;
      shows.url = `${this.url()}/shows`;
      return shows.fetch({
        data: {
          partner: partnerId
        },
        success(shows) {
          if (__guard__(__guard__(shows.models != null ? shows.models[0] : undefined, x1 => x1.get('results')), x => x[0])) {
            return options.success(shows.models[0].get('results')[0]);
          } else {
            return options.error;
          }
        },
        error: options.error
      });
    }

    fetchPartners(options) {
      let PartnerResults;
      if (options == null) { options = {}; }
      const url = `${sd.API_URL}/api/v1/fair/${this.get('id')}/partners`;
      class PartnerResult extends Backbone.Model {
        href() { return `/show/${this.get('partner_show_ids')[0]}`; }
      }
      const partners = new ((PartnerResults = (function() {
        PartnerResults = class PartnerResults extends Partners {
          static initClass() {
            this.prototype.model = PartnerResult;
            this.prototype.url = url;
          }
        };
        PartnerResults.initClass();
        return PartnerResults;
      })()));

      return partners.fetchUntilEnd(_.extend( options, {
        data: {
          size: 20,
          fair_id: this.get('id'),
          partners: 'partners',
          private_partners: false
        }
      }
      )
      );
    }

    fetchArtists(options) {
      let ArtistResults;
      if (options == null) { options = {}; }
      const url = `${sd.API_URL}/api/v1/fair/${this.get('id')}/artists`;
      const profileId = this.get('default_profile_id');
      class ArtistResult extends Backbone.Model {
        href() { return `/${profileId}/browse/artist/${this.get('id')}`; }
      }
      const artists = new ((ArtistResults = (function() {
        ArtistResults = class ArtistResults extends Partners {
          static initClass() {
            this.prototype.model = ArtistResult;
            this.prototype.url = url;
          }
        };
        ArtistResults.initClass();
        return ArtistResults;
      })()));

      return artists.fetchUntilEnd(_.extend(options, {data: { size: 20, fair_id: this.get('id'), artists: 'artists' }}));
    }

    fetchFilteredSearchOptions(options) {
      const filteredSearchOptions = new Backbone.Model;
      filteredSearchOptions.url = `${sd.API_URL}/api/v1/search/filtered/fair/${this.get('id')}/suggest`;
      return filteredSearchOptions.fetch(options);
    }

    fetchOptions(options) {
      if (options == null) { options = {}; }
      return new Backbone.Model().fetch(_.extend(options,
        {url: `${sd.API_URL}/api/v1/search/filtered/fair/${this.get('id')}/options`})
      );
    }

    fetchCounts(options) {
      if (options == null) { options = {}; }
      return new Backbone.Model().fetch(_.extend(options,
        {url: `${sd.API_URL}/api/v1/search/filtered/fair/${this.get('id')}/suggest`})
      );
    }

    fetchArtworks(options) {
      if (options == null) { options = {}; }
      return this.artworks.fetch(options);
    }

    isEligible() {
      return this.get('published') &&
      // Can be undefined which would cause this whole chain to be undefined
      (this.related().profile.get('published') === true);
    }

    isEventuallyEligible() {
      return this.get('published') &&
      (!this.related().profile.get('published'));
    }

    isNotOver() {
      return !this.isOver();
    }

    isOver() {
      const endOfFair = moment.utc(this.get('end_at')).endOf("day");
      const now = moment();
      return now.isAfter(endOfFair);
    }

    isCurrent() {
      return this.isEligible() && this.isNotOver();
    }

    isUpcoming() {
      return this.isEventuallyEligible() && this.isNotOver();
    }

    isPast() {
      return this.isEligible() && this.isOver();
    }
  };
  _Fair.initClass();
  return _Fair;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Fair = _Fair
