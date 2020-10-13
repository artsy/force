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

describe("For You View", () => {
  let view
  let user
  let fair
  beforeEach(done => {
    const profile = new Profile(fabricate("fair_profile"))
    user = new CurrentUser(fabricate("user", { id: "current-user-id" }))
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      $.onInfiniteScroll = function () {}
      sinon.stub(CurrentUser, "orNull").returns(user)
      sinon.stub(Backbone, "sync")
      benv.render(
        resolve(__dirname, "../../templates/for_you.jade"),
        {
          fair: (fair = new Fair(fabricate("fair"))),
          profile,
          sd: {},
        },
        () => {
          const { ForYouView } = require("../../client/for_you")
          Backbone.$ = $
          view = new ForYouView({
            el: $("#fair-for-you"),
            fair: fair,
            profile,
          })
          done()
        }
      )
    })
  })

  afterEach(() => {
    benv.teardown()
    Backbone.sync.restore()
    CurrentUser.orNull.restore()
  })

  describe("init code", () => {
    it("creates a for you fair page view", () => {
      view.$("#fair-page-title").text().should.containEql("Guide")
    })
  })

  describe("logged in", () => {
    describe("#updateAndShowTitle", () => {
      it("renders the user's name in the heading", () => {
        view.$("#fair-page-title").text().should.containEql(user.get("name"))
      })
    })

    describe("#fetchFollowingExhibitors", () => {
      it("renders fair exhibitor booths of partner profiles the current user follows", function () {
        Backbone.sync.args[0][2].url.should.containEql("me/follow/profiles")
        Backbone.sync.args[0][2].data.fair_id.should.equal(fair.get("id"))
      })
    })
  })
})
