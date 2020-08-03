/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const Fair = require("../../../../models/fair")
const Profile = require("../../../../models/profile")
const Article = require("../../../../models/article")
const PartnerLocation = require("../../../../models/partner_location.coffee")
const Articles = require("../../../../collections/articles")
const InfoMenu = require("../../info_menu.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("Fair Information ", function () {
  describe("Fair with no articles ", function () {
    beforeEach(function () {
      const filename = path.resolve(__dirname, "../../templates/index.jade")
      this.profile = new Profile(fabricate("profile"))
      this.fair = new Fair(fabricate("fair"))
      this.articles = new Articles([new Article(fabricate("article"))])
      this.infoMenu = new InfoMenu({ fair: this.fair })
      this.infoMenu.infoMenu = {
        events: true,
        programming: false,
        artsyAtTheFair: false,
        aboutTheFair: false,
      }

      return (this.page = jade.compile(fs.readFileSync(filename), { filename })(
        {
          profile: this.profile,
          fair: this.fair,
          location: new PartnerLocation(this.fair.get("location")),
          article: this.articles.first(),
          infoMenu: this.infoMenu.infoMenu,
          sd: { FAIR: this.fair, PROFILE: this.profile },
        }
      ))
    })

    return it("renders fair information correctly", function () {
      this.page.should.containEql("visitors")
      this.page.should.containEql("about")
      return this.page.should.containEql("events")
    })
  })

  return describe("Fair with articles ", function () {
    beforeEach(function () {
      const filename = path.resolve(__dirname, "../../templates/index.jade")
      this.profile = new Profile(fabricate("profile"))
      this.fair = new Fair(fabricate("fair"))
      this.articles = new Articles([new Article(fabricate("article"))])
      this.infoMenu = new InfoMenu({ fair: this.fair })
      this.infoMenu.infoMenu = {
        events: true,
        programming: true,
        artsyAtTheFair: true,
        aboutTheFair: true,
      }

      return (this.page = jade.compile(fs.readFileSync(filename), { filename })(
        {
          profile: this.profile,
          fair: this.fair,
          article: this.articles.first(),
          location: new PartnerLocation(this.fair.get("location")),
          infoMenu: this.infoMenu.infoMenu,
          sd: { FAIR: this.fair, PROFILE: this.profile },
        }
      ))
    })

    return it("renders fair information correctly", function () {
      this.page.should.containEql("visitors")
      this.page.should.containEql("about")
      this.page.should.containEql("events")
      this.page.should.containEql("artsy at the event")
      return this.page.should.containEql("programming")
    })
  })
})
