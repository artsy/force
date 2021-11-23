/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Sale;
const _ = require('underscore');
const { API_URL, SECURE_IMAGES_URL } = require('sharify').data;
const moment = require('moment-timezone');
const Backbone = require('backbone');
const { Fetch, Markdown, Image, CalendarUrls } = require('@artsy/backbone-mixins');
const { Clock } = require('./mixins/clock');
const { SaleRelations } = require('./mixins/relations/sale');
const { ImageSizes } = require('./mixins/image_sizes');
const { Eventable } = require('./mixins/eventable');
const { getLiveAuctionUrl } = require('../../desktop/apps/auction/utils/urls');

export default (_Sale = (function() {
  _Sale = class Sale extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Clock);
      _.extend(this.prototype, SaleRelations);
      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
      _.extend(this.prototype, ImageSizes);
      _.extend(this.prototype, Eventable);

      this.prototype.urlRoot = `${API_URL}/api/v1/sale`;
    }

    href() {
      if (this.isSale()) {
        return `/sale/${this.id}`;
      } else {
        return `/auction/${this.id}`;
      }
    }

    registrationFlowUrl() {
      return `${this.href()}/registration-flow`;
    }

    registrationSuccessUrl() {
      return `${this.href()}/confirm-registration`;
    }

    buyersPremiumUrl() {
      return `${this.href()}/buyers-premium`;
    }

    registerUrl(redirectUrl) {
      let url = `/auction-registration/${this.id}`;
      if (redirectUrl) { url += `?redirect_uri=${redirectUrl}`; }
      return url;
    }

    bidUrl(artwork) {
      return `${this.href()}/bid/${artwork.id}`;
    }

    redirectUrl(artwork) {
      if (this.isBidable() && (artwork != null)) {
        return this.bidUrl(artwork);
      } else {
        return this.href();
      }
    }

    contactButtonState(user, artwork) {
      if (this.isAuctionPromo()) {
        return {label: `Contact ${this.related().profile.displayName() || 'Auction House'}`, enabled: true, classes: 'js-inquiry-button'};
      }
    }

    buyButtonState(user, artwork) {
      if (this.isOpen() && artwork.get('acquireable') && !artwork.get('sold')) {
        return {label: 'Buy now', enabled: true, classes: 'js-acquire-button', href: ''};
      } else if (this.isOpen() && artwork.get('acquireable') && artwork.get('sold')) {
        return {label: 'Sold', enabled: false, classes: 'is-disabled', href: ''};
      }
    }


    bidButtonState(user, artwork) {
      if (this.isClosed()) {
        return {label: 'Auction Closed', enabled: false, classes: 'is-disabled', href: ''};
      } else if (this.isLiveOpen()) {
        return {label: 'Enter Live Auction', enabled: true, href: getLiveAuctionUrl(this.get('id'), { isLoggedIn: Boolean(user) })};
      } else if (artwork.get('sold') && !artwork.get('acquireable')) {
        return {label: 'Sold', enabled: false, classes: 'is-disabled', href: ''};
      } else {
        if (this.isPreview() && !(user != null ? user.get('registered_to_bid') : undefined)) {
          return {label: 'Register to bid', enabled: true, classes: '', href: this.registerUrl()};
        } else if (this.isPreview() && (user != null ? user.get('registered_to_bid') : undefined)) {
          return {label: 'Registered to bid', enabled: false, classes: 'is-success is-disabled', href: ''};
        } else if ((user != null ? user.get('registered_to_bid') : undefined) && !(user != null ? user.get('qualified_for_bidding') : undefined)) {
          return {label: 'Registration Pending', enabled: false, classes: 'is-disabled', href: ''};
        } else if (!(user != null ? user.get('qualified_for_bidding') : undefined) && this.isRegistrationEnded()) {
          return {label: 'Registration Closed', enabled: false, classes: 'is-disabled', href: ''};
        } else {
          return {label: 'Bid', enabled: true, classes: 'js-bid-button', href: ((artwork ? this.bidUrl(artwork) : undefined))};
        }
      }
    }

    isRegisterable() {
      return this.isAuction() && _.include(['preview', 'open'], this.get('auction_state'));
    }

    isAuction() {
      return this.get('is_auction');
    }

    isBidable() {
      return this.isAuction() && _.include(['open'], this.get('auction_state'));
    }

    isPreviewState() {
      return this.isAuction() && _.include(['preview'], this.get('auction_state'));
    }

    isOpen() {
      return this.get('auction_state') === 'open';
    }

    isPreview() {
      return this.get('auction_state') === 'preview';
    }

    isClosed() {
      return this.get('auction_state') === 'closed';
    }

    isRegistrationEnded() {
      return this.isAuction() && moment().isAfter(this.get('registration_ends_at'));
    }

    isLiveAuction() {
      return this.get('live_start_at');
    }

    isLiveOpen() {
      return (this.get('auction_state') === 'open') && moment().isAfter(this.get('live_start_at'));
    }

    isAuctionPromo() {
      return this.get('sale_type') === 'auction promo';
    }

    isUpcomingOrClosed() {
      return this.isPreview() || this.isOpen();
    }

    isSale() {
      return !this.isAuction() &&
      !this.isAuctionPromo();
    }

    isPreliminaryAuction() {
      return this.get('is_auction') && this.get('is_preliminary');
    }

    isAuctionPromoInquirable() {
      return this.isAuctionPromo() && this.isPreview();
    }

    sortableDate() {
      if (this.get('live_start_at') != null) { return this.get('live_start_at'); } else { return this.get('end_at'); }
    }

    endedTime() {
      if (this.get('end_at') != null) { return moment.utc(this.get('end_at')); } else { return moment.utc(this.get('ended_at')); }
    }

    // if a reminder is in order, return relevant data. else undefined.
    reminderStatus() {
      if (this.isClosingSoon()) { return 'closing_soon'; }
      if (this.isLiveOpen()) { return 'live_open'; }
      if (this.isLiveOpenSoon()) { return 'live_open_soon'; }
    }

    // Between 24 hours left and 10 seconds remaining
    isClosingSoon(offset) {
      if (offset == null) { offset = 0; }
      if (this.isLiveAuction()) { return false; }
      const end = this.date('end_at').add(offset, 'milliseconds');

      const twentyFourHours = end.clone().subtract(24, 'hours');
      const tenSeconds = end.clone().subtract(10, 'seconds');

      return moment().isBetween(twentyFourHours, tenSeconds);
    }

    isLiveOpenSoon(offset) {
      if (offset == null) { offset = 0; }
      if (!this.isLiveAuction()) { return false; }
      const startAt = this.date('live_start_at').add(offset, 'milliseconds');
      const twentyFourHours = startAt.clone().subtract(10, 'minutes');
      return moment().isBetween(twentyFourHours, startAt);
    }

    isWithHeaderImage() {
      return __guard__(this.get('image_versions'), x => x.length) > 0;
    }

    // Support for Feature in @artsy/backbone-mixins
    fetchArtworks() {
      return this.related().saleArtworks.fetchUntilEnd(...arguments);
    }

    zone(time) {
      return moment(time).tz('America/New_York');
    }

    event() {
      let end, start;
      const timeFormat = 'YYYY-MM-DD[T]HH:mm:ss';
      if (this.get('live_start_at')) {
        start = this.get('live_start_at') || moment();
        end  = moment(this.get('live_start_at')).add(4, 'hours');
      } else {
        start = this.get('start_at') || moment();
        end = this.get('end_at') || moment();
      }

      const event = new Backbone.Model({
        start_at: this.zone(start).format(timeFormat),
        end_at: this.zone(end).format(timeFormat),
        name: this.get('name')
      });

      _.extend(event, CalendarUrls({ title: 'name' }));
      return event;
    }

    overviewStartDate() {
      return moment(this.get('start_at')).tz('America/New_York').format('MMMM Do');
    }

    upcomingLabel() {
      const timeFormat = 'MMM D h:mm A z';
      const label = this.isClosed() ?
        "Auction Closed"
      : this.get('live_start_at') && !this.isLiveOpen() ?
        `Live bidding begins ${this.zone(this.get('live_start_at')).format(timeFormat)}`
      : this.get('live_start_at') ?
        "Live bidding now open"
      : this.isPreviewState() ?
        `Auction opens ${this.zone(this.get('start_at')).format(timeFormat)}`
      : !this.get('is_sale') ?
        `Closes ${this.zone(this.get('end_at')).format(timeFormat)}`
      : this.get('is_auction') ?
        `Bidding closes ${this.zone(this.get('end_at')).format(timeFormat)}`
      :
        "";

      // Piggyback on common `moment` output to guard against missing / bad data
      // FIXME: This could perhaps be a bit safer
      if (label.includes('Invalid')) {
        return "";
      } else {
        return label;
      }
    }

    upcomingDateTime() {
      const timeFormat = 'MMM D h:mm A z';
      if (this.isClosed()) {
        return "Auction Closed";
      } else if (this.get('live_start_at') && !this.isLiveOpen()) {
        return `${this.zone(this.get('live_start_at')).format(timeFormat)}`;
      } else if (this.get('live_start_at')) {
        return "Live bidding now open";
      } else if (this.isPreviewState()) {
        return `${this.zone(this.get('start_at')).format(timeFormat)}`;
      } else {
        return `${this.zone(this.get('end_at')).format(timeFormat)}`;
      }
    }
  };
  _Sale.initClass();
  return _Sale;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Sale = _Sale
