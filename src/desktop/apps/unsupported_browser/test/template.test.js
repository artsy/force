/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const sd = require("sharify").data
const cheerio = require("cheerio")
const useragent = require("useragent")

const render = function () {
  const filename = path.resolve(__dirname, "../template.jade")
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Unsupported Browser", function () {
  beforeEach(function () {
    this.ua = useragent.parse(
      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1)"
    )
    this.sd = {
      CSS_EXT: ".css",
      BROWSER: this.ua,
      UNSUPPORTED_BROWSER_REDIRECT:
        "/artwork/matthew-abbott-lobby-and-supercomputer",
    }
    return (this.html = render()({
      sd: this.sd,
      asset() {},
    }))
  })

  it("renders a message for the unsupported browser", function () {
    const $ = cheerio.load(this.html)
    this.html.should.containEql(
      `${this.ua.family} ${this.ua.major} is not supported.`
    )
    return this.html.should.containEql("Please update your browser.")
  })

  it("renders a form to continue with the bad browser anyway", function () {
    const $ = cheerio.load(this.html)
    $("form").attr("method").should.equal("post")
    return $("button.unsupported-browser-submit")
      .text()
      .should.equal(`Continue with ${this.ua.family} ${this.ua.major}`)
  })

  it("renders a hidden input to post the forward url", function () {
    const $ = cheerio.load(this.html)
    $("input[type='hidden']").attr("name").should.equal("redirect-to")
    return $("input[type='hidden']")
      .attr("value")
      .should.equal(this.sd.UNSUPPORTED_BROWSER_REDIRECT)
  })

  it("renders links to upgrade options", function () {
    const $ = cheerio.load(this.html)
    $("a[href*='microsoft']").should.have.lengthOf(1)
    $("a[href*='safari']").should.have.lengthOf(1)
    $("a[href*='chrome']").should.have.lengthOf(1)
    return $("a[href*='firefox']").should.have.lengthOf(1)
  })

  return it("excludes common JS to avoid errors in bad browsers", function () {
    const $ = cheerio.load(this.html)
    return $("script").should.have.lengthOf(0)
  })
})
