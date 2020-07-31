/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const cheerio = require("cheerio")
const fs = require("fs")
const { fabricate } = require("@artsy/antigravity")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("filter template", () =>
  it("it renders 0 works when there are zero artworks", function () {
    const html = render("template")({
      total: null,
      infiniteScroll: false,
      pulldownVal: "foo",
    })

    const $ = cheerio.load(html)

    return $(".filter-sort-count-total").html().should.containEql("0 works")
  }))
