/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerArtists
const _ = require("underscore")
const Backbone = require("backbone")
const PartnerArtist = require("../models/partner_artist")
const { API_URL } = require("sharify").data
const { Fetch } = require("@artsy/backbone-mixins")

export default _PartnerArtists = (function () {
  _PartnerArtists = class PartnerArtists extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = PartnerArtist

      this.prototype.comparator = "sortable_id"
    }
  }
  _PartnerArtists.initClass()
  return _PartnerArtists
})()
export const PartnerArtists = _PartnerArtists
