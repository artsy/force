/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const _s = require("underscore.string")
const cheerio = require("cheerio")
const embed = require("particle")
const path = require("path")
const jade = require("jade")
const fs = require("fs")
const moment = require("moment")
const markdown = require("../../../components/util/markdown")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const fixtures = require("../../../test/helpers/fixtures.coffee")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("article show template", function () {
  it("renders sectionless articles", function () {
    const html = render("index")({
      article: new Article({
        title: "hi",
        sections: [],
        section_ids: [],
        contributing_authors: [],
      }),
      footerArticles: new Articles(),
      crop(url) {
        return url
      },
      resize(u) {
        return u
      },
      moment,
      sd: {},
      asset() {},
    })
    return html.should.containEql("hi")
  })

  it("renders hero section with static image", function () {
    const html = render("index")({
      article: new Article({
        title: "hi",
        sections: [],
        contributing_authors: [],
        hero_section: {
          type: "image",
          url: "http://image.jpg",
        },
      }),
      footerArticles: new Articles(),
      crop(url) {
        return url
      },
      resize(u) {
        return u
      },
      moment,
      sd: {},
      asset() {},
      _s,
    })
    html.should.containEql('<img src="http://image.jpg"')
    return html.should.containEql('class="article-large-format-image"')
  })

  it("renders hero section with multiple images", function () {
    const html = render("index")({
      article: new Article({
        title: "hi",
        sections: [],
        contributing_authors: [],
        hero_section: {
          type: "image_collection",
          images: [
            {
              type: "image",
              url: "http://image1.jpg",
            },
            {
              type: "image",
              url: "http://image2.jpg",
            },
          ],
        },
      }),
      footerArticles: new Articles(),
      crop(url) {
        return url
      },
      resize(u) {
        return u
      },
      moment,
      sd: {},
      asset() {},
      _s,
    })
    html.should.containEql('<img src="http://image1.jpg"')
    html.should.containEql('<img src="http://image2.jpg"')
    return html.should.containEql('class="article-large-format-image"')
  })

  it("renders hero section with video", function () {
    const html = render("index")({
      article: new Article({
        title: "hi",
        sections: [],
        contributing_authors: [],
        hero_section: {
          type: "video",
          url: "https://www.youtube.com/watch?v=Bv_5Zv5c-Ts",
        },
      }),
      footerArticles: new Articles(),
      crop(url) {
        return url
      },
      resize(u) {
        return u
      },
      moment,
      sd: {},
      asset() {},
      embed,
    })
    html.should.containEql('<iframe src="//www.youtube.com/embed/Bv_5Zv5c-Ts')
    return html.should.containEql(
      'class="article-large-format-video-container"'
    )
  })

  it("can optionally exclude share buttons", function () {
    const html = render("index")({
      article: new Article({
        title: "hi",
        sections: [
          {
            type: "text",
            body: "<p>Bob Olsen</p>",
          },
        ],
        contributing_authors: [],
      }),
      footerArticles: new Articles(),
      hideShare: true,
      crop(url) {
        return url
      },
      resize(u) {
        return u
      },
      moment,
      sd: {},
      asset() {},
    })

    return html.should.not.containEql("share")
  })

  return it("renders image collections", function () {
    const html = render("index")({
      article: new Article({
        title: "hi",
        sections: [
          {
            type: "image_collection",
            layout: "overflow_fillwidth",
            images: [
              {
                type: "artwork",
                id: "5321b73dc9dc2458c4000196",
                slug: "govinda-sah-azad-in-between-1",
                date: "2015",
                title: "In Between",
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
                ],
              },
              {
                type: "image",
                url: "http://artsy.net/image.jpg",
                caption: "<p>Some cool art from 2015</p>",
              },
            ],
          },
        ],
        contributing_authors: [],
      }),
      footerArticles: new Articles(),
      crop(url) {
        return url
      },
      resize(u) {
        return u
      },
      moment,
      sd: {},
      asset() {},
      _s,
    })
    html.should.containEql("/artwork/govinda-sah-azad-in-between-1")
    html.should.containEql("http://artsy.net/image.jpg")
    html.should.containEql("/october-gallery")
    html.should.containEql("Govinda Sah 'Azad'")
    html.should.containEql("Andy Warhol")
    return html.should.containEql("<p>Some cool art from 2015</p>")
  })
})
