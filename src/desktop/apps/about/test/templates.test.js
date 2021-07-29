/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const $ = require("cheerio")
const _ = require("underscore")
const template = require("jade").compileFile(
  require.resolve("../templates/index.jade")
)
const fixture = require("./fixture/content.json")
const resizer = require("../../../components/resizer")
const data = _.extend({}, { asset() {}, sd: {} }, fixture, resizer, {
  nav: {},
})

const render = moreData => template(_.extend({}, data, moreData))

describe("About templates", function () {
  describe("iPhone App block on About page", function () {
    it("displays iPhone app section header", () =>
      $(render())
        .find("#the-art-world-online")
        .html()
        .should.containEql("The Artsy iPhone App"))

    it("displays iPhone app section blurb", () =>
      $(render())
        .find("#the-art-world-online")
        .html()
        .should.containEql(
          "Our iPhone app allows you to browse, save, learn about, and collect from your phone. It also serves as a personalized, on-the-ground guide to any art fair we feature on Artsy."
        ))

    return it("does not display the text me a download link to the iPhone app", () =>
      $(render())
        .find("#the-art-world-online")
        .html()
        .should.not.containEql("Text me a download link"))
  })
})
