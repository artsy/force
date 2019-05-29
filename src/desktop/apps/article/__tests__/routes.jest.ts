import { data as sd } from "sharify"
import * as routes from "../routes"
import { getCurrentUnixTimestamp } from "@artsy/reaction/dist/Components/Publishing/Constants"
import * as fixtures from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import { extend } from "underscore"
const Article = require("desktop/models/article.coffee")

jest.mock("sailthru-client", () => ({
  createSailthruClient: () => ({
    apiPost: jest.fn(),
    apiGet: jest.fn(),
  }),
}))

jest.mock("desktop/lib/positronql", () => ({
  positronql: jest.fn(),
}))

jest.mock("sharify", () => ({
  data: {
    ARTSY_EDITORIAL_CHANNEL: "123",
    GALLERY_INSIGHTS_CHANNEL: "987",
    APP_URL: "https://artsy.net",
    EOY_2018_ARTISTS: "5bf30690d8b9430baaf6c6de",
  },
}))

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))

const positronql = require("desktop/lib/positronql").positronql as jest.Mock
const stitch = require("@artsy/stitch").stitch as jest.Mock

describe("Article Routes", () => {
  let req
  let res
  let next
  let article
  let sailthruApiPost
  let sailthruApiGet

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: "foobar" },
      path: "/article/foobar",
      url: "",
    }
    res = {
      app: { get: jest.fn().mockReturnValue("components") },
      locals: {
        sd,
      },
      render: jest.fn(),
      send: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    }
    next = jest.fn()

    sailthruApiPost = jest.fn()
    sailthruApiGet = jest.fn()

    article = extend({}, fixtures.StandardArticle, {
      slug: "foobar",
      channel_id: "123",
    })

    positronql.mockReturnValue(Promise.resolve({ article }))
    stitch.mockReturnValue(Promise.resolve())

    Article.prototype.fetchWithRelated = jest.fn(options => {
      options.success({ article: new Article(article) })
    })
  })

  afterEach(() => {
    positronql.mockClear()
    stitch.mockClear()
  })

  describe("#index", () => {
    it("renders the index with the correct data", done => {
      const time = getCurrentUnixTimestamp()
      routes.index(req, res, next).then(() => {
        const { data, locals } = stitch.mock.calls[0][0]
        const timeDifference = time - data.renderTime

        expect(timeDifference).toBeLessThan(100)
        expect(locals.assetPackage).toBe("article")
        expect(data.article.title).toBe("New York's Next Art District")
        done()
      })
    })

    it("sets the correct jsonld", done => {
      routes.index(req, res, next).then(() => {
        const {
          data: { jsonLD },
        } = stitch.mock.calls[0][0]

        expect(jsonLD).toMatch("New York's Next Art District")
        done()
      })
    })

    it("nexts if media is unpublished", done => {
      article.layout = "video"
      article.media = { published: false }
      positronql.mockReturnValue(Promise.resolve({ article }))

      routes.index(req, res, next).then(() => {
        expect(next).toBeCalled()
        done()
      })
    })

    it("redirects to the main slug if an older slug is queried", done => {
      article.slug = "zoobar"
      positronql.mockReturnValue(Promise.resolve({ article }))

      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith("/article/zoobar")
        done()
      })
    })

    it("redirects to the layout if it is not a standard/feature article", done => {
      article.layout = "series"
      positronql.mockReturnValue(Promise.resolve({ article }))

      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith("/series/foobar")
        done()
      })
    })

    it("does not strip search params from redirects", done => {
      article = extend(article, fixtures.NewsArticle)
      positronql.mockReturnValue(Promise.resolve({ article }))
      req.url =
        "/article/artsy-editorial-museums-embrace-activists?utm_medium=email&utm_source=13533678-newsletter-editorial-daily-06-11-18&utm_campaign=editorial&utm_content=st-V"

      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith(
          "/article/news-article?utm_medium=email&utm_source=13533678-newsletter-editorial-daily-06-11-18&utm_campaign=editorial&utm_content=st-V"
        )
        done()
      })
    })

    it("redirects to a nested series if it is one", done => {
      article = extend(article, {
        seriesArticle: {
          slug: "future-of-art",
        },
      })
      positronql.mockReturnValue(Promise.resolve({ article }))
      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith("/series/future-of-art/foobar")
        done()
      })
    })

    it("renders classic mode if article is not editorial", done => {
      article.channel_id = "456"
      article.layout = "classic"
      positronql.mockReturnValue(Promise.resolve({ article }))

      routes.index(req, res, next).then(() => {
        expect(res.render.mock.calls[0][0]).toBe("article")
        done()
      })
    })

    it("redirects to partners.artsy.net if channel is GALLERY_INSIGHTS_CHANNEL", done => {
      article.channel_id = "987"
      positronql.mockReturnValue(Promise.resolve({ article }))

      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith("https://partners.artsy.net")
        done()
      })
    })

    describe("templates", () => {
      it("sets the blank template for video layout", done => {
        article = extend(fixtures.VideoArticle, {
          channel_id: "123",
          slug: "foobar",
        })
        req.path = "/video/foobar"
        positronql.mockReturnValue(Promise.resolve({ article }))

        routes.index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].layout).toMatch("react_blank_index")
          done()
        })
      })

      it("sets the blank template for series layout", done => {
        article = extend(fixtures.SeriesArticle, {
          channel_id: "123",
          slug: "foobar",
        })
        req.path = "/series/foobar"
        positronql.mockReturnValue(Promise.resolve({ article }))

        routes.index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].layout).toMatch("react_blank_index")
          done()
        })
      })

      it("sets the main template for standard layouts", done => {
        routes.index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].layout).toMatch("react_index")
          done()
        })
      })
    })
  })
})

