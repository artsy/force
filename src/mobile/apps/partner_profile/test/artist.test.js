/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const benv = require("benv")
const Backbone = require("backbone")
const { Artist } = require("../../../models/artist")
const { Profile } = require("../../../models/profile")
const { Partner } = require("../../../models/partner")
const { Artworks } = require("../../../collections/artworks")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerArtistView", function () {
  let view
  beforeEach(function (done) {
    benv.setup(() => {
      this._location = global.location
      global.location = { search: "" }
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        analytics: { track: sinon.stub() },
      })
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../templates/artist.jade"),
        {
          artist: new Artist(fabricate("artist")),
          profile: new Profile(fabricate("partner_profile")),
          partner: new Partner(fabricate("partner")),
          sd: {},
        },
        () => {
          let mod
          const { PartnerArtistView } = (mod = benv.requireWithJadeify(
            resolve(__dirname, "../client/artist"),
            ["artworksTemplate"]
          ))
          mod.__set__("ShareView", sinon.stub())
          Backbone.$ = $
          view = new PartnerArtistView({
            artist: new Artist(fabricate("artist")),
            partner: new Partner(fabricate("partner")),
            user: null,
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    global.location = this._location
    benv.teardown()
    Backbone.sync.restore()
  })

  describe("#initialize", function () {
    it("renders artworks", function () {
      Backbone.sync.args[0][2].success([
        {
          artwork: fabricate("artwork", {
            title: "Andy Foobar's Finger Painting",
          }),
        },
      ])
      return $("body").html().should.containEql("Andy Foobar's Finger Painting")
    })

    return xit("renders on add", function () {
      const spy = sinon.spy(view, "renderArtworks")
      // need to call initialize again to bind the spied renderArtworks()
      view.initialize({
        artist: new Artist(fabricate("artist")),
        partner: new Partner(fabricate("partner")),
        user: null,
      })
      Backbone.sync.args[0][2].success([
        fabricate("artwork", { title: "Andy Foobar's Finger Painting" }),
      ])
      view.artworks.trigger("add")
      view.artworks.trigger("add")
      return spy.calledThrice.should.be.ok()
    })
  })

  describe("#renderArtworks", () =>
    it("hides the see more if reached max", function () {
      view.artist.set({ published_artworks_count: 0 })
      view.artworks = new Artworks([fabricate("artwork"), fabricate("artwork")])
      view.renderArtworks()
      return view
        .$(".artist-page-artwork-see-more-container")
        .css("display")
        .should.equal("none")
    }))

  describe("#seeMoreArtworks", () =>
    xit("fetches more artworks and adds them to the collection", function () {
      view.seeMoreArtworks()
      _.last(Backbone.sync.args)[2].data.page.should.equal(2)
      _.last(Backbone.sync.args)[2].success([
        fabricate("artwork"),
        fabricate("artwork"),
      ])
      return view.artworks.length.should.equal(2)
    }))

  describe("#toggleShare", () =>
    it("toggles the share menu", function () {
      this.e = new $.Event("click")
      view.$(".artist-share-menu").css("display") === "none"
      view.toggleShare(this.e)
      view.$(".artist-share-menu").css("display") === "block"
      view.toggleShare(this.e)
      return view.$(".artist-share-menu").css("display") === "none"
    }))

  return describe("#followArtist", function () {
    beforeEach(function () {
      return (this.e = new $.Event("click"))
    })

    it("should render init button state", function () {
      return view.$(".artist-follow").data("state").should.equal("follow")
    })

    describe("with a user", function () {
      beforeEach(function () {
        view.followButtonView.isLoggedIn = true
        this.spyFollow = sinon.spy(view.followArtists, "follow")
        return (this.spyUnfollow = sinon.spy(view.followArtists, "unfollow"))
      })

      afterEach(function () {
        this.spyFollow.restore()
        return this.spyUnfollow.restore()
      })

      it("should follow the artist", function () {
        view.followButtonView.onToggle(this.e)
        _.last(Backbone.sync.args)[2].success({
          id: 123,
          artist: view.artist.attributes,
        })
        return this.spyFollow.calledOnce.should.be.true()
      })

      return it("should toggle button state", function () {
        view.$(".artist-follow").data("state").should.equal("follow")
        view.followButtonView.onToggle(this.e)
        _.last(Backbone.sync.args)[2].success({
          id: 123,
          artist: view.artist.attributes,
        })
        return view
          .$(".artist-follow")
          .attr("data-state")
          .should.equal("following")
      })
    })

    describe("without a user", () =>
      it("should redirect to log in", function () {
        view.followButtonView.isLoggedIn = false
        const spy = sinon.spy(view.followArtists, "follow")
        view.followButtonView.onToggle(this.e)
        spy.called.should.be.false()
        view.followArtists.follow.restore()
        location.href.should.containEql(
          "/sign_up?action=follow&objectId=pablo-picasso"
        )
        return location.href.should.containEql(
          "kind=artist&destination=about:blank"
        )
      }))

    return describe("#resetArtworks", () =>
      it("fetches the artworks with the params", function () {
        view.artworkParams.foo = "bar"
        view.resetArtworks()
        return Backbone.sync.args[0][2].data.foo.should.equal("bar")
      }))
  })
})
