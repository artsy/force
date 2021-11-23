/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SaleArtwork;
const _ = require('underscore');
const { formatMoney } = require('accounting');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { Markdown } = require('@artsy/backbone-mixins');
const { Artwork } = require('./artwork');
const { Sale } = require('./sale');

const MAX_POLL_TIMES = 7;
const POLL_DELAY = 1000;

export default (_SaleArtwork = (function() {
  _SaleArtwork = class SaleArtwork extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Markdown);

      this.prototype.reserveFormat = {
        no_reserve: null,
        reserve_met: 'Reserve met',
        reserve_not_met: 'Reserve not met'
      };
    }

    url() {
      return `${sd.API_URL}/api/v1/sale/${this.get('sale').id}/sale_artwork/${this.get('artwork').id}`;
    }

    artwork() { return new Artwork(this.get('artwork')); }
    sale() { return new Sale(this.get('sale')); }

    money(attr) {
      if (this.has(attr)) { return formatMoney(this.get(attr) / 100, '$', 0); }
    }

    currentBid() {
      return this.get('display_highest_bid_amount_dollars') || this.get('display_opening_bid_dollars');
    }

    minBid() {
      return this.get('display_minimum_next_bid_dollars');
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

    // Changes bidAmount to a number in cents
    cleanBidAmount(bidAmount){
      if (bidAmount) {
        bidAmount = String(bidAmount).split('.')[0];
        return Number(bidAmount.replace(',', '').replace('.00', '').replace('.', '').replace('$', '')) * 100;
      }
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

    reserveLabel() {
      return this.reserveFormat[this.get('reserve_status')];
    }

    formatBidsAndReserve() {
      let reserve;
      const bid = this.bidCount() === 0 ? '' : this.bidCountLabel();
      if (this.get('reserve_status') !== 'no_reserve') { reserve = this.reserveLabel(); }
      if ((reserve != null) && !bid) { reserve = "This work has a reserve"; }
      const bidAndReserve = _.compact([bid, reserve]).join(', ');
      if (bidAndReserve) { return `(${bidAndReserve})`; } else { return ''; }
    }

    // Polls the sale artwork API until it notices the bid has changed.
    //
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
    pollForBidChange(options) {
      let interval;
      let i = 0; const lastBid = this.get('highest_bid_amount_cents');
      const poll = () => {
        return this.fetch({
          success: () => {
            if ((this.get('highest_bid_amount_cents') !== lastBid) || (i > MAX_POLL_TIMES)) {
              clearInterval(interval);
              return options.success();
            } else {
              return i++;
            }
          },
          error: function() {
            clearInterval(interval);
            return options.error(...arguments);
          }.bind(this)
        });
      };
      return interval = setInterval(poll, POLL_DELAY);
    }
  };
  _SaleArtwork.initClass();
  return _SaleArtwork;
})());
export const SaleArtwork = _SaleArtwork
