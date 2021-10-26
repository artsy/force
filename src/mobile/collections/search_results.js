/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let SearchResults
const sd = require("sharify").data
const Backbone = require("backbone")

module.exports = SearchResults = class SearchResults extends Backbone.Collection {
  url() {
    return sd.API_URL + "/api/v1/match"
  }

  initialize() {
    return (this.model = require("../models/search_result"))
  }

  updateLocationsForFair(fair) {
    return this.map(result => result.updateForFair(fair))
  }
}
