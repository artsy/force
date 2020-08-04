/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const CurrentUser = require("../../../models/current_user.coffee")
const Artwork = require("../../../models/artwork.coffee")
const Artworks = require("../../../collections/artworks.coffee")
const { fabricate } = require("@artsy/antigravity")
const { resolve } = require("path")

let ArtworkColumnsView = null

xdescribe("ArtworkColumns", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      ArtworkColumnsView = benv.requireWithJadeify(
        resolve(__dirname, "../view"),
        ["artworkColumns", "artworkItem"]
      )
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.artworks = new Artworks([
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
    ])

    return (this.view = new ArtworkColumnsView({
      el: $("body"),
      collection: this.artworks,
      user: new CurrentUser(),
    }))
  })

  describe("#initialize", () =>
    it("sets up internal state", function () {
      sinon
        .stub(CurrentUser, "orNull")
        .returns(new CurrentUser(fabricate("user")))
      this.view.seeMore.should.be.false()
      this.view.columns[0].should.have.property("height")
      this.view.columns[0].should.have.property("artworkCount")
      return CurrentUser.orNull.restore()
    }))

  describe("#length", () =>
    it("reports the number of rendered elements", function () {
      this.view.length().should.equal(0)
      this.view.appendArtworks(
        _.times(4, () => new Artwork(fabricate("artwork")))
      )
      this.view.length().should.equal(4)
      this.view.appendArtworks(
        _.times(4, () => new Artwork(fabricate("artwork")))
      )
      return this.view.length().should.equal(8)
    }))

  describe("#_columnWidth", function () {
    beforeEach(() => sinon.stub($.fn, "width").returns(1280))

    afterEach(() => $.fn.width.restore())

    return it("total width of columns should be less than container width", function () {
      const totalWidth =
        this.view._columnWidth() * this.view.numberOfColumns +
        (this.view.numberOfColumns - 1) * this.view.gutterWidth
      return totalWidth.should.be.below(this.view.$el.width())
    })
  })

  describe("#setUserSavedArtworks", function () {
    describe("with a current user", () =>
      it("inits the saved artworks collection", function () {
        sinon
          .stub(CurrentUser, "orNull")
          .returns(new CurrentUser(fabricate("user")))
        this.view = new ArtworkColumnsView({
          el: $("body"),
          collection: this.artworks,
        })
        this.view.currentUser.should.be.instanceOf(CurrentUser)
        this.view.artworkCollection.should.be.ok()
        return CurrentUser.orNull.restore()
      }))

    return describe("without a current user", () =>
      it("leaves the collection undefined", function () {
        _.isNull(this.view.currentUser).should.be.true()
        return _.isUndefined(this.view.artworkCollection).should.be.true()
      }))
  })

  describe("#rebalance", () =>
    beforeEach(function () {
      // Create a short left column
      const dims = [
        { original_width: 900, original_height: 200, aspect_ratio: 4.5 }, // col 1, 200
        { original_width: 900, original_height: 900, aspect_ratio: 1 }, // col 2, 900
        { original_width: 200, original_height: 900, aspect_ratio: 0.222 }, // col 3, 900
        { original_width: 1000, original_height: 200, aspect_ratio: 5 }, // col 1, 400
        { original_width: 1100, original_height: 900, aspect_ratio: 1.222 }, // col 1, 1300
        { original_width: 600, original_height: 900, aspect_ratio: 0.667 }, // col 2, 1800
        { original_width: 600, original_height: 900, aspect_ratio: 0.6667 }, // col 3, 1800
        { original_width: 700, original_height: 200, aspect_ratio: 3.5 }, // col 1, 1500
      ]
      this.artworks.each((artwork, index) =>
        _.extend(artwork.get("images")[0], dims[index])
      )
      $("body").empty()
      this.view = new ArtworkColumnsView({
        el: $("body"),
        collection: this.artworks,
        isOrdered: true,
        allowDuplicates: true,
      })

      return it("removes artworks from the last column and redistributes to the shortest column", function () {
        $(".artwork-column:eq(0) .artwork-item").should.have.lengthOf(3)
        $(".artwork-column:eq(1) .artwork-item").should.have.lengthOf(3)
        $(".artwork-column:eq(2) .artwork-item").should.have.lengthOf(2)
        this.view.rebalance(800, 2)
        $(".artwork-column:eq(0) .artwork-item").should.have.lengthOf(4)
        $(".artwork-column:eq(1) .artwork-item").should.have.lengthOf(3)
        return $(".artwork-column:eq(2) .artwork-item").should.have.lengthOf(1)
      })
    }))

  return describe("#appendArtworks", function () {
    beforeEach(function () {
      // Create a short left column
      const dims = [
        { original_width: 900, original_height: 200, aspect_ratio: 4.5 }, // col 1, 200
        { original_width: 900, original_height: 900, aspect_ratio: 1 }, // col 2, 900
        { original_width: 200, original_height: 900, aspect_ratio: 0.222 }, // col 3, 900
        { original_width: 1000, original_height: 200, aspect_ratio: 5 }, // col 1, 400
        { original_width: 1100, original_height: 900, aspect_ratio: 1.222 }, // col 1, 1300
        { original_width: 600, original_height: 900, aspect_ratio: 0.667 }, // col 2, 1800
        { original_width: 600, original_height: 900, aspect_ratio: 0.6667 }, // col 3, 1800
        { original_width: 700, original_height: 200, aspect_ratio: 3.5 }, // col 1, 1500
      ]
      this.artworks.each((artwork, index) =>
        _.extend(artwork.get("images")[0], dims[index])
      )
      return $("body").empty()
    })

    describe("when columns are ordered", () =>
      it("adds artworks to the next column from left to right", function () {
        this.view = new ArtworkColumnsView({
          el: $("body"),
          collection: this.artworks,
          isOrdered: true,
          allowDuplicates: true,
        })
        $(".artwork-column:eq(0) .artwork-item").should.have.lengthOf(3)
        $(".artwork-column:eq(1) .artwork-item").should.have.lengthOf(3)
        $(".artwork-column:eq(2) .artwork-item").should.have.lengthOf(2)
        let artwork = new Artwork(fabricate("artwork"))
        this.view.appendArtworks([artwork])
        $(".artwork-column:eq(2) .artwork-item").should.have.lengthOf(3)
        artwork = new Artwork(fabricate("artwork"))
        this.view.appendArtworks([artwork])
        $(".artwork-column:eq(0) .artwork-item").should.have.lengthOf(4)
        artwork = new Artwork(fabricate("artwork"))
        this.view.appendArtworks([artwork])
        return $(".artwork-column:eq(1) .artwork-item").should.have.lengthOf(4)
      }))

    describe("when columns are not ordered", function () {
      it("adds artworks to the shortest column", function () {
        this.view = new ArtworkColumnsView({
          el: $("body"),
          collection: this.artworks,
          totalWidth: 1120,
          allowDuplicates: true,
        })
        this.view
          .$(".artwork-column:eq(0) .artwork-item")
          .should.have.lengthOf(3)
        this.view
          .$(".artwork-column:eq(1) .artwork-item")
          .should.have.lengthOf(3)
        this.view
          .$(".artwork-column:eq(2) .artwork-item")
          .should.have.lengthOf(2)
        this.view.shortestColumn.should.equal(2)

        // Add a work to verify it goes to the shortest column
        let artwork = new Artwork(fabricate("artwork"))
        _.extend(artwork.get("images")[0], {
          original_width: 700,
          original_height: 200,
          aspect_ratio: 3.5,
        })
        this.view.appendArtworks([artwork])
        this.view
          .$(".artwork-column:eq(2) .artwork-item")
          .should.have.lengthOf(3)
        this.view.shortestColumn.should.equal(2)

        artwork = new Artwork(fabricate("artwork"))
        _.extend(artwork.get("images")[0], {
          original_width: 700,
          original_height: 200,
          aspect_ratio: 3.5,
        })
        this.view.appendArtworks([artwork])
        this.view
          .$(".artwork-column:eq(2) .artwork-item")
          .should.have.lengthOf(4)
        return this.view.shortestColumn.should.equal(0)
      })

      return describe("#addToShortestColumn", function () {
        beforeEach(function () {
          this.view = new ArtworkColumnsView({
            el: $("body"),
            collection: this.artworks,
            totalWidth: 1120,
            allowDuplicates: true,
          })

          return sinon.stub($.fn, "height").returns(160)
        })

        afterEach(() => $.fn.height.restore())

        it("can accept normal Artwork models", function () {
          const artwork = new Artwork(fabricate("artwork"))
          _.extend(artwork.get("images")[0], {
            original_width: 700,
            original_height: 160,
            aspect_ratio: 3.5,
          })
          this.view.shortestColumn.should.equal(2)
          this.view.addToShortestColumn(artwork)
          this.view.shortestColumn.should.equal(2)
          this.view.addToShortestColumn(artwork)
          this.view.shortestColumn.should.equal(0)
          this.view.addToShortestColumn(artwork)
          return this.view.shortestColumn.should.equal(1)
        })

        return it("can accept jQuery objects directly", function () {
          const $column = this.view.$(
            `.artwork-column:eq(${this.view.shortestColumn})`
          )
          const $artwork = $column.find(".artwork-item").last().clone()
          this.view.shortestColumn.should.equal(2)
          this.view.addToShortestColumn($artwork)
          this.view.shortestColumn.should.equal(2)
          this.view.addToShortestColumn($artwork)
          this.view.shortestColumn.should.equal(0)
          this.view.addToShortestColumn($artwork)
          return this.view.shortestColumn.should.equal(1)
        })
      })
    })

    return it("doesnt add duplicates", function () {
      this.view = new ArtworkColumnsView({
        el: $("body"),
        collection: this.artworks,
        isOrdered: true,
      })
      this.view.collection.reset([
        fabricate("artwork", { id: "bar" }),
        fabricate("artwork", { id: "foo" }),
      ])
      this.view.appendArtworks([
        new Artwork(fabricate("artwork", { id: "foo" })),
      ])
      return this.view.collection.length.should.equal(2)
    })
  })
})
