/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let EditionSets
const Backbone = require("backbone")

module.exports = EditionSets = class EditionSets extends Backbone.Collection {
  initialize() {
    return (this.model = require("../models/edition_set"))
  }
}