// import * as fixtures from "desktop/test/helpers/fixtures.coffee"
// import * as _ from "underscore"
// import sinon from "sinon"
// import Article from "desktop/models/article.coffee"
// import Channel from "desktop/models/channel.coffee"
// import { getCurrentUnixTimestamp } from "reaction/Components/Publishing/Constants"

//   describe("#index", () => {

//     it("fetches resources for a super article", () => {
//       const article = {
//         article: _.extend({}, fixtures.article, {
//           slug: "foobar",
//           channel_id: "123",
//           is_super_article: true,
//         }),
//       }
//       const superSubArticles = {
//         articles: [
//           _.extend({}, fixtures.article, {
//             slug: "sub-article",
//             channel_id: "123",
//             is_super_sub_article: true,
//           }),
//         ],
//       }
//       const positronql = sinon.stub()
//       positronql
//         .onCall(0)
//         .returns(Promise.resolve(article))
//         .onCall(1)
//         .returns(Promise.resolve(superSubArticles))
//       rewire.__set__("positronql", positronql)
//       const stitch = sinon.stub()
//       rewire.__set__("stitch", stitch)
//       index(req, res, next).then(() => {
//         stitch.args[0][0].data.isSuper.should.be.true()
//         stitch.args[0][0].data.superArticle.get("slug").should.equal("foobar")
//         stitch.args[0][0].data.superSubArticles.length.should.equal(1)
//         stitch.args[0][0].data.superSubArticles
//           .first()
//           .get("slug")
//           .should.equal("sub-article")
//       })
//     })

//     it("fetches resources for super sub articles", () => {
//       const article = {
//         article: _.extend({}, fixtures.article, {
//           slug: "foobar",
//           channel_id: "123",
//           is_super_sub_article: true,
//         }),
//       }
//       const superArticle = {
//         articles: [
//           _.extend({}, fixtures.article, {
//             slug: "foobar",
//             channel_id: "123",
//             is_super_article: true,
//             title: "Super Article Title",
//           }),
//         ],
//       }
//       const superSubArticles = {
//         articles: [
//           _.extend({}, fixtures.article, {
//             slug: "sub-article",
//             channel_id: "123",
//             is_super_sub_article: true,
//           }),
//         ],
//       }
//       const positronql = sinon.stub()
//       positronql
//         .onCall(0)
//         .returns(Promise.resolve(article))
//         .onCall(1)
//         .returns(Promise.resolve(superArticle))
//         .onCall(2)
//         .returns(Promise.resolve(superSubArticles))
//       rewire.__set__("positronql", positronql)
//       const stitch = sinon.stub()
//       rewire.__set__("stitch", stitch)
//       index(req, res, next).then(() => {
//         stitch.args[0][0].data.isSuper.should.be.true()
//         stitch.args[0][0].data.superSubArticles.length.should.equal(1)
//         stitch.args[0][0].data.superSubArticles
//           .first()
//           .get("slug")
//           .should.equal("sub-article")
//         stitch.args[0][0].data.superArticle
//           .get("title")
//           .should.equal("Super Article Title")
//       })
//     })

