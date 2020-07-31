/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const fs = require("fs")
const newsTemplate = require("jade").compileFile(
  require.resolve("../templates/news.jade")
)
const articleTemplate = require("jade").compileFile(
  require.resolve("../templates/article.jade")
)
const sd = { APP_URL: "http://localhost" }
const { fabricate } = require("@artsy/antigravity")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const moment = require("moment")
const { toSentence } = require("underscore.string")
const { resize } = require("../../../components/resizer")

describe("/rss", function () {
  describe("news", function () {
    it("renders no news", function () {
      const rendered = newsTemplate({ sd, articles: new Articles() })
      rendered.should.containEql("<title>Artsy News</title>")
      rendered.should.containEql(
        '<atom:link href="http://localhost/rss/news" rel="self" type="application/rss+xml">'
      )
      return rendered.should.containEql(
        "<description>Featured Artsy articles.</description>"
      )
    })

    it("renders articles", function () {
      const articles = new Articles([
        new Article({
          thumbnail_title: "Hello",
          published_at: new Date().toISOString(),
          contributing_authors: [],
          description: "A piece about the Whitney.",
        }),
        new Article({
          thumbnail_title: "World",
          published_at: new Date().toISOString(),
          contributing_authors: [],
        }),
      ])
      const rendered = newsTemplate({ sd, articles, moment })
      rendered.should.containEql("<title>Artsy News</title>")
      rendered.should.containEql(
        '<atom:link href="http://localhost/rss/news" rel="self" type="application/rss+xml">'
      )
      rendered.should.containEql(
        "<description>Featured Artsy articles.</description>"
      )
      rendered.should.containEql("<item><title>Hello</title>")
      rendered.should.containEql("<item><title>World</title>")
      return rendered.should.containEql(
        "<description>A piece about the Whitney.</description>"
      )
    })

    it("renders authors", function () {
      const article = new Article({
        authors: [
          {
            name: "Jun",
            id: "123",
          },
          {
            name: "Owen",
            id: "456",
          },
        ],
      })
      const rendered = newsTemplate({
        sd,
        articles: new Articles(article),
        moment,
      })
      return rendered.should.containEql("<author>Jun and Owen</author>")
    })

    it("renders categories", function () {
      const article = new Article({
        vertical: {
          name: "Art",
          id: "123",
        },
      })
      const rendered = newsTemplate({
        sd,
        articles: new Articles(article),
        moment,
      })
      return rendered.should.containEql("<category>Art</category>")
    })

    it("renders enclosures on video articles", function () {
      const article = new Article({
        layout: "video",
        media: {
          url: "https://artsymedia.mp4",
          credits: "<p>Director</p><p>Marina Cashdan</p>",
          description: "<p>Sample Description</p>",
        },
      })
      const rendered = newsTemplate({
        sd,
        articles: new Articles(article),
        moment,
      })
      return rendered.should.containEql(
        '<enclosure url="https://artsymedia.mp4" length="0" type="video/mp4">'
      )
    })

    it("renders enclosures on news articles", function () {
      const articles = [
        {
          layout: "news",
          thumbnail_image: "artsy.net/jpg.jpg",
        },
      ]
      const rendered = newsTemplate({
        sd,
        articles: new Articles(articles),
        moment,
      })
      return rendered.should.containEql("/images/og_image.jpg")
    })

    return it("renders enclosures on non-video articles", function () {
      const articles = [
        {
          layout: "standard",
          thumbnail_image: "artsy.net/jpg.jpg",
        },
        {
          layout: "standard",
          thumbnail_image: "artsy.net/jpeg.jpeg",
        },
        {
          layout: "standard",
          thumbnail_image: "artsy.net/png.png",
        },
      ]
      const rendered = newsTemplate({
        sd,
        articles: new Articles(articles),
        moment,
      })
      rendered.should.containEql(
        '<enclosure url="artsy.net/jpg.jpg" length="0" type="image/jpeg">'
      )
      rendered.should.containEql(
        '<enclosure url="artsy.net/jpeg.jpeg" length="0" type="image/jpeg">'
      )
      return rendered.should.containEql(
        '<enclosure url="artsy.net/png.png" length="0" type="image/png">'
      )
    })
  })

  return describe("article", function () {
    it("renders the lead paragraph and body text", function () {
      const article = new Article({
        lead_paragraph: "Andy Foobar never wanted fame.",
        sections: [
          {
            type: "text",
            body: "But sometimes fame chooses you.",
          },
        ],
        contributing_authors: [],
      })
      const rendered = articleTemplate({ sd, article })
      return rendered.should.containEql(
        "Andy Foobar never wanted fame.But sometimes fame chooses you."
      )
    })

    it("renders news source", function () {
      const article = new Article({
        lead_paragraph: "Andy Foobar never wanted fame.",
        sections: [
          {
            type: "text",
            body: "But sometimes fame chooses you.",
          },
        ],
        contributing_authors: [],
        source: {
          title: "New York Times",
          url: "http://artsy.net",
        },
      })
      const rendered = articleTemplate({ sd, article })
      return rendered.should.containEql(
        '<p>via <a href="http://artsy.net">New York Times</a>'
      )
    })

    it("renders images, artworks, social_embed and image_collection", function () {
      const article = new Article({
        lead_paragraph: "Andy Foobar never wanted fame.",
        sections: [
          {
            type: "image",
            url: "http://artsy.net/image1.jpg",
            caption: "<p>The first caption</p>",
          },
          {
            type: "image_collection",
            layout: "overflow_fillwidth",
            images: [
              {
                type: "artwork",
                id: "5321b73dc9dc2458c4000196",
                slug: "govinda-sah-azad-in-between-1",
                date: "2015",
                title: "In Between as Image Collection",
                image:
                  "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
                partner: {
                  name: "October Gallery",
                  slug: "october-gallery",
                },
                artists: [
                  {
                    name: "Govinda Sah 'Azad'",
                    slug: "govinda-sah-azad",
                  },
                  {
                    name: "Andy Warhol",
                    slug: "andy-warhol",
                  },
                  {
                    name: "Joe Fun",
                    slug: "joe-fun",
                  },
                ],
              },
              {
                type: "image",
                url: "http://artsy.net/image2.jpg",
                caption: "<p>The second caption</p>",
              },
            ],
          },
          {
            type: "social_embed",
            url: "https://twitter.com/artsy/status/978997552061272064",
          },
        ],
        contributing_authors: [],
      })
      const rendered = articleTemplate({ sd, article, resize, _, toSentence })
      rendered.should.containEql(
        "In Between as Image Collection, 2015. <br/>Govinda Sah 'Azad', Andy Warhol and Joe Fun<br/>October Gallery"
      )
      rendered.should.containEql("<p>The first caption</p>")
      rendered.should.containEql("<p>The second caption</p>")
      return rendered.should.containEql(
        "https://twitter.com/artsy/status/978997552061272064"
      )
    })

    return it("renders media", function () {
      const article = new Article({
        media: {
          url: "https://artsymedia.mp4",
          credits: "<p>Director</p><p>Marina Cashdan</p>",
          description: "<p>Sample Description</p>",
        },
      })
      const rendered = articleTemplate({
        sd,
        article,
        resize,
        _,
        toSentence,
      })
      rendered.should.containEql('src="https://artsymedia.mp4"')
      rendered.should.containEql("<p>Director</p><p>Marina Cashdan</p>")
      return rendered.should.containEql("<p>Sample Description</p>")
    })
  })
})
