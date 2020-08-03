/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("FilterArtworksView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      Backbone.$ = $
      sinon.stub(_, "defer")
      const FilterArtworksView = benv.require(resolve(__dirname, "../view"))
      for (let klass of [
        "ArtworkColumnsView",
        "FilterSortCount",
        "FilterFixedHeader",
        "FilterRouter",
      ]) {
        this[klass] = function (opts) {
          return _.extend(this, opts)
        }
        sinon.spy(this, klass)
        for (let method of ["appendArtworks", "reset", "remove"]) {
          this[klass].prototype[method] = sinon.stub()
        }
        FilterArtworksView.__set__(klass, this[klass])
      }
      $.onInfiniteScroll = sinon.stub()
      sinon.stub(Backbone, "sync")
      this.view = new FilterArtworksView({
        el: $("<div></div>"),
        url: "/api/v1/search/filtered/gene/foo",
      })
      return done()
    })
  })

  afterEach(function () {
    Backbone.sync.restore()
    _.defer.restore()
    return benv.teardown()
  })

  describe("#initialize", () =>
    it("creates a router", function () {
      this.FilterRouter.args[0][0].params.should.equal(this.view.params)
      return this.view.params.get("size").should.equal(10)
    }))

  describe("#newColumnsView", () =>
    it("re-adds the column view to reset the feed", function () {
      this.view.newColumnsView()
      this.view.columnsView.collection.reset([
        fabricate("artwork"),
        fabricate("artwork"),
      ])
      this.view.newColumnsView()
      return this.view.columnsView.collection.length.should.equal(0)
    }))

  describe("#reset", () =>
    it("triggers the next page fetching the filtered artworks", function () {
      const spy = sinon.spy()
      this.view.params.on("change:page", spy)
      this.view.params.on("change", spy)
      this.view.reset()
      this.view.params.get("size").should.equal(10)
      return spy.callCount.should.equal(2)
    }))

  describe("#nextPage", function () {
    it("fetches the next page of artworks", function () {
      this.view.params.set({ page: 1 })
      this.view.nextPage()
      this.view.params.get("page").should.equal(2)
      return this.view.params.get("size").should.equal(10)
    })

    return it("defaults to page 1 and avoids NaNs", function () {
      this.view.params.set({ page: NaN })
      this.view.nextPage()
      return this.view.params.get("page").should.equal(1)
    })
  })

  describe("#reset", () =>
    xit("fetches the correct counts", function () {
      this.view.params.set({
        related_gene: "photography",
        medium: "digital-print",
      })
      this.view.reset()
      return Backbone.sync.args[1][2].data.should.eql({
        related_gene: "photography",
        medium: "digital-print",
      })
    }))

  return describe("#render", () =>
    it("renders the columns view", function () {
      this.view.render()
      return this.ArtworkColumnsView.prototype.appendArtworks.called.should.be.ok()
    }))
})
