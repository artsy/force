/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Partners
const _ = require("underscore")
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const { AToZ, Fetch } = require("@artsy/backbone-mixins")
const { Partner } = require("../models/partner")

export default _Partners = (function () {
  _Partners = class Partners extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, AToZ)
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = Partner

      this.prototype.url = `${API_URL}/api/v1/partners`

      this.types = {
        galleries: ["PartnerGallery"],

        institutions: ["PartnerInstitution", "PartnerInstitutionalSeller"],
      }
    }
  }
  _Partners.initClass()
  return _Partners
})()
export const Partners = _Partners
