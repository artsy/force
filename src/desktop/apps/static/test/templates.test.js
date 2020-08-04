/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Page = require("../../../models/page")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Future of Art", () =>
  it("includes a link to the WSJ article", () =>
    render("future_of_art")({
      sd: {},
      asset() {},
      page: new Page(),
    }).should.containEql("online.wsj.com/articles/carter-cleveland")))
