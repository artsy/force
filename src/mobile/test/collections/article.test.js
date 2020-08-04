/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const fixtures = require("../helpers/fixtures")
const Articles = require("../../collections/articles")

describe("Articles", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.articles = new Articles([fixtures.articles]))
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#orderByIds", () =>
    it("orders collection by ids give - dropping other items", function () {
      this.articles.set([{ id: "foo" }, { id: "bar" }, { id: "boom" }])
      this.articles.orderByIds(["boom", "bar", "foo"])
      this.articles.length.should.equal(3)
      this.articles.models[0].id.should.equal("boom")
      this.articles.models[1].id.should.equal("bar")
      return this.articles.models[2].id.should.equal("foo")
    }))
})
