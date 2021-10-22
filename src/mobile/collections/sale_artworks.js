/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let SaleArtworks;
const _ = require('underscore');
const sd = require('sharify').data;
const Backbone = require('backbone');
const { Fetch } = require('@artsy/backbone-mixins');

module.exports = (SaleArtworks = (function() {
  SaleArtworks = class SaleArtworks extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(sd.API_URL));
  
      this.prototype.comparator = 'position';
    }

    url() {
      return `${sd.API_URL}/api/v1/sale/${this.id}/sale_artworks`;
    }

    initialize(models, options) {
      if (options == null) { options = {}; }
      ({ id: this.id } = options);
      return super.initialize(...arguments);
    }
  };
  SaleArtworks.initClass();
  return SaleArtworks;
})());
