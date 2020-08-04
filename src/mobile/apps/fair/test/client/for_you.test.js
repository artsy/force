/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const CurrentUser = require("../../../../models/current_user")
const Fair = require("../../../../models/fair")
const Profile = require("../../../../models/profile")
const { fabricate } = require("@artsy/antigravity")
const cheerio = require("cheerio")
const sinon = require("sinon")
const benv = require("benv")
const { resolve } = require("path")

describe("For You View", function () {
  beforeEach(function (done) {
    this.user = new CurrentUser(fabricate("user", { id: "current-user-id" }))
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.onInfiniteScroll = function () {}
      sinon.stub(CurrentUser, "orNull").returns(this.user)
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../../templates/for_you.jade"),
        {
          fair: (this.fair = new Fair(fabricate("fair"))),
          profile: (this.profile = new Profile(fabricate("fair_profile"))),
          sd: {},
        },
        () => {
          const { ForYouView } = require("../../client/for_you")
          this.view = new ForYouView({
            el: $("#fair-for-you"),
            fair: this.fair,
            profile: this.profile,
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    Backbone.sync.restore()
    return CurrentUser.orNull.restore()
  })

  describe("init code", () =>
    it("creates a for you fair page view", function () {
      return this.view.$("#fair-page-title").text().should.containEql("Guide")
    }))

  xdescribe("logged out / not many follows", () =>
    xit("renders exhibitors to follow", function () {}))

  return describe("logged in", function () {
    describe("#updateAndShowTitle", () =>
      it("renders the user's name in the heading", function () {
        return this.view
          .$("#fair-page-title")
          .text()
          .should.containEql(this.user.get("name"))
      }))

    describe("#fetchFollowingExhibitors", () =>
      it("renders fair exhibitor booths of partner profiles the current user follows", function () {
        Backbone.sync.args[0][2].url.should.containEql("me/follow/profiles")
        return Backbone.sync.args[0][2].data.fair_id.should.equal(
          this.fair.get("id")
        )
      }))
    //Backbone.sync.args[0][2].success({results: [fabricate('partner_profile')]})
    //Backbone.sync.args[0][2].success([])

    return xdescribe("#fetchFollowingArtists", () =>
      it("renders links to booths of artists the current user follows", function () {}))
  })
})
