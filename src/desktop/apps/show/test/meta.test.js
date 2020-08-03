/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require("fs")
const jade = require("jade")
const sd = require("sharify").data
const { fabricate } = require("@artsy/antigravity")
const PartnerShow = require("../../../models/partner_show")
const cheerio = require("cheerio")

xdescribe("Meta tags", () =>
  describe("Partner Show", function () {
    beforeEach(function () {
      this.file = `${path.resolve(__dirname, "../")}/templates/meta.jade`
      this.show = new PartnerShow(fabricate("show"))
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd,
        asset() {},
        show: this.show,
      }))
    })

    it("includes canonical url, twitter card, og tags, and title", function () {
      this.html.should.containEql(
        '<meta property="twitter:card" content="summary'
      )
      this.html.should.containEql(
        `<link rel=\"canonical\" href=\"${sd.APP_URL}${this.show.href()}`
      )
      this.html.should.containEql(
        `<meta property=\"og:url\" content=\"${sd.APP_URL}${this.show.href()}`
      )
      this.html.should.containEql(
        `<meta property=\"og:title\" content=\"${this.show
          .toPageTitle()
          .replace("&", "&amp;")}`
      )
      return this.html.should.containEql(
        `<meta property=\"og:description\" content=\"${this.show.toPageDescription()}`
      )
    })

    it("defaults to the default og:image", function () {
      this.show = new PartnerShow(fabricate("show"))
      this.show.set("image_url", "")
      this.show.set("image_version", [])
      this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd,
        asset() {},
        show: this.show,
      })
      const $ = cheerio.load(this.html)
      return $("meta[property='og:image']").length.should.equal(0)
    })

    return it("links to the poster image for the og:image", function () {
      const $ = cheerio.load(this.html)
      return $("meta[property='og:image']")
        .attr("content")
        .should.equal(this.show.posterImageUrl())
    })
  }))
