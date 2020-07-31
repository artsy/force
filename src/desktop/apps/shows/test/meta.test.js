/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require("fs")
const path = require("path")
const jade = require("jade")
const { fabricate } = require("@artsy/antigravity")

describe("Meta tags", function () {
  describe("index", function () {
    before(function () {
      this.sd = { APP_URL: "http://localhost:5000" }
      this.file = `${path.resolve(__dirname, "../")}/templates/meta.jade`
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd: this.sd,
        asset(u) {
          return u
        },
      }))
    })

    return it("includes canonical url, twitter card, og tags, title, description", function () {
      this.html.should.containEql(
        "<title>Art Gallery Shows and Museum Exhibitions | Artsy</title>"
      )
      this.html.should.containEql(
        '<meta property="og:title" content="Art Gallery Shows and Museum Exhibitions | Artsy"/>'
      )
      this.html.should.containEql(
        '<meta name="description" content="Explore Artsy\'s comprehensive listing of current gallery shows and museum exhibitions from around the world."/>'
      )
      this.html.should.containEql(
        '<meta property="og:description" content="Explore Artsy\'s comprehensive listing of current gallery shows and museum exhibitions from around the world."/>'
      )
      this.html.should.containEql(
        '<meta property="twitter:description" content="Explore Artsy\'s comprehensive listing of current gallery shows and museum exhibitions from around the world."/>'
      )
      this.html.should.containEql(
        '<link rel="canonical" href="http://localhost:5000/shows"/>'
      )
      this.html.should.containEql(
        '<meta property="og:url" content="http://localhost:5000/shows"/>'
      )
      this.html.should.containEql(
        '<meta property="og:image" content="/images/og_image.jpg"/>'
      )
      this.html.should.containEql(
        '<meta property="og:type" content="website"/>'
      )
      return this.html.should.containEql(
        '<meta property="twitter:card" content="summary"/>'
      )
    })
  })

  return describe("city", function () {
    before(function () {
      this.sd = { APP_URL: "http://localhost:5000" }
      this.file = `${path.resolve(__dirname, "../")}/templates/meta.jade`
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        asset(u) {
          return u
        },
        sd: this.sd,
        city: { name: "Cool Place" },
      }))
    })

    return it("includes canonical url, twitter card, og tags, title, description", function () {
      this.html.should.containEql(
        "<title>Cool Place Art Gallery Shows and Museum Exhibitions | Artsy</title>"
      )
      this.html.should.containEql(
        '<meta property="og:title" content="Cool Place Art Gallery Shows and Museum Exhibitions | Artsy"/>'
      )
      this.html.should.containEql(
        '<meta name="description" content="Explore shows in Cool Place on Artsy."/>'
      )
      this.html.should.containEql(
        '<meta property="og:description" content="Explore shows in Cool Place on Artsy."/>'
      )
      this.html.should.containEql(
        '<meta property="twitter:description" content="Explore shows in Cool Place on Artsy."/>'
      )
      this.html.should.containEql(
        '<link rel="canonical" href="http://localhost:5000/shows"/>'
      )
      this.html.should.containEql(
        '<meta property="og:url" content="http://localhost:5000/shows"/>'
      )
      this.html.should.containEql(
        '<meta property="og:image" content="/images/og_image.jpg"/>'
      )
      this.html.should.containEql(
        '<meta property="og:type" content="website"/>'
      )
      this.html.should.containEql(
        '<meta property="twitter:card" content="summary"/>'
      )
      return this.html.should.containEql('<meta name="fragment" content="!"/>')
    })
  })
})
