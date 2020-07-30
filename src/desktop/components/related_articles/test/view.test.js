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
const CurrentUser = require("../../../models/current_user")
const Articles = require("../../../collections/articles")
const fixtures = require("../../../test/helpers/fixtures")

describe("RelatedArticlesView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.RelatedArticlesView = benv.requireWithJadeify(
        resolve(__dirname, "../view.coffee"),
        ["template"]
      )
      return done()
    })
  })

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    this.view = new this.RelatedArticlesView({
      collection: new Articles([fixtures.article]),
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
