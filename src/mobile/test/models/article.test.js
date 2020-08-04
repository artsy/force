/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Q = require("bluebird-q")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")
const Article = rewire("../../models/article.coffee")
const sinon = require("sinon")
const fixtures = require("../helpers/fixtures.coffee")

describe("Article", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.article = new Article(fixtures.article)
    return Article.__set__("sd", { FAIR_CHANNEL_ID: "12345" })
  })

  afterEach(() => Backbone.sync.restore())

  describe("#fetchRelated", function () {
    it("sets a fair if there is one", function () {
      Backbone.sync
        .onCall(0)
        .yieldsTo("success", [fabricate("article")])
        .returns(Q.resolve([fabricate("article")]))
        .onCall(1)
        .yieldsTo("success", fabricate("fair"))
        .returns(Q.resolve(fabricate("fair")))
      this.article.set({
        id: "id-1",
        fair_ids: ["123"],
        channel_id: "12345",
      })
      return this.article.fetchRelated({
        success(data) {
          return data.fair
            .get("default_profile_id")
            .should.equal("the-armory-show")
        },
      })
    })

    return it("sets a partner if there is one", function () {
      Backbone.sync
        .onCall(0)
        .yieldsTo("success", [fabricate("article")])
        .returns(Q.resolve([fabricate("article")]))
        .onCall(1)
        .yieldsTo("success", fabricate("partner"))
        .returns(Q.resolve(fabricate("partner")))
      this.article.set({
        id: "id-1",
        partner_channel_id: "147",
      })
      return this.article.fetchRelated({
        success(data) {
          return data.partner.get("default_profile_id").should.equal("gagosian")
        },
      })
    })
  })

  return describe("#isFairArticle", function () {
    it("returns true for a fair article", function () {
      this.article.set("channel_id", "12345")
      this.article.set("fair_ids", ["123"])
      return this.article.isFairArticle().should.be.true()
    })

    return it("returns false for a non fair article", function () {
      this.article.set("channel_id", "12345")
      this.article.set("fair_ids", [])
      return this.article.isFairArticle().should.be.false()
    })
  })
})
