/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")

 class EditionSetsInternal extends Backbone.Collection {
  initialize() {
    return (this.model = require("../models/edition_set"))
  }
}
export default EditionSetsInternal
export const EditionSets = EditionSetsInternal
