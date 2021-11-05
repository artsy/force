/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Artwork;
const _ = require('underscore');
const Backbone = require('backbone');
const sd = require('sharify').data;
const { Dimensions, Markdown } = require('@artsy/backbone-mixins');
const { Artworks } = require('../collections/artworks');
const { EditionSets } = require('../collections/edition_sets');
const { Sale } = require('./sale');
const { SaleArtwork } = require('./sale_artwork');
const { Images } = require('../collections/images');
const { AdditionalImage } = require('./additional_image');
const { ArtworkRelations } = require('./mixins/relations/artwork');

export default (_Artwork = (function() {
  _Artwork = class Artwork extends Backbone.Model {
    constructor(...args) {
      super(...args);
    }

    preinitialize() {
      this.fetchRelatedArtworks = this.fetchRelatedArtworks.bind(this);
    }

    static initClass() {
      _.extend(this.prototype, Dimensions);
      _.extend(this.prototype, Markdown);
      _.extend(this.prototype, ArtworkRelations);
    }

    urlRoot() {
      return `${sd.API_URL}/api/v1/artwork`;
    }

    href() {
      return `/artwork/${this.id}`;
    }

    images() {
      return new Images(this.get('images'));
    }

    defaultImageUrl(version) {
      if (version == null) { version = 'medium'; }
      return this.defaultImage().imageUrl(version);
    }

    setImagesCollection(images) {
      return this.images = new Backbone.Collection(images, {model: AdditionalImage, comparator: 'position'});
    }

    defaultImage() {
      // Blank additionalImage is to handle works without images
      return this.images().findWhere({is_default: true}) || __guardMethod__(this.images, 'first', o => o.first()) || new AdditionalImage();
    }

    fetchRelatedArtworks(options) {
      if (options == null) { options = {}; }
      const artworks = new Artworks;
      artworks.url = `${sd.API_URL}/api/v1/related/layer/` +
                     `synthetic/main/artworks?artwork[]=${this.get('id')}`;
      return artworks.fetch(options);
    }

    showPriceLabel() {
      return ((__guard__(this.get('edition_sets'), x => x.length) <= 1) &&
      (this.get('inquireable') || this.get('sold'))) || false;
    }

    showNotForSaleLabel() {
      let needle;
      return this.get('inquireable') && !((needle = this.get('availability'), ['sold', 'for sale'].includes(needle)));
    }

    editionSets() {
      return new EditionSets(this.get('edition_sets'));
    }

    partnerHref() {
      return (
        this.get('partner').has_full_profile ?
          '/partner/' + this.get('partner').id
        :
          this.get('partner').website
      ) || '';
    }

    hasCollectingInstitution() {
      return __guard__(this.get('collecting_institution'), x => x.length) > 0;
    }

    hasMoreInfo() {
      return [
        this.get('provenance'),
        this.get('exhibition_history'),
        this.get('signature'),
        this.get('additional_information'),
        this.get('literature')
      ].join('').length > 0;
    }

    partnerName() {
      if (this.hasCollectingInstitution()) {
        return this.get('collecting_institution');
      } else {
        return __guard__(this.get('partner'), x => x.name);
      }
    }

    fetchRelatedSales(options) {
      if (options == null) { options = {}; }
      return new Backbone.Collection(null,
        {model: Sale}
      ).fetch({
        url: `${sd.API_URL}/api/v1/related/sales?artwork[]=${this.get('id')}`,
        success: options.success
      });
    }

    fetchCurrentSale(options) {
      if (options == null) { options = {}; }
      return this.fetchRelatedSales({
        success: sales => {
          return options.success(sales.models[0]);
        }
      });
    }

    fetchSaleArtwork(sale, options) {
      if (options == null) { options = {}; }
      return new SaleArtwork({ sale, artwork: this}).fetch({
        success: options.success});
    }

    // Fetches an auction and the sale artwork associated with this artwork.
    //
    // @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
    //                         success calls back with (auction, saleArtwork)

    fetchAuctionAndSaleArtwork(options) {
      if (options == null) { options = {}; }
      return this.fetchRelatedSales({
        success: sales => {
          const auction = sales.select(sale => sale.get('is_auction'))[0];
          if (!auction) { return options.success(); }
          return this.fetchSaleArtwork(auction, {
            success: saleArtwork => {
              return options.success(auction, saleArtwork);
            },
            error: options.error
          }
          );
        },
        error: options.error
      });
    }

    saleMessage() {
      if (this.get('sale_message') === 'Contact For Price') { return undefined; }
      if (__guard__(this.get('sale_message'), x => x.indexOf('Sold')) > - 1) {
        return _.compact(['Sold', this.get('price')]).join(' — ');
      } else {
        return this.get('sale_message');
      }
    }

    availableForSale() {
      let needle;
      return (needle = this.get('availability'), !['not for sale', 'sold', 'on hold'].includes(needle));
    }

    // Returns the best image url it can find for the index and size.
    //
    // param {String} version
    // param {Number} i
    // return {String}
    imageUrl(version, i) {
      let img, v;
      if (version == null) {
        version = 'larger';
      }
      const imgs = this.get('images');
      if (!(imgs != null ? imgs.length : undefined)) {
        return;
      }
      if (i) {
        img = _.findWhere(imgs, {
          position: i
        }) || imgs[i] || imgs[0];
      } else {
        img = _.findWhere(imgs, {
          is_default: true
        }) || imgs[0];
      }
      if (!img) {
        return;
      }
      let url = img.image_urls != null ? img.image_urls[version] : undefined;
      if (v = img.image_versions != null ? img.image_versions[version] : undefined) {
        if (!url) {
          url = img.image_url != null ? img.image_url.replace(':version', v) : undefined;
        }
      }
      if (!url) {
        url = _.values(img.image_urls)[0];
      }
      if (!url) {
        url = img.image_url != null ? img.image_url.replace(':version', _.first(img.image_versions)) : undefined;
      }
      return url;
    }

    // Are there comparable artworks;
    // such that we can display a link to auction results
    //
    // return {Boolean}
    isComparable() {
      return (this.get('comparables_count') > 0) && (this.get('category') !== 'Architecture');
    }

    // Can we display a price?
    //
    // return {Boolean}
    isPriceDisplayable() {
      return (this.has('price')) &&
        !this.isMultipleEditions() &&
        (this.get('inquireable') || this.get('sold')) &&
        !this.isUnavailableButInquireable() &&
        (this.get('sale_message') !== 'Contact For Price');
    }

    // Should we include a button to contact the partner?
    //
    // return {Boolean}
    isContactable() {
      return this.get('forsale') && this.has('partner') && !this.get('acquireable');
    }

    // Should we render a full set of editions,
    // as opposed to a single string? (See: #editionStatus)
    //
    // return {Boolean}
    isMultipleEditions() {
      if (!this.get('edition_sets')) {
        return false
      }
      return this.get('edition_sets').length > 1;
    }

    // The work is not for sale but a buyer may be interested
    // in related works
    //
    // return {Boolean}
    isUnavailableButInquireable() {
      return !this.get('forsale') && this.get('inquireable') && !this.get('sold');
    }
  };
  _Artwork.initClass();
  return _Artwork;
})());

function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}
function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Artwork = _Artwork
