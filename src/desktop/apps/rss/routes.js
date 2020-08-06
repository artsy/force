import _request from "superagent"
import { data as _sd } from "sharify"
import Articles from "../../collections/articles"
import { news as newsQuery } from "./queries/news"
import { positronql as _positronql } from "desktop/lib/positronql"

const PAGE_SIZE = 50

// FIXME: Rewire
let sd = _sd
let request = _request
let positronql = _positronql

export const news = (req, res, next) => {
  const query = {
    query: newsQuery,
  }
  return positronql(query)
    .then(async result => {
      try {
        const articlesWithoutUnpublishedVideos = result.articles.filter(
          article =>
            article.layout !== "video" ||
            (article.media && article.media.published)
        )

        const articles = await findArticlesWithEmbeds(
          articlesWithoutUnpublishedVideos
        )
        res.set("Content-Type", "application/rss+xml")
        return res.render("news", {
          articles,
          pretty: true,
        })
      } catch (err) {
        console.error(err)
      }
    })
    .catch(next)
}

export const partnerUpdates = (req, res, next) =>
  new Articles().fetch({
    data: {
      channel_id: sd.GALLERY_PARTNER_UPDATES_CHANNEL,
      published: true,
      sort: "-published_at",
      limit: PAGE_SIZE,
    },
    error: res.backboneError,
    success: articles => {
      res.set("Content-Type", "application/rss+xml")
      return res.render("partner_updates", {
        articles,
        pretty: true,
      })
    },
  })

export const findArticlesWithEmbeds = articles => {
  return Promise.all(
    articles.map(async (article, i) => {
      const newSections = await findSocialEmbeds(article)
      article.sections = newSections

      return article
    })
  ).then(res => {
    return new Articles(res)
  })
}

export const findSocialEmbeds = article => {
  return Promise.all(
    article.sections.map(async (section, index) => {
      try {
        const newSection = await maybeFetchSocialEmbed(section)
        return newSection
      } catch (err) {
        console.error(err)
      }
    })
  ).then(res => {
    return res.filter(x => !!x)
  })
}

export const maybeFetchSocialEmbed = section => {
  return new Promise((resolve, reject) => {
    const type = section && section.type
    if (type !== "social_embed") {
      return resolve(section)
    } else {
      const url = section && section.url
      const service = url.includes("twitter")
        ? "publish.twitter"
        : "api.instagram"

      request
        .get(`https://${service}.com/oembed?url=${url}`)
        .end((err, res) => {
          if (err) {
            reject(err)
          }
          section.url = res.body.html
          return resolve(section)
        })
    }
  })
}
