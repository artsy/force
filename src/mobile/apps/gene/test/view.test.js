/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")
const Artworks = require("../../../collections/artworks.coffee")
const FilterArtworks = require("../../../collections/filter_artworks.coffee")
const Artists = require("../../../collections/artists.coffee")
const Gene = require("../../../models/gene.coffee")
const { fabricate } = require("@artsy/antigravity")

xdescribe("GeneArtworksView", function () {
  // FIXME: conflicts with jsdom in beforeEach from filter2
  beforeEach(function (done) {
    return benv.setup(() => {
      // artworks = new Artworks [fabricate('artwork'), fabricate('artwork'), fabricate('artwork')]
      let module
      const artworks = new FilterArtworks([
        fabricate("artwork"),
        fabricate("artwork"),
        fabricate("artwork"),
      ])
      // artworks.url = "/api/v1/filter/artworks?gene_id=foo"
      // artworks.parse = sinon.stub()
      const gene = new Gene(fabricate("gene", { type: { name: "medium" } }))
      benv.render(path.resolve(__dirname, "../templates/index.jade"), {
        sd: { PARAMS: { gene_id: gene.id } },
        asset() {},
        gene,
      })
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.fn.error = sinon.stub()
      this.e = new $.Event("click")
      sinon.stub(Backbone, "sync")
      const filename = path.resolve(__dirname, "../client.coffee")
      const { GeneArtworksView } = (module = benv.requireWithJadeify(filename, [
        "artworkColumnsTemplate",
      ]))
      this.PoliteInfiniteScrollView = module.__get__("PoliteInfiniteScrollView")
      this.politeScroll = sinon.stub(
        this.PoliteInfiniteScrollView.prototype,
        "initialize"
      )
      this.view = new GeneArtworksView({
        collection: artworks,
        el: $("body"),
        model: gene,
        params: {},
      })
      this.view.params = {}
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    Backbone.sync.restore()
    return this.politeScroll.restore()
  })

  return describe("#readMore", function () {
    it("initially covers text with fade", () =>
      $(".gene-read-more-fade").css("display").should.not.containEql("none"))

    return it("shows rest of description on click", function () {
      this.view.readMore(this.e)
      return $(".gene-description-text")
        .css("max-height")
        .should.containEql(9999)
    })
  })
})

describe("GeneArtistsView", () => {
  let e
  let view
  let politeScroll
  beforeEach(done => {
    benv.setup(() => {
      let module
      const artists = new Artists([
        fabricate("artist"),
        fabricate("artist"),
        fabricate("artist"),
      ])
      artists.url = "/api/v1/search/filtered/gene/foo"
      const gene = new Gene(fabricate("gene"))
      benv.expose({ $: benv.require("jquery") })
      $.fn.error = sinon.stub()
      e = new $.Event("click")
      benv.render(path.resolve(__dirname, "../templates/index.jade"), {
        sd: {},
        asset() {},
        gene,
      })
      sinon.stub(Backbone, "sync")
      const filename = path.resolve(__dirname, "../client.coffee")
      const { GeneArtistsView } = (module = benv.requireWithJadeify(filename, [
        "artistTemplate",
      ]))
      const PoliteInfiniteScrollView = module.__get__(
        "PoliteInfiniteScrollView"
      )
      politeScroll = sinon.stub(
        PoliteInfiniteScrollView.prototype,
        "initialize"
      )
      Backbone.$ = $
      view = new GeneArtistsView({
        collection: artists,
        el: $("body"),
        model: gene,
        params: {},
      })
      view.params = {}
      done()
    })
  })

  afterEach(function () {
    benv.teardown()
    Backbone.sync.restore()
    politeScroll.restore()
  })

  describe("#initialize", () => {
    it("should fetch one more page", () => {
      view.onInitialFetch()
      Backbone.sync.callCount.should.equal(1)
    })
  })

  describe("#onSync", () => {
    it("shows correct message when no artists are available", () => {
      view.collection = []
      view.onSync()
      view
        .$("#gene-artists-empty-message")
        .css("display")
        .should.not.containEql("none")
    })

    it("adds collection to page when artists are available", () => {
      view.onSync()
      view.$("#gene-artists-empty-message").css("display").should.equal("none")
      view.$("#gene-artists-container a").length.should.equal(3)
    })
  })

  describe("#readMore", () => {
    it("initially covers text with fade", () => {
      view
        .$(".gene-read-more-fade")
        .css("display")
        .should.not.containEql("none")
    })

    it("shows rest of description on click", () => {
      view.readMore(e)
      view.$(".gene-description-text").css("max-height").should.containEql(9999)
    })
  })
})
