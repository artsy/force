/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const Article = require("../../../../models/article")
const fixtures = require("../../../../test/helpers/fixtures")

describe("Article template", function () {
  beforeEach(function () {
    this.filename = path.resolve(__dirname, "../../templates/articles.jade")

    this.article = new Article(
      _.extend(_.clone(fixtures.article), {
        slug: "ten-booths-miart-2014",
        thumbnail_image:
          "https://artsy-media-uploads.s3.amazonaws.com/9-vuUwfMbo9-dibbqjZQHQ%2FSterling_Ruby_2013_%282%29.jpg",
      })
    )
    return (this.props = {
      articles: [this.article],
      sd: { ARTSY_EDITORIAL_CHANNEL: "123" },
    })
  })

  it("renders a non-editorial article correctly", function () {
    this.page = jade.compile(fs.readFileSync(this.filename), {
      filename: this.filename,
    })(this.props)
    // FIXME: @page.should.containEql 'Top Ten Booths at miart 2014'
    this.page.should.containEql("/article/ten-booths-miart-2014")
    this.page.should.containEql(
      "https://artsy-media-uploads.s3.amazonaws.com/9-vuUwfMbo9-dibbqjZQHQ%2FSterling_Ruby_2013_%282%29.jpg"
    )
    this.page.should.containEql("Elena Soboleva")
    return this.page.should.not.containEql("has-contributing-author")
  })

  it("renders an editorial article correctly", function () {
    this.article.set("author", { id: "456", name: "Artsy Editorial" })
    this.page = jade.compile(fs.readFileSync(this.filename), {
      filename: this.filename,
    })(this.props)
    this.page.should.containEql("Artsy Editorial")
    return this.page.should.not.containEql("has-contributing-author")
  })

  it("renders a single contributing author", function () {
    this.article.set("contributing_authors", [
      { id: "523783258b3b815f7100055a", name: "Casey Lesser" },
    ])
    this.article.set("author", { id: "456", name: "Artsy Editorial" })
    this.page = jade.compile(fs.readFileSync(this.filename), {
      filename: this.filename,
    })(this.props)
    this.page.should.containEql("Artsy Editorial")
    this.page.should.containEql("Casey Lesser")
    return this.page.should.containEql('article-item-contributing-name">By')
  })

  it("renders two contributing authors", function () {
    this.article.set("contributing_authors", [
      { id: "523783258b3b815f7100055a", name: "Casey Lesser" },
      { id: "532783258b3b815f7100055b", name: "Molly Gottschalk" },
    ])
    this.article.set("author", { id: "456", name: "Artsy Editorial" })
    this.page = jade.compile(fs.readFileSync(this.filename), {
      filename: this.filename,
    })(this.props)
    this.page.should.containEql("Artsy Editorial")
    this.page.should.containEql('article-item-contributing-name">By')
    this.page.should.containEql("Casey Lesser&nbspand&nbsp")
    return this.page.should.containEql("Molly Gottschalk")
  })

  return it("renders multiple contributing authors", function () {
    this.article.set("contributing_authors", [
      { id: "523783258b3b815f7100055a", name: "Casey Lesser" },
      { id: "532783258b3b815f7100055b", name: "Molly Gottschalk" },
      { id: "532783258b3b815f7100055c", name: "Demie Kim" },
    ])
    this.article.set("author", { id: "456", name: "Artsy Editorial" })
    this.page = jade.compile(fs.readFileSync(this.filename), {
      filename: this.filename,
    })(this.props)
    this.page.should.containEql("Artsy Editorial")
    this.page.should.containEql('article-item-contributing-name">By')
    this.page.should.containEql("Casey Lesser,&nbsp")
    this.page.should.containEql("Molly Gottschalk&nbspand&nbsp")
    return this.page.should.containEql("Demie Kim")
  })
})
