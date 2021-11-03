/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerShows
const _ = require("underscore")
const Backbone = require("backbone")
const sd = require("sharify").data
const { Show } = require("../models/show")
const moment = require("moment")

export default _PartnerShows = (function () {
  _PartnerShows = class PartnerShows extends Backbone.Collection {
    static initClass() {
      this.prototype.model = Show
    }

    url() {
      if (this.partnerId) {
        return `${sd.API_URL}/api/v1/partner/${this.partnerId}/shows?sort=-featured,-end_at`
      } else {
        return `${sd.API_URL}/api/v1/shows`
      }
    }

    initialize(models, options) {
      if (options == null) {
        options = {}
      }
      return ({ partnerId: this.partnerId } = options)
    }

    current(exclude) {
      if (exclude == null) {
        exclude = []
      }
      return new PartnerShows(
        _.filter(
          this.models,
          show =>
            show.running() &&
            show.renderable() &&
            !Array.from(exclude).includes(show)
        )
      )
    }

    upcoming(exclude) {
      if (exclude == null) {
        exclude = []
      }
      return new PartnerShows(
        _.filter(
          this.models,
          show =>
            show.upcoming() &&
            show.renderable() &&
            !Array.from(exclude).includes(show)
        )
      )
    }

    past(exclude) {
      if (exclude == null) {
        exclude = []
      }
      return new PartnerShows(
        _.filter(
          this.models,
          show =>
            show.closed() &&
            show.renderable() &&
            !Array.from(exclude).includes(show)
        )
      )
    }

    featuredShow() {
      // If there is a featured show (should only be one), this wins
      const featured = this.findWhere({ featured: true })
      if (featured != null) {
        return featured
      }

      // Next in line is the first current show that ends closest to now
      let featurables = _.filter(this.where({ status: "running" }), show =>
        show.featurable()
      )
      featurables = _.sortBy(featurables, show =>
        moment(show.get("end_at")).unix()
      )
      if (featurables.length > 0) {
        return featurables[0]
      }

      // Then the first upcoming show by start date
      featurables = _.filter(this.where({ status: "upcoming" }), show =>
        show.featurable()
      )
      featurables = _.sortBy(featurables, show =>
        moment(show.get("start_at")).unix()
      )
      if (featurables.length > 0) {
        return featurables[0]
      }

      // Finally, we'll take a past show ordered by the default
      featurables = _.filter(this.where({ status: "closed" }), show =>
        show.featurable()
      )
      if (featurables.length > 0) {
        return featurables[0]
      }
    }
  }
  _PartnerShows.initClass()
  return _PartnerShows
})()
export const PartnerShows = _PartnerShows
