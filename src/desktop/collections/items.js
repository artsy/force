/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Items;
const sd = require('sharify').data;
const { Item } = require('../models/item');
const PageableCollection = require('../components/pageable_collection/index.coffee');

// Collection of Items for an OrderedSet
module.exports = (Items = (function() {
  Items = class Items extends PageableCollection {
    constructor(...args) {
      super(...args);
    }

    static initClass() {
      this.prototype.mode = 'infinite';
  
      this.prototype.state = {pageSize: 20};
    }

    preinitialize() {
      this.url = this.url.bind(this);
      this.model = this.model.bind(this);
    }

    url() {
      return `${sd.API_URL}/api/v1/set/${this.id}/items`;
    }

    parseLinks() { return { next() {} }; } // Appease Backbone Pageable

    model(attrs, options) {
      // Add types as needed:
      switch (this.item_type || (attrs != null ? attrs.item_type : undefined)) {
        case 'OrderedSet':
          var OrderedSet = require('../models/ordered_set');
          return new OrderedSet(attrs, options);
        case 'FeaturedLink':
          var FeaturedLink = require('../models/featured_link');
          return new FeaturedLink(attrs, options);
        case 'Profile':
          var Profile = require('../models/profile');
          return new Profile(attrs, options);
        case 'Gene':
          var Gene = require('../models/gene');
          return new Gene(attrs, options);
        case 'PartnerShow':
          var PartnerShow = require('../models/partner_show');
          return new PartnerShow(attrs, options);
        case 'Artwork':
          var Artwork = require('../models/artwork');
          return new Artwork(attrs, options);
        default:
          return new Item(attrs, options);
      }
    }

    initialize(models, options) {
      if (options == null) { options = {}; }
      ({ id: this.id, item_type: this.item_type } = options);
      return super.initialize(...arguments);
    }
  };
  Items.initClass();
  return Items;
})());
