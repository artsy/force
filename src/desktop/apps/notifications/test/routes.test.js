/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const routes = rewire("../routes")
const CurrentUser = require("../../../models/current_user.coffee")
const Artist = require("../../../models/artist.coffee")

describe("Notification Routing", function () {
  beforeEach(function () {
    sinon
      .stub(Backbone, "sync")
      .returns("fetchUntilEnd")
      .yieldsTo("success", [])
    this.req = { url: "/works-for-you", query: {} }
    return (this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: { sd: { APP_URL: "http://localhost:5000" } },
    })
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#worksForYou", function () {
    it("redirect to login without a user", function () {
      routes.worksForYou(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal(
        "/log_in?redirect_uri=/works-for-you"
      )
    })

    it("redirects to artist works page without a user, when linked to from email", function () {
      this.req = {
        url: "/works-for-you",
        query: { artist_id: "percy-the-cat", from_email: true },
      }
      routes.worksForYou(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal(
        "/artist/percy-the-cat/works-for-sale?sort=-published_at"
      )
    })

    it("redirects to login without a user, when not linked to from email", function () {
      this.req = {
        url: "/works-for-you",
        query: { artist_id: "percy-the-cat" },
      }
      routes.worksForYou(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal(
        "/log_in?redirect_uri=/works-for-you"
      )
    })

    return it("renders with a user and makes fetch for artists and marks/fetches notifications", function () {
      this.req.user = new CurrentUser(
        fabricate("user", {
          followingArtists: sinon.stub().yieldsTo("success"),
          fetchAndMarkNotifications: sinon.stub().yieldsTo("success"),
          accessToken: "foo-token",
        })
      )
      routes.worksForYou(this.req, this.res)
      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/me/follow/artists"
      )
      Backbone.sync.args[0][2].success([fabricate("artist")])
      Backbone.sync.args[1][2].url.should.containEql("/api/v1/me/notifications")
      Backbone.sync.args[1][2].success([fabricate("artwork")])
      return _.defer(() =>
        _.defer(() => {
          return _.defer(() =>
            _.defer(() => {
              this.res.locals.sd.UNREAD_NOTIFICATIONS.length.should.equal(1)
              this.res.locals.sd.FOLLOWING.length.should.equal(1)
              if (this.res.locals.sd.NOTIFICATION_COUNT != null) {
                this.res.locals.sd.NOTIFICATION_COUNT.should.be.false()
              }
              return this.res.render.args[0][0].should.equal("index")
            })
          )
        })
      )
    })
  })
})
