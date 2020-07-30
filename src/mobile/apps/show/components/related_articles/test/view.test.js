/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { resolve } = require("path")
const fixtures = require("../../../../../test/helpers/fixtures")
const Articles = require("../../../../../collections/articles")
const ShowRelatedArticlesView = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["template"]
)

describe("ShowRelatedArticlesView", function () {
  before(done =>
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    this.articles = new Articles([fixtures.article])
    this.view = new ShowRelatedArticlesView({
      collection: this.articles,
      numToShow: 1,
    })
    return done()
  })

  afterEach(() => Backbone.sync.restore())

  describe("#render", () =>
    it("renders the right content", function () {
      this.view.collection.set([
        _.extend(fixtures.article, { thumbnail_title: "Moobar" }),
      ])
      this.view.render()
      return this.view.$el.html().should.containEql("Moobar")
    }))

  return describe("#showAll", () =>
    it("reveals the rest of the articles", function () {
      this.view.collection.set(
        _.times(10, () =>
          _.extend(fixtures.article, {
            thumbnail_title: "Moobar",
            id: Math.random(),
          })
        )
      )
      this.view.collection.add(
        _.extend(fixtures.article, {
          thumbnail_title: "Foo",
          id: Math.random(),
        })
      )
      this.view.render()
      this.view.showAll({ preventDefault() {} })
      return this.view.$el.html().should.containEql("Foo")
    }))
})
