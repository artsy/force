import { data as sd } from "sharify"
import { getCurrentUnixTimestamp } from "@artsy/reaction/dist/Components/Publishing/Constants"
import * as fixtures from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import * as routes from "../routes"
import { extend } from "lodash"
const Article = require("desktop/models/article.coffee")
const Channel = require("desktop/models/channel.coffee")

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

    describe("SuperArticles", () => {
      it("fetches resources for a super article", done => {
        article.is_super_article = "true"
        article.super_article = {
          related_articles: ["456"],
        }
        const articles = [
          extend({}, article, {
            slug: "sub-article",
            is_super_sub_article: true,
          }),
        ]
        positronql
          .mockReturnValue(Promise.resolve({ article }))
          .mockReturnValueOnce({ article })
          .mockReturnValueOnce({ articles })

        routes.index(req, res, next).then(() => {
          const {
            data: { isSuper, superArticle, superSubArticles },
          } = stitch.mock.calls[0][0]
          expect(isSuper).toBeTruthy()
          expect(superArticle.get("slug")).toBe("foobar")
          expect(superSubArticles).toHaveLength(1)
          expect(superSubArticles.first().get("slug")).toBe("sub-article")
          done()
        })
      })

      it("fetches resources for super sub articles", done => {
        article.is_super_sub_article = true
        const articles = [
          extend({}, article, {
            slug: "sub-article",
            is_super_sub_article: true,
          }),
        ]
        positronql
          .mockReturnValue(Promise.resolve({ article }))
          .mockReturnValueOnce({
            article: extend(fixtures.SuperArticle, {
              channel_id: "123",
              slug: "foobar",
            }),
          })
          .mockReturnValueOnce({ articles })

        routes.index(req, res, next).then(() => {
          const {
            data: { isSuper, superArticle, superSubArticles },
          } = stitch.mock.calls[0][0]
          expect(isSuper).toBeTruthy()
          expect(superArticle.get("title")).toBe(
            "What’s the Path to Winning an Art Prize?"
          )
          expect(superSubArticles).toHaveLength(1)
          expect(superSubArticles.first().get("slug")).toBe("sub-article")
          done()
        })
      })
    })

    describe("ToolTips", () => {
      it("Shows tooltips if desktop UA", done => {
        routes.index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.showTooltips).toBeTruthy()
          done()
        })
      })

      it("Hides tooltips for mobile UA", done => {
        res.locals.sd.IS_MOBILE = true
        routes.index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.showTooltips).toBeFalsy()
          done()
        })
      })

      it("Hides tooltips for tablet UA", done => {
        res.locals.sd.IS_TABLET = true
        routes.index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].data.showTooltips).toBeFalsy()
          done()
        })
      })
    })

    describe("Custom editorial", () => {
      it("Adds custom editorial var and no-header class to stitch args", done => {
        article.id = "5bf30690d8b9430baaf6c6de"
        positronql.mockReturnValue(Promise.resolve({ article }))

        routes.index(req, res, next).then(() => {
          expect(stitch.mock.calls[0][0].locals.bodyClass).toMatch(
            "body-no-header"
          )
          expect(stitch.mock.calls[0][0].data.customEditorial).toMatch(
            "EOY_2018_ARTISTS"
          )
          done()
        })
      })
    })
  })

  describe("#classic", () => {
    let channel

    beforeEach(() => {
      channel = new Channel({ name: "Foo" })
      article = extend(fixtures.ClassicArticle, {
        slug: "foobar",
      })

      Article.prototype.fetchWithRelated.mockImplementation(options => {
        options.success({ article: new Article(article), channel })
      })
    })

    it("renders a classic article", () => {
      routes.classic(req, res, next)
      expect(res.render.mock.calls[0][1].article.get("slug")).toBe("foobar")
      expect(res.render.mock.calls[0][1].channel.get("name")).toBe("Foo")
    })

    it("renders a ghosted article (no channel)", () => {
      Article.prototype.fetchWithRelated.mockImplementationOnce(options => {
        options.success({ article: new Article(article) })
      })
      routes.classic(req, res, next)
      expect(res.render.mock.calls[0][1].article.get("slug")).toBe("foobar")
    })

    it("sets the correct jsonld", () => {
      routes.classic(req, res, next)
      expect(res.locals.jsonLD).toMatch(
        "Gender Pay Gap for Artists Is Not So Simple"
      )
      expect(res.locals.jsonLD).toMatch("Partner")
    })
  })

  describe("#amp", () => {
    beforeEach(() => {
      article = extend(fixtures.StandardArticle, {
        slug: "foobar",
        featured: true,
        published: true,
      })
      Article.prototype.fetchWithRelated = jest.fn(options => {
        options.success({ article: new Article(article) })
      })
    })

    it("renders amp page", () => {
      routes.amp(req, res, next)
      expect(res.render.mock.calls[0][0]).toBe("amp_article")
    })

    it("sets the correct jsonld", () => {
      routes.amp(req, res, next)
      expect(res.render.mock.calls[0][0]).toBe("amp_article")
      expect(res.locals.jsonLD).toBe(
        '{"@context":"http://schema.org","@type":"NewsArticle","headline":"New York\'s Next Art District","url":"https://artsy.net/article/foobar","thumbnailUrl":"https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg","datePublished":"2017-05-19T13:09:18.567Z","dateCreated":"2017-05-19T13:09:18.567Z","articleSection":"Other","creator":["Casey Lesser"],"mainEntityOfPage":"https://artsy.net/article/foobar","author":{"name":"Artsy Editorial"},"publisher":{"name":"Artsy","logo":{"url":"https://artsy.net/images/full_logo.png","height":103,"width":300}},"image":{"url":"https://i.embed.ly/1/display/crop?url=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F7lsxxsw0qPAuKl37jEYitw%252Farticle%2Basset%2B1-hig%2Bres%2Bcopy.jpg&width=800&height=600&quality=80","width":800,"height":600}}'
      )
    })

    it("skips if image/artwork sections exist (amp requires image dimensions)", () => {
      article = extend(article, {
        sections: [
          {
            type: "image",
          },
        ],
      })
      Article.prototype.fetchWithRelated.mockImplementationOnce(options => {
        options.success({ article: new Article(article) })
      })
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("skips if it isnt featured", () => {
      article.featured = false
      Article.prototype.fetchWithRelated.mockImplementationOnce(options => {
        options.success({ article: new Article(article) })
      })
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("skips if it is series", () => {
      article.layout = "series"
      Article.prototype.fetchWithRelated.mockImplementationOnce(options => {
        options.success({ article: new Article(article) })
      })
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("skips if it is video", () => {
      article.layout = "video"
      Article.prototype.fetchWithRelated.mockImplementationOnce(options => {
        options.success({ article: new Article(article) })
      })
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("redirects to the main slug if an older slug is queried", () => {
      article.slug = "zoobar"
      Article.prototype.fetchWithRelated.mockImplementationOnce(options => {
        options.success({ article: new Article(article) })
      })
      routes.amp(req, res, next)
      expect(res.redirect).toBeCalledWith("/article/zoobar/amp")
    })
  })

  describe("#redirectPost", () => {
    it("redirects /post to /article", () => {
      req.url = "/post/foobar"
      routes.redirectPost(req, res, next)
      expect(res.redirect).toBeCalledWith(301, "/article/foobar")
    })
  })

  describe("#redirectAMP", () => {
    it("redirects to /series if amp", () => {
      req.url = "/series/artsy-vanguard-2019/amp"
      routes.redirectAMP(req, res, next)
      expect(res.redirect).toBeCalledWith(301, "/series/artsy-vanguard-2019")
    })

    it("redirects to /series if amp with a Vanguard subarticle slug", () => {
      req.url = "/series/artsy-vanguard-2019/victoria-sin/amp"
      routes.redirectAMP(req, res, next)
      expect(res.redirect).toBeCalledWith(
        301,
        "/series/artsy-vanguard-2019/victoria-sin"
      )
    })

    it("redirects to /video if amp", () => {
      req.url = "/video/artsy-editors-future-art-carrie-mae-weems/amp"
      routes.redirectAMP(req, res, next)
      expect(res.redirect).toBeCalledWith(
        301,
        "/video/artsy-editors-future-art-carrie-mae-weems"
      )
    })
  })

  describe("Vanguard 2019", () => {
    it("redirects to /series if shorthand slug", () => {
      req.params = {}
      req.path = "/artsy-vanguard-2019"
      routes.index(req, res, next)
      expect(res.redirect).toBeCalledWith("/series/artsy-vanguard-2019")
    })

    it("preserves params when redirects to /series", () => {
      req.params = { slug: "emerging" }
      req.path = "/artsy-vanguard-2019"
      routes.index(req, res, next)
      expect(res.redirect).toBeCalledWith(
        "/series/artsy-vanguard-2019/emerging"
      )
    })

    it("always fetches master vanguard article if vanguard slug", () => {
      req.params = { slug: "emerging" }
      req.path = "/series/artsy-vanguard-2019/emerging"
      routes.index(req, res, next)

      expect(positronql.mock.calls[0][0].query).toMatch(
        "5d2f8bd0cdc74b00208b7e16"
      )
    })

    it("redirects sub-series to master article", done => {
      const subSeries = {
        ...article,
        seriesArticle: {
          id: "5d2f8bd0cdc74b00208b7e16",
        },
        title: "Newly Emerging",
      }
      positronql.mockReturnValue(Promise.resolve({ article: subSeries }))

      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith(
          "/series/artsy-vanguard-2019/newly-emerging"
        )
        done()
      })
    })

    it("redirects artist articles to master article", done => {
      const artistArticle = {
        ...article,
        seriesArticle: {
          id: "5d3defd1373e39001ff00644",
        },
        title: "Genesis Belanger",
      }
      positronql.mockReturnValue(Promise.resolve({ article: artistArticle }))

      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith(
          "/series/artsy-vanguard-2019/genesis-belanger"
        )
        done()
      })
    })

    describe("Custom meta content", () => {
      it("sets up custom meta for sub-series", done => {
        const vanguardArticle = {
          ...article,

          id: "5d2f8bd0cdc74b00208b7e16",
          relatedArticles: [
            {
              title: "Emerging",
              thumbnail_title: "The Emerging Artists to Know",
              relatedArticles: [
                {
                  title: "Genesis Belanger",
                  thumbnail_title: "Vanguard 2019: Genesis Belanger",
                },
              ],
            },
          ],
        }

        positronql.mockReturnValue(
          Promise.resolve({ article: vanguardArticle })
        )

        req.params = { slug: "emerging" }
        req.path = "/series/artsy-vanguard-2019/emerging"
        routes.index(req, res, next).then(() => {
          expect(res.locals.customMetaContent.thumbnail_title).toBe(
            "The Emerging Artists to Know"
          )
          done()
        })
      })

      it("sets up custom meta for artist stub", done => {
        const vanguardArticle = {
          ...article,

          id: "5d2f8bd0cdc74b00208b7e16",
          relatedArticles: [
            {
              title: "Emerging",
              thumbnail_title: "The Emerging Artists to Know",
              relatedArticles: [
                {
                  title: "Genesis Belanger",
                  thumbnail_title: "Vanguard 2019: Genesis Belanger",
                },
              ],
            },
          ],
        }

        positronql.mockReturnValue(
          Promise.resolve({ article: vanguardArticle })
        )

        req.params = { slug: "genesis-belanger" }
        req.path = "/series/artsy-vanguard-2019/genesis-belanger"
        routes.index(req, res, next).then(() => {
          expect(res.locals.customMetaContent.thumbnail_title).toBe(
            "Vanguard 2019: Genesis Belanger"
          )
          done()
        })
      })
    })
  })
})
