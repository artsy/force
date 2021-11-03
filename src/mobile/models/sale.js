/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Sale;
const _ = require('underscore');
const Backbone = require('backbone');
const sd = require('sharify').data;
const moment = require('moment');
const { Fetch, Markdown, Image } = require('@artsy/backbone-mixins');
const { SaleRelations } = require('./mixins/relations/sale');
const { Eventable } = require('./mixins/eventable');

export default (_Sale = (function() {
  _Sale = class Sale extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, SaleRelations);
      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, Image(sd.API_URL));
      _.extend(this.prototype, Eventable);

      this.prototype.urlRoot = `${sd.API_URL}/api/v1/sale`;
    }

    href() {
      if (this.isSale()) {
        return `/sale/${this.id}`;
      } else {
        return `/auction/${this.id}`;
      }
    }

    registerUrl(redirectUrl) {
      let url = `/auction-registration/${this.id}`;
      if (redirectUrl) { url += `?redirect_uri=${redirectUrl}`; }
      return url;
    }

    registrationSuccessUrl(artworkId = null){
      if (artworkId) {
        return `${this.href()}/bid/${artworkId}/confirm-registration`;
      } else {
        return `${this.href()}/confirm-registration`;
      }
    }

    registrationFlowUrl() {
      return `${this.href()}/registration-flow`;
    }

    buyersPremiumUrl() {
      return `${this.href()}/buyers-premium`;
    }

    calculateOffsetTimes(options) {
      if (options == null) { options = {}; }
      return new Backbone.Model().fetch({
        url: `${sd.API_URL}/api/v1/system/time`,
        success: response => {
          const offset = moment().diff(moment(response.get('iso8601')));
          this.set('offsetLiveStartAtMoment', moment(this.get('live_start_at')).add(offset));
          this.set('offsetStartAtMoment', moment(this.get('start_at')).add(offset));
          this.set('offsetEndAtMoment', moment(this.get('end_at')).add(offset));
          this.updateState();
          if ((options != null ? options.success : undefined) != null) { return options.success(); }
        },
        error: (options != null ? options.error : undefined)
      });
    }

    updateState() {
      return this.set('clockState', ((() => {

        if (moment().isAfter(this.get('offsetEndAtMoment')) || (this.get('auction_state') === 'closed')) {
          return 'closed';
        } else if (this.get('live_start_at') && moment().isBefore(this.get('offsetLiveStartAtMoment'))) {
          return 'live';
        } else if (moment().isAfter(this.get('offsetStartAtMoment')) && moment().isBefore(this.get('offsetEndAtMoment'))) {
          return 'open';
        } else if (moment().isBefore(this.get('offsetStartAtMoment'))) {
          return 'preview';
        }

      })()));
    }

    state() {
      if (this.has('clockState')) { return this.get('clockState'); } else { return this.get('auction_state'); }
    }

    auctionState() {
      return this.get('auction_state');
    }

    isRegisterable() {
      return this.isAuction() && _.contains(['preview', 'open'], this.get('auction_state'));
    }

    isAuction() {
      return this.get('is_auction');
    }

    isBidable() {
      return this.isAuction() && _.contains(['open'], this.get('auction_state'));
    }

    isPreviewState() {
      return this.isAuction() && _.contains(['preview'], this.get('auction_state'));
    }

    isOpen() {
      return this.state() === 'open';
    }

    isPreview() {
      return this.state() === 'preview';
    }

    isClosed() {
      return this.state() === 'closed';
    }

    isAuctionPromo() {
      return this.get('sale_type') === 'auction promo';
    }

    isRegistrationEnded() {
      return this.isAuction() && moment().isAfter(this.get('registration_ends_at'));
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

    // Feature support:
    fetchArtworks() {
      return this.related().saleArtworks.fetchUntilEnd(...arguments);
    }

    getMonthRange() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }

    getYearRange(range) {
      if (range == null) { range = 10; }
      const startDate = new Date();
      const startYear = startDate.getFullYear();

      const endDate = new Date(`01 Jan ${startYear + range}`);
      const endYear = endDate.getFullYear();

      return __range__(startYear, endYear, true);
    }

    isLiveOpen() {
      return (this.get('auction_state') === 'open') && moment().isAfter(this.get('live_start_at'));
    }
  };
  _Sale.initClass();
  return _Sale;
})());

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
export default Sale = _Sale
