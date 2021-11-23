/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _AuctionLot;
const _ = require('underscore');
const Backbone = require('backbone');
const { Image, Dimensions } = require('@artsy/backbone-mixins');

const { API_URL, SECURE_IMAGES_URL } = require('sharify').data;

export default (_AuctionLot = (function() {
  _AuctionLot = class AuctionLot extends Backbone.Model {
    static initClass() {
      this.prototype.urlRoot = `${API_URL}/api/v1/auction_lot`;

      _.extend(this.prototype, Dimensions);
      _.extend(this.prototype, Image(SECURE_IMAGES_URL));
    }

    href(artist) {
      return `/artist/${artist.id}/auction-result/${this.id}`;
    }

    // @return {Boolean}
    hasDimensions() {
      return ((__guard__(this.get('dimensions'), x => x.in) || __guard__(this.get('dimensions'), x1 => x1.cm)) != null);
    }

    // Format: Auction Result for "Title" (Year) by Artist | Auction House, Auction Date | Artsy
    // (Often auction lots have an artist_name but it is commonly missing, so the artist is explicitly passed in)
    //
    // @return {String}
    toPageTitle(artist) {
      let titleAndName = `\"${this.get('title') || 'Untitled'}\"`;
      if (this.get('dates_text')) { titleAndName += ` (${this.get('dates_text')})`; }
      if (artist != null ? artist.get('name') : undefined) { titleAndName += ` by ${(artist != null ? artist.get('name') : undefined)}`; }
      let organizationAndDate = this.get('organization');
      if (this.get('auction_dates_text')) { organizationAndDate += `, ${this.get('auction_dates_text')}`; }
      return _.compact([
        `Auction Result for ${titleAndName}`,
        organizationAndDate,
        'Artsy'
      ]).join(' | ');
    }

    toPageDescription() {
      const artworkInfo = _.compact([
        this.get('medium_text'),
        this.dimensions({ metric: 'in', format: 'decimal' })
      ]).join(', ');

      return _.compact([
        artworkInfo,
        `Estimate ${this.get('estimate_text')} from ${this.get('organization')} on ${this.get('auction_dates_text')}`,
        "Find auction estimate and sale price, and research more auction results from top auction houses."
      ]).join('. ');
    }
  };
  _AuctionLot.initClass();
  return _AuctionLot;
})());

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const AuctionLot = _AuctionLot
