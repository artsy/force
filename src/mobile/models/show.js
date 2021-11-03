/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Show;
const Backbone = require('backbone');
const sd = require('sharify').data;
const { Artworks } = require('../collections/artworks');
const { FairLocation } = require('./fair_location');
const { PartnerLocation } = require('./partner_location');
const _ = require('underscore');
const moment = require('moment');
const { DateMixin } = require('./mixins/date');
const { ShowRelations } = require('./mixins/relations/show');
const { AdditionalImage } = require('./additional_image.');
const { Fetch, Markdown } = require('@artsy/backbone-mixins');
const { DateHelpers } = require('../components/util/date_helpers.');
const { fetchUntilEnd } = Fetch(sd.API_URL);

export default (_Show = (function() {
  _Show = class Show extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Fetch);
      _.extend(this.prototype, DateMixin);
      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, ShowRelations);
    }

    url() {
      if (this.has('partner')) {
        return `${sd.API_URL}/api/v1/partner/${this.get('partner').id}/show/${this.get('id')}`;
      } else {
        return `${sd.API_URL}/api/v1/show/${this.get('id')}`;
      }
    }

    href() {
      return `/show/${this.get('id')}`;
    }

    artworksUrl() {
      return `${sd.API_URL}/api/v1/partner/${this.get('partner').id}/show/${this.get('id')}/artworks`;
    }

    hasImage(size) {
      let needle;
      if (size == null) { size = 'medium'; }
      return (needle = size, Array.from((this.get('image_versions') || [])).includes(needle));
    }

    imageUrl(version) {
      if (version == null) { version = 'medium'; }
      if (this.hasImage(version)) {
        return __guard__(this.get('image_url'), x => x.replace(':version', version));
      } else if (this.has('artworks') && (this.get('artworks').length > 0)) {
        return this.artworks().first().defaultImageUrl(version);
      } else {
       return '';
     }
    }

    // Need this to handle the artworks case
    hasImageUrl(size) {
      if (size == null) { size = 'medium'; }
      return this.imageUrl(size) !== '';
    }

    partnerProfileHref() {
      if (this.has('partner') && this.get('partner').id) {
        return `/partner/${this.get('partner').id}`;
      } else {
        return null;
      }
    }

    partnerName() {
      return __guard__(this.get('partner'), x => x.name);
    }

    artworks() {
      return new Artworks(this.get('artworks'));
    }

    fairHref() {
      if (this.has('fair') && this.get('fair').default_profile_id) {
        return `/${this.get('fair').default_profile_id}`;
      }
    }

    feedHeader() {
      if (this.get('fair')) {
        return this.get('fair').name;
      } else {
        return this.get('name') || _(this.get('artists')).pluck('name').join(', ');
      }
    }

    feedSubheaderAppend() {
      if (this.get('fair')) {
        return __guard__(this.get('fair_location'), x => x.display);
      } else {
        return __guard__(this.get('location'), x1 => x1.city);
      }
    }

    location() {
      if (this.has('location')) {
        return new PartnerLocation(this.get('location'));
      } else if (this.has('fair_location')) {
        return new FairLocation(this.get('fair_location'));
      } else {
        return null;
      }
    }

    // past / current / upcoming show
    // featuring works by {artists} on view
    // at {gallery name} {location} {dates}
    toPageDescription() {
      let artistText = this.formatArtistText();
      if (artistText) {
        artistText = `featuring works by ${artistText}`;
      }

      const info = _.compact([
        'at',
        this.partnerName(),
        __guard__(this.get('fair'), x => x.name) || '',
        __guard__(this.location(), x1 => x1.singleLine()) || '',
        this.runningDates() || ''
      ]).join(' ');

      return _.compact([
        this.formatLeadHeading(),
        artistText,
        info
      ]).join(' ');
    }

    runningDates() {
      return DateHelpers.timespanInWords(this.get('start_at'), this.get('end_at'));
    }

    formatArtistText() {
      let artistText;
      const artists = _.compact(this.related().artists.pluck('name'));
      if (artists.length > 1) {
        return artistText = `${artists.slice(0, (artists.length - 1)).join(', ')} and ${artists[artists.length - 1]}`;
      } else if (artists.length === 1) {
        return artistText = `${artists[0]}`;
      }
    }

    formatLeadHeading() {
      const status =
        (() => {
        if (this.running()) { return 'Current';
        } else if (this.upcoming()) { return 'Upcoming';
        } else if (this.closed()) { return 'Past'; }
      })();
      const type = this.get('fair') ? 'fair booth' : 'show';
      return `${status} ${type}`;
    }

    formattedLocation() {
      if (this.has('fair_location')) {
        return this.get('fair_location').display;
      }
      if (this.get('location')) {
        let address;
        return [
          __guard__(this.get('location'), x => x.city),
          ((address = __guard__(this.get('location'), x1 => x1.address)) ? ', ' + address : '')
        ].join('');
      }
      return '';
    }

    formattedStreetAddress(options){
      if (options == null) { options = {}; }
      if (this.has('fair_location')) {
        return this.get('fair_location').display;
      }
      if (this.get('location')) {
        let address, city;
        return [
          ((address = __guard__(this.get('location'), x => x.address)) ? address : ''),
          ((city = options.show_city) ? ', ' + __guard__(this.get('location'), x1 => x1.city) : '')
        ].join('');
      }
      return '';
    }

    whenAndWhere() {
      return [ this.formattedDateRange(), this.formattedLocation() ].join(', ');
    }

    mapsUrl() {
      if (this.formattedStreetAddress() !== '') {
        return `https://maps.google.com?q=${encodeURIComponent(this.formattedStreetAddress({show_city: true}))}`;
      }
      return '';
    }

    fetchArtworks(options) {
      if (options == null) { options = {}; }
      return new Artworks().fetch(_.extend(options,
        {url: this.artworksUrl()})
      );
    }

    fetchAllArtworks(options) {
      if (options == null) { options = {}; }
      return new Artworks().fetchUntilEnd(_.extend(options,
        {url: this.artworksUrl()})
      );
    }

    fetchInstallShots(callbacks) {
      if (((callbacks != null ? callbacks.success : undefined) == null) || !_.isFunction(callbacks.success)) { throw "You must pass a success callback"; }
      this.installShots = new Backbone.Collection([], { model: AdditionalImage });
      const options = {
        data: { default: false },
        url: `${sd.API_URL}/api/v1/partner_show/${this.get('id')}/images`
      };
      _.extend(options, callbacks);
      return fetchUntilEnd.call(this.installShots, options);
    }

    // opens at any time between the previous and future weekend
    openingThisWeek() {
      const start = moment().day(-2).startOf('day');
      const end = moment().day(8).startOf('day');
      const startAt = this.startAtDate();
      return (start < startAt) && (end > startAt);
    }

    date(attr) {
      return moment(this.get(attr));
    }

    startAtDate() {
      return new Date(this.get('start_at'));
    }

    endAtDate() {
      return new Date(this.get('end_at'));
    }

    formattedEndAt() {
      if (this.date('end_at').format('YYYY') > moment().format('YYYY')) {
        return this.date('end_at').format('MMM DD, YYYY');
      } else {
        return this.date('end_at').format('MMM DD');
      }
    }

    upcoming() { return this.get('status') === 'upcoming'; }
    running() { return this.get('status') === 'running'; }
    closed() { return this.get('status') === 'closed'; }
    renderable() { return (this.get('eligible_artworks_count') > 0) || (this.get('images_count') > 2); }

    // Defaults to 5 days
    isEndingSoon(days) {
      if (days == null) { days = 5; }
      const soon = moment.duration(days, 'days').valueOf();
      const diff = moment(this.get('end_at')).diff(Date.new);
      return (diff <= soon) && (diff >= 0);
    }

    endingIn() {
      const days = moment(this.get('end_at')).diff(Date.new, 'days');
      if (days === 0) { return 'today'; } else { return `in ${days} day${days === 1 ? '' : 's'}`; }
    }

    isOpeningToday() {
      return moment(this.get('start_at')).diff(Date.new, 'days') === 0;
    }

    // TODO: when install shots are supported, add @get('images_count') > X
    featurable() {
      return (this.get('eligible_artworks_count') > 0) && (this.hasImage('featured') || this.hasImage('larger'));
    }

    posterImage() {
      if (this.hasImage('featured')) { return this.imageUrl('featured'); }
      if (this.hasImage('larger')) { return this.imageUrl('larger'); }
      return false;
    }
  };
  _Show.initClass();
  return _Show;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Show = _Show
