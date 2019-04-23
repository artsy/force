import * as _ from "underscore"
import { index, subscribedToEditorial } from "../routes"
import { sharify } from "sharify"
// import { sinon } from "sinon"
const Article = require("desktop/models/article.coffee")
const Channel = require("desktop/models/channel.coffee")
// const fixtures = require("desktop/test/helpers/fixtures.coffee")
import * as fixtures from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import { getCurrentUnixTimestamp } from "reaction/Components/Publishing/Constants"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))

const mockStitch = require("@artsy/stitch").stitch

jest.mock("desktop/lib/positronql", () => ({
  positronql: jest.fn(),
}))

const mockPositronql = require("desktop/lib/positronql").positronql

jest.mock("sharify", () => ({
  data: {
    ARTSY_EDITORIAL_CHANNEL: "123",
    APP_URL: "https://artsy.net",
    EOY_2018_ARTISTS: "5bf30690d8b9430baaf6c6de",
  },
}))

jest.mock("sailthru-client", () => ({
  // createSailthruClient: jest.fn(),
  // sailthru: {
  //   apiGet: jest.fn(),
  //   apiPost: jest.fn(),
  // },
  createSailthruClient: jest.fn().mockReturnValue({
    apiGet: jest.fn().mockReturnValue({
      vars: {
        receive_editorial_email: true,
        email_frequency: "daily",
      },
    }),
    apiPost: jest.fn(),
  }),
}))
const mockSailthru = require("sailthru-client")

// const newArticle = new Article(
//   _.extend({}, fixtures.article, {
//     slug: "foobar",
//     channel_id: "456",
//   })
// )
// const newChannel = new Channel()
// const fetchWithRelatedData = {
//   article: newArticle,
//   channel: newChannel,
// }

// jest.mock("desktop/models/article.coffee", () => ({
//   Article: {
//     fetchWithRelated: jest.fn().mockResolvedValue(Promise.resolve({})),
//   },
// }))

