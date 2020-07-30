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
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const ArticlesGridView = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["template", "button", "empty", "figure"]
)

describe("ArticlesGridView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        sd: { ARTSY_EDITORIAL_CHANNEL: "123" },
      })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  describe("with an empty collection", function () {
    beforeEach(function () {
      return (this.view = new ArticlesGridView({ collection: new Articles() }))
    })

    return describe("#render", function () {
      beforeEach(function () {
        return this.view.render()
      })

      return it("renders the empty state", function () {
        this.view.$(".articles-grid__figure").should.have.lengthOf(1)
        this.view.$(".js-articles-grid-more").is(":empty").should.be.true()
        return this.view
          .$(".articles-grid__figure")
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
          author: { name: "Molly" },
        },
        {
          id: _.uniqueId(),
          thumbnail_title: "Foo Baz",
          contributing_authors: [],
          author_id: "123",
          author: { name: "Artsy Editorial" },
        },
        {
          id: _.uniqueId(),
          thumbnail_title: "Bar Baz",
          contributing_authors: [{ name: "Jon Snow" }],
          author: { name: "Halley" },
        },
        {
          id: _.uniqueId(),
          thumbnail_title: "Bar Bar",
          contributing_authors: [
            { name: "Sansa Stark" },
            { name: "Tyrion Lannister" },
          ],
          channel_id: "123",
          author: { name: "Artsy Editorial" },
        },
      ])
      return (this.articles.count = 15)
    })

    return describe("#render", function () {
      it("renders the articles", function () {
        this.view = new ArticlesGridView({ collection: this.articles })
        this.view.render()
        this.view.$(".articles-grid__figure").should.have.lengthOf(4)
        return this.view
          .$(".articles-grid__title")
          .map(function () {
            return $(this).text()
          })
          .get()
          .should.eql(["Foo Bar", "Foo Baz", "Bar Baz", "Bar Bar"])
      })

      it("renders the button", function () {
        this.view = new ArticlesGridView({ collection: this.articles })
        this.view.render()
        return this.view.$("button").text().should.equal("More Articles (11)")
      })

      it("renders the author name", function () {
        this.view = new ArticlesGridView({ collection: this.articles })
        this.view.render()
        return this.view
          .$(".articles-grid__author")
          .map(function () {
            return $(this).text()
          })
          .get()
          .should.eql([
            "Molly",
            "Artsy Editorial",
            "Jon Snow",
            "Artsy Editorial  •  Sansa Stark and Tyrion Lannister",
          ])
      })

      it("does not render the button if specified", function () {
        this.view = new ArticlesGridView({
          collection: this.articles,
          hideMore: true,
        })
        this.view.render()
        return this.view.$("button").length.should.equal(0)
      })

      it("renders the header if specified", function () {
        this.view = new ArticlesGridView({
          collection: this.articles,
          header: "Custom Header",
        })
        this.view.render()
        return this.view
          .$(".articles-grid__header")
          .text()
          .should.containEql("Custom Header")
      })

      it("does not render anything if the length of collection is 0 and it is from a partner article", function () {
        const article = new Article(fabricate("article"))
        this.view = new ArticlesGridView({
          collection: new Articles([article]),
          article,
          partner: fabricate("partner"),
        })
        this.view.render()
        return $(this.view.$el).children().length.should.equal(0)
      })

      return it("removes the current article from More By section on a partner article", function () {
        const article = new Article(fabricate("article"))
        const article2 = new Article(fabricate("article", { id: "100" }))
        this.view = new ArticlesGridView({
          collection: new Articles([article, article2]),
          article,
          partner: fabricate("partner"),
        })
        this.view.render()
        return this.view
          .$(".articles-grid__articles figure")
          .length.should.equal(1)
      })
    })
  })
})