//     describe("ToolTips", () => {
//       let data
//       let stitch

//       beforeEach(() => {
//         res.locals.sd.CURRENT_USER = { type: "Admin" }
//         data = {
//           article: _.extend({}, fixtures.article, {
//             slug: "foobar",
//             channel_id: "123",
//             layout: "standard",
//           }),
//         }
//         rewire.__set__(
//           "positronql",
//           sinon.stub().returns(Promise.resolve(data))
//         )
//         stitch = sinon.stub()
//         rewire.__set__("stitch", stitch)
//         rewire.__set__(
//           "subscribedToEditorial",
//           sinon.stub().returns(Promise.resolve(true))
//         )
//       })

//       it("Shows tooltips if desktop UA", done => {
//         index(req, res, next).then(() => {
//           stitch.args[0][0].data.showTooltips.should.equal(true)
//           done()
//         })
//       })

//       it("Hides tooltips for mobile UA", done => {
//         res.locals.sd.IS_MOBILE = true

//         index(req, res, next).then(() => {
//           stitch.args[0][0].data.showTooltips.should.equal(false)
//           done()
//         })
//       })

//       it("Hides tooltips for tablet UA", done => {
//         res.locals.sd.IS_TABLET = true

//         index(req, res, next).then(() => {
//           stitch.args[0][0].data.showTooltips.should.equal(false)
//           done()
//         })
//       })
//     })

//     describe("Custom editorial", () => {
//       it("Adds custom editorial var and no-header class to stitch args", done => {
//         const data = {
//           article: _.extend({}, fixtures.article, {
//             slug: "foobar",
//             channel_id: "123",
//             layout: "feature",
//             id: "5bf30690d8b9430baaf6c6de",
//           }),
//         }
//         rewire.__set__(
//           "positronql",
//           sinon.stub().returns(Promise.resolve(data))
//         )
//         const stitch = sinon.stub()
//         rewire.__set__("stitch", stitch)
//         req.path = "/article/foobar"
//         index(req, res, next).then(() => {
//           stitch.args[0][0].locals.bodyClass.should.containEql("body-no-header")
//           stitch.args[0][0].data.customEditorial.should.containEql(
//             "EOY_2018_ARTISTS"
//           )
//           done()
//         })
//       })
//     })
//   })

//   describe("#classic", () => {
//     let article
//     beforeEach(() => {
//       article = new Article(
//         _.extend({}, fixtures.article, {
//           slug: "foobar",
//           channel_id: "456",
//           sections: [],
//           featured: true,
//           published: true,
//         })
//       )
//     })

//     it("renders a classic article", () => {
//       const data = {
//         article,
//         channel: new Channel({
//           name: "Foo",
//         }),
//       }
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       classic(req, res, next)
//       res.render.args[0][1].article.get("slug").should.equal("foobar")
//       res.render.args[0][1].channel.get("name").should.equal("Foo")
//     })

//     it("renders a ghosted article", () => {
//       const data = { article }
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       classic(req, res, next)
//       res.render.args[0][1].article.get("slug").should.equal("foobar")
//     })

//     xit("sets the correct jsonld", () => {
//       const data = { article }
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       classic(req, res, next)
//       res.locals.jsonLD.should.containEql("Top Ten Booths at miart 2014")
//       res.locals.jsonLD.should.containEql("Fair Coverage")
//     })
//   })

//   describe("#amp", () => {
//     it("renders amp page", done => {
//       const data = {
//         article: new Article(
//           _.extend({}, fixtures.article, {
//             slug: "foobar",
//             channel_id: "456",
//             sections: [],
//             featured: true,
//             published: true,
//             layout: "standard",
//           })
//         ),
//         channel: new Channel(),
//       }
//       rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       rewire.__set__("Article", Article)
//       amp(req, res, next)
//       res.render.args[0][0].should.equal("amp_article")
//       done()
//     })

//     it("skips if image/artwork sections exist (amp requires image dimensions)", done => {
//       const data = {
//         article: new Article(
//           _.extend({}, fixtures.article, {
//             slug: "foobar",
//             channel_id: "456",
//             sections: [
//               {
//                 type: "image",
//               },
//             ],
//           })
//         ),
//         channel: new Channel(),
//       }
//       rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       rewire.__set__("Article", Article)
//       amp(req, res, next)
//       next.callCount.should.equal(1)
//       done()
//     })

