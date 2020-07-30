/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const Page = require("../../../models/page")
const { fabricate } = require("@artsy/antigravity")

describe("Meta tags", function () {
  describe("press page", function () {
    before(function () {
      this.file = `${path.resolve(__dirname, "../")}/meta/press.jade`
      this.sd = {
        MOBILE_MEDIA_QUERY: "mobile-media-query",
        APP_URL: "http://localhost:5000",
      }
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd: this.sd,
        asset() {},
      }))
    })

    return it("includes canonical, twitter card and og tags", function () {
      this.html.should.containEql(
        '<meta property="twitter:card" content="summary'
      )
      this.html.should.containEql(
        '<link rel="canonical" href="http://localhost:5000/press'
      )
      this.html.should.containEql(
        '<meta property="og:url" content="http://localhost:5000/press'
      )
      return this.html.should.containEql(
        '<meta property="og:title" content="Press | Artsy'
      )
    })
  })

  describe("terms page", function () {
    before(function () {
      this.file = `${path.resolve(__dirname, "../")}/meta/terms.jade`
      this.sd = {
        MOBILE_MEDIA_QUERY: "mobile-media-query",
        APP_URL: "http://localhost:5000",
      }
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd: this.sd,
        asset() {},
      }))
    })

    return it("includes canonical, twitter card and og tags", function () {
      this.html.should.containEql(
        '<link rel="canonical" href="http://localhost:5000/terms'
      )
      this.html.should.containEql(
        '<meta property="og:url" content="http://localhost:5000/terms'
      )
      return this.html.should.containEql(
        '<meta property="og:title" content="Terms of Use | Artsy'
      )
    })
  })

  describe("privacy page", function () {
    before(function () {
      this.file = `${path.resolve(__dirname, "../")}/meta/privacy.jade`
      this.sd = {
        MOBILE_MEDIA_QUERY: "mobile-media-query",
        APP_URL: "http://localhost:5000",
      }
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd: this.sd,
        asset() {},
      }))
    })

    return it("includes canonical, twitter card and og tags", function () {
      this.html.should.containEql(
        '<meta property="twitter:card" content="summary'
      )
      this.html.should.containEql(
        '<link rel="canonical" href="http://localhost:5000/privacy'
      )
      this.html.should.containEql(
        '<meta property="og:url" content="http://localhost:5000/privacy'
      )
      return this.html.should.containEql(
        '<meta property="og:title" content="Privacy Policy | Artsy'
      )
    })
  })

  return describe("security page", function () {
    before(function () {
      this.file = `${path.resolve(__dirname, "../")}/meta/security.jade`
      this.sd = {
        MOBILE_MEDIA_QUERY: "mobile-media-query",
        APP_URL: "http://localhost:5000",
      }
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd: this.sd,
        asset() {},
      }))
    })

    return it("includes canonical, twitter card and og tags", function () {
      this.html.should.containEql(
        '<meta property="twitter:card" content="summary'
      )
      this.html.should.containEql(
        '<link rel="canonical" href="http://localhost:5000/security'
      )
      this.html.should.containEql(
        '<meta property="og:url" content="http://localhost:5000/security'
      )
      return this.html.should.containEql(
        '<meta property="og:title" content="Security | Artsy'
      )
    })
  })
})
