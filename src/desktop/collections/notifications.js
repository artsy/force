/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Notifications
const _ = require("underscore")
const sd = require("sharify").data
const Artwork = require("../models/artwork")
const PageableCollection = require("../components/pageable_collection/index")
const { API_URL } = require("sharify").data

export default _Notifications = (function () {
  _Notifications = class Notifications extends PageableCollection {
    static initClass() {
      this.prototype.model = Artwork

      this.prototype.url = `${sd.API_URL}/api/v1/me/notifications`

      this.prototype.defaults = {
        type: "ArtworkPublished",
        since: 30,
      }

      this.prototype.state = { pageSize: 10 }
    }

    initialize(models, options) {
      if (options == null) {
        options = {}
      }
      return ({ type: this.type, since: this.since } = _.defaults(
        options,
        this.defaults
      ))
    }

    fetch(options) {
      if (options == null) {
        options = {}
      }
      options.data = _.defaults(options.data || {}, {
        type: this.type,
        since: this.since,
      })
      return PageableCollection.prototype.fetch.call(this, options)
    }

    groupedByArtist() {
      return this.groupBy(notification =>
        __guard__(notification.get("artist"), x => x.name)
      )
    }
  }
  _Notifications.initClass()
  return _Notifications
})()

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
export const Notifications = _Notifications