//     it("skips if it isnt featured", done => {
//       const data = {
//         article: new Article(
//           _.extend({}, fixtures.article, {
//             slug: "foobar",
//             channel_id: "456",
//             featured: false,
//             sections: [],
//           })
//         ),
//         channel: new Channel(),
//       }
//       rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       rewire.__set__("Article", Article)
//       amp(req, res, next)
//       next.callCount.should.equal(1)
//       done()
//     })

//     it("redirects to the main slug if an older slug is queried", done => {
//       const data = {
//         article: new Article(
//           _.extend({}, fixtures.article, {
//             slug: "zoobar",
//             channel_id: "456",
//             featured: true,
//             sections: [],
//           })
//         ),
//         channel: new Channel(),
//       }
//       rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       rewire.__set__("Article", Article)
//       amp(req, res, next)
//       res.redirect.args[0][0].should.equal("/article/zoobar/amp")
//       done()
//     })

//     xit("sets the correct jsonld", done => {
//       const data = {
//         article: new Article(
//           _.extend({}, fixtures.article, {
//             slug: "foobar",
//             channel_id: "456",
//             sections: [],
//             featured: true,
//             published: true,
//             layout: "standard",
//           })
//         ),
//         channel: new Channel(),
//       }
//       rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
//       Article.prototype.fetchWithRelated = sinon
//         .stub()
//         .yieldsTo("success", data)
//       rewire.__set__("Article", Article)
//       amp(req, res, next)
//       res.locals.jsonLD.should.containEql("Magazine")
//       res.locals.jsonLD.should.containEql("Top Ten Booths at miart 2014")
//       res.locals.jsonLD.should.containEql("Artsy Editorial")
//       res.locals.jsonLD.should.containEql(
//         '/images/full_logo.png","height":103,"width":300}}'
//       )
//       done()
//     })
//   })

//   describe("#subscribedToEditorial", () => {
//     it("resolves to false if there is no email", async () => {
//       const subscribed = await subscribedToEditorial("")
//       subscribed.should.equal(false)
//     })

//     it("resolves to true if a user is subscribed", async () => {
//       sailthruApiGet.yields(null, {
//         vars: {
//           receive_editorial_email: true,
//           email_frequency: "daily",
//         },
//       })
//       const subscribed = await subscribedToEditorial("foo@test.com")
//       subscribed.should.equal(true)
//     })

//     it("resolves to false if a user exists but is not subscribed with daily frequency", async () => {
//       sailthruApiGet.yields(null, {
//         vars: {
//           receive_editorial_email: true,
//           email_frequency: "weekly",
//         },
//       })
//       const subscribed = await subscribedToEditorial("foo@test.com")
//       subscribed.should.equal(false)
//     })

//     it("resolves to false if a user exists but is not subscribed", async () => {
//       sailthruApiGet.yields(null, { vars: {} })
//       const subscribed = await subscribedToEditorial("foo@test.com")
//       subscribed.should.equal(false)
//     })
//   })

//   describe("#editorialSignup", () => {
//     it("adds a user and sends a welcome email", () => {
//       req.body.email = "foo@goo.net"
//       editorialSignup(req, res, next)
//       sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
//       sailthruApiPost.args[0][2](null, { ok: true })
//       sailthruApiPost.args[1][1].event.should.equal("editorial_welcome")
//       sailthruApiPost.args[1][2](null, {})
//       res.send.args[0][0].email.should.equal("foo@goo.net")
//     })

//     it("sends an error if user could not be created", () => {
//       req.body.email = "foo@goo.net"
//       editorialSignup(req, res, next)
//       sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
//       sailthruApiPost.args[0][2]("error", { errormsg: "Error" })
//       res.status.args[0][0].should.equal(500)
//     })

//     it("sends an error if a welcome email cannot be sent", () => {
//       req.body.email = "foo@goo.net"
//       editorialSignup(req, res, next)
//       sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
//       sailthruApiPost.args[0][2](null, { ok: true })
//       sailthruApiPost.args[1][1].event.should.equal("editorial_welcome")
//       sailthruApiPost.args[1][2]("error", { errormsg: "Error" })
//       res.status.args[0][0].should.equal(500)
//     })
//   })
// })
