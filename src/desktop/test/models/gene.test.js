/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Gene = require("../../models/gene.coffee")
const sinon = require("sinon")

describe("Gene", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.gene = new Gene(fabricate("gene")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#displayName", function () {
    it("returns display name when available", function () {
      this.gene = new Gene(
        fabricate("gene", { display_name: "A different name for display" })
      )
      return this.gene
        .displayName()
        .should.equal("A different name for display")
    })

    return it("returns the regular name when no display name is available", function () {
      this.gene = new Gene(fabricate("gene", { display_name: "" }))
      this.gene.displayName().should.equal(this.gene.get("name"))
      this.gene = new Gene(fabricate("gene", { display_name: null }))
      return this.gene.displayName().should.equal(this.gene.get("name"))
    })
  })

  describe("#isSubjectMatter", () =>
    it("checks against the gene type name", function () {
      this.gene.set({ type: { name: "D3 - Photography/Film Technique" } })
      return this.gene.isSubjectMatter().should.be.ok()
    }))

  describe("#fetchFilterSuggest", () =>
    it("fetches the filter meta data", function (done) {
      this.gene.fetchFilterSuggest(
        { sort: "-foo" },
        {
          success(m, res) {
            res.total.should.equal(100)
            return done()
          },
        }
      )
      Backbone.sync.args[0][2].data.sort.should.equal("-foo")
      return Backbone.sync.args[0][2].success({ total: 100 })
    }))

  return describe("#familyName", () =>
    it("returns the name of the related GeneFamily", function () {
      this.gene = new Gene(fabricate("gene", { family: { name: "Materials" } }))
      return this.gene.familyName().should.equal("Materials")
    }))
})
