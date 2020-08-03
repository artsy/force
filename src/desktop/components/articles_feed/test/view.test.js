/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Articles = require("../../../collections/articles")
const ArticleView = benv.requireWithJadeify(resolve(__dirname, "../article"), [
  "template",
])
const ArticlesFeedView = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["template", "button", "empty"]
)
ArticlesFeedView.__set__("ArticleView", ArticleView)

describe("ArticlesFeedView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("with an empty collection", function () {
    beforeEach(function () {
      return (this.view = new ArticlesFeedView({ collection: new Articles() }))
    })

    return describe("#render", function () {
      beforeEach(function () {
        return this.view.render()
      })

      return it("renders the empty state", function () {
        this.view.$(".articles-feed-item").should.have.lengthOf(1)
        this.view.$(".js-articles-feed-more").is(":empty").should.be.true()
        return this.view
          .$(".articles-feed-item")
          .text()
          .should.equal("No results. View all articles")
      })
    })
  })

  return describe("with an articles collection", function () {
    beforeEach(function () {
      this.articles = new Articles([
        {
          id: _.uniqueId(),
          thumbnail_title: "Foo Bar",
          contributing_authors: [],
        },
        {
          id: _.uniqueId(),
          thumbnail_title: "Bar Baz",
          contributing_authors: [],
        },
      ])
      this.articles.count = 10
      return (this.view = new ArticlesFeedView({ collection: this.articles }))
    })

    return describe("#render", function () {
      beforeEach(function () {
        return this.view.render()
      })

      it("renders the articles", function () {
        this.view.$(".articles-feed-item").should.have.lengthOf(2)
        return this.view
          .$(".article-figure-title")
          .map(function () {
            return $(this).text()
          })
          .get()
          .should.eql(["Foo Bar", "Bar Baz"])
      })

      return it("renders the button", function () {
        return this.view.$("button").text().should.equal("More Articles (8)")
      })
    })
  })
})
