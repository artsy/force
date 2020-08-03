/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../../models/fair.coffee")
const Profile = require("../../../../models/profile.coffee")
const FairInfoVisitorsView = require("../../client/visitors.coffee")
const InfoMenu = require("../../../../components/info_menu/index.coffee")

describe("FairInfoVisitorsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(window, "open")
    const fair = fabricate("fair")
    const profile = fabricate("fair_profile")
    this.fair = new Fair(fair)
    this.profile = new Profile(profile)
    this.infoMenu = new InfoMenu({ fair: this.fair })
    this.infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false,
    }

    return benv.render(
      resolve(__dirname, "../../templates/visitors.jade"),
      {
        sd: { FAIR: fair, PROFILE: profile, CURRENT_PATH: "/info/visitors" },
        fair: this.fair,
        profile: this.profile,
        infoMenu: this.infoMenu.infoMenu,
        asset() {},
      },
      () => {
        this.view = new FairInfoVisitorsView({
          el: $(".fair-info2-body"),
          model: this.fair,
        })
        return done()
      }
    )
  })

  afterEach(() => window.open.restore())

  return describe("#showDirections", () =>
    it("opens directions in google", function () {
      this.view.$(".js-get-directions-link").click()
      return window.open.called.should.equal(true)
    }))
})
