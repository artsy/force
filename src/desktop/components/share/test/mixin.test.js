/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const benv = require("benv")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Share mixin", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        sd: {
          APP_URL: "http://artsy.net",
          CURRENT_PATH: "/artist/andy-warhol",
        },
      })

      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    return (this.$case1 = $(render("mixin")()).find("#case-1"))
  })

  afterEach(function () {
    return this.$case1.remove()
  })

  it("renders the appropriate link for sharing on Facebook", function () {
    this.$case1.find(".share-to-facebook").length.should.equal(1)

    return this.$case1
      .find(".share-to-facebook")
      .attr("href")
      .should.equal(
        "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol"
      )
  })

  return it("renders the appropriate link for sharing on Twitter", function () {
    this.$case1.find(".share-to-twitter").should.have.lengthOf(1)

    return this.$case1
      .find(".share-to-twitter")
      .attr("href")
      .should.equal(
        "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol&text=Andy Warhol on Artsy&url=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol&via=artsy"
      )
  })
})
