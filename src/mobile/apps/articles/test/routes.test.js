/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-done-callback */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")
const routes = rewire("../routes")
const Backbone = require("backbone")
const fixtures = require("../../../test/helpers/fixtures")
const request = require("superagent")
const { fabricate } = require("@artsy/antigravity")

describe("Article routes", function () {
  beforeEach(function () {
    this.req = { params: { id: "foobar" } }
    this.res = {
      render: sinon.stub(),
      locals: {
        sd: {},
      },
      redirect: sinon.stub(),
    }
    this.next = sinon.stub()
    sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#article", function () {
    it("fetches and redirects partner articles", function (done) {
      const article = _.extend(_.clone(fixtures.article), {
        id: "foobar",
        partner_channel_id: "123",
        slug: "foobar",
      })
      const partner = fabricate("partner")
      routes.article(this.req, this.res, this.next)
      Backbone.sync.args[0][1].url().should.containEql("api/articles/foobar")
      Backbone.sync.args[0][2].success(article)
      Backbone.sync.args[2][2].success(partner)
      return _.defer(() =>
        _.defer(() => {
          this.res.redirect.args[0][0].should.equal(
            `/partner/${partner.id}/article/foobar`
          )
          return done()
        })
      )
    })

    it("fetches and redirects fair articles", function (done) {
      const article = _.extend(_.clone(fixtures.article), {
        id: "foobar",
        fair_ids: ["123"],
        slug: "foobar",
      })
      routes.article(this.req, this.res, this.next)
      Backbone.sync.args[0][1].url().should.containEql("api/articles/foobar")
      Backbone.sync.args[0][2].success(article)
      Backbone.sync.args[2][2].success(fabricate("fair"))
      return _.defer(() =>
        _.defer(() => {
          this.res.redirect.args[0][0].should.equal(
            "/the-armory-show/article/foobar"
          )
          return done()
        })
      )
    })

    return it("nexts regular articles", function (done) {
      const article = _.extend(_.clone(fixtures.article), { id: "foobar" })
      routes.article(this.req, this.res, this.next)
      Backbone.sync.args[0][1].url().should.containEql("api/articles/foobar")
      Backbone.sync.args[0][2].success(article)
      return _.defer(() =>
        _.defer(() => {
          this.next.called.should.be.true()
          return done()
        })
      )
    })
  })

  return describe("#section (venice-biennale-2015 only)", function () {
    it("renders the section with its articles", function () {
      const section = _.extend(_.clone(fixtures.section), {
        slug: "venice-biennale-2015",
      })
      this.req.params.slug = "venice-biennale-2015"
      routes.section(this.req, this.res, this.next)
      Backbone.sync.args[0][2].success(section)
      Backbone.sync.args[1][2].data.section_id.should.equal(section.id)
      Backbone.sync.args[1][2].success(fixtures.articles)
      this.res.render.args[0][0].should.equal("section")
      return this.res.render.args[0][1].featuredSection
        .get("title")
        .should.equal(section.title)
    })

    return it("nexts for an error b/c it uses a root url that should be passed on", function () {
      routes.section(this.req, this.res, this.next)
      Backbone.sync.args[0][2].error()
      return this.next.called.should.be.ok()
    })
  })
})
