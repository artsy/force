import _request from 'superagent'
import { data as _sd } from 'sharify'
import Articles from '../../collections/articles'
const PAGE_SIZE = 50
import Q from 'bluebird-q'

// FIXME: Rewire
let sd = _sd
let request = _request

export const news = (req, res, next) =>
  new Articles().fetch({
    data: {
      channel_id: sd.ARTSY_EDITORIAL_CHANNEL,
      published: true,
      sort: '-published_at',
      exclude_google_news: false,
      limit: PAGE_SIZE,
    },
    error: res.backboneError,
    success: async data => {
      try {
        const articles = await findArticlesWithEmbeds(data.models)
        res.set('Content-Type', 'application/rss+xml')
        return res.render('news', { articles, pretty: true })
      } catch (err) {
        console.error(err)
      }
    },
  })

export const partnerUpdates = (req, res, next) =>
  new Articles().fetch({
    data: {
      channel_id: sd.GALLERY_PARTNER_UPDATES_CHANNEL,
      published: true,
      sort: '-published_at',
      limit: PAGE_SIZE,
    },
    error: res.backboneError,
    success: articles => {
      res.set('Content-Type', 'application/rss+xml')
      return res.render('partner_updates', { articles, pretty: true })
    },
  })

export const findArticlesWithEmbeds = articles => {
  return Q.all(
    articles.map(async (article, i) => {
      const newSections = await findSocialEmbeds(article)
      article.set('sections', newSections)

      return article
    })
  ).then(res => {
    return new Articles(res)
  })
}

export const findSocialEmbeds = article => {
  return Q.all(
    article.get('sections').map(async (section, index) => {
      try {
        const newSection = await maybeFetchSocialEmbed(section)
        return newSection
      } catch (err) {
        console.error(err)
      }
    })
  ).then(res => {
    return res
  })
}

export const maybeFetchSocialEmbed = section => {
  return new Promise((resolve, reject) => {
    if (section.type !== 'social_embed') {
      return resolve(section)
    } else {
      const { url } = section
      const service = url.includes('twitter')
        ? 'publish.twitter'
        : 'api.instagram'

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
