/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let mod
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const OrderedSets = require("../../../collections/ordered_sets.coffee")
const Gene = require("../../../models/gene")
const Genes = require("../../../collections/genes")
const { resolve } = require("path")
const SuggestedGenesView = (mod = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["template"]
))

describe("SuggestedGenesView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    mod.__set__("OrderedSets", Backbone.Collection)
    this.view = new SuggestedGenesView({
      el: $("body"),
      numberOfItems: 2,
    })
    return done()
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#render", function () {
    it("calls suggested genes api to get suggested genes", function () {
      _.last(Backbone.sync.args)[2].success({ id: "123" })
      return _.last(Backbone.sync.args)[2].url.should.containEql(
        "/api/v1/set/123/items"
      )
    })

    return it("renders the exact number of genes", function () {
      this.view.collection.add(fabricate("gene", { image_url: "" }))
      this.view.collection.add(fabricate("gene", { image_url: "" }))
      this.view.collection.add(fabricate("gene", { image_url: "" }))
      this.view.collection.add(fabricate("gene", { image_url: "" }))
      this.view.render()
      return this.view.$el.find(".suggestion-item").length.should.equal(2)
    })
  })
})
