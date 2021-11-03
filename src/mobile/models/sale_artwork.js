/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SaleArtwork;
const Backbone = require('backbone');
const accounting = require('accounting');
const { Markdown } = require('@artsy/backbone-mixins');
const _ = require('underscore');
const sd = require('sharify').data;

export default (_SaleArtwork = (function() {
  _SaleArtwork = class SaleArtwork extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, Markdown);

      this.prototype.reserveFormat = {
        no_reserve: undefined,
        reserve_met: 'Reserve met',
        reserve_not_met: 'Reserve not met'
      };
    }

    url() { return `${sd.API_URL}/api/v1/sale/${this.get('sale').id}/sale_artwork/${this.get('artwork').id}`; }

    money(attr) {
      if (this.has(attr)) { return accounting.formatMoney(this.get(attr) / 100, '$', 0); }
    }

    currentBid() {
      return this.get('display_highest_bid_amount_dollars') || this.get('display_opening_bid_dollars');
    }

    minBid() {
      return this.get('display_minimum_next_bid_dollars');
    }

    bidLabel() {
      if (this.get('highest_bid_amount_cents')) { return 'Current Bid'; } else { return 'Starting Bid'; }
    }

    bidCount() {
      let count = this.get('bidder_positions_count') || 0;
      if (!this.get('highest_bid_amount_cents')) { count = 0; }
      return count;
    }

    bidCountLabel() {
      const count = this.bidCount();
      let bids = `${count} bid`;
      return bids += count === 1 ? '' : 's';
    }

    formatBidCount() {
      if (this.bidCount() === 0) { return ''; } else { return `(${this.bidCountLabel()})`; }
    }

    estimate() {
      return _.compact([this.get('display_low_estimate_dollars'), this.get('display_high_estimate_dollars')]).join('–') ||
      this.get('display_estimate_dollars');
    }

    estimateLabel() {
      if (this.has('estimate_cents') && (!this.has('low_estimate_cents') || !this.has('high_estimate_cents'))) {
        return 'Estimated value';
      } else {
        return 'Estimate';
      }
    }

    formatBidsAndReserve() {
      const count = this.bidCount();
      const label = count === 0 ? '' : this.bidCountLabel();
      let reserve = this.reserveFormat[this.get('reserve_status')];
      if ((reserve != null) && !label) { reserve = "This work has a reserve"; }
      const bidAndReserve = _.compact([label, reserve]).join(', ');
      if (bidAndReserve) { return `(${bidAndReserve})`; } else { return ''; }
    }
  };
  _SaleArtwork.initClass();
  return _SaleArtwork;
})());
export const SaleArtwork = _SaleArtwork
