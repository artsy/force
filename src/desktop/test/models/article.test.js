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
const Article = rewire("../../models/article")
const Articles = require("../../collections/articles")
const sinon = require("sinon")
const fixtures = require("../helpers/fixtures")
const moment = require("moment")
const momentTimezone = require("moment-timezone")
const { JSDOM } = require("jsdom")

const jsdom = new JSDOM("<!doctype html><html><body></body></html>")
global.Node = jsdom.window.Node
global.DOMParser = jsdom.window.DOMParse

describe("Article", function () {
  beforeEach(function () {
    Article.__set__("sd", { EOY_2016_ARTICLE: "1234" })
    Article.__set__("ARTSY_EDITORIAL_CHANNEL", "5759e3efb5989e6f98f77993")
    Article.__set__
    sinon.stub(Backbone, "sync").returns(Q.defer())
    return (this.article = new Article())
  })

  afterEach(() => Backbone.sync.restore())

  describe("#fetchWithRelated", function () {
    it("gets all the related data from the article", function (done) {
      Backbone.sync
        .onCall(0)
        .yieldsTo(
          "success",
          _.extend({}, fixtures.article, { title: "Moo", sections: [] })
        )
        .onCall(1)
        .yieldsTo("success", [])
        .onCall(2)
        .yieldsTo("success", [])
        .onCall(3)
        .yieldsTo("success", [fixtures.channel])
      this.article.fetchWithRelated({
        success(data) {
          data.article.get("title").should.equal("Moo")
          return done()
        },
      })
    })

    it("gets the slideshow artworks", function (done) {
      const slideshowArticle = _.extend({}, fixtures.article, {
        title: "Moo",
        channel_id: null,
        sections: [
          {
            type: "slideshow",
            items: [
              {
                type: "artwork",
                id: "foo",
              },
            ],
          },
        ],
      })

      Backbone.sync
        .onCall(0)
        .yieldsTo("success", slideshowArticle)
        .onCall(1)
        .yieldsTo("success", [fixtures.article])
        .onCall(2)
        .yieldsTo("success", fabricate("artwork", { title: "foobar" }))
        .onCall(3)
        .yieldsTo("success", [fixtures.article])

      this.article.fetchWithRelated({
        success(data) {
          data.slideshowArtworks.first().get("title").should.equal("foobar")
          return done()
        },
      })
    })

    it("works for those rare sectionless articles", function (done) {
      const sectionlessArticle = _.extend({}, fixtures.article, {
        title: "Moo",
        sections: [],
        channel_id: null,
      })

      Backbone.sync
        .onCall(0)
        .yieldsTo("success", sectionlessArticle)
        .onCall(1)
        .yieldsTo("success", [fixtures.article])
        .onCall(2)
        .yieldsTo("success", [fixtures.article])

      this.article.fetchWithRelated({
        success(data) {
          data.article.get("title").should.equal("Moo")
          return done()
        },
      })
    })

    it("fetches related articles for super articles", function (done) {
      const superArticle = _.extend({}, fixtures.article, {
        title: "SuperArticle",
        is_super_article: true,
        sections: [],
        channel_id: null,
        super_article: {
          related_articles: ["id-1"],
        },
      })

      const relatedArticle = _.extend({}, fixtures.article, {
        title: "RelatedArticle",
        id: "id-1",
      })

      Backbone.sync
        .onCall(0)
        .yieldsTo("success", superArticle)
        .onCall(1)
        .yieldsTo("success", [fixtures.article])
        .onCall(2)
        .yieldsTo("success", relatedArticle)

      this.article.fetchWithRelated({
        success(data) {
          data.superSubArticles.models[0]
            .get("title")
            .should.equal("RelatedArticle")
          data.article.get("title").should.equal("SuperArticle")
          return done()
        },
      })
    })

    it("fetches related articles for article in super article", function (done) {
      const relatedArticle1 = _.extend({}, fixtures.article, {
        id: "id-1",
        title: "RelatedArticle 1",
        sections: [],
      })
      const relatedArticle2 = _.extend({}, fixtures.article, {
        id: "id-2",
        title: "RelatedArticle 2",
        sections: [],
      })
      const superArticle = _.extend({}, fixtures.article, {
        id: "id-3",
        title: "SuperArticle",
        is_super_article: true,
        sections: [],
        channel_id: null,
        super_article: {
          related_articles: ["id-1", "id-2"],
        },
      })

      Backbone.sync
        .onCall(0)
        .yieldsTo("success", superArticle)
        .onCall(1)
        .yieldsTo("success", [fixtures.article])
        .onCall(2)
        .yieldsTo("success", relatedArticle1)
        .onCall(3)
        .yieldsTo("success", relatedArticle2)

      this.article.fetchWithRelated({
        success(data) {
          data.superArticle.get("title").should.equal("SuperArticle")
          data.superSubArticles
            .first()
            .get("title")
            .should.equal("RelatedArticle 1")
          data.superSubArticles
            .last()
            .get("title")
            .should.equal("RelatedArticle 2")
          return done()
        },
      })
    })

    return it("fetches callout articles", function (done) {
      const calloutArticle = _.extend({}, fixtures.article, {
        sections: [
          {
            type: "callout",
            article: "12345",
          },
        ],
      })

      Backbone.sync
        .onCall(0)
        .yieldsTo("success", calloutArticle)
        .onCall(4)
        .yieldsTo(
          "success",
          _.extend({}, fixtures.article, {
            thumbnail_title: "The title of a callout article",
          })
        )

      this.article.fetchWithRelated({
        success(data) {
          data.calloutArticles.length.should.equal(1)
          data.calloutArticles
            .first()
            .get("thumbnail_title")
            .should.equal("The title of a callout article")
          return done()
        },
      })
    })
  })

  describe("#strip", () =>
    it("returns the attr without tags", function () {
      this.article.set("lead_paragraph", "<p><br></p>")
      this.article.strip("lead_paragraph").should.equal("")
      this.article.set("lead_paragraph", "<p>Existy</p>")
      return this.article.strip("lead_paragraph").should.equal("Existy")
    }))

  describe("byline", function () {
    it("returns the author when there are no contributing authors", function () {
      this.article.set("contributing_authors", [])
      this.article.set("author", { name: "Molly" })
      return this.article.byline().should.equal("Molly")
    })

    it("returns the contributing author name if there is one", function () {
      this.article.set("contributing_authors", [{ name: "Molly" }])
      return this.article.byline().should.equal("Molly")
    })

    it('returns "and" with two contributing authors', function () {
      this.article.set("contributing_authors", [
        { name: "Molly" },
        { name: "Kana" },
      ])
      return this.article.byline().should.equal("Molly and Kana")
    })

    it("returns multiple contributing authors", function () {
      this.article.set("contributing_authors", [
        { name: "Molly" },
        { name: "Kana" },
        { name: "Christina" },
      ])
      return this.article.byline().should.equal("Molly, Kana and Christina")
    })

    return it("returns multiple authors", function () {
      this.article.set("authors", [
        { name: "Molly" },
        { name: "Kana" },
        { name: "Christina" },
      ])
      return this.article.byline().should.equal("Molly, Kana and Christina")
    })
  })

  describe("contributingByline", function () {
    it("returns an empty string when there are no contributing authors", function () {
      this.article.set("contributing_authors", [])
      return this.article.contributingByline().should.equal("")
    })

    it("returns the contributing author name if there is one", function () {
      this.article.set("contributing_authors", [{ name: "Molly" }])
      return this.article.contributingByline().should.equal("Molly")
    })

    it('returns "and" with two contributing authors', function () {
      this.article.set("contributing_authors", [
        { name: "Molly" },
        { name: "Kana" },
      ])
      return this.article.contributingByline().should.equal("Molly and Kana")
    })

    return it("returns multiple contributing authors", function () {
      this.article.set("contributing_authors", [
        { name: "Molly" },
        { name: "Kana" },
        { name: "Christina" },
      ])
      return this.article
        .contributingByline()
        .should.equal("Molly, Kana and Christina")
    })
  })

  describe("toJSONLD", function () {
    it("includes the layout, vertical and tracking tags", function () {
      this.article.set({
        tags: ["Venice", "Technology"],
        tracking_tags: ["Evergreen", "Interviews"],
        vertical: { name: "Culture", id: "123" },
        layout: "standard",
      })
      return this.article
        .toJSONLD()
        .keywords.should.eql([
          "Venice",
          "Technology",
          "standard",
          "Culture",
          "Evergreen",
          "Interviews",
        ])
    })
    return it("includes datestamps", function () {
      this.article.set({
        published_at: "2019-04-23T16:31:48.205Z",
      })
      this.article.toJSONLD().dateCreated.should.eql("2019-04-23T16:31:48.205Z")
      return this.article
        .toJSONLD()
        .datePublished.should.eql("2019-04-23T16:31:48.205Z")
    })
  })

  describe("date", function () {
    it("returns NY time for editorial articles", function () {
      this.article.set("channel_id", "5759e3efb5989e6f98f77993")
      this.article.set("date", momentTimezone().tz("America/New_York"))
      return this.article
        .date("published_at")
        .format("MMM Do, YYYY h:mm a")
        .should.eql(
          momentTimezone().tz("America/New_York").format("MMM Do, YYYY h:mm a")
        )
    })

    return it("returns local time for non-editorial articles", function () {
      this.article.set("date", momentTimezone().tz("America/New_York"))
      return this.article
        .date("published_at")
        .format("MMM Do, YYYY h:mm a")
        .should.eql(moment().local().format("MMM Do, YYYY h:mm a"))
    })
  })

  describe("getParselySection", function () {
    it("returns Editorial", function () {
      this.article.set({
        channel_id: "5759e3efb5989e6f98f77993",
      })
      return this.article.getParselySection().should.equal("Editorial")
    })

    it("returns channel name", function () {
      this.article.set({
        channel: new Backbone.Model({ name: "Life at Artsy" }),
        channel_id: "123",
      })
      return this.article.getParselySection().should.equal("Life at Artsy")
    })

    it("returns Partner", function () {
      this.article.set({
        partner_channel_id: "123",
        channel_id: null,
      })
      return this.article.getParselySection().should.equal("Partner")
    })

    return it("returns Other", function () {
      this.article.set({
        partner_channel_id: null,
        channel_id: null,
      })
      return this.article.getParselySection().should.equal("Other")
    })
  })

  describe("isEOYSubArticle", function () {
    it("returns true for a super-sub-article with matching super article id", function () {
      this.article.set("id", "1212")
      return this.article
        .isEOYSubArticle(["12", "23", "1212"], { id: "1234" })
        .should.be.true()
    })

    it("returns false if no sub articles", function () {
      this.article.set("id", "1213")
      return this.article.isEOYSubArticle([], { id: "1234" }).should.be.false()
    })

    it("returns false if super article does not match", function () {
      this.article.set("id", "1213")
      return this.article
        .isEOYSubArticle(["12", "23", "1213"], { id: "1236" })
        .should.be.false()
    })

    return it("returns false if article is a super article", function () {
      this.article.set("is_super_article", true)
      return this.article
        .isEOYSubArticle(["12", "23", "1213"], { id: "1234" })
        .should.be.false()
    })
  })

  return describe("AMP methods", function () {
    it("returns true if standard layout", function () {
      this.article.set({
        sections: [{ type: "text" }],
        published: true,
        featured: true,
        layout: "standard",
      })
      return this.article.hasAMP().should.be.true()
    })

    it("returns true if feature layout", function () {
      this.article.set({
        sections: [{ type: "text" }],
        published: true,
        featured: true,
        layout: "feature",
      })
      return this.article.hasAMP().should.be.true()
    })

    it("returns true if news layout", function () {
      this.article.set({
        sections: [{ type: "text" }],
        published: true,
        featured: true,
        layout: "news",
      })
      return this.article.hasAMP().should.be.true()
    })

    it("returns false if article does not have an AMP page artworks", function () {
      this.article.set({ sections: [{ type: "artworks" }] })
      return this.article.hasAMP().should.be.false()
    })

    it("returns false if article does not have an AMP page image", function () {
      this.article.set({ sections: [{ type: "image" }] })
      return this.article.hasAMP().should.be.false()
    })

    it("returns false if article is not standard, feature or news layout", function () {
      this.article.set({
        sections: [{ type: "text" }],
        published: true,
        featured: true,
        layout: "series",
      })
      return this.article.hasAMP().should.be.false()
    })

    it("returns false if article is not featured", function () {
      this.article.set({
        sections: [{ type: "text" }],
        featured: false,
        published: true,
      })
      return this.article.hasAMP().should.be.false()
    })

    it("returns false if article is a series", function () {
      this.article.set({
        sections: [{ type: "text" }],
        featured: true,
        published: true,
        layout: "series",
      })
      return this.article.hasAMP().should.be.false()
    })

    it("returns false if article is a video", function () {
      this.article.set({
        sections: [{ type: "text" }],
        featured: true,
        published: true,
        layout: "video",
      })
      return this.article.hasAMP().should.be.false()
    })

    return it("returns the full AMP href", function () {
      return this.article.ampHref().should.containEql("/amp")
    })
  })
})
