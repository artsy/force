/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const fixtures = require("../helpers/fixtures")
const Articles = rewire("../../collections/articles")

describe("Articles", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    Articles.__set__("sd", { CURRENT_USER: { type: "Admin" } })
    return (this.articles = new Articles([fixtures.articles]))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#feed", () =>
    it("pulls the rest of the articles not in featured", function () {
      this.articles.set([
        { tier: 1, id: "foo" },
        { tier: 1, id: "bar" },
        { tier: 2, id: "baz" },
        { tier: 1, id: "qux" },
        { tier: 2, id: "bam" },
      ])
      return _.pluck(this.articles.feed(), "id")
        .join("")
        .should.equal("barbazquxbam")
    }))

  describe("#featured", () =>
    it("pulls the first tier 1", function () {
      this.articles.set([
        { tier: 2, id: "foo" },
        { tier: 1, id: "bar" },
      ])
      return _.pluck(this.articles.featured(), "id")
        .join("")
        .should.equal("bar")
    }))

  describe("biography", () =>
    it("pulls a biography out of the articles", function () {
      this.articles.set([
        { tier: 1, id: "foo" },
        { tier: 1, id: "bar" },
        { tier: 2, id: "baz", biography_for_artist_id: "asdfsa" },
        { tier: 1, id: "qux" },
        { tier: 2, id: "bam" },
        { tier: 1, id: "moo" },
        { tier: 2, id: "boom" },
      ])
      return this.articles.biography().id.should.equal("baz")
    }))

  return describe("#orderByIds", () =>
    it("orders collection by ids give - dropping other items", function () {
      this.articles.set([
        { tier: 1, id: "foo" },
        { tier: 1, id: "bar" },
        { tier: 2, id: "boom" },
      ])
      this.articles.orderByIds(["boom", "bar", "foo"])
      this.articles.length.should.equal(3)
      this.articles.models[0].id.should.equal("boom")
      this.articles.models[1].id.should.equal("bar")
      return this.articles.models[2].id.should.equal("foo")
    }))
})
