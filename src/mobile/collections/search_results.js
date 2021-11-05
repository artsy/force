/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _SearchResults
const sd = require("sharify").data
const Backbone = require("backbone")

export default _SearchResults = class SearchResults extends Backbone.Collection {
  url() {
    return sd.API_URL + "/api/v1/match"
  }

  initialize() {
    return (this.model = require("../models/search_result").default)
  }

  updateLocationsForFair(fair) {
    return this.map(result => result.updateForFair(fair))
  }
}
export const SearchResults = _SearchResults
