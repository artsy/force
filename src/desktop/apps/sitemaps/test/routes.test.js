const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const routes = rewire("../routes")
const moment = require("moment")

describe("Sitemaps", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = {}
    return (this.res = {
      render: sinon.stub(),
      set: sinon.stub(),
      send: sinon.stub(),
    })
  })

  afterEach(() => Backbone.sync.restore())

  describe("#robots", function () {
    beforeEach(function () {
      return (this.res = { set: sinon.stub(), send: sinon.stub() })
    })

    afterEach(() => routes.__set__("ENABLE_WEB_CRAWLING", false))

    it("renders a noindex when ENABLE_WEB_CRAWLING is false", function () {
      routes.__set__("ENABLE_WEB_CRAWLING", false)
      routes.robots(null, this.res)
      return this.res.send.args[0][0].should.equal("User-agent: *\nDisallow: /")
    })

    return describe("when ENABLE_WEB_CRAWLING is true", function () {
      beforeEach(function () {
        routes.__set__({
          ENABLE_WEB_CRAWLING: true,
          APP_URL: "https://www.artsy.net",
        })
        return routes.robots(null, this.res)
      })
      it("renders robots.txt", function () {
        return this.res.send.args[0][0].should.eql(`\
User-agent: *
Noindex: ?sort=
Noindex: ?dimension_range=
Disallow: /*?dns_source=
Disallow: /*?microsite=
Disallow: /*?from-show-guide=
Disallow: /search
Sitemap: https://www.artsy.net/sitemap-articles.xml
Sitemap: https://www.artsy.net/sitemap-artists.xml
Sitemap: https://www.artsy.net/sitemap-artist-images.xml
Sitemap: https://www.artsy.net/sitemap-artist-series.xml
Sitemap: https://www.artsy.net/sitemap-artworks.xml
Sitemap: https://www.artsy.net/sitemap-auctions.xml
Sitemap: https://www.artsy.net/sitemap-cities.xml
Sitemap: https://www.artsy.net/sitemap-collect.xml
Sitemap: https://www.artsy.net/sitemap-fairs.xml
Sitemap: https://www.artsy.net/sitemap-features.xml
Sitemap: https://www.artsy.net/sitemap-genes.xml
Sitemap: https://www.artsy.net/sitemap-images.xml
Sitemap: https://www.artsy.net/sitemap-misc.xml
Sitemap: https://www.artsy.net/sitemap-partners.xml
Sitemap: https://www.artsy.net/sitemap-shows.xml
Sitemap: https://www.artsy.net/sitemap-tags.xml
Sitemap: https://www.artsy.net/sitemap-videos.xml
\
`)
      })

      return it("includes a CR/LF at the end of robots.txt", function () {
        return this.res.send.args[0][0].slice(-1).should.eql("\n")
      })
    })
  })

  describe("cinder sitemaps", () =>
    it("proxies sitemaps to s3", function () {
      this.req = { headers: {} }
      const proxy = { web: sinon.stub() }
      routes.__set__("sitemapProxy", proxy)
      routes.__set__(
        "SITEMAP_BASE_URL",
        "http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com"
      )
      this.proxy = routes.__get__("sitemapProxy")
      routes.sitemaps(this.req, this.res)
      return this.proxy.web.args[0][0].headers["host"].should.equal(
        "artsy-sitemaps.s3-website-us-east-1.amazonaws.com"
      )
    }))

  return describe("#misc", () =>
    it("renders the misc template", function () {
      routes.misc(this.req, this.res)
      return this.res.render.args[0][0].should.equal("misc")
    }))
})