describe("Article Routes", () => {
  let req
  let res
  let next
  let sailthruApiPost
  let sailthruApiGet
  let rewires = []
  // let mockPositronql

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
        sd: {},
      },
      render: jest.fn(),
      send: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    }
    next = jest.fn()

    sailthruApiPost = jest.fn()
    sailthruApiGet = jest.fn()

    // rewires.push(
    //   rewire.__set__("sd", {
    //     ARTSY_EDITORIAL_CHANNEL: "123",
    //     APP_URL: "https://artsy.net",
    //     EOY_2018_ARTISTS: "5bf30690d8b9430baaf6c6de",
    //   }),
    //   rewire.__set__("sailthru", {
    //     apiPost: sailthruApiPost,
    //     apiGet: sailthruApiGet,
    //   })
    // )
    // stitch.mockReset()
  })

  afterEach(() => {
    // rewires.forEach(reset => reset())
    // jest.restoreAllMocks()
    mockPositronql.mockClear()
  })

  describe("#index", () => {
    it("renders the index with the correct data", done => {
      const time = getCurrentUnixTimestamp()
      const data = {
        article: _.extend({}, fixtures.StandardArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "standard",
        }),
      }

      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())

      index(req, res, next).then(async () => {
        console.log("title:", mockStitch)
        console.log("args 1", args.mock.calls)
        const args = await mockStitch.mock.calls
        console.log("args 2", args.mock.calls)
        expect(mockStitch.mock.calls[0][0].data.article.title).toBe(
          "Top Ten Booths"
        )

        const timeDifference =
          time - mockStitch.mock.calls[0][0].data.renderTime
        expect(timeDifference).toBeLessThan(100)
        expect(mockStitch.mock.calls[0][0].locals.assetPackage).toBe("article")
        done()
      })
    })

    xit("sets the correct jsonld", done => {
      const data = {
        article: _.extend({}, fixtures.StandardArticle, {
          slug: "foobar",
          channel_id: "123",
        }),
      }

      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      index(req, res, next).then(() => {
        mockStitch.mock.calls[0][0].data.jsonLD.should.containEql(
          "Top Ten Booths at miart 2014"
        )
        mockStitch.mock.calls[0][0].data.jsonLD.should.containEql(
          "Fair Coverage"
        )
        done()
      })
    })

    xit("nexts if media is unpublished", done => {
      const data = {
        article: _.extend({}, fixtures.VideoArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "video",
          media: {
            published: false,
          },
        }),
      }

      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      index(req, res, next).then(() => {
        expect(next.mock.calls.length).toBe(1)
        done()
      })
    })

    xit("redirects to the main slug if an older slug is queried", done => {
      const data = {
        article: _.extend({}, fixtures.StandardArticle, {
          slug: "zoobar",
          channel_id: "123",
        }),
      }

      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      index(req, res, next).then(() => {
        expect(res.redirect.mock.calls[0][0]).toBe("/article/zoobar")
        done()
      })
    })

    xit("redirects to the layout if it is not a regular article", done => {
      const data = {
        article: _.extend({}, fixtures.SeriesArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "series",
        }),
      }

      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      index(req, res, next).then(() => {
        expect(res.redirect.mock.calls[0][0]).toBe("/series/foobar")
        done()
      })
    })

    xit("does not strip search params from redirects", done => {
      const data = {
        article: _.extend({}, fixtures.NewsArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "news",
        }),
      }
      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      req.url =
        "/article/artsy-editorial-museums-embrace-activists?utm_medium=email&utm_source=13533678-newsletter-editorial-daily-06-11-18&utm_campaign=editorial&utm_content=st-V"
      index(req, res, next).then(() => {
        expect(res.redirect.mock.calls[0][0]).toBe(
          "/news/foobar?utm_medium=email&utm_source=13533678-newsletter-editorial-daily-06-11-18&utm_campaign=editorial&utm_content=st-V"
        )
        done()
      })
    })

    xit("redirects to a nested series if it is one", done => {
      const data = {
        article: _.extend({}, fixtures.VideoArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "video",
          seriesArticle: {
            slug: "future-of-art",
          },
        }),
      }
      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      req.path = "/video/foobar"
      index(req, res, next).then(() => {
        expect(res.redirect.mock.calls[0][0]).toBe(
          "/series/future-of-art/foobar"
        )
        done()
      })
    })

    // xit("renders classic mode if article is not editorial", done => {
    //   const data = {
    //     article: new Article(
    //       _.extend({}, fixtures.article, {
    //         slug: "foobar",
    //         channel_id: "456",
    //       })
    //     ),
    //     channel: new Channel(),
    //   }
    //   // rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
    //   mockPositronql.mockReturnValue(Promise.resolve(data))
    //   mockStitch.mockReturnValue(Promise.resolve())
    //   Article.prototype.fetchWithRelated = sinon
    //     .stub()
    //     .yieldsTo("success", data)
    //   // Article.prototype.fetchWithRelated = jest
    //   //   .fn()
    //   //   .mockResolvedValue(Promise.resolve(data))
    //   // rewire.__set__("Article", Article)
    //   index(req, res, next).then(() => {
    //     res.render.args[0][0].should.equal("article")
    //     // expect(res.render.mock.calls[0][0]).should.equal("article")
    //     done()
    //   })
    // })

    xit("fetches resources for a super article", async done => {
      const article = {
        article: _.extend({}, fixtures.SuperArticle, {
          slug: "foobar",
          channel_id: "123",
          is_super_article: true,
        }),
      }
      const superSubArticles = {
        articles: [
          _.extend({}, fixtures.StandardArticle, {
            slug: "sub-article",
            channel_id: "123",
            is_super_sub_article: true,
          }),
        ],
      }

      mockPositronql
        .mockReturnValue(Promise.resolve(article))
        .mockReturnValueOnce(Promise.resolve(article))
        .mockReturnValueOnce(Promise.resolve(superSubArticles))

      await mockStitch.mockReturnValue(Promise.resolve())

      index(req, res, next).then(() => {
        expect(mockStitch.mock.calls[0][0].data.isSuper).toBe(true)
        expect(mockStitch.mock.calls[0][0].data.superArticle.get("slug")).toBe(
          "foobar"
        )
        expect(
          mockStitch.mock.calls[0][0].data.superSubArticles.length
        ).toEqual(1)
        expect(
          mockStitch.mock.calls[0][0].data.superSubArticles.first().get("slug")
        ).toBe("sub-article")
        done()
      })
    })

    xit("fetches resources for super sub articles", done => {
      const article = {
        article: _.extend({}, fixtures.StandardArticle, {
          slug: "foobar",
          channel_id: "123",
          is_super_sub_article: true,
        }),
      }
      const superArticle = {
        articles: [
          _.extend({}, fixtures.SuperArticle, {
            slug: "foobar",
            channel_id: "123",
            is_super_article: true,
            title: "Super Article Title",
          }),
        ],
      }
      const superSubArticles = {
        articles: [
          _.extend({}, fixtures.StandardArticle, {
            slug: "sub-article",
            channel_id: "123",
            is_super_sub_article: true,
          }),
        ],
      }
      mockPositronql
        .mockReturnValue(Promise.resolve(article))
        .mockReturnValueOnce(Promise.resolve(article))
        .mockReturnValueOnce(Promise.resolve(superArticle))
        .mockReturnValueOnce(Promise.resolve(superSubArticles))

      mockStitch.mockReturnValue(Promise.resolve())
      index(req, res, next).then(() => {
        expect(mockStitch.mock.calls[0][0].data.isSuper).toBe(true)
        expect(
          mockStitch.mock.calls[0][0].data.superSubArticles.length
        ).toEqual(1)
        expect(
          mockStitch.mock.calls[0][0].data.superSubArticles.first().get("slug")
        ).toEqual("sub-article")
        expect(
          mockStitch.mock.calls[0][0].data.superArticle.get("title")
        ).toEqual("Super Article Title")
        done()
      })
    })

    xit("sets the main template for standard and feature layouts", done => {
      const data = {
        article: _.extend({}, fixtures.StandardArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "standard",
        }),
      }
      mockPositronql.mockReturnValueOnce(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      index(req, res, next).then(() => {
        expect(mockStitch.mock.calls[0][0].layout).toContain("react_index")
        done()
      })
    })

    xit("sets the blank template for video layout", done => {
      const data = {
        article: _.extend({}, fixtures.VideoArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "video",
        }),
      }

      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      req.path = "/video/foobar"
      index(req, res, next).then(() => {
        expect(mockStitch.mock.calls[0][0].layout).toContain(
          "react_blank_index"
        )
        done()
      })
    })

    xit("sets the blank template for series layout", done => {
      const data = {
        article: _.extend({}, fixtures.SeriesArticle, {
          slug: "foobar",
          channel_id: "123",
          layout: "series",
        }),
      }
      mockPositronql.mockReturnValue(Promise.resolve(data))
      mockStitch.mockReturnValue(Promise.resolve())
      req.path = "/series/foobar"
      index(req, res, next).then(() => {
        expect(mockStitch.mock.calls[0][0].layout).toContain(
          "react_blank_index"
        )
        done()
      })
    })

    describe("ToolTips", () => {
      let data
      // let stitch

      beforeEach(() => {
        res.locals.sd.CURRENT_USER = { type: "Admin" }
        data = {
          article: _.extend({}, fixtures.StandardArticle, {
            slug: "foobar",
            channel_id: "123",
            layout: "standard",
          }),
        }
        mockPositronql.mockReturnValue(Promise.resolve(data))
        mockStitch.mockReturnValue(Promise.resolve())
      })

      xit("Shows tooltips if desktop UA", done => {
        index(req, res, next).then(() => {
          expect(mockStitch.mock.calls[0][0].data.showTooltips).toBe(true)
          done()
        })
      })

      xit("Hides tooltips for mobile UA", done => {
        res.locals.sd.IS_MOBILE = true

        index(req, res, next).then(() => {
          expect(mockStitch.mock.calls[0][0].data.showTooltips).toBe(false)
          done()
        })
      })

      xit("Hides tooltips for tablet UA", done => {
        res.locals.sd.IS_TABLET = true

        index(req, res, next).then(() => {
          expect(mockStitch.mock.calls[0][0].data.showTooltips).toBe(false)
          done()
        })
      })
    })

    describe("Collections rail", () => {
      // TODO: update after CollectionsRail a/b test
      let data
      // let stitch

      beforeEach(() => {
        res.locals.sd.CURRENT_USER = { type: "Admin" }
        req.user = {
          isAdmin: jest.fn().mockReturnValue(true),
        }
        data = {
          article: _.extend({}, fixtures.StandardArticle, {
            slug: "foobar",
            channel_id: "123",
            layout: "standard",
          }),
        }
        mockPositronql.mockReturnValue(Promise.resolve(data))
        mockStitch.mockReturnValue(Promise.resolve())
      })

      xit("Sets showCollectionsRail when EDITORIAL_COLLECTIONS_RAIL is true", done => {
        res.locals.sd.EDITORIAL_COLLECTIONS_RAIL = "1"
        index(req, res, next).then(() => {
          expect(mockStitch.mock.calls[0][0].data.showCollectionsRail).toEqual(
            true
          )
          done()
        })
      })

      xit("cast EDITORIAL_COLLECTIONS_RAIL to a string", done => {
        res.locals.sd.EDITORIAL_COLLECTIONS_RAIL = 1
        index(req, res, next).then(() => {
          expect(mockStitch.mock.calls[0][0].data.showCollectionsRail).toEqual(
            true
          )
          done()
        })
      })

      xit("Sets showCollectionsRail when EDITORIAL_COLLECTIONS_RAIL is false", done => {
        res.locals.sd.EDITORIAL_COLLECTIONS_RAIL = "0"
        index(req, res, next).then(() => {
          expect(mockStitch.mock.calls[0][0].data.showCollectionsRail).toEqual(
            false
          )
          done()
        })
      })
    })

    describe("Custom editorial", () => {
      xit("Adds custom editorial var and no-header class to stitch args", done => {
        const data = {
          article: _.extend({}, fixtures.FeatureArticle, {
            slug: "foobar",
            channel_id: "123",
            layout: "feature",
            id: "5bf30690d8b9430baaf6c6de",
          }),
        }
        mockPositronql.mockReturnValue(Promise.resolve(data))
        mockStitch.mockReturnValue(Promise.resolve())
        req.path = "/article/foobar"
        index(req, res, next).then(() => {
          expect(mockStitch.mock.calls[0][0].locals.bodyClass).toContain(
            "body-no-header"
          )
          expect(mockStitch.mock.calls[0][0].data.customEditorial).toContain(
            "EOY_2018_ARTISTS"
          )
          done()
        })
      })
    })
  })

  // describe("#classic", () => {
  //   it("renders a classic article", () => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "foobar",
  //           channel_id: "456",
  //           sections: [],
  //           featured: true,
  //           published: true,
  //         })
  //       ),
  //       channel: new Channel({
  //         name: "Foo",
  //       }),
  //     }
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     classic(req, res, next)
  //     res.render.args[0][1].article.get("slug").should.equal("foobar")
  //     res.render.args[0][1].channel.get("name").should.equal("Foo")
  //   })

  //   it("renders a ghosted article", () => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "foobar",
  //           sections: [],
  //           featured: true,
  //           published: true,
  //         })
  //       ),
  //     }
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     classic(req, res, next)
  //     res.render.args[0][1].article.get("slug").should.equal("foobar")
  //   })

  //   it("sets the correct jsonld", () => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "foobar",
  //           sections: [],
  //           featured: true,
  //           published: true,
  //           channel_id: "456",
  //         })
  //       ),
  //     }
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     classic(req, res, next)
  //     res.locals.jsonLD.should.containEql("Top Ten Booths at miart 2014")
  //     res.locals.jsonLD.should.containEql("Fair Coverage")
  //   })
  // })

  // describe("#amp", () => {
  //   it("renders amp page", done => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "foobar",
  //           channel_id: "456",
  //           sections: [],
  //           featured: true,
  //           published: true,
  //           layout: "standard",
  //         })
  //       ),
  //       channel: new Channel(),
  //     }
  //     rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     rewire.__set__("Article", Article)
  //     amp(req, res, next)
  //     res.render.args[0][0].should.equal("amp_article")
  //     done()
  //   })

  //   it("skips if image/artwork sections exist (amp requires image dimensions)", done => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "foobar",
  //           channel_id: "456",
  //           sections: [
  //             {
  //               type: "image",
  //             },
  //           ],
  //         })
  //       ),
  //       channel: new Channel(),
  //     }
  //     rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     rewire.__set__("Article", Article)
  //     amp(req, res, next)
  //     next.callCount.should.equal(1)
  //     done()
  //   })

  //   it("skips if it isnt featured", done => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "foobar",
  //           channel_id: "456",
  //           featured: false,
  //           sections: [],
  //         })
  //       ),
  //       channel: new Channel(),
  //     }
  //     rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     rewire.__set__("Article", Article)
  //     amp(req, res, next)
  //     next.callCount.should.equal(1)
  //     done()
  //   })

  //   it("redirects to the main slug if an older slug is queried", done => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "zoobar",
  //           channel_id: "456",
  //           featured: true,
  //           sections: [],
  //         })
  //       ),
  //       channel: new Channel(),
  //     }
  //     rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     rewire.__set__("Article", Article)
  //     amp(req, res, next)
  //     res.redirect.args[0][0].should.equal("/article/zoobar/amp")
  //     done()
  //   })

  //   it("sets the correct jsonld", done => {
  //     const data = {
  //       article: new Article(
  //         _.extend({}, fixtures.article, {
  //           slug: "foobar",
  //           channel_id: "456",
  //           sections: [],
  //           featured: true,
  //           published: true,
  //           layout: "standard",
  //         })
  //       ),
  //       channel: new Channel(),
  //     }
  //     rewire.__set__("positronql", sinon.stub().returns(Promise.resolve(data)))
  //     Article.prototype.fetchWithRelated = sinon
  //       .stub()
  //       .yieldsTo("success", data)
  //     rewire.__set__("Article", Article)
  //     amp(req, res, next)
  //     res.locals.jsonLD.should.containEql("Magazine")
  //     res.locals.jsonLD.should.containEql("Top Ten Booths at miart 2014")
  //     res.locals.jsonLD.should.containEql("Artsy Editorial")
  //     res.locals.jsonLD.should.containEql(
  //       '/images/full_logo.png","height":103,"width":300}}'
  //     )
  //     done()
  //   })
  // })

  // describe("#subscribedToEditorial", () => {
  //   it("resolves to false if there is no email", async () => {
  //     const subscribed = await subscribedToEditorial("")
  //     subscribed.should.equal(false)
  //   })

  //   it.only("resolves to true if a user is subscribed", async () => {
  //     console.log("mockSailthru:", mockSailthru.createSailthruClient)

  //     // {
  //     //   vars: {
  //     //     receive_editorial_email: true,
  //     //     email_frequency: "daily",
  //     //   },
  //     // }

  //     // const subscribed = await subscribedToEditorial("foo@test.com")
  //     // console.log("subscribed:", subscribed)

  //     // expect(subscribedToEditorial("foo@test.com")).resolves.toEqual(true)
  //   })

  //   it("resolves to false if a user exists but is not subscribed with daily frequency", async () => {
  //     sailthruApiGet.yields(null, {
  //       vars: {
  //         receive_editorial_email: true,
  //         email_frequency: "weekly",
  //       },
  //     })
  //     const subscribed = await subscribedToEditorial("foo@test.com")
  //     subscribed.should.equal(false)
  //   })

  //   it("resolves to false if a user exists but is not subscribed", async () => {
  //     sailthruApiGet.yields(null, { vars: {} })
  //     const subscribed = await subscribedToEditorial("foo@test.com")
  //     subscribed.should.equal(false)
  //   })
  // })

  // describe("#editorialSignup", () => {
  //   it("adds a user and sends a welcome email", () => {
  //     req.body.email = "foo@goo.net"
  //     editorialSignup(req, res, next)
  //     sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
  //     sailthruApiPost.args[0][2](null, { ok: true })
  //     sailthruApiPost.args[1][1].event.should.equal("editorial_welcome")
  //     sailthruApiPost.args[1][2](null, {})
  //     res.send.args[0][0].email.should.equal("foo@goo.net")
  //   })

  //   it("sends an error if user could not be created", () => {
  //     req.body.email = "foo@goo.net"
  //     editorialSignup(req, res, next)
  //     sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
  //     sailthruApiPost.args[0][2]("error", { errormsg: "Error" })
  //     res.status.args[0][0].should.equal(500)
  //   })

  //   it("sends an error if a welcome email cannot be sent", () => {
  //     req.body.email = "foo@goo.net"
  //     editorialSignup(req, res, next)
  //     sailthruApiPost.args[0][1].id.should.equal("foo@goo.net")
  //     sailthruApiPost.args[0][2](null, { ok: true })
  //     sailthruApiPost.args[1][1].event.should.equal("editorial_welcome")
  //     sailthruApiPost.args[1][2]("error", { errormsg: "Error" })
  //     res.status.args[0][0].should.equal(500)
  //   })
  // })
})
