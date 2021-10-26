/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Items
const sd = require("sharify").data
const Item = require("../models/item")
const PageableCollection = require("backbone-pageable")

// Collection of Items for an OrderedSet
module.exports = Items = (function () {
  Items = class Items extends PageableCollection {
    constructor(...args) {
      super(...args)
    }

    preinitialize() {
      this.url = this.url.bind(this)
      this.model = this.model.bind(this)
    }

    static initClass() {
      this.prototype.mode = "infinite"
      this.prototype.queryParams = { currentPage: "page", pageSize: "size" }
      this.prototype.state = { pageSize: 20 }
    }

    url() {
      return `${sd.API_URL}/api/v1/set/${this.id}/items`
    }

    parseLinks() {
      return { next() {} }
    } // Appease Backbone Pageable

    model(attrs, options) {
      // Add types as needed:
      switch (this.item_type || attrs.item_type) {
        case "OrderedSet":
          let OrderedSet = require("../models/ordered_set")
          return new OrderedSet(attrs, options)
        case "FeaturedLink":
          let FeaturedLink = require("../models/featured_link")
          return new FeaturedLink(attrs, options)
        case "Profile":
          let Profile = require("../models/profile")
          return new Profile(attrs, options)
        case "Gene":
          let Gene = require("../models/gene")
          return new Gene(attrs, options)
        case "PartnerShow":
          let Show = require("../models/show")
          return new Show(attrs, options)
        default:
          return new Item(attrs, options)
      }
    }

    initialize(models, options) {
      if (options == null) {
        options = {}
      }
      ;({ id: this.id, item_type: this.item_type } = options)
      return super.initialize(...arguments)
    }
  }
  Items.initClass()
  return Items
})()
