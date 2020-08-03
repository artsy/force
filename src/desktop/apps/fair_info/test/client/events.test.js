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
const FairEvent = require("../../../../models/fair_event.coffee")
const FairEvents = require("../../../../collections/fair_events.coffee")
const InfoMenu = require("../../../../components/info_menu/index.coffee")

describe("FairInfoEventsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    const fair = fabricate("fair")
    const profile = fabricate("fair_profile")
    this.fair = new Fair(fair)
    this.profile = new Profile(profile)
    this.fair_event = new FairEvent(fabricate("fair_event"), {
      fairId: "armory-show-2013",
    })
    this.fair_events = new FairEvents([this.fair_event], {
      fairId: "armory-show-2013",
    })
    this.infoMenu = new InfoMenu({ fair: this.fair })
    this.infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false,
    }
    const data = { FAIR: fair, PROFILE: profile, CURRENT_PATH: "/info/events" }
    return benv.render(
      resolve(__dirname, "../../templates/events.jade"),
      {
        sd: data,
        fair: this.fair,
        profile: this.profile,
        asset() {},
        sortedEvents: {
          Saturday: [this.fair_event],
        },
        infoMenu: this.infoMenu.infoMenu,
      },
      () => {
        this.FairInfoEventsView = benv.requireWithJadeify(
          resolve(__dirname, "../../client/events"),
          ["template"]
        )
        this.FairInfoEventsView.__set__("sd", data)
        sinon.stub(this.FairInfoEventsView.prototype, "initializeBlurb")
        this.view = new this.FairInfoEventsView({
          el: $(".fair-info2-body"),
          model: this.profile,
          fair: this.fair,
        })
        return done()
      }
    )
  })

  return describe("#initialize", () =>
    it("displays fair events", function () {
      const html = this.view.$el.html()

      html.should.not.containEql("undefined")
      html.should.not.containEql("There are no events.")
      html.should.containEql('class="fair-info-event-day"')
      return html.should.containEql("Welcome")
    }))
})
