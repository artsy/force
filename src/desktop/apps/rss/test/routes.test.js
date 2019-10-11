import Articles from "../../../collections/articles.coffee"
import Backbone from "backbone"
import sinon from "sinon"
import request from "superagent"
let routes = require("rewire")("../routes.js")

describe("Routes", () => {
  let req = {}
  let res = {}
  const published_at = new Date().toISOString()
  let results = {
    articles: [
      {
        id: "1",
        published_at,
        sections: [
          {
            type: "social_embed",
            url: "https://instagram.com/image",
          },
        ],
      },
      {
        id: "2",
        published_at,
        sections: [
          {
            type: "text",
            body: "Body Text",
          },
        ],
      },
      {
        id: "3",
        published_at,
        sections: [
          {
            type: "text",
            body: "Body Text 2",
          },
        ],
      },
    ],
  }

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    request.get = sinon.stub().returns({
      end: cb => {
        cb(null, {
          body: {
            html: '<blockquote class="twitter-tweet">',
          },
        })
      },
    })

    routes.__set__("sd", {
      ARTSY_EDITORIAL_CHANNEL: "foo",
    })
    routes.__set__("request", request)
    routes.__set__("positronql", sinon.stub().returns(Promise.resolve(results)))

    req = {}
    res = {
      render: sinon.stub(),
      set: sinon.stub(),
    }
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  describe("#partnerUpdates", () => {
    it("renders articles", () => {
      routes.partnerUpdates(req, res)
      Backbone.sync.args[0][2].success({
        total: 16088,
        count: 2,
        results: results.articles,
      })
      res.render.args[0][0].should.containEql("partner_updates")
      res.render.args[0][1].articles.length.should.eql(3)
    })
  })

  describe("#news", () => {
    it("renders the rss feed if #findArticlesWithEmbeds rejects", async () => {
      request.get = sinon.stub().returns({
        end: cb => {
          cb(new Error())
        },
      })
      routes.__set__("request", request)
      await routes.news(req, res)
      res.render.args[0][0].should.containEql("news")
      res.render.args[0][1].articles.length.should.eql(3)
    })

    it("renders the rss feed for news without unpublished video articles", async () => {
      const articlesWithVideo = [
        ...results.articles,
        {
          id: "4",
          published_at,
          layout: "video",
          media: {
            published: false,
          },
        },
      ]

      routes.__set__(
        "positronql",
        sinon.stub().returns(
          Promise.resolve({
            articles: articlesWithVideo,
          })
        )
      )

      const findArticlesWithEmbedsStub = sinon.stub()

      routes.__set__(
        "findArticlesWithEmbeds",
        findArticlesWithEmbedsStub.returns(
          Promise.resolve(new Articles(results.articles))
        )
      )

      await routes.news(req, res)

      // This ensures that articles are filtered between the positron call and the #findArticlesWithEmbeds call
      findArticlesWithEmbedsStub.firstCall.args[0].length.should.eql(3)

      res.render.args[0][0].should.containEql("news")
      res.render.args[0][1].articles.length.should.eql(3)
    })
  })

  describe("#maybeFetchSocialEmbed", () => {
    let section = {}

    it("Returns the section if not social_embed", async () => {
      section.type = "text"
      const newSection = await routes.maybeFetchSocialEmbed(section)
      newSection.type.should.eql("text")
    })

    it("Returns fetched oembed data if social_embed", async () => {
      section = {
        type: "social_embed",
        url: "https://twitter.com/artsy/status/978997552061272064",
      }

      const newSection = await routes.maybeFetchSocialEmbed(section)
      request.get.args[0][0].should.eql(
        "https://publish.twitter.com/oembed?url=https://twitter.com/artsy/status/978997552061272064"
      )
      newSection.url.should.eql('<blockquote class="twitter-tweet">')
      newSection.type.should.eql("social_embed")
    })

    it("Fetches from instagram", async () => {
      section = {
        type: "social_embed",
        url: "https://www.instagram.com/p/Bh-Az5_gaVB/?taken-by=artsy",
      }

      await routes.maybeFetchSocialEmbed(section)
      request.get.args[0][0].should.eql(
        "https://api.instagram.com/oembed?url=https://www.instagram.com/p/Bh-Az5_gaVB/?taken-by=artsy"
      )
    })

    it("This case is about fetching the undefined data", async () => {
      section = undefined
      const newSection = await routes.maybeFetchSocialEmbed(section)
      const result = newSection === undefined
      result.should.be.true()
    })
  })
})
