/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Partners = require("../../collections/partners")

describe("Articles", () =>
  beforeEach(function () {
    return (this.partners = new Partners([fabricate("post")]))
  }))

// FIXME: No tests!
