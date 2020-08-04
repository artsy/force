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
const template = require("jade").compileFile(
  require.resolve("../../templates/visitors.jade")
)
const data = _.extend(
  {},
  { asset() {}, sd: { CURRENT_PATH: "/info/visitors" }, markdown() {} }
)
const InfoMenu = require("../../../../components/info_menu/index.coffee")

const render = moreData => template(_.extend({}, data, moreData))

describe("Visitors templates", function () {
  before(function () {
    this.profile = new Profile(fabricate("profile"))
    this.fair = new Fair(fabricate("fair"))
    this.infoMenu = new InfoMenu({ fair: this.fair })
    return (this.infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false,
    })
  })

  describe("fair with location", function () {
    beforeEach(function () {
      this.fair = new Fair(
        fabricate("fair", {
          location: { summary: "401 Broadway New York, New York" },
        })
      )
      return (this.html = render({
        profile: this.profile,
        fair: this.fair,
        infoMenu: this.infoMenu.infoMenu,
      }))
    })

    it("should render address", function () {
      return this.html.should.containEql("401 Broadway New York, New York")
    })

    return it("should render map", function () {
      return this.html.should.containEql('id="fair-info2-map"')
    })
  })

  describe("fair without location", () =>
    it("should not render map or location", function () {
      this.fair = new Fair(fabricate("fair", { location: null }))
      const $el = render({
        profile: this.profile,
        fair: this.fair,
        infoMenu: this.infoMenu.infoMenu,
      })

      return $el.should.not.containEql("id='fair-info2-map'")
    }))

  describe("fair with contact", () =>
    it("should render contact info", function () {
      return render({
        profile: this.profile,
        fair: this.fair,
        infoMenu: this.infoMenu.infoMenu,
      }).should.containEql("Design Miami/ Office")
    }))

  describe("fair with links", () =>
    it("should render contact info", function () {
      return render(
        {
          profile: this.profile,
          fair: this.fair,
          infoMenu: this.infoMenu.infoMenu,
        },
        { infoMenu: this.infoMenu.infoMenu }
      ).should.containEql('href="http://google.com')
    }))

  return describe("fair with tickets", () =>
    it("should render ticket info", function () {
      this.fair = new Fair(fabricate("fair", { tickets: "Adult Tickets: $20" }))

      return render({
        profile: this.profile,
        fair: this.fair,
        infoMenu: this.infoMenu.infoMenu,
      }).should.containEql("Adult Tickets: $20")
    }))
})
