/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Match
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const Suggestion = require("../models/suggestion")

export default _Match = (function () {
  _Match = class Match extends Backbone.Collection {
    static initClass() {
      this.prototype.model = Suggestion

      this.prototype.kind = null

      this.prototype.kinds = ["artworks", "artists", "fairs", "genes"]
    }

    url() {
      return `${API_URL}/api/v1/match${
        this.kind ? "/" + this.kind : ""
      }?visible_to_public=true`
    }
  }
  _Match.initClass()
  return _Match
})()
export const Match = _Match
