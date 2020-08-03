/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const $ = require("cheerio")
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const Profile = require("../../../../models/profile")
const Fair = require("../../../../models/fair")
const FairEvent = require("../../../../models/fair_event")
const FairEvents = require("../../../../collections/fair_events")
const template = require("jade").compileFile(
  require.resolve("../../templates/events.jade")
)
const InfoMenu = require("../../../../components/info_menu/index.coffee")
const data = _.extend(
  {},
  { asset() {}, sd: { CURRENT_PATH: "/info/events" }, markdown() {} }
)

const render = moreData => template(_.extend({}, data, moreData))

describe("Events templates", function () {
  before(function () {
    this.profile = new Profile(fabricate("profile"))
    this.fair = new Fair(fabricate("fair"))
    this.infoMenu = new InfoMenu({ fair: this.fair })
    this.infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false,
    }
    this.fairEvent = new FairEvent(fabricate("fair_event"), {
      fairId: "armory-show-2013",
    })
    this.fairEvent.set({ venue_address: "711 12th Ave, New York, NY 10019" })
    return (this.fairEvents = new FairEvents([this.fairEvent], {
      fairId: this.fair.id,
    }))
  })

  return describe("fair with events", function () {
    beforeEach(function () {
      return (this.html = render({
        profile: this.profile,
        fair: this.fair,
        fairEvents: this.fairEvents,
        sortedEvents: this.fairEvents.sortedEvents(),
        infoMenu: this.infoMenu.infoMenu,
      }))
    })

    it("should render event date and time", function () {
      this.html.should.containEql("Saturday, March 8")
      return this.html.should.containEql("5:15-5:30PM")
    })

    it("should render event details", function () {
      this.html.should.containEql("Welcome")
      this.html.should.containEql(
        "PARTICIPANTS: Noah Horowitz, Executive Director"
      )
      return this.html.should.containEql(
        "The New York Times Style Magazine Media Lounge on Pier 94"
      )
    })

    it("should display map icon", function () {
      return this.html.should.containEql(
        '<i class="icon-circle-chevron"></i><span>Map</span>'
      )
    })

    it("should not display map icon", function () {
      this.fairEvent.set({ venue_address: null })
      this.fairEvents = new FairEvents([this.fairEvent], {
        fairId: "armory-show-2013",
      })
      const clientWithoutAdddress = render({
        profile: this.profile,
        fair: this.fair,
        fairEvents: this.fairEvents,
        sortedEvents: this.fairEvents.sortedEvents(),
        infoMenu: this.infoMenu.infoMenu,
      })
      return clientWithoutAdddress.should.not.containEql(
        '<i class="icon-circle-chevron"></i><span>Map</span>'
      )
    })

    it("outlook event url should be present", function () {
      return this.html.should.containEql("outlook")
    })

    it("google event url should be present", function () {
      return this.html.should.containEql(
        "https://www.google.com/calendar/render?action=TEMPLATE&amp;text=Welcome&amp;dates=20140308T171500/20140308T173000&amp;details=PARTICIPANTS:%20Noah%20Horowitz,%20Executive%20Director,%20The%20Armory%20Show%0APhilip%20Tinari,%20Director,%20Ullens%20Center%20for%20Contemporary%20Art%20(UCCA),%20Beijing%0AAdrian%20Cheng,%20Founder%20and%20Chairman,%20K11%20Art%20Foundation,%20Hong%20Kong%0A&amp;location=&amp;sprop=&amp;sprop=name:"
      )
    })

    it("yahoo event url should be present", function () {
      return this.html.should.containEql(
        "http://calendar.yahoo.com/?v=60&amp;view=d&amp;type=20&amp;title=Welcome&amp;st=20140308T171500&amp;dur=0015&amp;desc=PARTICIPANTS:%20Noah%20Horowitz,%20Executive%20Director,%20The%20Armory%20Show%0APhilip%20Tinari,%20Director,%20Ullens%20Center%20for%20Contemporary%20Art%20(UCCA),%20Beijing%0AAdrian%20Cheng,%20Founder%20and%20Chairman,%20K11%20Art%20Foundation,%20Hong%20Kong%0A&amp;in_loc="
      )
    })

    return it("iCal event url should be present", function () {
      return this.html.should.containEql("ical")
    })
  })
})
