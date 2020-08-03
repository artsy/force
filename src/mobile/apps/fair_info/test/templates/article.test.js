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
const Articles = require("../../../../collections/articles")
const InfoMenu = require("../../info_menu.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("Article template", function () {
  describe("Article from writer", function () {
    beforeEach(function () {
      const filename = path.resolve(__dirname, "../../templates/article.jade")
      this.profile = new Profile(fabricate("profile"))
      this.fair = new Fair(fabricate("fair"))
      this.articles = new Articles([new Article(fabricate("article"))])
      this.infoMenu = new InfoMenu({ fair: this.fair })
      this.infoMenu.infoMenu = {
        events: true,
        programming: true,
        artsyAtTheFair: false,
        aboutTheFair: false,
      }

      return (this.page = jade.compile(fs.readFileSync(filename), { filename })(
        {
          profile: this.profile,
          fair: this.fair,
          article: this.articles.first(),
          infoMenu: this.infoMenu.infoMenu,
          sd: { FAIR: this.fair, ARTICLE: this.articles.first() },
        }
      ))
    })

    return it("renders correctly", function () {
      this.page.should.containEql("On The Heels of A Stellar Year in the West")
      this.page.should.containEql("fair-info-article-section-image")
      this.page.should.containEql(
        "https://artsy-media-uploads.s3.amazonaws.com/9-vuUwfMbo9-dibbqjZQHQ%2FSterling_Ruby_2013_%282%29.jpg"
      )
      return this.page.should.containEql("fair-info-article-section-text")
    })
  })

  return describe("without writer articles", function () {
    beforeEach(function () {
      const filename = path.resolve(__dirname, "../../templates/article.jade")
      this.profile = new Profile(fabricate("profile"))
      this.fair = new Fair(fabricate("fair"))
      this.infoMenu = new InfoMenu({ fair: this.fair })
      this.infoMenu.infoMenu = {
        event: true,
        programming: false,
        artsyAtTheFair: false,
        aboutTheFair: false,
      }

      return (this.page = jade.compile(fs.readFileSync(filename), { filename })(
        {
          profile: this.profile,
          fair: this.fair,
          infoMenu: this.infoMenu.infoMenu,
          sd: { FAIR: this.fair },
        }
      ))
    })
    return it("renders fallback correctly", function () {
      this.page.should.containEql("About")
      this.page.should.containEql("fair-info2-content")
      return this.page.should.not.containEql(
        "On The Heels of A Stellar Year in the West"
      )
    })
  })
})
