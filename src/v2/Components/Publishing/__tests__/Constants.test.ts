import { cloneDeep } from "lodash"
import {
  formatTime,
  getArtsySlugsFromArticle,
  getArtsySlugsFromHTML,
  getEditorialHref,
  getFullEditorialHref,
  getMediaDate,
} from "../Constants"
import {
  FeatureArticle,
  SeriesArticle,
  VideoArticle,
} from "../Fixtures/Articles"

describe("getMediaDate", () => {
  let article

  beforeEach(() => {
    article = VideoArticle
  })

  it("returns media release date if date", () => {
    const date = getMediaDate(article)
    expect(date).toBe(article.media.release_date)
  })

  it("returns published_at date if no release_date", () => {
    delete article.media.release_date
    const date = getMediaDate(article)
    expect(date).toBe(article.published_at)
  })
})

describe("#formatTime", () => {
  it("#formatTime - formats single digit seconds and minutes", () => {
    expect(formatTime(0)).toMatch("00:00")
  })

  it("#formatTime - formats double digit seconds and minutes", () => {
    expect(formatTime(5601)).toMatch("33:21")
    expect(formatTime(1000)).toMatch("16:40")
  })

  it("#formatTime - formats single digit seconds and minutes", () => {
    expect(formatTime(301)).toMatch("05:01")
    expect(formatTime(242)).toMatch("04:02")
  })
})

describe("getEditorialHref", () => {
  const slug = "artsy-editorial-this-article"
  it("Returns correctly for feature", () => {
    expect(getEditorialHref("feature", slug)).toBe(
      "/article/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for news", () => {
    expect(getEditorialHref("news", slug)).toBe(
      "/news/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for standard", () => {
    expect(getEditorialHref("standard", slug)).toBe(
      "/article/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for series", () => {
    expect(getEditorialHref("series", slug)).toBe(
      "/series/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for video", () => {
    expect(getEditorialHref("video", slug)).toBe(
      "/video/artsy-editorial-this-article"
    )
  })
})

describe("getFullEditorialHref", () => {
  const slug = "artsy-editorial-this-article"

  it("Returns correctly for feature", () => {
    expect(getFullEditorialHref("feature", slug)).toBe(
      "https://www.artsy.net/article/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for news", () => {
    expect(getFullEditorialHref("news", slug)).toBe(
      "https://www.artsy.net/news/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for standard", () => {
    expect(getFullEditorialHref("standard", slug)).toBe(
      "https://www.artsy.net/article/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for series", () => {
    expect(getFullEditorialHref("series", slug)).toBe(
      "https://www.artsy.net/series/artsy-editorial-this-article"
    )
  })

  it("Returns correctly for video", () => {
    expect(getFullEditorialHref("video", slug)).toBe(
      "https://www.artsy.net/video/artsy-editorial-this-article"
    )
  })
})

describe("getArtsySlugs", () => {
  let article
  beforeEach(() => {
    article = cloneDeep(FeatureArticle)
  })

  it("#getArtsySlugsFromArticle returns object with arrays of artsy ids by model", () => {
    article.sections.push({
      type: "text",
      body:
        "<p><a href='artsy.net/gene/capitalist-realism'>Capitalist Realism</a></p>",
    })
    const slugs = getArtsySlugsFromArticle(article)

    expect(slugs.artists.length).toBe(6)
    expect(slugs.genes.length).toBe(1)
    expect(slugs.genes[0]).toBe("capitalist-realism")
  })

  it("#getArtsySlugsFromArticle can handle articles without sections", () => {
    article = cloneDeep(SeriesArticle)
    const slugs = getArtsySlugsFromArticle(article)

    expect(slugs.artists.length).toBe(0)
    expect(slugs.genes.length).toBe(0)
  })

  it("#getArtsySlugsFromHTML can return linked artists from html", () => {
    const html = article.sections[0].body
    const artists = getArtsySlugsFromHTML(html, "artist")

    expect(artists.length).toBe(1)
    expect(artists[0]).toBe("jennie-jieun-lee")
  })

  it("#getArtsySlugsFromHTML can return linked genes from html", () => {
    const html =
      "<p><a href='artsy.net/gene/capitalist-realism'>Capitalist Realism</a></p>"
    const genes = getArtsySlugsFromHTML(html, "gene")

    expect(genes.length).toBe(1)
    expect(genes[0]).toBe("capitalist-realism")
  })
})
