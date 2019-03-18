import * as fixtures from "desktop/test/helpers/fixtures.coffee"
import * as _ from "underscore"
import sinon from "sinon"
import Article from "desktop/models/article.coffee"
import Channel from "desktop/models/channel.coffee"
import { getCurrentUnixTimestamp } from "reaction/Components/Publishing/Constants"

const rewire = require("rewire")("../routes")
const {
  amp,
  classic,
  editorialSignup,
  index,
  isCustomEditorial,
  subscribedToEditorial,
} = rewire

describe("Article Routes", () => {
  let req
  let res
  let next
  let sailthruApiPost
  let sailthruApiGet
  let rewires = []

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: "foobar" },
      path: "/article/foobar",
      url: "",
    }
    res = {
      app: { get: sinon.stub().returns("components") },
      locals: { sd: {} },
      render: sinon.stub(),
      send: sinon.stub(),
      redirect: sinon.stub(),
      status: sinon.stub().returns({ send: sinon.stub() }),
    }
    next = sinon.stub()
    sailthruApiPost = sinon.stub()
    sailthruApiGet = sinon.stub()

    rewires.push(
      rewire.__set__("sd", {
        ARTSY_EDITORIAL_CHANNEL: "123",
        APP_URL: "https://artsy.net",
        EOY_2018_ARTISTS: "5bf30690d8b9430baaf6c6de",
      }),
      rewire.__set__("sailthru", {
        apiPost: sailthruApiPost,
        apiGet: sailthruApiGet,
      })
    )
  })

  afterEach(() => {
    rewires.forEach(reset => reset())
  })

  describe("#index", () => {
    it("renders the index with the correct data", done => {
      const time = getCurrentUnixTimestamp()
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "standard",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      const stitch = sinon.stub()
      rewire.__set__("stitch", stitch)
      index(req, res, next).then(() => {
        stitch.args[0][0].data.article.title.should.equal("Top Ten Booths")

        const timeDifference = time - stitch.args[0][0].data.renderTime
        timeDifference.should.be.below(100)
        stitch.args[0][0].locals.assetPackage.should.equal("article")
        done()
      })
    })

    it("sets the correct jsonld", done => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      const stitch = sinon.stub()
      rewire.__set__("stitch", stitch)
      index(req, res, next).then(() => {
        stitch.args[0][0].data.jsonLD.should.containEql(
          "Top Ten Booths at miart 2014"
        )
        stitch.args[0][0].data.jsonLD.should.containEql("Fair Coverage")
        done()
      })
    })

    it("nexts if media is unpublished", done => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "video",
          media: {
            published: false,
          },
        }),
      }

      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      index(req, res, next).then(() => {
        next.callCount.should.equal(1)
        done()
      })
    })

    it("redirects to the main slug if an older slug is queried", done => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "zoobar",
          channel_id: "123",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      index(req, res, next).then(() => {
        res.redirect.args[0][0].should.equal("/article/zoobar")
        done()
      })
    })

    it("redirects to the layout if it is not a regular article", () => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "series",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      index(req, res, next).then(() => {
        res.redirect.args[0][0].should.equal("/series/foobar")
      })
    })

    it("does not strip search params from redirects", () => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "news",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      req.url =
        "/article/artsy-editorial-museums-embrace-activists?utm_medium=email&utm_source=13533678-newsletter-editorial-daily-06-11-18&utm_campaign=editorial&utm_content=st-V"
      index(req, res, next).then(() => {
        res.redirect.args[0][0].should.equal(
          "/news/foobar?utm_medium=email&utm_source=13533678-newsletter-editorial-daily-06-11-18&utm_campaign=editorial&utm_content=st-V"
        )
      })
    })

    it("redirects to a nested series if it is one", () => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "video",
          seriesArticle: {
            slug: "future-of-art",
          },
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      req.path = "/video/foobar"
      index(req, res, next).then(() => {
        res.redirect.args[0][0].should.equal("/series/future-of-art/foobar")
      })
    })

    it("renders classic mode if article is not editorial", done => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "456",
          })
        ),
        channel: new Channel(),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      rewire.__set__("Article", Article)
      index(req, res, next).then(() => {
        res.render.args[0][0].should.equal("article")
        done()
      })
    })

    it("fetches resources for a super article", () => {
      const article = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          is_super_article: true,
        }),
      }
      const superSubArticles = {
        articles: [
          _.extend({}, fixtures.article, {
            slug: "sub-article",
            channel_id: "123",
            is_super_sub_article: true,
          }),
        ],
      }
      const positronql = sinon.stub()
      positronql
        .onCall(0)
        .returns(Promise.resolve(article))
        .onCall(1)
        .returns(Promise.resolve(superSubArticles))
      rewire.__set__("positronql", positronql)
      const stitch = sinon.stub()
      rewire.__set__("stitch", stitch)
      index(req, res, next).then(() => {
        stitch.args[0][0].data.isSuper.should.be.true()
        stitch.args[0][0].data.superArticle.get("slug").should.equal("foobar")
        stitch.args[0][0].data.superSubArticles.length.should.equal(1)
        stitch.args[0][0].data.superSubArticles
          .first()
          .get("slug")
          .should.equal("sub-article")
      })
    })

    it("fetches resources for super sub articles", () => {
      const article = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          is_super_sub_article: true,
        }),
      }
      const superArticle = {
        articles: [
          _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "123",
            is_super_article: true,
            title: "Super Article Title",
          }),
        ],
      }
      const superSubArticles = {
        articles: [
          _.extend({}, fixtures.article, {
            slug: "sub-article",
            channel_id: "123",
            is_super_sub_article: true,
          }),
        ],
      }
      const positronql = sinon.stub()
      positronql
        .onCall(0)
        .returns(Promise.resolve(article))
        .onCall(1)
        .returns(Promise.resolve(superArticle))
        .onCall(2)
        .returns(Promise.resolve(superSubArticles))
      rewire.__set__("positronql", positronql)
      const stitch = sinon.stub()
      rewire.__set__("stitch", stitch)
      index(req, res, next).then(() => {
        stitch.args[0][0].data.isSuper.should.be.true()
        stitch.args[0][0].data.superSubArticles.length.should.equal(1)
        stitch.args[0][0].data.superSubArticles
          .first()
          .get("slug")
          .should.equal("sub-article")
        stitch.args[0][0].data.superArticle
          .get("title")
          .should.equal("Super Article Title")
      })
    })

    it("sets the main template for standard and feature layouts", done => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "standard",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      const stitch = sinon.stub()
      rewire.__set__("stitch", stitch)
      index(req, res, next).then(() => {
        stitch.args[0][0].layout.should.containEql("react_index")
        done()
      })
    })

    it("sets the blank template for video layout", done => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "video",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      const stitch = sinon.stub()
      rewire.__set__("stitch", stitch)
      req.path = "/video/foobar"
      index(req, res, next).then(() => {
        stitch.args[0][0].layout.should.containEql("react_blank_index")
        done()
      })
    })

    it("sets the blank template for series layout", done => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: "foobar",
          channel_id: "123",
          layout: "series",
        }),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      const stitch = sinon.stub()
      rewire.__set__("stitch", stitch)
      req.path = "/series/foobar"
      index(req, res, next).then(() => {
        stitch.args[0][0].layout.should.containEql("react_blank_index")
        done()
      })
    })

    describe("ToolTips", () => {
      let data
      let stitch

      beforeEach(() => {
        res.locals.sd.CURRENT_USER = { type: "Admin" }
        data = {
          article: _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "123",
            layout: "standard",
          }),
        }
        rewire.__set__(
          "positronql",
          sinon.stub().returns(Promise.resolve(data))
        )
        stitch = sinon.stub()
        rewire.__set__("stitch", stitch)
        rewire.__set__(
          "subscribedToEditorial",
          sinon.stub().returns(Promise.resolve(true))
        )
      })

      it("Shows tooltips if desktop UA", done => {
        index(req, res, next).then(() => {
          stitch.args[0][0].data.showTooltips.should.equal(true)
          done()
        })
      })

      it("Hides tooltips for mobile UA", done => {
        res.locals.sd.IS_MOBILE = true

        index(req, res, next).then(() => {
          stitch.args[0][0].data.showTooltips.should.equal(false)
          done()
        })
      })

      it("Hides tooltips for tablet UA", done => {
        res.locals.sd.IS_TABLET = true

        index(req, res, next).then(() => {
          stitch.args[0][0].data.showTooltips.should.equal(false)
          done()
        })
      })
    })

    describe("Collections rail", () => {
      // TODO: update after CollectionsRail a/b test
      let data
      let stitch

      beforeEach(() => {
        res.locals.sd.CURRENT_USER = { type: "Admin" }
        req.user = {
          isAdmin: sinon.stub().returns(true),
        }
        data = {
          article: _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "123",
            layout: "standard",
          }),
        }
        rewire.__set__(
          "positronql",
          sinon.stub().returns(Promise.resolve(data))
        )
        stitch = sinon.stub()
        rewire.__set__("stitch", stitch)
        rewire.__set__(
          "subscribedToEditorial",
          sinon.stub().returns(Promise.resolve(true))
        )
      })

      it("Sets showCollectionsRail when EDITORIAL_COLLECTION_RAIL is experiment", done => {
        res.locals.sd.EDITORIAL_COLLECTION_RAIL = "experiment"
        index(req, res, next).then(() => {
          stitch.args[0][0].data.showCollectionsRail.should.equal(true)
          done()
        })
      })

      it("Sets showCollectionsRail when EDITORIAL_COLLECTION_RAIL is not experiment", done => {
        res.locals.sd.EDITORIAL_COLLECTION_RAIL = "control"
        index(req, res, next).then(() => {
          stitch.args[0][0].data.showCollectionsRail.should.equal(false)
          done()
        })
      })
    })

    describe("Custom editorial", () => {
      it("Adds custom editorial var and no-header class to stitch args", done => {
        const data = {
          article: _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "123",
            layout: "feature",
            id: "5bf30690d8b9430baaf6c6de",
          }),
        }
        rewire.__set__(
          "positronql",
          sinon.stub().returns(Promise.resolve(data))
        )
        const stitch = sinon.stub()
        rewire.__set__("stitch", stitch)
        req.path = "/article/foobar"
        index(req, res, next).then(() => {
          stitch.args[0][0].locals.bodyClass.should.containEql("body-no-header")
          stitch.args[0][0].data.customEditorial.should.containEql(
            "EOY_2018_ARTISTS"
          )
          done()
        })
      })
    })
  })

  describe("#classic", () => {
    it("renders a classic article", () => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "456",
            sections: [],
            featured: true,
            published: true,
          })
        ),
        channel: new Channel({
          name: "Foo",
        }),
      }
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      classic(req, res, next)
      res.render.args[0][1].article.get("slug").should.equal("foobar")
      res.render.args[0][1].channel.get("name").should.equal("Foo")
    })

    it("renders a ghosted article", () => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            sections: [],
            featured: true,
            published: true,
          })
        ),
      }
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      classic(req, res, next)
      res.render.args[0][1].article.get("slug").should.equal("foobar")
    })

    it("sets the correct jsonld", () => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            sections: [],
            featured: true,
            published: true,
            channel_id: "456",
          })
        ),
      }
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      classic(req, res, next)
      res.locals.jsonLD.should.containEql("Top Ten Booths at miart 2014")
      res.locals.jsonLD.should.containEql("Fair Coverage")
    })
  })

  describe("#amp", () => {
    it("renders amp page", done => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "456",
            sections: [],
            featured: true,
            published: true,
            layout: "standard",
          })
        ),
        channel: new Channel(),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      rewire.__set__("Article", Article)
      amp(req, res, next)
      res.render.args[0][0].should.equal("amp_article")
      done()
    })

    it("skips if image/artwork sections exist (amp requires image dimensions)", done => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "456",
            sections: [
              {
                type: "image",
              },
            ],
          })
        ),
        channel: new Channel(),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      rewire.__set__("Article", Article)
      amp(req, res, next)
      next.callCount.should.equal(1)
      done()
    })

    it("skips if it isnt featured", done => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "456",
            featured: false,
            sections: [],
          })
        ),
        channel: new Channel(),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      rewire.__set__("Article", Article)
      amp(req, res, next)
      next.callCount.should.equal(1)
      done()
    })

    it("redirects to the main slug if an older slug is queried", done => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "zoobar",
            channel_id: "456",
            featured: true,
            sections: [],
          })
        ),
        channel: new Channel(),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      rewire.__set__("Article", Article)
      amp(req, res, next)
      res.redirect.args[0][0].should.equal("/article/zoobar/amp")
      done()
    })

    it("sets the correct jsonld", done => {
      const data = {
        article: new Article(
          _.extend({}, fixtures.article, {
            slug: "foobar",
            channel_id: "456",
            sections: [],
            featured: true,
            published: true,
            layout: "standard",
          })
        ),
        channel: new Channel(),
      }
      rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
      Article.prototype.fetchWithRelated = sinon
        .stub()
        .yieldsTo("success", data)
      rewire.__set__("Article", Article)
      amp(req, res, next)
      res.locals.jsonLD.should.containEql("Magazine")
      res.locals.jsonLD.should.containEql("Top Ten Booths at miart 2014")
      res.locals.jsonLD.should.containEql("Artsy Editorial")
      res.locals.jsonLD.should.containEql(
        '/images/full_logo.png","height":103,"width":300}}'
      )
      done()
    })
  })

  describe("#subscribedToEditorial", () => {
    it("resolves to false if there is no email", async () => {
      const subscribed = await subscribedToEditorial("")
      subscribed.should.equal(false)
    })

    it("resolves to true if a user is subscribed", async () => {
      sailthruApiGet.yields(null, {
        vars: {
          receive_editorial_email: true,
          email_frequency: "daily",
        },
      })
      const subscribed = await subscribedToEditorial("foo@test.com")
      subscribed.should.equal(true)
    })

    it("resolves to false if a user exists but is not subscribed with daily frequency", async () => {
      sailthruApiGet.yields(null, {
        vars: {
          receive_editorial_email: true,
          email_frequency: "weekly",
        },
      })
      const subscribed = await subscribedToEditorial("foo@test.com")
      subscribed.should.equal(false)
    })

    it("resolves to false if a user exists but is not subscribed", async () => {
      sailthruApiGet.yields(null, { vars: {} })
      const subscribed = await subscribedToEditorial("foo@test.com")
      subscribed.should.equal(false)
    })
  })

  describe("#editorialSignup", () => {
    it("adds a user and sends a welcome email", () => {
      req.body.email = "foo@goo.net"
      editorialSignup(req, res, next)
      sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
      sailthruApiPost.args[0][2](null, { ok: true })
      sailthruApiPost.args[1][1].event.should.equal("editorial_welcome")
      sailthruApiPost.args[1][2](null, {})
      res.send.args[0][0].email.should.equal("foo@goo.net")
    })

    it("sends an error if user could not be created", () => {
      req.body.email = "foo@goo.net"
      editorialSignup(req, res, next)
      sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
      sailthruApiPost.args[0][2]("error", { errormsg: "Error" })
      res.status.args[0][0].should.equal(500)
    })

    it("sends an error if a welcome email cannot be sent", () => {
      req.body.email = "foo@goo.net"
      editorialSignup(req, res, next)
      sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
      sailthruApiPost.args[0][2](null, { ok: true })
      sailthruApiPost.args[1][1].event.should.equal("editorial_welcome")
      sailthruApiPost.args[1][2]("error", { errormsg: "Error" })
      res.status.args[0][0].should.equal(500)
    })
  })
})
