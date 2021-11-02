/* eslint-disable jest/no-done-callback */
import { data as sd } from "sharify"
import { getCurrentUnixTimestamp } from "@artsy/reaction/dist/Components/Publishing/Constants"
import * as fixtures from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import * as routes from "../routes"
import { extend } from "lodash"
import { GalleryInsightsRedirects } from "../gallery_insights_redirects"
const Article = require("desktop/models/article")

jest.mock("desktop/lib/positronql", () => ({
  positronql: jest.fn(),
}))
jest.mock("desktop/lib/buildServerAppContext", () => ({
  buildServerAppContext: jest.fn(),
}))

jest.mock("lib/metaphysics2.coffee", () => jest.fn())

jest.mock("sharify", () => ({
  data: {
    ARTSY_EDITORIAL_CHANNEL: "123",
    GALLERY_INSIGHTS_CHANNEL: "987",
    APP_URL: "https://artsy.net",
    EOY_2018_ARTISTS: "5bf30690d8b9430baaf6c6de",
    PC_ARTSY_CHANNEL: "5759e508b5989e6f98f77999",
    PC_AUCTION_CHANNEL: "5759e4d7b5989e6f98f77997",
  },
}))

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))

const positronql = require("desktop/lib/positronql").positronql as jest.Mock
const buildServerAppContext = require("desktop/lib/buildServerAppContext")
  .buildServerAppContext as jest.Mock
const stitch = require("@artsy/stitch").stitch as jest.Mock
const metaphysics = require("lib/metaphysics2.coffee") as jest.Mock

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
    buildServerAppContext.mockReturnValue({ isEigen: false })
    Article.prototype.fetchWithRelated = jest.fn(options => {
      options.success({ article: new Article(article) })
    })
  })

  afterEach(() => {
    buildServerAppContext.mockClear()
    positronql.mockClear()
    stitch.mockClear()
    metaphysics.mockClear()
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
        const { data, locals } = stitch.mock.calls[0][0]
        expect(locals.assetPackage).toBe("article")
        expect(data.article.title).toBe("New York's Next Art District")
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

    it("redirects to specific partners.artsy.net content if slug exists in redirect mapping", done => {
      const slug = Object.keys(GalleryInsightsRedirects)[0]
      const redirectSlug = GalleryInsightsRedirects[slug]

      article.channel_id = "987"
      article.slug = slug
      positronql.mockReturnValue(Promise.resolve({ article }))

      routes.index(req, res, next).then(() => {
        expect(res.redirect).toBeCalledWith(
          `https://partners.artsy.net/${redirectSlug}`
        )
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
    it("renders a classic article", done => {
      routes.classic(req, res, next, fixtures.ClassicArticle).then(() => {
        const { data } = stitch.mock.calls[0][0]
        expect(data.article.title).toBe(
          "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple"
        )
        done()
      })
    })

    it("fetches partner for gallery promoted content", done => {
      article = Object.assign({}, fixtures.ClassicArticlePromotedContent, {
        channel_id: sd.PC_ARTSY_CHANNEL,
        partner_ids: ["123"],
        sale: null,
      })
      metaphysics.mockReturnValue(
        Promise.resolve({ partner: fixtures.ClassicArticlePartner })
      )

      routes.classic(req, res, next, article).then(() => {
        const { data } = stitch.mock.calls[0][0]
        expect(data.article.partner.name).toBe("Contessa Gallery")
        done()
      })
    })

    it("fetches sale for auction promoted content", done => {
      article = Object.assign({}, fixtures.ClassicArticlePromotedContent)
      delete article.sale
      metaphysics.mockReturnValue(
        Promise.resolve({ sale: fixtures.ClassicArticleSale })
      )

      routes.classic(req, res, next, article).then(() => {
        const { data } = stitch.mock.calls[0][0]
        expect(data.article.sale.name).toBe("ICI: Benefit Auction 2019")
        done()
      })
    })

    it("renders a ghosted article (no channel)", done => {
      article = Object.assign({}, fixtures.ClassicArticle)
      delete article.channel_id
      delete article.author
      delete article.partner_channel_id

      routes.classic(req, res, next, article).then(() => {
        const { data } = stitch.mock.calls[0][0]
        expect(data.article.title).toBe(
          "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple"
        )
        done()
      })
    })

    it("sets the correct jsonld", done => {
      routes.classic(req, res, next, fixtures.ClassicArticle).then(() => {
        const {
          data: { jsonLD },
        } = stitch.mock.calls[0][0]
        expect(jsonLD).toMatch("Gender Pay Gap for Artists Is Not So Simple")
        expect(jsonLD).toMatch("Partner")
        done()
      })
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
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("skips if it isnt featured", () => {
      article.featured = false
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("skips if it is series", () => {
      article.layout = "series"
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("skips if it is video", () => {
      article.layout = "video"
      routes.amp(req, res, next)
      expect(next).toBeCalled()
    })

    it("redirects to the main slug if an older slug is queried", () => {
      article.slug = "zoobar"
      routes.amp(req, res, next)
      expect(res.redirect).toBeCalledWith("/article/zoobar/amp")
    })

    it("preps article for AMP", () => {
      article.layout = "standard"
      article.sections = [
        {
          type: "text",
          body:
            '<a class="jump-link"></a><p>Preparing the article for AMP.</p>',
        },
        {
          type: "image_collection",
          images: [
            {
              type: "image",
              caption:
                '<p isrender=true style="background-color:black;">A caption is <i isrender=true>really</i> important</p>',
            },
          ],
        },
      ]
      routes.amp(req, res, next)
      expect(res.render.mock.calls[0][1].article.get("sections"))
        .toMatchInlineSnapshot(`
Array [
  Object {
    "body": "<p>Preparing the article for AMP.</p>",
    "type": "text",
  },
  Object {
    "images": Array [
      Object {
        "caption": "<p>A caption is <i>really</i> important</p>",
        "type": "image",
      },
    ],
    "type": "image_collection",
  },
]
`)
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
          const {
            blocks: { head },
          } = stitch.mock.calls[0][0]

          expect(head().props.article.thumbnail_title).toBe(
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
          const {
            blocks: { head },
          } = stitch.mock.calls[0][0]
          expect(head().props.article.thumbnail_title).toBe(
            "Vanguard 2019: Genesis Belanger"
          )
          done()
        })
      })
    })
  })
})
