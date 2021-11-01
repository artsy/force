/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ShowsFeed
const _ = require("underscore")
const Backbone = require("backbone")
const sd = require("sharify").data
const Show = require("../models/show")

export default _ShowsFeed = (function () {
  _ShowsFeed = class ShowsFeed extends Backbone.Collection {
    constructor(...args) {
      super(...args)
      this.nextPage = this.nextPage.bind(this)
    }

    static initClass() {
      this.prototype.model = Show
    }

    url() {
      return `${sd.API_URL}/api/v1/shows/feed`
    }

    parse(res) {
      this.lastCursor = this.nextCursor
      this.nextCursor = res.next
      return res.results
    }

    nextPage(options) {
      if (options == null) {
        options = {}
      }
      if (
        this.lastCursor != null &&
        (this.nextCursor == null || this.lastCursor === this.nextCursor)
      ) {
        return false
      }
      return this.fetch(
        _.extend(options, {
          data: _.extend({ cursor: this.nextCursor }, options.data),
          remove: false,
        })
      )
    }
  }
  _ShowsFeed.initClass()
  return _ShowsFeed
})()
export const ShowsFeed = _ShowsFeed
