/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const fs = require("fs")
const partnerUpdatesTemplate = require("jade").compileFile(
  require.resolve("../templates/partner_updates.jade")
)
const articleTemplate = require("jade").compileFile(
  require.resolve("../templates/partner_updates_article.jade")
)
const sd = { APP_URL: "http://localhost" }
const { fabricate } = require("@artsy/antigravity")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const moment = require("moment")
const { toSentence } = require("underscore.string")
const { resize } = require("../../../components/resizer")

describe("/rss", function () {
  describe("partner_updates", function () {
    it("renders metadata", function () {
      const rendered = partnerUpdatesTemplate({ sd, articles: new Articles() })
      rendered.should.containEql("<title>Gallery Partner Updates</title>")
      rendered.should.containEql(
        '<atom:link href="http://localhost/rss/partner-updates" rel="self" type="application/rss+xml">'
      )
      return rendered.should.containEql(
        "<description>Artsy articles featured for Gallery Partner Updates.</description>"
      )
    })

    it("renders articles", function () {
      const articles = new Articles([
        new Article({
          thumbnail_title: "Hello",
          published_at: new Date().toISOString(),
          contributing_authors: [],
        }),
        new Article({
          thumbnail_title: "World",
          published_at: new Date().toISOString(),
          contributing_authors: [],
        }),
      ])
      const rendered = partnerUpdatesTemplate({ sd, articles, moment })
      rendered.should.containEql("<title>Gallery Partner Updates</title>")
      rendered.should.containEql(
        '<atom:link href="http://localhost/rss/partner-updates" rel="self" type="application/rss+xml">'
      )
      rendered.should.containEql(
        "<description>Artsy articles featured for Gallery Partner Updates.</description>"
      )
      rendered.should.containEql("<item><title>Hello</title>")
      return rendered.should.containEql("<item><title>World</title>")
    })

    it("renders contributing authors", function () {
      const articles = new Articles([
        new Article({
          thumbnail_title: "Hello",
          published_at: new Date().toISOString(),
          contributing_authors: [
            { name: "James" },
            { name: "Artsy Editorial" },
          ],
        }),
        new Article({
          thumbnail_title: "World",
          published_at: new Date().toISOString(),
          contributing_authors: [
            { name: "James" },
            { name: "Artsy Editorial" },
            { name: "Alice" },
          ],
        }),
      ])
      const rendered = partnerUpdatesTemplate({ sd, articles, moment })
      rendered.should.containEql("James&nbsp;and&nbsp;Artsy Editorial")
      return rendered.should.containEql(
        "James,&nbsp;Artsy Editorial&nbsp;and&nbsp;Alice"
      )
    })

    return it("renders artsy partner updates when there is no contributing author", function () {
      const articles = new Articles([
        new Article({
          thumbnail_title: "Hello",
          published_at: new Date().toISOString(),
          contributing_authors: [],
          author: { name: "Artsy Partner Updates" },
        }),
      ])
      const rendered = partnerUpdatesTemplate({ sd, articles, moment })
      return rendered.should.containEql(
        "<author>Artsy Partner Updates</author>"
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
        "<p>Andy Foobar never wanted fame.</p><p>But sometimes fame chooses you.</p>"
      )
    })

    return it("renders images, artworks, and image_collection", function () {
      const article = new Article({
        lead_paragraph: "Andy Foobar never wanted fame.",
        sections: [
          {
            type: "image",
            url: "http://artsy.net/image1.jpg",
            caption: "<p>The first caption</p>",
          },
          {
            type: "artworks",
            layout: "overflow_fillwidth",
            artworks: [
              {
                type: "artwork",
                id: "5321b73dc9dc2458c4000196",
                slug: "govinda-sah-azad-in-between-1",
                date: "2015",
                title: "In Between as an Artwork",
                image:
                  "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
                partner: {
                  name: "Gagosian Gallery",
                  slug: "gagosian-gallery",
                },
                artists: [
                  {
                    name: "Andy Warhol",
                    slug: "andy-warhol",
                  },
                ],
              },
            ],
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
        "In Between as an Artwork, 2015. <br/>Andy Warhol<br/>Gagosian Gallery"
      )
    })
  })
})
