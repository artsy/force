/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const $ = require("cheerio")
const _ = require("underscore")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Profile = require("../../../../models/profile")
const Fair = require("../../../../models/fair")
const Article = require("../../../../models/article")
const InfoMenu = require("../../../../components/info_menu/index.coffee")
const template = require("jade").compileFile(
  require.resolve("../../templates/article.jade")
)
const testStubs = {
  asset() {},
  resize: sinon.stub(),
  moment: require("moment"),
  sd: { CURRENT_PATH: "/armory-show-2013/info/about-the-fair" },
  markdown() {},
}
const data = _.extend({}, testStubs)

const render = moreData => template(_.extend({}, data, moreData))

describe("Article template", function () {
  before(function () {
    this.profile = new Profile(fabricate("profile"))
    this.fair = new Fair(fabricate("fair"))
    this.article = new Article(
      fabricate("article", {
        contributing_authors: [],
        sections: [],
      })
    )
    this.infoMenu = new InfoMenu({ fair: this.fair })
    return (this.infoMenu.infoMenu = {
      events: true,
      programming: true,
      artsyAtTheFair: false,
      aboutTheFair: false,
    })
  })

  describe("about the fair with article", function () {
    beforeEach(function () {
      return (this.html = render({
        profile: this.profile,
        fair: this.fair,
        article: this.article,
        infoMenu: this.infoMenu.infoMenu,
      }))
    })

    return it("renders about the fair article from writer", function () {
      return this.html.should.containEql("On The Heels of A Stellar Year")
    })
  })

  return describe("about the fair without article", function () {
    beforeEach(function () {
      return (this.html = render({
        profile: this.profile,
        fair: this.fair,
        article: undefined,
        infoMenu: this.infoMenu.infoMenu,
      }))
    })

    return it("renders about the fair from fair model", function () {
      return this.html.should.containEql("We Rawk!")
    })
  })
})
