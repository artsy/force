import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const Gene = require("../../models/gene")
import sinon from "sinon"

describe("Gene", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    testContext.gene = new Gene(fabricate("gene"))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#displayName", () => {
    it("returns display name when available", () => {
      testContext.gene = new Gene(
        fabricate("gene", { display_name: "A different name for display" })
      )
      testContext.gene
        .displayName()
        .should.equal("A different name for display")
    })

    it("returns the regular name when no display name is available", () => {
      testContext.gene = new Gene(fabricate("gene", { display_name: "" }))
      testContext.gene.displayName().should.equal(testContext.gene.get("name"))
      testContext.gene = new Gene(fabricate("gene", { display_name: null }))
      testContext.gene.displayName().should.equal(testContext.gene.get("name"))
    })
  })

  describe("#isSubjectMatter", () => {
    it("checks against the gene type name", () => {
      testContext.gene.set({
        type: { name: "D3 - Photography/Film Technique" },
      })
      testContext.gene.isSubjectMatter().should.be.ok()
    })
  })

  describe("#fetchFilterSuggest", () => {
    it("fetches the filter meta data", done => {
      testContext.gene.fetchFilterSuggest(
        { sort: "-foo" },
        {
          success(m, res) {
            res.total.should.equal(100)
            done()
          },
        }
      )
      Backbone.sync.args[0][2].data.sort.should.equal("-foo")
      Backbone.sync.args[0][2].success({ total: 100 })
    })
  })

  describe("#familyName", () => {
    it("returns the name of the related GeneFamily", () => {
      testContext.gene = new Gene(
        fabricate("gene", { family: { name: "Materials" } })
      )
      testContext.gene.familyName().should.equal("Materials")
    })
  })
})
