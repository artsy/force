import * as _ from "underscore"
import path from "path"
import pug from "pug"
import fs from "fs"
import Article from "desktop/models/article.coffee"
import { StandardArticle } from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"

const render = templateName => {
  const filename = path.resolve(__dirname, `../${templateName}.pug`)
  return pug.compile(fs.readFileSync(filename), {
    filename,
  })
}

describe("Meta template", () => {
  it("contains basic meta tags", () => {
    const article = _.extend({}, StandardArticle, {
      slug: "artsy-editorial-slug",
      indexable: true,
      description: "Artsy Editorial is an editorial channel.",
      social_description: "Artsy Editorial is socially friendly.",
      social_image: "http://kitten-social.com",
    })
    const html = render("meta")({
      article,
      crop: url => url,
      sd: {
        APP_URL: "https://artsy.net",
        CURRENT_PATH: "/article/artsy-editorial-slug",
      },
    })
    expect(html).toMatch("<title>New York's Next Art District - Artsy</title>")
    expect(html).toMatch(
      '<link rel="canonical" href="https://artsy.net/article/artsy-editorial-slug"/>'
    )
    expect(html).toMatch(
      '<meta name="description" content="Artsy Editorial is an editorial channel."/>'
    )
    expect(html).toMatch(
      '<meta property="og:description" content="Artsy Editorial is socially friendly."/>'
    )
    expect(html).toMatch(
      '<meta property="og:image" content="http://kitten-social.com"/>'
    )
    expect(html).not.toMatch('<meta name="robots" content="noindex"/>')
  })

  it("uses a different title extension for news", () => {
    const article = _.extend({}, StandardArticle, {
      slug: "artsy-editorial-slug",
      description: "Artsy Editorial is an editorial channel.",
      social_description: "Artsy Editorial is socially friendly.",
      social_image: "http://kitten-social.com",
      layout: "news",
    })
    const html = render("meta")({
      article,
      crop: url => url,
      sd: {
        APP_URL: "https://artsy.net",
        CURRENT_PATH: "/news/artsy-editorial-slug",
      },
    })

    expect(html).toMatch(
      "<title>New York's Next Art District - Artsy News</title>"
    )
    expect(html).toMatch(
      '<link rel="canonical" href="https://artsy.net/news/artsy-editorial-slug"/>'
    )
  })
})

describe("Classic meta template", () => {
  it("contains basic meta tags", () => {
    const article = _.extend({}, StandardArticle, {
      slug: "gallery-insights-slug",
      indexable: true,
      description: "Gallery Insights is a team channel.",
      social_description:
        "Gallery Insights is a socially friendly team channel.",
      social_image: "http://kitten-social.com",
    })
    const html = render("classic_meta")({
      article: new Article(article),
      crop: url => url,
      sd: {},
    })

    expect(html).toMatch("<title>New York's Next Art District</title>")
    expect(html).toMatch(
      '<link rel="canonical" href="undefined/article/gallery-insights-slug"/>'
    )
    expect(html).toMatch(
      '<meta property="description" content="Gallery Insights is a team channel."/>'
    )
    expect(html).toMatch(
      '<meta name="og:description" content="Gallery Insights is a socially friendly team channel."/>'
    )
    expect(html).toMatch(
      '<meta property="og:image" content="http://kitten-social.com"/>'
    )
    expect(html).not.toMatch('<meta name="robots" content="noindex"/>')
  })
})
