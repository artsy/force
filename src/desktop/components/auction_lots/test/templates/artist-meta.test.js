/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const Artist = require("../../../../models/artist")
const { fabricate } = require("@artsy/antigravity")

describe("Meta tags", function () {
  before(function () {
    this.file = `${path.resolve(
      __dirname,
      "../../"
    )}/templates/meta/artist.jade`
    return (this.sd = {
      APP_URL: "http://localhost:5000",
      API_URL: "http://localhost:5000",
      MOBILE_MEDIA_QUERY: "mobile-media-query",
    })
  })

  describe("basic artist with name and short blurb", function () {
    beforeEach(function () {
      this.artist = new Artist(fabricate("artist"))
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        artist: this.artist,
        sd: this.sd,
        asset() {},
      }))
    })

    return it("includes canonical, twitter card and og tags", function () {
      this.html.should.containEql(
        '<meta property="twitter:card" content="summary'
      )
      this.html.should.containEql(
        '<link rel="canonical" href="http://localhost:5000/artist/pablo-picasso'
      )
      this.html.should.containEql(
        '<meta property="og:url" content="http://localhost:5000/artist/pablo-picasso'
      )
      this.html.should.containEql(
        '<meta property="og:description" content="See details of Pablo Picasso auction results from recent, past, and upcoming sales. Let Artsy be your price guide to Pablo Picasso.'
      )
      return this.html.should.containEql(
        '<meta property="og:title" content="Auction Results for Pablo Picasso on Artsy'
      )
    })
  })

  return describe("with an image", function () {
    beforeEach(function () {
      this.artist = new Artist(fabricate("artist"))
      this.artist.set({ image_versions: ["large"] })
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        artist: this.artist,
        sd: this.sd,
        asset() {},
      }))
    })

    return it("includes og:image and twitter card", function () {
      this.html.should.containEql(
        '<meta property="og:image" content="http://localhost:5000/artist/pablo-picasso'
      )
      return this.html.should.containEql(
        '<meta property="twitter:card" content="summary_large_image'
      )
    })
  })
})
