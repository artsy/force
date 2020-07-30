/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const path = require("path")
const jade = require("jade")
const fs = require("fs")
const moment = require("moment")
const Curation = require("../../../../../models/curation.coffee")
const Article = require("../../../../../models/article.coffee")

const render = function (templateName) {
  const filename = path.resolve(
    __dirname,
    `../../../components/venice_2017/templates/${templateName}.jade`
  )
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Venice index", () =>
  it("uses social metadata", function () {
    const curation = new Curation({
      sections: [
        {
          social_description: "Social Description",
          social_title: "Social Title",
          social_image: "files.artsy.net/img/social_image.jpg",
          seo_description: "Seo Description",
        },
      ],
      sub_articles: [],
    })
    const html = render("index")({
      videoIndex: 0,
      curation,
      isSubscribed: false,
      sub_articles: [],
      videoGuide: new Article(),
      crop(url) {
        return url
      },
      resize(url) {
        return url
      },
      moment,
      sd: {},
      markdown() {},
      asset() {},
    })
    html.should.containEql(
      '<meta property="og:image" content="files.artsy.net/img/social_image.jpg">'
    )
    html.should.containEql('<meta property="og:title" content="Social Title">')
    html.should.containEql(
      '<meta property="og:description" content="Social Description">'
    )
    return html.should.containEql(
      '<meta name="description" content="Seo Description">'
    )
  }))

describe("Venice video_completed", () =>
  it("passes section url to social mixin", function () {
    const html = render("video_completed")({
      section: {
        social_title: "Social Title",
        slug: "ep-1",
      },
      sd: { APP_URL: "http://localhost:5000" },
    })
    html.should.containEql(
      "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A5000%2Fvenice-biennale%2Fep-1"
    )
    return html.should.containEql("Social Title")
  }))

describe("Venice video_description", () =>
  it("passes section url to social mixin", function () {
    const html = render("video_description")({
      section: {
        social_title: "Social Title",
        slug: "ep-1",
        published: true,
      },
      sd: { APP_URL: "http://localhost:5000" },
      markdown() {},
    })
    html.should.containEql(
      "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A5000%2Fvenice-biennale%2Fep-1"
    )
    return html.should.containEql("Social Title")
  }))
