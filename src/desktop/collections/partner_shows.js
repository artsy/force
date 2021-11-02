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
const sd = require("sharify").data
const moment = require("moment")
const PartnerShow = require("../models/partner_show")

const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const { Fetch } = require("@artsy/backbone-mixins")

export default _PartnerShows = (function () {
  _PartnerShows = class PartnerShows extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = PartnerShow

      this.prototype.url = `${sd.API_URL}/api/v1/shows`
    }

    // Get the running partner shows collection.
    //
    // @param {Object} exclude an array of PartnerShow objects to be excluded
    current(exclude) {
      if (exclude == null) {
        exclude = []
      }
      return new PartnerShows(
        _.filter(
          this.models,
          show =>
            show.running() &&
            show.get("displayable") &&
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
            show.get("displayable") &&
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
            show.get("displayable") &&
            !Array.from(exclude).includes(show)
        )
      )
    }

    featured() {
      // If there is a featured show (should only be one), this wins
      const featured = this.findWhere({ featured: true })
      if (featured != null) {
        return featured
      }

      // Next in line is the first current show that ends closest to now
      let featurables = this.current().filter(show => show.get("displayable"))
      featurables = _.sortBy(featurables, show =>
        moment(show.get("end_at")).unix()
      )
      if (featurables.length) {
        return featurables[0]
      }

      // Then the first upcoming show by start date
      featurables = this.upcoming().filter(show => show.get("displayable"))
      featurables = _.sortBy(featurables, show =>
        moment(show.get("start_at")).unix()
      )
      if (featurables.length) {
        return featurables[0]
      }

      // Finally, we'll take a past show ordered by the default
      featurables = this.past().filter(show => show.get("displayable"))
      if (featurables.length) {
        return featurables[0]
      }
    }

    getShowsRelatedImages() {
      return Promise.allSettled(
        this.map(function (show) {
          show
            .related()
            .installShots.fetch({ data: { size: 1, default: false } })
          return show.related().artworks.fetch({ data: { size: 5 } })
        })
      ).then(() => {
        return this.trigger("shows:fetchedRelatedImages")
      })
    }
  }
  _PartnerShows.initClass()
  return _PartnerShows
})()
export const PartnerShows = _PartnerShows
