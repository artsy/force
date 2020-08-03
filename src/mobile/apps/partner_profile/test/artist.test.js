/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const benv = require("benv")
const Backbone = require("backbone")
const Artist = require("../../../models/artist")
const Profile = require("../../../models/profile")
const Partner = require("../../../models/partner")
const Artworks = require("../../../collections/artworks")
const FollowArtist = require("../../../models/follow_artist")
const CurrentUser = require("../../../models/current_user")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerArtistView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      this._location = global.location
      global.location = { search: "" }
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
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
          mod.__set__("ShareView", (this.ShareView = sinon.stub()))
          this.view = new PartnerArtistView({
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
    return Backbone.sync.restore()
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
      const spy = sinon.spy(this.view, "renderArtworks")
      // need to call initialize again to bind the spied renderArtworks()
      this.view.initialize({
        artist: new Artist(fabricate("artist")),
        partner: new Partner(fabricate("partner")),
        user: null,
      })
      Backbone.sync.args[0][2].success([
        fabricate("artwork", { title: "Andy Foobar's Finger Painting" }),
      ])
      this.view.artworks.trigger("add")
      this.view.artworks.trigger("add")
      return spy.calledThrice.should.be.ok()
    })
  })

  describe("#renderArtworks", () =>
    it("hides the see more if reached max", function () {
      this.view.artist.set({ published_artworks_count: 0 })
      this.view.artworks = new Artworks([
        fabricate("artwork"),
        fabricate("artwork"),
      ])
      this.view.renderArtworks()
      return this.view
        .$(".artist-page-artwork-see-more-container")
        .css("display")
        .should.equal("none")
    }))

  describe("#seeMoreArtworks", () =>
    xit("fetches more artworks and adds them to the collection", function () {
      this.view.seeMoreArtworks()
      _.last(Backbone.sync.args)[2].data.page.should.equal(2)
      _.last(Backbone.sync.args)[2].success([
        fabricate("artwork"),
        fabricate("artwork"),
      ])
      return this.view.artworks.length.should.equal(2)
    }))

  describe("#toggleShare", () =>
    it("toggles the share menu", function () {
      this.e = new $.Event("click")
      this.view.$(".artist-share-menu").css("display") === "none"
      this.view.toggleShare(this.e)
      this.view.$(".artist-share-menu").css("display") === "block"
      this.view.toggleShare(this.e)
      return this.view.$(".artist-share-menu").css("display") === "none"
    }))

  return describe("#followArtist", function () {
    beforeEach(function () {
      return (this.e = new $.Event("click"))
    })

    it("should render init button state", function () {
      return this.view.$(".artist-follow").data("state").should.equal("follow")
    })

    describe("with a user", function () {
      beforeEach(function () {
        this.view.followButtonView.isLoggedIn = true
        this.spyFollow = sinon.spy(this.view.followArtists, "follow")
        return (this.spyUnfollow = sinon.spy(
          this.view.followArtists,
          "unfollow"
        ))
      })

      afterEach(function () {
        this.spyFollow.restore()
        return this.spyUnfollow.restore()
      })

      it("should follow the artist", function () {
        this.view.followButtonView.onToggle(this.e)
        _.last(Backbone.sync.args)[2].success({
          id: 123,
          artist: this.view.artist.attributes,
        })
        return this.spyFollow.calledOnce.should.be.true()
      })

      return it("should toggle button state", function () {
        this.view.$(".artist-follow").data("state").should.equal("follow")
        this.view.followButtonView.onToggle(this.e)
        _.last(Backbone.sync.args)[2].success({
          id: 123,
          artist: this.view.artist.attributes,
        })
        return this.view
          .$(".artist-follow")
          .attr("data-state")
          .should.equal("following")
      })
    })

    describe("without a user", () =>
      it("should redirect to log in", function () {
        this.view.followButtonView.isLoggedIn = false
        const spy = sinon.spy(this.view.followArtists, "follow")
        this.view.followButtonView.onToggle(this.e)
        spy.called.should.be.false()
        this.view.followArtists.follow.restore()
        location.href.should.containEql(
          "/sign_up?action=follow&objectId=pablo-picasso"
        )
        return location.href.should.containEql(
          "kind=artist&destination=about:blank"
        )
      }))

    return describe("#resetArtworks", () =>
      it("fetches the artworks with the params", function () {
        this.view.artworkParams.foo = "bar"
        this.view.resetArtworks()
        return Backbone.sync.args[0][2].data.foo.should.equal("bar")
      }))
  })
})
