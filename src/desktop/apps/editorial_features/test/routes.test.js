/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const moment = require("moment")
const Backbone = require("backbone")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const Curation = require("../../../models/curation")
const rewire = require("rewire")
const routes = rewire("../routes")
const fixtures = require("../../../test/helpers/fixtures.coffee")
const markdown = require("../../../components/util/markdown.coffee")

describe("EOY route", function () {
  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    this.req = { params: {} }
    this.res = {
      render: sinon.stub(),
      locals: { sd: {} },
      redirect: sinon.stub(),
    }
    this.next = sinon.stub()
    return done()
  })

  afterEach(function (done) {
    Backbone.sync.restore()
    return done()
  })

  return it("fetches a curation and superArticle, and superSubArticles", function (done) {
    Backbone.sync
      .onCall(0)
      .yieldsTo("success", { name: "EOY Curation" })
      .onCall(1)
      .yieldsTo(
        "success",
        _.extend({}, fixtures.article, {
          title: "Moo",
          super_article: {
            related_articles: ["12345", "67890"],
          },
        })
      )
      .onCall(2)
      .yieldsTo("success", _.extend({}, fixtures.article, { id: "12345" }))
      .onCall(3)
      .yieldsTo("success", _.extend({}, fixtures.article, { id: "67890" }))

    routes.eoy(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.render.args[0][0].should.containEql(
          "components/eoy/templates/index"
        )
        this.res.render.args[0][1].curation
          .get("name")
          .should.equal("EOY Curation")
        this.res.render.args[0][1].article.get("title").should.equal("Moo")
        this.res.render.args[0][1].superSubArticles.length.should.equal(2)
        return done()
      })
    )
  })
})

describe("Gucci route", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    Backbone.sync.onCall(0).yieldsTo("success", {
      name: "Artists For Gender Equality",
      sections: [
        {
          title: "I. Past",
        },
        {
          title: "I. Present",
        },
        {
          title: "I. Future",
        },
      ],
    })
    this.res = {
      render: sinon.stub(),
      locals: { sd: {} },
      redirect: sinon.stub(),
    }
    this.next = sinon.stub()
    return routes.__set__("sd", { EF_GUCCI: "123" })
  })

  afterEach(function (done) {
    Backbone.sync.restore()
    return done()
  })

  it("sets a curation", function (done) {
    this.req = { params: { slug: "past" } }
    routes.gucci(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.render.args[0][0].should.equal(
          "components/gucci/templates/index"
        )
        this.res.render.args[0][1].curation
          .get("name")
          .should.eql("Artists For Gender Equality")
        return done()
      })
    )
  })

  return it("Sets a video index based on slug", function (done) {
    this.req = { params: { slug: "future" } }
    routes.gucci(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.locals.sd.VIDEO_INDEX.should.eql(2)
        return done()
      })
    )
  })
})

describe("Venice route", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    Backbone.sync
      .onCall(0)
      .yieldsTo("success", {
        name: "Inside the Biennale",
        sections: [{ slug: "venice", title: "venice" }, { slug: "venice-2" }],
        sub_articles: ["123"],
      })
      .onCall(1)
      .yieldsTo("success", { title: "Video Guide" })
      .onCall(2)
      .yieldsTo("success", [{ title: "Sub Article" }])
    this.res = {
      render: sinon.stub(),
      locals: { sd: {} },
      redirect: sinon.stub(),
    }
    this.next = sinon.stub()
    routes.__set__("sd", { EF_VENICE: "123", EF_VIDEO_GUIDE: "456" })
    return routes.__set__("sailthru", sinon.stub())
  })

  afterEach(function (done) {
    Backbone.sync.restore()
    return done()
  })

  it("sets a video index", function (done) {
    this.req = { params: { slug: "venice-2" } }
    routes.venice(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.render.args[0][0].should.equal(
          "components/venice_2017/templates/index"
        )
        this.res.render.args[0][1].videoIndex.should.equal(1)
        return done()
      })
    )
  })

  it("defaults to the first video", function (done) {
    this.req = { params: { slug: "blah" } }
    routes.venice(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.redirect.args[0].should.eql([
          301,
          "/venice-biennale/toward-venice",
        ])
        return done()
      })
    )
  })

  it("sets a curation", function (done) {
    this.req = { params: { slug: "venice" } }
    routes.venice(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.render.args[0][0].should.equal(
          "components/venice_2017/templates/index"
        )
        this.res.render.args[0][1].curation
          .get("name")
          .should.eql("Inside the Biennale")
        return done()
      })
    )
  })

  it("sets the 360 video guide", function (done) {
    this.req = { params: { slug: "venice" } }
    routes.venice(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.render.args[0][1].videoGuide
          .get("title")
          .should.eql("Video Guide")
        return done()
      })
    )
  })

  xit("Fetches sub articles", function (done) {
    this.req = { params: { slug: "venice" } }
    routes.venice(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.render.args[0][1].sub_articles.length.should.eql(1)
        return done()
      })
    )
  })

  it("renders json ld", function (done) {
    this.req = { params: { slug: "venice" } }
    routes.venice(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.locals.jsonLD.should.containEql(
          '"headline":"Inside the Biennale venice"'
        )
        return done()
      })
    )
  })

  return it("includes sailthru", function (done) {
    this.req = { params: { slug: "venice" } }
    routes.venice(this.req, this.res, this.next)
    return _.defer(() =>
      _.defer(() => {
        this.res.locals.sd.INCLUDE_SAILTHRU.should.be.true()
        return done()
      })
    )
  })
})

describe("Vanity route", function () {
  beforeEach(function () {
    this.res = {
      render: sinon.stub(),
      locals: { sd: {} },
      redirect: sinon.stub(),
    }
    this.next = sinon.stub()
    return routes.__set__("proxy", { web: (this.web = sinon.stub()) })
  })

  it("checks that the asset is allowed and sets up proxy", function () {
    routes.__set__("ALLOWED_VANITY_ASSETS", "videos/final-video.mp4")
    this.req = { params: ["videos/final-video.mp4"], headers: { host: "" } }
    routes.vanity(this.req, this.res, this.next)
    return this.web.args[0][2].target.should.containEql(
      "/videos/final-video.mp4"
    )
  })

  it("rejects assets that are not allowed", function () {
    routes.__set__("ALLOWED_VANITY_ASSETS", "videos/final-video.mp4")
    this.req = { params: ["videos/demo-video.mp4"], headers: { host: "" } }
    routes.vanity(this.req, this.res, this.next)
    return this.next.called.should.be.true()
  })

  return it("redirects to articles page if there is a proxy error", function () {
    routes.__set__("ALLOWED_VANITY_ASSETS", "videos/final-video.mp4")
    this.req = { params: ["videos/final-video.mp4"], headers: { host: "" } }
    routes.vanity(this.req, this.res, this.next)
    this.web.args[0][3]("Error")
    this.res.redirect.args[0][0].should.equal(301)
    return this.res.redirect.args[0][1].should.equal("/articles")
  })
})
