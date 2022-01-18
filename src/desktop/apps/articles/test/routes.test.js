/* eslint-disable jest/valid-expect-in-promise */
import Backbone from "backbone"
import sinon from "sinon"
import articlesJSON from "./fixtures"
const fixtures = require("desktop/test/helpers/fixtures")
import { cloneDeep, extend } from "lodash"
import { JSDOM } from "jsdom"

const jsdom = new JSDOM("<!doctype html><html><body></body></html>")
global.Node = jsdom.window.Node
global.DOMParser = jsdom.window.DOMParser

const rewire = require("rewire")("../routes")
const { articles, section, teamChannel } = rewire

describe("Articles routes", () => {
  let req
  let res
  let next
  let positronql

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    req = {
      params: {},
      query: {},
      user: {
        isAdmin: sinon.stub().returns(true),
      },
    }
    res = {
      render: sinon.stub(),
      locals: {
        sd: {},
      },
      redirect: sinon.stub(),
      backboneError: sinon.stub(),
    }
    next = sinon.stub()

    rewire.__set__(
      "topParselyArticles",
      sinon
        .stub()
        .yields([
          fixtures.parselyArticle,
          fixtures.parselyArticle,
          fixtures.parselyArticle,
        ])
    )

    positronql = sinon.stub().returns(
      Promise.resolve({
        articles: articlesJSON,
      })
    )
    rewire.__set__("positronql", positronql)
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  describe("#section", () => {
    it("renders the section with articles", () => {
      const sectionObject = extend(cloneDeep(fixtures.section), {
        slug: "foo",
      })
      section(req, res, next)
      Backbone.sync.args[0][2].success(sectionObject)
      Backbone.sync.args[1][2].data.section_id.should.equal(sectionObject.id)
      Backbone.sync.args[1][2].success(fixtures.article)
      res.render.args[0][0].should.equal("section")
      res.render.args[0][1].section
        .get("title")
        .should.equal(sectionObject.title)
    })

    it("nexts for an error because it uses a root url", () => {
      section(req, res, next)
      Backbone.sync.args[0][2].error()
      next.called.should.be.ok()
    })
  })

  describe("#teamChannel", () => {
    it("renders the channel with its articles", () => {
      const channel = extend(cloneDeep(fixtures.channel), {
        slug: "foo",
        type: "team",
      })
      req.path = "foo"
      teamChannel(req, res, next)
      Backbone.sync.args[0][2].success(channel)
      Backbone.sync.args[1][2].data.ids.length.should.equal(4)
      Backbone.sync.args[1][2].success(fixtures.article)
      res.render.args[0][0].should.equal("team_channel")
      res.render.args[0][1].channel.get("name").should.equal(channel.name)
    })

    it("nexts if channel is not a team channel", () => {
      const channel = extend(cloneDeep(fixtures.channel), {
        slug: "foo",
        type: "editorial",
      })
      req.path = "/foo"
      teamChannel(req, res, next)
      Backbone.sync.args[0][2].success(channel)
      next.called.should.be.ok()
    })

    it("errors if there is an issue fetching a team channel", () => {
      const channel = extend(cloneDeep(fixtures.channel), {
        slug: "foo",
        type: "editorial",
      })
      req.path = "/foo"
      teamChannel(req, res, next)
      Backbone.sync.args[0][2].error(channel)
      res.backboneError.called.should.be.ok()
    })

    it("handles query params", () => {
      const channel = extend(cloneDeep(fixtures.channel), {
        slug: "foo",
        type: "team",
      })
      req.path = "/foo?utm=campaign"
      teamChannel(req, res, next)
      Backbone.sync.args[0][2].success(channel)
      Backbone.sync.args[1][2].success(fixtures.article)
      res.render.args[0][0].should.equal("team_channel")
      res.render.args[0][1].channel.get("name").should.equal(channel.name)
    })
  })
})
