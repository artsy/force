/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const qs = require("qs")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const benv = require("benv")
const Partner = require("../../../../../models/partner.coffee")
const Artwork = require("../../../../../models/artwork.coffee")
const FilterArtworks = require("../../../../../collections/filter_artworks.coffee")
const Artworks = require("../../../../../collections/artworks.coffee")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const HeroArtworksCarousel = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["template"]
)

describe("HeroArtworksCarousel", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      HeroArtworksCarousel.__set__(
        "initCarousel",
        (this.initCarousel = sinon.stub())
      )
      this.partner = new Partner(fabricate("partner"))
      this.view = new HeroArtworksCarousel({ partner: this.partner })
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#fetchArtworks", function () {
    before(function () {
      this.artworks = new FilterArtworks()
      return _.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], () =>
        this.artworks.add(fabricate("artwork"))
      )
    })

    it("makes proper requests to fetch artworks", function () {
      let requests
      this.view.fetchArtworks()
      ;(requests = Backbone.sync.args).length.should.equal(1)
      return requests[0][2].data.should.eql(
        decodeURIComponent(
          qs.stringify(
            {
              sort: "-partner_updated_at",
              for_sale: true,
              size: 10,
              partner_id: this.partner.get("id"),
            },
            { arrayFormat: "brackets" }
          )
        )
      )
    })

    it("returns a thenable promise", function () {
      return _.isFunction(this.view.fetchArtworks().then).should.be.ok()
    })

    return it("fetches and returns artworks", function (done) {
      this.view
        .fetchArtworks()
        .then(artworks => {
          artworks.length.should.equal(10)
          artworks.models.should.eql(this.artworks.models)
          return done()
        })
        .done()

      return Backbone.sync.args[0][2].success({ hits: this.artworks.models })
    })
  })

  return describe("#initCarousel", function () {
    beforeEach(function () {
      this.artworks = new Artworks()
      return sinon.stub(this.view, "remove")
    })

    afterEach(function () {
      return this.view.remove.restore()
    })

    describe("with < 5 artworks", function () {
      beforeEach(function () {
        return _.each([1, 2, 3, 4], () =>
          this.artworks.add(fabricate("artwork"))
        )
      })

      return it("removes the view", function () {
        this.view.initCarousel(this.artworks)
        return this.view.remove.calledOnce.should.be.ok()
      })
    })

    return describe("with >= 5 artworks", function () {
      beforeEach(function () {
        return _.each([1, 2, 3, 4, 5], () =>
          this.artworks.add(fabricate("artwork"))
        )
      })

      return it("initializes the carousel", function () {
        this.view.initCarousel(this.artworks)
        this.view.remove.called.should.not.be.ok()
        return this.initCarousel.calledOnce.should.be.ok()
      })
    })
  })
})
