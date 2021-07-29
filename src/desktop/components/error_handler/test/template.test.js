/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const cheerio = require("cheerio")
const path = require("path")
const fs = require("fs")

const render = function () {
  const filename = path.resolve(__dirname, "../index.jade")
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Error Handler Template", function () {
  beforeEach(function () {
    this.html = render()({
      sd: {
        CURRENT_USER: { type: "Admin" },
      },
      asset(x) {
        return x
      },
      message: "This is the error message",
      detail: "This is the error detail",
      code: 400,
    })

    return (this.outputtedHtml = cheerio.load(this.html).html())
  })

  return it("displays all the relevant information", function () {
    this.outputtedHtml.should.containEql("This is the error message")
    this.outputtedHtml.should.containEql("This is the error detail")
    return this.outputtedHtml.should.containEql("400")
  })
})
