/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")

const facetDefaults = rewire("../facet_defaults.coffee")

describe("FacetDefaults", function () {
  it("sets display name to Galleries when given gallery for type", function () {
    const defaultFacets = facetDefaults("gallery")
    return _.find(
      defaultFacets,
      f => f.facetName === "term"
    ).displayName.should.equal("Galleries")
  })

  it("sets display name to Institutions when given institution for type", function () {
    const defaultFacets = facetDefaults("institution")
    return _.find(
      defaultFacets,
      f => f.facetName === "term"
    ).displayName.should.equal("Institutions")
  })

  return it("sets display name to empty string when no type was passed", function () {
    const defaultFacets = facetDefaults()
    return _.find(
      defaultFacets,
      f => f.facetName === "term"
    ).displayName.should.equal("")
  })
})
