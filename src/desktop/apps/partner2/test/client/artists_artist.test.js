/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const sinon = require("sinon")
const PartnerArtists = require("../../../../collections/partner_artists.coffee")
const PartnerArtist = require("../../../../models/partner_artist.coffee")
const PartnerArtistArtworks = require("../../../../collections/partner_artist_artworks.coffee")
const _ = require("underscore")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")

const PartnerArtistsArtistView = benv.requireWithJadeify(
  require.resolve("../../client/artists_artist"),
  ["template"]
)

describe("PartnerArtistsArtistView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $

      // stub the Artworks fetch
      this.PartnerArtistArtworks = sinon.stub()
      this.PartnerArtistArtworks.returns(
        (this.artworks = new PartnerArtistArtworks())
      )
      PartnerArtistsArtistView.__set__(
        "PartnerArtistArtworks",
        this.PartnerArtistArtworks
      )

      // stub the ArtworkColumnsView
      this.artworkColumnsView = { appendArtworks: sinon.stub() }
      this.ArtworkColumnsView = sinon.stub()
      this.ArtworkColumnsView.returns(this.artworkColumnsView)
      PartnerArtistsArtistView.__set__(
        "ArtworkColumnsView",
        this.ArtworkColumnsView
      )

      // stub the BlurbView
      PartnerArtistsArtistView.__set__("BlurbView", sinon.stub())

      this.partnerArtist = new PartnerArtist(fabricate("partner_artist"))

      // artworks
      this.artistArtworks = [
        { artwork: fabricate("artwork", { id: "artwork1" }) },
        { artwork: fabricate("artwork", { id: "artwork2" }) },
        { artwork: fabricate("artwork", { id: "artwork3" }) },
        { artwork: fabricate("artwork", { id: "artwork4" }) },
        { artwork: fabricate("artwork", { id: "artwork5" }) },
        { artwork: fabricate("artwork", { id: "artwork6" }) },
        { artwork: fabricate("artwork", { id: "artwork7" }) },
      ]
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("#initializeBio", function () {
    beforeEach(function () {
      sinon.stub(this.artworks, "fetch", options =>
        __guardMethod__(options, "success", o => o.success())
      )
      return (this.view = new PartnerArtistsArtistView({
        model: this.partnerArtist,
        el: $("body"),
        noArtworks: sinon.stub(),
      }))
    })

    it("renders the Artsy artist bio if use_default_biography", function () {
      this.view.partnerArtist.set({ use_default_biography: true })
      this.view.artist.set({ blurb: "artsy bio" })
      this.view.initializeBio()
      return this.view
        .$(".partner2-artist-blurb")
        .html()
        .should.containEql("artsy bio")
    })

    it("renders the partner provided artist bio if not use_default_biography", function () {
      this.view.partnerArtist.set({
        use_default_biography: false,
        biography: "partner provided bio",
      })
      this.view.initializeBio()
      this.view
        .$(".partner2-artist-blurb")
        .html()
        .should.containEql("<p>partner provided bio")
      return this.view
        .$(".partner2-artist-blurb-postfix")
        .html()
        .should.containEql(
          `Submitted by ${this.partnerArtist.get("partner").name}`
        )
    })

    return it("does not render the attribution line if not use_default_biography and blank provided artist bio", function () {
      this.view.partnerArtist.set({
        use_default_biography: false,
        biography: "   ",
      })
      this.view.initializeBio()
      this.view.$(".partner2-artist-blurb").html().should.be.empty()
      return this.view.$(".partner2-artist-blurb-postfix").should.have.length(0)
    })
  })

  return describe("#fetchNextPageArtworks", function () {
    it("renders the artwork column and not calls the noArtworks callback if there are artworks", function () {
      sinon.stub(this.artworks, "fetch", options => {
        this.artworks.add(fabricate("artwork"))
        return __guardMethod__(options, "success", o => o.success())
      })
      const noArtworks = sinon.stub()

      new PartnerArtistsArtistView({
        model: this.partnerArtist,
        el: $("body"),
        noArtworks,
      })

      this.ArtworkColumnsView.calledOnce.should.be.ok()
      return noArtworks.called.should.not.be.ok()
    })

    it("calls the noArtworks callback if empty artworks retrieved", function () {
      sinon.stub(this.artworks, "fetch", options =>
        __guardMethod__(options, "success", o => o.success())
      )
      const noArtworks = sinon.stub()

      new PartnerArtistsArtistView({
        model: this.partnerArtist,
        el: $("body"),
        noArtworks,
      })

      return noArtworks.calledOnce.should.be.ok()
    })

    return it("renders all artworks of the artist with infinite scrolling", function () {
      sinon.stub(this.artworks, "fetch", options => {
        const start = (options.data.page - 1) * options.data.size
        const end = start + options.data.size
        this.artworks.reset()
        this.artworks.add(this.artistArtworks.slice(start, end))
        return typeof options.success === "function"
          ? options.success()
          : undefined
      })

      const view = new PartnerArtistsArtistView({
        model: this.partnerArtist,
        el: $("body"),
        pageSize: 2,
        allArtworks: true,
      })

      this.ArtworkColumnsView.calledOnce.should.be.ok()
      view.nextPage.should.equal(2)

      view.fetchNextPageArtworks()
      view.nextPage.should.equal(3)
      let artworks = _.last(this.artworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal(2)
      artworks[0].get("artwork").id.should.equal("artwork3")
      artworks[1].get("artwork").id.should.equal("artwork4")

      view.fetchNextPageArtworks()
      view.nextPage.should.equal(4)
      artworks = _.last(this.artworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal(2)
      artworks[0].get("artwork").id.should.equal("artwork5")
      artworks[1].get("artwork").id.should.equal("artwork6")

      view.fetchNextPageArtworks()
      view.nextPage.should.equal(5)
      artworks = _.last(this.artworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal(1)
      return artworks[0].get("artwork").id.should.equal("artwork7")
    })
  })
})

function __guardMethod__(obj, methodName, transform) {
  if (
    typeof obj !== "undefined" &&
    obj !== null &&
    typeof obj[methodName] === "function"
  ) {
    return transform(obj, methodName)
  } else {
    return undefined
  }
}
