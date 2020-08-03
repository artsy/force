/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Q = require("bluebird-q")
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../lib/current_user")

describe("CurrentUser", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.user = new CurrentUser(fabricate("user")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#sync", () =>
    it("does the right thing for fetch/save", function () {
      this.user.save()
      _.isUndefined(Backbone.sync.args[0][2].data).should.be.true()
      this.user.fetch()
      return _.keys(Backbone.sync.args[1][2].data).should.containEql(
        "access_token"
      )
    }))

  describe("#registeredForAuction", function () {
    describe("when a user is not registered", () =>
      it("returns false", function (done) {
        this.user.registeredForAuction("foobar-auction", {
          success(boolean) {
            boolean.should.be.false()
            return done()
          },
        })
        Backbone.sync.args[0][2].data.sale_id.should.equal("foobar-auction")
        return Backbone.sync.args[0][2].success([])
      }))

    describe("when a user is registered", () =>
      it("returns true", function (done) {
        this.user.registeredForAuction("foobar-auction-registered", {
          success(boolean) {
            boolean.should.be.true()
            return done()
          },
        })
        Backbone.sync.args[0][2].data.sale_id.should.equal(
          "foobar-auction-registered"
        )
        return Backbone.sync.args[0][2].success([{ id: "existy" }])
      }))

    return it("when given a user is logged out error soaks it up and returns false", function (done) {
      this.user.registeredForAuction("foobar", {
        success(registered) {
          registered.should.equal(false)
          return done()
        },
      })
      return Backbone.sync.args[0][2].error({
        responseText: "A user is required",
      })
    })
  })

  describe("#fetchQualifiedBidder", function () {
    describe("when a user has no bidders", () =>
      it("returns false", function (done) {
        this.user.fetchQualifiedBidder("foobar-auction", {
          success(bool) {
            bool.should.be.false()
            return done()
          },
        })
        return Backbone.sync.args[0][2].success([])
      }))

    describe("when a user has no bidders for the auction", () =>
      it("returns false", function (done) {
        const bidder = {
          id: "me",
          qualified_for_bidding: true,
          sale: {
            id: "nothing",
          },
        }
        this.user.fetchQualifiedBidder("foobar-auction", {
          success(bool) {
            bool.should.be.false()
            return done()
          },
        })
        return Backbone.sync.args[0][2].success([bidder])
      }))

    describe("when a user is qualified", () =>
      it("returns true", function (done) {
        const bidder = {
          id: "me",
          qualified_for_bidding: true,
          sale: {
            id: "foobar-auction",
          },
        }
        this.user.fetchQualifiedBidder("foobar-auction", {
          success(bool) {
            bool.should.be.true()
            return done()
          },
        })
        return Backbone.sync.args[0][2].success([bidder])
      }))

    return describe("when a user is not qualified", () =>
      it("returns false", function (done) {
        const bidder = {
          id: "me",
          qualified_for_bidding: false,
          sale: {
            id: "foobar-auction",
          },
        }
        this.user.fetchQualifiedBidder("foobar-auction", {
          success(bool) {
            bool.should.be.false()
            return done()
          },
        })
        return Backbone.sync.args[0][2].success([bidder])
      }))
  })

  describe("#placeBid", () =>
    it("creates a new bid position given the right params"))

  describe("#savedArtwork", function () {
    it("passess true to success cb if the user has saved the given artwork", function () {
      this.user.set({ id: "current-user" })
      this.user.savedArtwork("bitty", {
        success(saved) {
          return saved.should.be.ok()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user"
      )
      return Backbone.sync.args[0][2].success([fabricate("artwork")])
    })

    it("passes false to success cb if the user has not saved the given work", function () {
      this.user.set({ id: "current-user" })
      this.user.savedArtwork("bitty", {
        success(saved) {
          return saved.should.not.be.ok()
        },
        error(msg) {
          return msg.should.not.be.ok()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user"
      )
      return Backbone.sync.args[0][2].success([])
    })

    it("when the collection is not found, false is passed to the success cb", function () {
      this.user.set({ id: "current-user" })
      this.user.savedArtwork("bitty", {
        success(saved) {
          return saved.should.not.be.ok()
        },
        error(msg) {
          return msg.should.not.be.ok()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user"
      )
      return Backbone.sync.args[0][2].error({
        responseText: "Collection not found",
      })
    })

    return it("calls the error cb for other errors", function () {
      this.user.set({ id: "current-user" })
      this.user.savedArtwork("bitty", {
        error(msg) {
          return msg.should.be.ok()
        },
        success(msg) {
          return msg.should.not.be.ok()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/collection/saved-artwork/artworks?artworks[]=bitty&private=true&user_id=current-user"
      )
      return Backbone.sync.args[0][2].error({ responseText: "Unauthorized" })
    })
  })

  return describe("#followingArtists", () =>
    it("makes the correct API call to retreive a list of artists the user is following", function () {
      this.user.followingArtists()
      Backbone.sync.args[0][0].should.equal("read")
      return Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/me/follow/artists"
      )
    }))
})

describe("CurrentUser", function () {
  beforeEach(function () {
    this.sd = require("sharify").data
    this.sd.SESSION_ID = "cool-session-id"
    this.user = new CurrentUser(fabricate("user"))
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#defaultArtworkCollection", () =>
    it("throws a sensible error when you forget to initialize artwork collections", function () {
      return (() => this.user.defaultArtworkCollection()).should.throw(
        /Must call/
      )
    }))

  describe("#saveArtwork", () =>
    it("makes the correct api call", function () {
      this.user.initializeDefaultArtworkCollection()
      this.user.saveArtwork("masterpiece", null)
      return Backbone.sync.args[1][0].should.equal("create")
    }))

  describe("#removeArtwork", () =>
    it("makes the correct api call", function () {
      this.user.initializeDefaultArtworkCollection()
      this.user.removeArtwork("masterpiece", null)
      return Backbone.sync.args[1][0].should.equal("delete")
    }))

  describe("#fetchSuggestedHomepageArtworks", () =>
    it("fetches homepages artworks", function () {
      this.user.fetchSuggestedHomepageArtworks({})
      return Backbone.sync.args[0][2].url.should.containEql(
        "suggested/artworks/homepage"
      )
    }))

  describe("#followArtist", function () {
    it("follows an artist", function () {
      this.user.followArtist("andy-foobar", {})
      return _.last(Backbone.sync.args)[1]
        .url()
        .should.containEql("me/follow/artist")
    })

    return it("injects the access token", function () {
      this.user.set({ accessToken: "xfoobar" })
      this.user.followArtist("andy-foobar", {})
      return _.last(Backbone.sync.args)[2].access_token.should.equal("xfoobar")
    })
  })

  describe("#checkRegisteredForAuction", () =>
    it("makes the correct API call, accepts normal options", function (done) {
      this.user.checkRegisteredForAuction({
        saleId: "an-auction",
        success(status) {
          status.should.be.true()
          return done()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql("/api/v1/me/bidders")
      Backbone.sync.args[0][2].data.sale_id.should.equal("an-auction")
      return Backbone.sync.args[0][2].success(["existy"])
    }))

  describe("#fetchNotifications", () =>
    it("makes the correct API call and has default size of 10", function () {
      this.user.fetchNotificationBundles({
        success(status) {
          return status.should.be.true()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/me/notifications/feed"
      )
      return Backbone.sync.args[0][2].data.size.should.equal(10)
    }))

  describe("#fetchAndMarkNotifications", () =>
    it("makes the correct API call and has defaults", function () {
      this.user.fetchAndMarkNotifications({
        success(status) {
          return status.should.be.true()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql("/api/v1/me/notifications")
      Backbone.sync.args[0][2].data.type.should.equal("ArtworkPublished")
      Backbone.sync.args[0][2].data.unread.should.be.true()
      return Backbone.sync.args[0][2].data.size.should.equal(100)
    }))

  describe("#prepareForInquiry", function () {
    beforeEach(function () {
      Backbone.sync.restore()

      this.user = new CurrentUser()

      return sinon.stub(Backbone, "sync").returns(Q.resolve())
    })

    return it("creates or persists everything needed to make an inquiry", function () {
      return this.user.prepareForInquiry().then(function () {
        Backbone.sync.callCount.should.equal(2)

        Backbone.sync.args[0][1].url().should.containEql("/api/v1/me")
        return Backbone.sync.args[1][1].url.should.containEql(
          "/api/v1/me/collector_profile"
        )
      })
    })
  })

  describe("#isChecked", () =>
    it("translates a boolean attribute to on or off", function () {
      this.user.set({
        weekly_email: false,
        follow_email: true,
        offer_emails: false,
      })
      _.isUndefined(this.user.isChecked("weekly_email")).should.be.true()
      _.isUndefined(this.user.isChecked("offer_emails")).should.be.true()
      return this.user.isChecked("follow_email").should.be.true()
    }))

  return describe("authentications", function () {
    beforeEach(function () {
      return (this.authentications = [
        { id: "1", uid: "123456789", provider: "twitter" },
        { id: "2", uid: "987654321", provider: "facebook" },
      ])
    })

    describe("relation", () =>
      it("should inject initial authentications", function () {
        const user = new CurrentUser({ authentications: this.authentications })
        user.isLinkedTo("twitter").should.be.true()
        return user.isLinkedTo("facebook").should.be.true()
      }))

    return describe("#isLinkedTo", () =>
      it("determines if an account is linked to an app provider", function () {
        this.user.isLinkedTo("twitter").should.be.false()

        this.user.related().authentications.reset(this.authentications)

        this.user.isLinkedTo("twitter").should.be.true()
        return this.user.isLinkedTo("facebook").should.be.true()
      }))
  })
})
