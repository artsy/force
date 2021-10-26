/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let FeaturedLinks
const Backbone = require("backbone")
const sd = require("sharify").data
const _ = require("underscore")
const FeaturedLink = require("../models/featured_link")
const { Fetch } = require("@artsy/backbone-mixins")

module.exports = FeaturedLinks = (function () {
  FeaturedLinks = class FeaturedLinks extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(sd.API_URL))

      this.prototype.model = FeaturedLink
    }

    url() {
      return `${sd.API_URL}/api/v1/set/5172bbb97695afc60a000001/items`
    }

    static fetchHomepageSet(options) {
      if (options == null) {
        options = {}
      }
      const sets = new Backbone.Collection()
      sets.url = `${sd.API_URL}/api/v1/sets?key=homepage:features`
      return sets.fetch({
        success(sets) {
          const links = new FeaturedLinks({ id: sets.first().get("id") })
          return links.fetch(_.extend(options, { data: { size: 4 } }))
        },
      })
    }
  }
  FeaturedLinks.initClass()
  return FeaturedLinks
})()
