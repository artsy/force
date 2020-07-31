/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const fixtures = require("../../../test/helpers/fixtures")
const SearchResult = require("../../../models/search_result")

describe("result.jade", function () {
  before(function () {
    this.fixture = {
      model: "article",
      display:
        "The Friendship and Flight of Andy Warhol, Philip Pearlstein, and ...",
      image_url:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSlZL9Q-fcFKGOvBsHCfxI6JpcJr5-hUMACOlhD-1j2l-rOahjx-ZUKmAg",
      display_model: "article",
      location:
        "/article/artsy-editorial-from-pittsburgh-to-promise-the-friendship-and-flight",
      about:
        "Jun 17, 2015 ... In 1949, two young, aspiring artists, Philip Pearlstein and Andy Warhol, bought \nbus tickets out of Pittsburgh. They arrived in New York with a few ...",
    }
    const filename = path.resolve(__dirname, "../result.jade")
    return (this.render = jade.compile(fs.readFileSync(filename), { filename }))
  })

  return it("doesnt allow unsafe xss-ey html", function () {
    this.fixture.about = "<script>alert(1)</script>"
    const html = this.render({ result: new SearchResult(this.fixture) })
    return html.should.not.containEql("<script>")
  })
})
